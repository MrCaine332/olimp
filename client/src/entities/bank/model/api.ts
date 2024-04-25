import $api from "@/shared/http/api"
import { Bank } from "./types"
import { AxiosRequestConfig } from "axios"

const getBankBalance = async (config?: AxiosRequestConfig) => {
  const { data } = await $api.get<Bank>("/bank/balance", config)
  return data
}

export const bankApi = {
  getBankBalance,
}
