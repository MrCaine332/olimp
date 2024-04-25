import React, { memo } from "react"
import { cn } from "@/shared/utils/cn"
import { Transaction } from "@/entities/transactions/model"
import { NewTransaction } from "./NewTransaction"
import { SuccessfulTransaction } from "./SuccessfulTransaction"
import { FailedTransaction } from "./FailedTransaction"

type NewTransactionItemProps = {
  transaction: Transaction
  personId: number
  index: number
}

export const NewTransactionItem = memo(
  ({ transaction, personId, index }: NewTransactionItemProps) => {
    return (
      <div
        className={cn(
          "flex h-12 items-center justify-between px-4 gap-4 pl-12",
          index !== 0 && "border-t"
        )}
      >
        {transaction.status === "new" ? (
          <NewTransaction transaction={transaction} personId={personId} />
        ) : null}
        {transaction.status === "success" ? (
          <SuccessfulTransaction transaction={transaction} />
        ) : null}
        {transaction.status === "fail" ? (
          <FailedTransaction transaction={transaction} personId={personId} />
        ) : null}
      </div>
    )
  }
)
