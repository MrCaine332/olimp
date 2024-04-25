import $api from "@/shared/http/api"
import { AxiosRequestConfig } from "axios"
import {
  SubmitTransactionsResponse,
  Transaction,
} from "@/entities/transactions/model/types"

const submitTransactions = async (
  transactions: Transaction[],
  config?: AxiosRequestConfig
) => {
  const { data } = await $api.post<SubmitTransactionsResponse>(
    "/transactions/submit",
    { transactions },
    config
  )
  return data
}

export const transactionsApi = {
  submitTransactions,
}
