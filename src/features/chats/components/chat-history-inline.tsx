import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import data from '../data/convo.json'

type ChatHistoryInlineProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const PANEL_WIDTH = 300

export function ChatHistoryInline({ open, onOpenChange }: ChatHistoryInlineProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <motion.aside
          key="chat-history-inline"
          initial={{ width: 0, x: -24, opacity: 0 }}
          animate={{ width: PANEL_WIDTH, x: 0, opacity: 1 }}
          exit={{ width: 0, x: -24, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-y-0 start-0 z-20 h-full overflow-hidden border-r border-black/12 dark:border-white/20 bg-black/8 dark:bg-white/12 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/20"
          onMouseEnter={() => onOpenChange?.(true)}
          onMouseLeave={() => onOpenChange?.(false)}
          aria-label="Chat history"
        >
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium">Conversations</h3>
            <p className="text-xs text-muted-foreground">You with Moneybh.Ai</p>
          </div>
          <ScrollArea className="h-[calc(100%-48px)] px-2 pb-4">
            <SidebarMenu className="gap-2">
              {data.conversations.map((c) => (
                <SidebarMenuItem key={c.id}>
                  <SidebarMenuButton asChild size="lg" className="rounded-lg px-3 py-2">
                    <button type="button" className="w-full text-left">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium">{c.fullName}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">Moneybh.Ai: {c.messages?.[0]?.message ?? ''}</p>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
