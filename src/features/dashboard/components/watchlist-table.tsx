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
import type { WatchItem } from '../data/schema'
import { watchlist } from '../data/watchlist'
import { getWatchlistColumns, type PriceBasis } from './watchlist-columns'
import { InstrumentDetailsDialog } from './instrument-details-dialog'

type Props = {
  items?: WatchItem[]
  basis?: PriceBasis
}

export function WatchlistTable({ items, basis = 'prevClose' }: Props) {
  const [data, setData] = useState<WatchItem[]>(items ?? watchlist)
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = getWatchlistColumns(basis)

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
    const pages = table.getPageCount()
    if (pages === 0) {
      table.setPageIndex(0)
    }
  }, [table])

  // derive filters for faceted dropdowns
  const sectors = Array.from(new Set(data.map((d) => d.sector))).map((s) => ({ label: s, value: s }))
  const groups = Array.from(new Set(data.map((d) => d.group ?? 'General'))).map((g) => ({ label: g, value: g }))

  // simple native drag-and-drop reorder within current page rows
  const [dragId, setDragId] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selected, setSelected] = useState<WatchItem | null>(null)

  const handleDragStart = (rowId: string) => setDragId(rowId)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (targetRowId: string) => {
    if (!dragId || dragId === targetRowId) return
    const rows = table.getRowModel().rows
    const sourceIdx = rows.findIndex((r) => r.id === dragId)
    const targetIdx = rows.findIndex((r) => r.id === targetRowId)
    if (sourceIdx < 0 || targetIdx < 0) return
    const sourceItem = rows[sourceIdx].original
    const targetItem = rows[targetIdx].original
    const oldIndex = data.findIndex((d) => d.symbol === sourceItem.symbol)
    const newIndex = data.findIndex((d) => d.symbol === targetItem.symbol)
    if (oldIndex < 0 || newIndex < 0) return
    const next = [...data]
    const [moved] = next.splice(oldIndex, 1)
    next.splice(newIndex, 0, moved)
    setData(next)
    setDragId(null)
  }

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        'flex flex-1 flex-col gap-4'
      )}
    >
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter watchlist...'
        filters={[
          { columnId: 'sector', title: 'Sector', options: sectors },
          { columnId: 'group', title: 'Group', options: groups },
        ]}
      />
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
                <TableRow
                  key={row.id}
                  className='group/row'
                  draggable
                  onDragStart={() => handleDragStart(row.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(row.id)}
                  onDoubleClick={() => {
                    setSelected(row.original)
                    setDetailsOpen(true)
                  }}
                >
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
                  No watchlist items.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
      <InstrumentDetailsDialog
        item={selected}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onSaveNote={(symbol, note) => {
          setData((prev) => prev.map((i) => (i.symbol === symbol ? { ...i, note } : i)))
        }}
      />
    </div>
  )
}