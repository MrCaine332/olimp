import { Checkbox } from "@/shared/ui/checkbox"
import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Person } from "@/entities/persons/model"

export const ColumnSelectHeader = ({ table }: { table: Table<Person> }) => (
  <Checkbox
    checked={
      table.getIsAllPageRowsSelected() ||
      (table.getIsSomePageRowsSelected() && "indeterminate")
    }
    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    aria-label="Select all"
  />
)

export const ColumnSelectCell = ({ row }: { row: Row<Person> }) => (
  <Checkbox
    checked={row.getIsSelected()}
    onCheckedChange={(value) => row.toggleSelected(!!value)}
    aria-label="Select row"
  />
)
