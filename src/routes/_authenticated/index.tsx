import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { Dashboard } from '@/features/dashboard'

const dashboardSearchSchema = z.object({
  import: z.boolean().optional().catch(false),
  source: z.enum(['Zerodha', 'Groww']).optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/')({
  validateSearch: dashboardSearchSchema,
  component: Dashboard,
})
