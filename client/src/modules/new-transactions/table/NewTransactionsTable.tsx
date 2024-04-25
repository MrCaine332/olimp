import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { useUnit } from "effector-react"
import { $persons } from "@/pages/new-transactions/model"
import { NewTransactionsList } from "@/modules/new-transactions/table/ui"
import { columns } from "./ui/columns"

export function NewTransactionsTable() {
  const persons = useUnit($persons)

  const [rowSelection, setRowSelection] = React.useState({})

  /** Table definition with data and columns */
  const table = useReactTable({
    data: persons,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <div className="rounded-md border">
      {/** Renderable cells are taken from "columns" object. See import "./ui/columns" */}
      <Table>
        {/** Render table head */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-inherit">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/** Render table body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                {/** Render person row */}
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-inherit"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {/** Render person's transactions in a separate table row */}
                <NewTransactionsList personId={row.original.id} />
              </React.Fragment>
            ))
          ) : (
            /** If no persons were found */
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
