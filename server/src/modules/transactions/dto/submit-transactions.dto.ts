import { z } from "zod"

export const transactionSchema = z.object({
  personId: z.number(),
  amount: z.number(),
})

export type TransactionDto = z.infer<typeof transactionSchema>

export const submitTransactionsSchema = z
  .object({
    transactions: z.array(transactionSchema),
  })
  .required()

export type SubmitTransactionsDto = z.infer<typeof submitTransactionsSchema>
