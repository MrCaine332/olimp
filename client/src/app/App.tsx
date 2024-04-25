import React from "react"
import { Container } from "@/shared/ui/container"
import { NewTransactions } from "@/pages/new-transactions"

function App() {
  return (
    <Container className="w-[1024px] mx-auto mt-4">
      <NewTransactions />
    </Container>
  )
}

export default App
