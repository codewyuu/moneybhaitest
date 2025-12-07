import { createFileRoute } from '@tanstack/react-router'
import { Polls } from '@/features/polls'

export const Route = createFileRoute('/_authenticated/polls/')({
  component: Polls,
})

