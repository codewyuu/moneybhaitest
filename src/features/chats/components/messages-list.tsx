import { cn } from '@/lib/utils'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export function MessagesList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className='mx-auto w-full max-w-3xl space-y-4'>
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            'flex',
            m.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'rounded-2xl px-4 py-3 text-sm shadow-sm ring-1',
              m.role === 'user'
                ? 'bg-primary text-primary-foreground ring-primary/20'
                : 'bg-black/6 dark:bg-white/10 text-foreground ring-black/10 dark:ring-white/15'
            )}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  )
}

