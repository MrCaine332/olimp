import { Row } from "@tanstack/react-table"
import { Person } from "@/entities/persons/model"
import * as React from "react"

export const ColumnIDCell = ({ row }: { row: Row<Person> }) => (
  <div>{row.getValue("id")}</div>
)
