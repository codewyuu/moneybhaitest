import { useEffect, useState } from 'react'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import type { Holding } from '../data/schema'
import { holdings } from '../data/holdings'
import { holdingsColumns as columns } from './holdings-columns'

export function HoldingsTable() {
  const [data] = useState<Holding[]>(holdings)
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  // Simple global filter across symbol and name
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, columnVisibility },
    enableRowSelection: false,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: (row, _columnId, filterValue) => {
      const sym = String(row.getValue('symbol')).toLowerCase()
      const name = String(row.original.name).toLowerCase()
      const search = String(filterValue ?? '').toLowerCase()
      return sym.includes(search) || name.includes(search)
    },
  })

  useEffect(() => {
    // Guard: if page size exceeds rows after filters
    const pages = table.getPageCount()
    if (pages === 0) {
      table.setPageIndex(0)
    }
  }, [table])

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        'flex flex-1 flex-col gap-4'
      )}
    >
      <DataTableToolbar table={table} searchPlaceholder='Filter holdings...' />
      <div className='overflow-hidden rounded-xl bg-white/6 border border-white/25 ring-1 ring-white/12 backdrop-blur-md shadow-[0_2px_12px_rgba(255,255,255,0.08)]'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      'bg-white/8 border-b border-white/12 group-hover/row:bg-white/10 group-data-[state=selected]/row:bg-white/10',
                      header.column.columnDef.meta?.className,
                      header.column.columnDef.meta?.thClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className='group/row'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'bg-white/4 border-b border-white/8 group-hover/row:bg-white/6 group-data-[state=selected]/row:bg-white/6',
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.tdClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No holdings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
    </div>
  )
}