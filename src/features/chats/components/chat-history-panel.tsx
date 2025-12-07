import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import data from '../data/convo.json'

type ChatHistoryPanelProps = {
  open: boolean
  onClose: () => void
}

export function ChatHistoryPanel({ open, onClose }: ChatHistoryPanelProps) {
  if (!open) return null
  return (
    <div
      aria-label="Chat history panel"
      className="absolute inset-y-20 end-4 z-30 w-[86%] sm:w-[420px] rounded-2xl border bg-black/10 dark:bg-white/10 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/15 border-black/10 dark:border-white/30 shadow-xl"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-medium">Chat History</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-xs px-2 py-1 rounded-md border bg-black/5 dark:bg-white/10"
        >
          Close
        </button>
      </div>
      <ScrollArea className="h-[calc(100%-48px)] px-2 pb-4">
        <SidebarMenu>
          {data.conversations.map((c) => (
            <SidebarMenuItem key={c.id}>
              <SidebarMenuButton asChild>
                <button type="button" className="w-full text-left">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={c.profile} alt={c.fullName} />
                      <AvatarFallback>{c.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{c.fullName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.messages?.[0]?.message ?? ''}</p>
                    </div>
                  </div>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </div>
  )
}

