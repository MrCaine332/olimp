import { useEffect, useState } from "react"
import { bankApi } from "@/entities/bank/model"

export const NewTransactionsBank = () => {
  const [bank, setBank] = useState(0)

  useEffect(() => {
    const getBankData = async () => {
      const data = await bankApi.getBankBalance()
      setBank(data.balance)
    }
    getBankData()

    let interval = setInterval(() => {
      getBankData()
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <div className="text-muted-foreground">Current bank:</div>
      <div className="text-3xl">${bank}</div>
    </div>
  )
}
