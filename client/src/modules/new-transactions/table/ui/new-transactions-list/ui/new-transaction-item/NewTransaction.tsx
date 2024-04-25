import { Badge } from "@/shared/ui/badge"
import { cn } from "@/shared/utils/cn"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import {
  changeTransactionAmount,
  removeTransaction,
} from "@/pages/new-transactions/model"
import { RefreshCcwIcon, Trash2Icon } from "lucide-react"
import React from "react"
import { Transaction } from "@/entities/transactions/model"
import { validateAmount } from "@/entities/transactions/model/validateAmount"
import { toast } from "sonner"

type NewTransactionProps = {
  transaction: Transaction
  personId: number
}

export const NewTransaction = ({
  transaction,
  personId,
}: NewTransactionProps) => {
  const onTransactionAmountChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const isValid = validateAmount(e.target.value)

    if (!isValid) {
      toast.error("Invalid amount format")
      e.target.value = "" + transaction.amount
      return
    }

    changeTransactionAmount({
      personId,
      id: transaction.id,
      newAmount: Number(e.target.value),
    })
  }

  return (
    <>
      <Badge className="h-5 rounded-sm bg-info hover:bg-info">
        New Transaction
      </Badge>
      <div className="flex gap-4 items-center">
        <Label>Amount:</Label>
        <Input
          defaultValue={transaction.amount}
          className="h-6 w-36 p-0 border-0 border-b rounded-none bg-transparent focus:border-b-2 focus-visible:ring-transparent focus-visible:ring-offset-0"
          onBlur={onTransactionAmountChange}
        />
        <Separator orientation="vertical" className="h-8" />
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-destructive"
          onClick={() =>
            removeTransaction({ id: transaction.id, personId: personId })
          }
        >
          Remove Transaction
          <Trash2Icon size={14} />
        </Button>
      </div>
    </>
  )
}
