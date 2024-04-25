import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number

  @Column("integer")
  balance: number
}
