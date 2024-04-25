import { Row } from "@tanstack/react-table"
import { Person } from "@/entities/persons/model"
import { Checkbox } from "@/shared/ui/checkbox"
import * as React from "react"

export const ColumnNameCell = ({ row }: { row: Row<Person> }) => (
  <div className="capitalize">{row.getValue("name")}</div>
)
