import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import data from '../data/convo.json'

type ChatHistorySheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatHistorySheet({ open, onOpenChange }: ChatHistorySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        // Glassmorphic styling to match Dock theme
        className="inset-y-0 start-0 h-full w-[86%] sm:max-w-sm border-e bg-black/10 dark:bg-white/10 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/15 border border-black/10 dark:border-white/30 text-neutral-800 dark:text-white"
      >
        <SheetHeader className="px-4 py-3">
          <SheetTitle className="text-base">Conversations</SheetTitle>
          <p className="text-xs text-muted-foreground">You with Moneybh.Ai</p>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-56px)] px-2 pb-6">
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
      </SheetContent>
    </Sheet>
  )
}
