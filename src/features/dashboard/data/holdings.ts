import type { Holding } from './schema'

export const holdings: Holding[] = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', qty: 25, avgPrice: 3600, ltp: 3875 },
  { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT', qty: 40, avgPrice: 1450, ltp: 1525 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', qty: 30, avgPrice: 1520, ltp: 1602 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', qty: 18, avgPrice: 2450, ltp: 2512 },
  { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG', qty: 120, avgPrice: 440, ltp: 455 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', qty: 60, avgPrice: 630, ltp: 648 },
  { symbol: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', qty: 90, avgPrice: 112, ltp: 118 },
  { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', qty: 75, avgPrice: 420, ltp: 408 },
]