import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/stores/auth-store'
import { usePointsStore } from '@/stores/points-store'
import * as React from 'react'

type Market = {
  id: string
  question: string
  category: string
  resolveDate: string
  yesPrice: number
  noPrice: number
  change24h: number
  volume24h: number
}

const COST_CREATE_POLL = 10

export function Polls() {
  const { auth } = useAuthStore()
  const { points, spend } = usePointsStore()

  const [createOpen, setCreateOpen] = React.useState(false)
  const [creating, setCreating] = React.useState(false)
  const [markets, setMarkets] = React.useState<Market[]>([
    {
      id: 'nifty-25k',
      question: 'Will Nifty cross 25,000 by Dec 31, 2024?',
      category: 'Indices',
      resolveDate: '2024-12-31',
      yesPrice: 0.65,
      noPrice: 0.35,
      change24h: 0.04,
      volume24h: 15432,
    },
    {
      id: 'sector-q1',
      question: 'Tech will outperform in Q1 2025?',
      category: 'Sectors',
      resolveDate: '2025-03-31',
      yesPrice: 0.42,
      noPrice: 0.58,
      change24h: -0.02,
      volume24h: 8021,
    },
  ])

  const [form, setForm] = React.useState({
    question: '',
    category: 'Indices',
    resolveDate: '',
  })

  const isFreeUser = !auth.user || auth.user.role?.includes('user')
  const canCreate = !isFreeUser || points >= COST_CREATE_POLL

  const onSubmitCreate = async () => {
    setCreating(true)
    try {
      if (isFreeUser) {
        const ok = spend(COST_CREATE_POLL)
        if (!ok) {
          setCreating(false)
          return
        }
      }
      const newMarket: Market = {
        id: `poll-${Date.now()}`,
        question: form.question.trim(),
        category: form.category,
        resolveDate: form.resolveDate || new Date().toISOString().slice(0, 10),
        yesPrice: 0.5,
        noPrice: 0.5,
        change24h: 0,
        volume24h: 0,
      }
      setMarkets((prev) => [newMarket, ...prev])
      setCreateOpen(false)
      setForm({ question: '', category: 'Indices', resolveDate: '' })
    } finally {
      setCreating(false)
    }
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col'>
        <div className='relative -mx-1 px-1.5 md:mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl w-full'>
          <div className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)] p-4 sm:p-6 md:p-8'>
            <div className='flex flex-wrap items-end justify-between gap-3'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>Markets</h2>
                <p className='text-muted-foreground text-sm'>Polymarket-style polls with YES/NO pricing</p>
              </div>
              <div className='flex items-center gap-2'>
                <span className='rounded-lg border border-black/10 dark:border-white/20 bg-white/50 dark:bg-slate-900/30 backdrop-blur px-2.5 py-1 text-xs'>Bhai Points: <span className='font-semibold'>{points}</span></span>
                <Button variant='default' className='w-full sm:w-auto' onClick={() => setCreateOpen(true)}>
                  Create Poll{isFreeUser ? ` · ${COST_CREATE_POLL} BP` : ''}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mt-3 sm:mt-4 mb-4 overflow-x-auto no-scrollbar whitespace-nowrap -mx-2 px-2 rounded-xl border border-white/30 dark:border-white/20 bg-white/55 dark:bg-slate-900/30 backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                <TabsTrigger value="all" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>All Markets</TabsTrigger>
                <TabsTrigger value="market" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>Indices</TabsTrigger>
                <TabsTrigger value="sector" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>Sectors</TabsTrigger>
                <TabsTrigger value="company" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>Companies</TabsTrigger>
                <TabsTrigger value="economy" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>Economy</TabsTrigger>
                <TabsTrigger value="crypto" className='flex-shrink-0 px-2.5 py-1 text-xs sm:text-sm'>Crypto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {markets.map((m) => (
                    <Card key={m.id} className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='p-4 pb-2'>
                        <CardTitle className='text-base'>{m.question}</CardTitle>
                        <CardDescription className='text-xs'>Category: {m.category}</CardDescription>
                      </CardHeader>
                      <CardContent className='p-4 pt-2'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3'>
                            <div className='text-xs text-muted-foreground'>YES</div>
                            <div className='text-lg font-semibold'>{Math.round(m.yesPrice * 100)}%</div>
                          </div>
                          <div className='rounded-lg border border-red-500/30 bg-red-500/10 p-3'>
                            <div className='text-xs text-muted-foreground'>NO</div>
                            <div className='text-lg font-semibold'>{Math.round(m.noPrice * 100)}%</div>
                          </div>
                        </div>
                        <div className='mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground'>
                          <div>24h: <span className={m.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>{(m.change24h * 100).toFixed(0)}%</span></div>
                          <div>Volume: {(m.volume24h).toLocaleString()}</div>
                          <div>Resolve: {m.resolveDate}</div>
                        </div>
                        <div className='mt-3 flex gap-2'>
                          <Button variant='outline' size='sm'>Buy YES</Button>
                          <Button variant='outline' size='sm'>Buy NO</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Other tab contents would go here */}
            </Tabs>
          </div>
        </div>
      </Main>
      {/* Create Poll Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create a new poll</DialogTitle>
            <DialogDescription>
              {isFreeUser
                ? `Free users spend ${COST_CREATE_POLL} Bhai Points per poll.`
                : 'Pro/Admin users can create polls without spending points.'}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-3'>
            <Label htmlFor='question'>Question</Label>
            <Input id='question' placeholder='e.g. Will Nifty cross 25,000 by year end?' value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} />
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
              <SelectTrigger><SelectValue placeholder='Select category' /></SelectTrigger>
              <SelectContent>
                <SelectItem value='Indices'>Indices</SelectItem>
                <SelectItem value='Sectors'>Sectors</SelectItem>
                <SelectItem value='Companies'>Companies</SelectItem>
                <SelectItem value='Economy'>Economy</SelectItem>
                <SelectItem value='Crypto'>Crypto</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor='resolveDate'>Resolve date</Label>
            <Input id='resolveDate' type='date' value={form.resolveDate} onChange={(e) => setForm((f) => ({ ...f, resolveDate: e.target.value }))} />
            {isFreeUser && (
              <div className='rounded-md border p-2 text-xs'>
                Balance: <span className='font-medium'>{points} Bhai Points</span> · Cost: <span className='font-medium'>{COST_CREATE_POLL} BP</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button disabled={!canCreate || creating || !form.question.trim()} onClick={onSubmitCreate}>
              {isFreeUser ? `Create • ${COST_CREATE_POLL} BP` : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
