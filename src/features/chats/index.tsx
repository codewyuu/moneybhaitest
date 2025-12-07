import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ChatInputBar } from './components/chat-input-bar'
import { MessagesList } from './components/messages-list'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { ChatHistorySheet } from './components/chat-history-sheet'
import { ChatHistoryInline } from './components/chat-history-inline'
import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

export function Chats() {
  const [historyOpen, setHistoryOpen] = useState(false)
  const isMobile = useIsMobile()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!scrollRef.current || messages.length === 0) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    setMessages((m) => [...m, userMsg])

    const assistantText = await invokeAssistant(text)
    const botMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: assistantText,
      createdAt: Date.now(),
    }
    setMessages((m) => [...m, botMsg])
  }

  const invokeAssistant = async (prompt: string): Promise<string> => {
    return Promise.resolve('This is a placeholder response while integration is pending.')
  }
  return (
    <>
      <Header
        fixed
        renderSidebarTrigger={false}
        leftAction={
          <Button
            variant="outline"
            size="icon"
            className="bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/10 dark:border-white/20"
            aria-label="Open chat history"
            onClick={() => (isMobile ? setHistoryOpen((prev) => !prev) : undefined)}
            onMouseEnter={() => {
              if (!isMobile) {
                if (closeTimerRef.current) {
                  window.clearTimeout(closeTimerRef.current)
                  closeTimerRef.current = null
                }
                setHistoryOpen(true)
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                closeTimerRef.current = window.setTimeout(() => {
                  setHistoryOpen(false)
                  closeTimerRef.current = null
                }, 120)
              }
            }}
            onFocus={() => !isMobile && setHistoryOpen(true)}
            onBlur={() => !isMobile && setHistoryOpen(false)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        }
      >
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fluid className='relative flex min-h-0 h-full overflow-hidden px-0 py-0'>
        {!isMobile && (
          <ChatHistoryInline
            open={historyOpen}
            onOpenChange={(open) => {
              if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current)
                closeTimerRef.current = null
              }
              setHistoryOpen(open)
            }}
          />
        )}
        <div className='relative flex flex-1 min-h-0 flex-col'>
          <div
            ref={scrollRef}
            className={cn(
              'flex-1 p-6',
              messages.length === 0
                ? 'overflow-hidden grid place-items-center'
                : cn('overflow-auto', !isMobile ? 'pb-28' : 'pb-6')
            )}
          >
            {messages.length === 0 ? (
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-xl font-semibold'>Chat</h2>
                <p className='text-muted-foreground text-sm'>Start a conversation with Moneybh.Ai.</p>
              </div>
            ) : (
              <MessagesList messages={messages} />
            )}
          </div>
          {/* Match inline panel width so input bar doesn’t get overlapped */}
          <ChatInputBar onSubmit={sendMessage} leftOffset={!isMobile && historyOpen ? 316 : 0} />
        </div>
        {isMobile && (
          <ChatHistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />
        )}
      </Main>
    </>
  )
}
