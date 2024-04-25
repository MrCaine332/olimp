import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { DataSource } from "typeorm"
import { TransactionDto } from "./dto/submit-transactions.dto"
import { Transaction } from "./entities/Transaction.entity"
import { Person } from "@/modules/persons/entities/person.entity"
import { Bank } from "@/modules/bank/entities/bank.entity"

@Injectable()
export class TransactionsService {
  constructor(private dataSource: DataSource) {}

  async submitTransactions(transactions: TransactionDto[]) {
    /** Execution time measurement */
    const executionStartTime = performance.now()

    /** Declare query runner */
    const queryRunner = this.dataSource.createQueryRunner()

    try {
      /** Find bank and throw error if not found */
      const bank = await queryRunner.manager.find(Bank)
      if (!bank[0]) {
        throw new NotFoundException()
      }

      /** Initialize array of promises for parallel processing */
      const promises: any[] = []

      /** Declare balance adjustments */
      let bankBalanceChangeAmount = 0

      /** For each transaction, create promise to process transaction. */
      transactions.forEach((transaction, index) => {
        /** Promise declaration */
        const promise = new Promise(async (resolve) => {
          /** Transaction processing */
          try {
            const person = await queryRunner.manager.findOne(Person, {
              where: { id: transaction.personId },
            })

            /** If no person, throw error */
            if (!person) {
              throw new NotFoundException()
            }

            /** Create and save transaction to db */
            const transactionRecord = new Transaction()
            transactionRecord.amount = transaction.amount
            transactionRecord.person = person
            const result = await queryRunner.manager.save(transactionRecord)

            /** If transaction successfully created, adjust changes form bank balance */
            bankBalanceChangeAmount += transactionRecord.amount

            /** If all good, resolve */
            resolve(result)
          } catch (e) {
            /** If any error, resolve with null */
            resolve(null)
          }
        })

        /** Push declared promise to array */
        promises.push(promise)
      })

      /** Start query runner */
      await queryRunner.connect()
      await queryRunner.startTransaction()

      /** Call promises */
      const processedTransactions = await Promise.all<Transaction | null>(
        promises
      )
      console.log(processedTransactions)

      /** Update bank balance after all transactions */
      await queryRunner.manager.update(Bank, bank[0].id, {
        balance: bank[0].balance + bankBalanceChangeAmount,
      })

      /** Commit changes */
      await queryRunner.commitTransaction()

      /** Execution time measurement */
      const executionEndTime = performance.now()

      const statuses = processedTransactions.map((t) =>
        t ? "success" : "fail"
      )

      return {
        statuses: statuses,
        executionTime: executionEndTime - executionStartTime,
      }
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw new BadRequestException("Error during processing", {
        cause: new Error(),
        description: "Could not process",
      })
    } finally {
      await queryRunner.release()
    }
  }
}
