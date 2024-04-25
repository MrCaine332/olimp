import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaction } from "@/modules/transactions/entities/Transaction.entity"

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 50 })
  name: string

  @OneToMany(() => Transaction, (transaction) => transaction.person)
  transactions: Transaction[]
}
