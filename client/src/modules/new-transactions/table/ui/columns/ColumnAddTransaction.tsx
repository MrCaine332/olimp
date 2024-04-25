import { Row, Table } from "@tanstack/react-table"
import { Person } from "@/entities/persons/model"
import { Checkbox } from "@/shared/ui/checkbox"
import * as React from "react"
import { useState } from "react"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { PlusIcon } from "lucide-react"
import { validateAmount } from "@/entities/transactions/model/validateAmount"
import { toast } from "sonner"
import {
  addTransaction,
  addTransactionsBulk,
} from "@/pages/new-transactions/model"

export const ColumnAddTransactionHeader = ({
  table,
}: {
  table: Table<Person>
}) => {
  const [amount, setAmount] = useState("500")
  const selectedRows = table.getSelectedRowModel().rows

  if (selectedRows.length < 1) {
    return (
      <div className="flex items-center justify-end gap-4">
        <Label className="text-muted-foreground/50">Amount:</Label>
        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled
          className="h-6 w-32 p-0 border-0 border-b rounded-none bg-transparent"
        />
        <Separator orientation="vertical" className="h-8" />
        <Button variant="outline" disabled size="sm" className="gap-2">
          <PlusIcon size={14} />
          Add Transactions To Selected
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Label>Amount:</Label>
      <Input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="h-6 w-32 p-0 border-0 border-b rounded-none bg-transparent focus:border-b-2 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Separator orientation="vertical" className="h-8" />
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => {
          const isValid = validateAmount(amount)
          if (!isValid) {
            toast.error("Invalid amount format")
            return
          }
          addTransactionsBulk({
            persons: selectedRows.map((row) => row.original),
            defaultAmount: Number(amount),
          })
        }}
      >
        <PlusIcon size={14} />
        Add Transactions To Selected
      </Button>
    </div>
  )
}

export const ColumnAddTransactionCell = ({ row }: { row: Row<Person> }) => {
  return (
    <div className="text-right">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => addTransaction({ personId: row.original.id })}
      >
        <PlusIcon size={14} />
        Add Transaction
      </Button>
    </div>
  )
}
