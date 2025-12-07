import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import type { WatchItem } from '../data/schema'
import { formatINR, formatPercent, formatCompact } from '../data/schema'

export type PriceBasis = 'prevClose' | 'open'

export function getWatchlistColumns(basis: PriceBasis): ColumnDef<WatchItem>[] {
  const pctFor = (item: WatchItem) => {
    const base = basis === 'prevClose' ? item.prevClose ?? item.ltp : item.open ?? item.ltp
    if (!base || base === 0) return 0
    return ((item.ltp - base) / base) * 100
  }

  return [
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
    accessorKey: 'exchange',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exch' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => <span>{row.original.exchange ?? 'NSE'}</span>,
    enableHiding: true,
  },
  {
    accessorKey: 'sector',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sector' />
    ),
    meta: { className: 'ps-2', tdClassName: 'ps-4' },
    cell: ({ row }) => <span>{row.getValue('sector')}</span>,
    filterFn: (row, id, value) => (value as string[]).includes(row.getValue(id)),
  },
  {
    accessorKey: 'group',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Group' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => <span>{row.original.group ?? 'General'}</span>,
    enableHiding: true,
  },
  {
    accessorKey: 'ltp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{formatINR(row.getValue('ltp'))}</span>,
  },
  {
    id: 'changePct',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={`Change % (${basis === 'prevClose' ? 'Prev Close' : 'Open'})`} />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const p = pctFor(row.original)
      const cls = p >= 0 ? 'text-emerald-600' : 'text-red-600'
      return <span className={`tabular-nums ${cls}`}>{formatPercent(p)}</span>
    },
  },
  {
    id: 'rangeDay',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Day Range' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const low = row.original.dayLow
      const high = row.original.dayHigh
      return <span className='tabular-nums'>{formatINR(low)} – {formatINR(high)}</span>
    },
  },
  {
    id: 'range52w',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='52W Range' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const low = row.original.week52Low
      const high = row.original.week52High
      return <span className='tabular-nums'>{formatINR(low)} – {formatINR(high)}</span>
    },
  },
  {
    accessorKey: 'volume',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Volume' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{formatCompact(row.getValue('volume'))}</span>,
  },
  {
    accessorKey: 'marketCap',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Market Cap' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => <span className='tabular-nums'>{formatCompact(row.getValue('marketCap'))}</span>,
    sortingFn: (a, b) => a.original.marketCap - b.original.marketCap,
  },
  {
    id: 'alerts',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Alerts' />
    ),
    meta: { className: 'text-right', tdClassName: 'text-right' },
    cell: ({ row }) => {
      const alert = row.original.alert
      const note = row.original.note
      return (
        <div className='flex justify-end gap-2'>
          {alert ? <Badge variant='default'>Alert</Badge> : null}
          {note ? <Badge variant='secondary'>Note</Badge> : null}
        </div>
      )
    },
  },
  ]
}