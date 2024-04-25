import $api from "@/shared/http/api"
import { Person } from "./types"
import { AxiosRequestConfig } from "axios"

const getPersons = async (config?: AxiosRequestConfig) => {
  const { data } = await $api.get<Person[]>("/persons", config)
  return data
}

export const personApi = {
  getPersons,
}
