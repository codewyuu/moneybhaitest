import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import type { Holding } from '../data/schema'
import { formatINR } from '../data/schema'

export const holdingsColumns: ColumnDef<Holding>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Symbol' />
    ),
    meta: { className: 'ps-2', tdClassName: 'ps-4' },
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Badge variant='outline'>{row.getValue('symbol')}</Badge>
        <span className='text-muted-foreground hidden text-xs sm:inline'>
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'sector',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sector' />
    ),
    meta: { className: 'ps-2', tdClassName: 'ps-4' },
    cell: ({ row }) => <span>{row.getValue('sector')}</span>,
    filterFn: (row, id, value) => {
      return (value as string[]).includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'qty',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qty' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{row.getValue('qty')}</span>,
  },
  {
    accessorKey: 'avgPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Avg. Price' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{formatINR(row.getValue('avgPrice'))}</span>,
  },
  {
    accessorKey: 'ltp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='LTP' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{formatINR(row.getValue('ltp'))}</span>,
  },
  {
    id: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Value' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const h = row.original
      const value = h.qty * h.ltp
      return <span className='tabular-nums'>{formatINR(value)}</span>
    },
    sortingFn: (a, b) => {
      const va = a.original.qty * a.original.ltp
      const vb = b.original.qty * b.original.ltp
      return va - vb
    },
  },
  {
    id: 'pnl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unrealized P&L' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const h = row.original
      const pnl = (h.ltp - h.avgPrice) * h.qty
      const cls = pnl >= 0 ? 'text-emerald-600' : 'text-red-600'
      return <span className={`tabular-nums ${cls}`}>{formatINR(pnl)}</span>
    },
    sortingFn: (a, b) => {
      const pa = (a.original.ltp - a.original.avgPrice) * a.original.qty
      const pb = (b.original.ltp - b.original.avgPrice) * b.original.qty
      return pa - pb
    },
  },
]