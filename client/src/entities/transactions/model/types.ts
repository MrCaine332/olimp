export type Transaction = {
  id: string
  personId: number
  amount: number
  status: "new" | "success" | "fail"
}

export type SubmitTransactionsResponse = {
  statuses: ("success" | "fail")[]
  executionTime: number
}
