import { Injectable } from "@nestjs/common"
import { Person } from "@/modules/persons/entities/person.entity"
import { DataSource } from "typeorm"
import { Bank } from "@/modules/bank/entities/bank.entity"

@Injectable()
export class BankService {
  constructor(private dataSource: DataSource) {}

  async getBalance() {
    const banks = await this.dataSource.manager.find(Bank)
    const bank = banks[0]
    return { balance: bank.balance }
  }
}
