import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm"
import { Person } from "@/modules/persons/entities/person.entity"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column("integer")
  amount: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Person, (person) => person.transactions)
  person: Person
}
