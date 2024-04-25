import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { Person } from "@/modules/persons/entities/person.entity"
import { Bank } from "@/modules/bank/entities/bank.entity"
import { Transaction } from "@/modules/transactions/entities/Transaction.entity"
import { persons as personsMockData } from "@/mock-data/persons"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USERNAME"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DATABASE"),
        entities: [Person, Bank, Transaction],
        synchronize: true,
      }),

      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error("Bad options")
        }
        const dataSource = await new DataSource(options).initialize()

        /** Runner for filling tables with mock data */
        const queryRunner = dataSource.createQueryRunner()

        /** Inserting mock users */
        const personCount = await queryRunner.manager.count(Person)
        if (personCount === 0) {
          personsMockData.forEach((person) => {
            const personRecord = new Person()
            personRecord.name = person
            queryRunner.manager.save(personRecord)
          })
        }

        /** Inserting mock bank */
        const bankCount = await queryRunner.manager.count(Bank)
        if (bankCount === 0) {
          const bank = new Bank()
          bank.balance = 1000000
          await queryRunner.manager.save(bank)
        }

        return dataSource
      },
    }),
  ],
})
export class DatabaseModule {}
