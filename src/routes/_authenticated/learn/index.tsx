import { createFileRoute } from '@tanstack/react-router'
import { Learn } from '@/features/learn'

export const Route = createFileRoute('/_authenticated/learn/')({
  component: Learn,
})