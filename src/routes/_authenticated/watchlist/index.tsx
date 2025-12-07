import { createFileRoute } from '@tanstack/react-router'
import { Watchlist } from '@/features/watchlist'

export const Route = createFileRoute('/_authenticated/watchlist/')({
  component: Watchlist,
})