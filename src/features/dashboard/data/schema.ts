export type Holding = {
  symbol: string
  name: string
  sector: string
  qty: number
  avgPrice: number
  ltp: number
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(n)

export type WatchItem = {
  symbol: string
  name: string
  sector: string
  ltp: number
  changePct?: number
  volume: number
  marketCap: number
  dayHigh: number
  dayLow: number
  week52High: number
  week52Low: number
  open?: number
  prevClose?: number
  exchange?: 'NSE' | 'BSE' | 'MCX' | 'NFO'
  oi?: number
  group?: string
  alert?: boolean
  note?: string
}

export const formatPercent = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`

export const formatCompact = (n: number) =>
  new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(n)