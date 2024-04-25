import { combine, createEvent, restore, sample } from "effector"
import { createEffect } from "effector/compat"
import { pending, status } from "patronum"
import { toast } from "sonner"
import {
  $newTransactions,
  NewTransactionsStore,
} from "@/pages/new-transactions/model"
import { Transaction, transactionsApi } from "@/entities/transactions/model"

/** Events */
/** =================================== */

export const submitTransactions = createEvent<Transaction[]>()

export const rerunTransaction = createEvent<Transaction>()

/** Effects */
/** =================================== */

type SubmitTransactionsFxArgs = { transactions: Transaction[] }

export const submitTransactionsFx = createEffect<
  SubmitTransactionsFxArgs,
  // any
  { statuses: ("success" | "fail")[]; submittedTransactions: Transaction[] }
>(async ({ transactions }) => {
  const data = await transactionsApi.submitTransactions(transactions)
  toast.success("Transactions submitted!", {
    description: `It took ${data.executionTime.toFixed(1)} ms.`,
  })

  return { statuses: data.statuses, submittedTransactions: transactions }
})

/** Samples */
/** =================================== */

sample({
  clock: submitTransactions,
  source: submitTransactionsFx.inFlight,
  filter: (inFlight, _) => inFlight === 0,
  fn: (_, newTransactions) => ({
    transactions: newTransactions,
  }),
  target: submitTransactionsFx,
})

/** Status */
/** =================================== */
const $status = status({ effect: submitTransactionsFx })
const $pending = pending([submitTransactionsFx])
const $error = restore(submitTransactionsFx.failData, null).reset(
  submitTransactionsFx.done
)

export const $submitTransactionsStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

$status.watch((status) => {
  if (status === "fail")
    toast.error("Error occured", {
      description: "We could not submit transactions. We are sorry!",
    })
})

$newTransactions.on(
  submitTransactionsFx.doneData,
  (state, { statuses, submittedTransactions }) => {
    const stateCopy = { ...state }

    const a = submittedTransactions.map((t, index) => ({
      ...t,
      status: statuses[index],
    }))

    const b = a.reduce<any>((prev, curr) => {
      if (prev[curr.personId]) {
        prev[curr.personId] = [...prev[curr.personId]!, curr]
      } else {
        prev[curr.personId] = [curr]
      }
      return prev
    }, {})

    Object.keys(b).forEach((key: any) => {
      const arr = new Array()
      arr.push(...stateCopy[key]!.filter((t) => t.status !== "new"))
      arr.push(...b[key])
      stateCopy[key] = arr
    })

    return stateCopy
  }
)
