import { createFileRoute } from '@tanstack/react-router'
import { Social } from '@/features/social'

export const Route = createFileRoute('/_authenticated/social/')({
  component: Social,
})