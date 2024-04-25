import { useGate, useUnit } from "effector-react"
import {
  $getPersonsStatus,
  TransactionsGate,
} from "@/pages/new-transactions/model"
import React from "react"
import { NewTransactionsTable } from "@/modules/new-transactions/table"
import { NewTransactionsSubmit } from "@/modules/new-transactions/submit"
import { Loader } from "@/shared/ui/loader"
import { NewTransactionsBank } from "@/modules/new-transactions/bank"

export const NewTransactions = () => {
  useGate(TransactionsGate)

  const status = useUnit($getPersonsStatus)

  if (
    status.pending ||
    (status.status === "fail" && status.error?.name !== "CanceledError")
  ) {
    return <Loader className="my-auto" />
  }

  return (
    <div>
      <NewTransactionsBank />
      <div className="border rounded-md mt-4">
        <NewTransactionsTable />
      </div>
      <NewTransactionsSubmit />
    </div>
  )
}
