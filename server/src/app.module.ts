import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "@/modules/database/database.module"
import { BankModule } from "@/modules/bank/bank.module"
import { PersonsModule } from "@/modules/persons/persons.module"
import { TransactionsModule } from "@/modules/transactions/transactions.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PersonsModule,
    BankModule,
    TransactionsModule,
  ],
})
export class AppModule {}
