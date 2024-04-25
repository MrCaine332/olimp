import { ColumnDef } from "@tanstack/react-table"
import { Person } from "@/entities/persons/model"
import { ColumnSelectHeader, ColumnSelectCell } from "./ColumnSelect"
import { ColumnIDCell } from "./ColumnID"
import { ColumnNameCell } from "./ColumnName"
import {
  ColumnAddTransactionHeader,
  ColumnAddTransactionCell,
} from "./ColumnAddTransaction"

export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ColumnSelectHeader,
    cell: ColumnSelectCell,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ColumnIDCell,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ColumnNameCell,
  },
  {
    id: "addTransaction",
    enableHiding: false,
    header: ColumnAddTransactionHeader,
    cell: ColumnAddTransactionCell,
  },
]
