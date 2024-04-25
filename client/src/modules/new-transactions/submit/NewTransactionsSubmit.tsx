import { $newTransactions } from "@/pages/new-transactions/model"
import { useUnit } from "effector-react"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import {
  $submitTransactionsStatus,
  submitTransactions,
} from "@/modules/new-transactions/submit/model"
import { Loader2Icon } from "lucide-react"
import { Transaction } from "@/entities/transactions/model"

type TransactionReduce = {
  transactions: Transaction[]
  sum: number
}

export const NewTransactionsSubmit = () => {
  const status = useUnit($submitTransactionsStatus)
  const newTransactions = useUnit($newTransactions)

  /** Map all transaction into 1-dimensional array to simplify request */
  const { transactions, sum } = Object.keys(
    newTransactions
  ).reduce<TransactionReduce>(
    (prev, key: any) => {
      prev.transactions = [
        ...prev.transactions,
        ...(newTransactions[key]?.filter((t) => t.status === "new") || []),
      ]
      newTransactions[key]?.forEach((t) => {
        if (t.status === "new") {
          prev.sum += t.amount
        }
      })
      return prev
    },
    { transactions: [], sum: 0 }
  )

  /** Submit transactions */
  const onSubmit = () => {
    submitTransactions(transactions)
  }

  return (
    <div className="my-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-md text-muted-foreground">
          Total new transactions:
        </div>
        <span className="text-xl">{transactions.length}</span>
        <Separator orientation="vertical" className="h-6" />
        <div className="text-md text-muted-foreground">Total sum:</div>
        <span className="text-xl">${sum}</span>
      </div>
      <div>
        <Button
          onClick={onSubmit}
          disabled={transactions.length === 0 || status.pending}
          className="gap-2"
        >
          Send Transactions
          {status.pending ? (
            <Loader2Icon size={18} className="animate-spin" />
          ) : null}
        </Button>
      </div>
    </div>
  )
}
