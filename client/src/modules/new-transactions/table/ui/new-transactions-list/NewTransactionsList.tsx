import { useList, useStoreMap, useUnit } from "effector-react"
import {
  $newTransactions,
  changeTransactionAmount,
  removeTransaction,
} from "@/pages/new-transactions/model"
import { TableCell, TableRow } from "@/shared/ui/table"
import { cn } from "@/shared/utils/cn"
import React from "react"
import { NewTransactionItem } from "@/modules/new-transactions/table/ui/new-transactions-list/ui"

type NewTransactionsListProps = {
  personId: number
}

export const NewTransactionsList = ({ personId }: NewTransactionsListProps) => {
  /** Map only this user's transactions */
  const newTransactions = useUnit($newTransactions)

  const transactions = newTransactions[personId]

  return (
    <TableRow
      className={cn(
        "border-0 hover:bg-accent-background/50 bg-accent-background/50",
        transactions && transactions?.length > 0 && "border-b"
      )}
    >
      <TableCell colSpan={4} className="p-0">
        {transactions?.map((transaction, index) => (
          <NewTransactionItem
            key={transaction.id}
            transaction={transaction}
            personId={personId}
            index={index}
          />
        ))}
      </TableCell>
    </TableRow>
  )
}
