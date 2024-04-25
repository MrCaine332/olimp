import { Badge } from "@/shared/ui/badge"
import { Label } from "@/shared/ui/label"
import React from "react"
import { Transaction } from "@/entities/transactions/model"

type SuccessfulTransactionProps = {
  transaction: Transaction
}

export const SuccessfulTransaction = ({
  transaction,
}: SuccessfulTransactionProps) => {
  return (
    <>
      <Badge className="h-5 rounded-sm bg-success/75 hover:bg-success/75">
        Successful Transaction
      </Badge>
      <div className="flex gap-4 items-center">
        <Label>Amount:</Label>
        <span className="text-xl">{transaction.amount}</span>
      </div>
    </>
  )
}
