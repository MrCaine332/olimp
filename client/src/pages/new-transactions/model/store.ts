import {
  attach,
  combine,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector"
import { createEffect } from "effector/compat"
import { createGate } from "effector-react"
import { pending, status } from "patronum"
import { Person, personApi } from "@/entities/persons/model"
import { Transaction } from "@/entities/transactions/model"
import { v4 } from "uuid"

/** Gates */
/** =================================== */
export const TransactionsGate = createGate()

/** Stores */
/** =================================== */
export const $persons = createStore<Person[]>([]).reset(TransactionsGate.close)

export type NewTransactionsStore = {
  [key: number]: Transaction[] | undefined
}

export const $newTransactions = createStore<NewTransactionsStore>({})

/** Get Persons logic */
/** =================================== */
export const getPersons = createEvent()

/** Effects */
type GetPersonsFx = { controller: AbortController }

const getPersonsFx = createEffect<GetPersonsFx, Person[]>(({ controller }) => {
  return personApi.getPersons({ signal: controller.signal })
})

const abortGetPersonsFx = attach({
  source: getPersonsFx.inFlight,
  effect: (inFlight, controller: AbortController) => {
    if (!controller.signal.aborted && inFlight > 0) {
      controller.abort()
    }
  },
})

/** Samples */
sample({
  clock: TransactionsGate.open,
  fn: () => ({ controller: new AbortController() }),
  target: getPersonsFx,
})

sample({
  clock: TransactionsGate.close,
  source: getPersonsFx,
  filter: ({ controller }) => !!controller,
  fn: ({ controller }) => controller,
  target: abortGetPersonsFx,
})

sample({
  clock: getPersonsFx.doneData,
  target: $persons,
})

/** Status */
const $status = status({ effect: getPersonsFx }).reset(getPersons)
const $pending = pending([getPersonsFx])
const $error = restore(getPersonsFx.failData, null).reset(
  getPersons,
  getPersonsFx.done
)

export const $getPersonsStatus = combine({
  status: $status,
  pending: $pending,
  error: $error,
})

/** Transactions Manipulation logic */
/** =================================== */

/** Events */
export const addTransaction = createEvent<{ personId: number }>()

export const addTransactionsBulk = createEvent<{
  persons: Person[]
  defaultAmount: number
}>()

type RemoveTransactionArgs = {
  personId: number
  id: string
}

export const removeTransaction = createEvent<RemoveTransactionArgs>()

type ChangeTransactionAmountArgs = {
  personId: number
  id: string
  newAmount: number
}

export const changeTransactionAmount =
  createEvent<ChangeTransactionAmountArgs>()

/** Subscriptions */

/** Add transaction subscription */
$newTransactions.on(addTransaction, (state, { personId }) => {
  const newTransaction: Transaction = {
    id: v4(),
    personId: personId,
    amount: 500,
    status: "new",
  }

  const stateCopy = { ...state }

  if (stateCopy[personId]) {
    stateCopy[personId] = [...stateCopy[personId]!, newTransaction]
  } else {
    stateCopy[personId] = [newTransaction]
  }

  return stateCopy
})

/** Add bulk transactions subscription */
$newTransactions.on(
  addTransactionsBulk,
  (state, { persons, defaultAmount }) => {
    const stateCopy = { ...state }

    persons.forEach((person) => {
      const newTransaction: Transaction = {
        id: v4(),
        personId: person.id,
        amount: defaultAmount,
        status: "new",
      }

      if (stateCopy[person.id]) {
        stateCopy[person.id] = [...stateCopy[person.id]!, newTransaction]
      } else {
        stateCopy[person.id] = [newTransaction]
      }
    })

    return stateCopy
  }
)

/** Remove transaction subscription */
$newTransactions.on(removeTransaction, (state, { id, personId }) => {
  const stateCopy = { ...state }

  if (stateCopy[personId]) {
    stateCopy[personId] = stateCopy[personId]!.filter(
      (transaction) => transaction.id !== id
    )
  }

  return stateCopy
})

/** Change transaction amount subscription */
$newTransactions.on(
  changeTransactionAmount,
  (state, { id, personId, newAmount }) => {
    const stateCopy = { ...state }

    if (stateCopy[personId]) {
      stateCopy[personId] = stateCopy[personId]!.map((transaction) =>
        transaction.id === id
          ? { ...transaction, amount: newAmount }
          : transaction
      )
    }

    return stateCopy
  }
)
