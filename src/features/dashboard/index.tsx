import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { HoldingsTable } from './components/holdings-table'
import { holdings } from './data/holdings'
import { formatINR } from './data/schema'
import { WatchlistTable } from './components/watchlist-table'
import { watchlist } from './data/watchlist'
import { formatPercent } from './data/schema'
import { type PriceBasis } from './components/watchlist-columns'
import { getRouteApi } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { IconGroww, IconZerodha } from '@/assets/brand-icons'

const route = getRouteApi('/')

export function Dashboard() {
  const search = (() => {
    try {
      return route.useSearch() as { import?: boolean; source?: 'Zerodha' | 'Groww' }
    } catch {
      return {}
    }
  })()

  const [mode, setMode] = React.useState<'idle' | 'syncing' | 'ready'>(() =>
    localStorage.getItem('dashboardImported') === 'true' ? 'ready' : 'idle'
  )
  const [selectOpen, setSelectOpen] = React.useState(false)
  const [source, setSource] = React.useState<'Zerodha' | 'Groww' | null>(null)
  const steps = ['Syncing', 'Cleansing', 'Preparing List']
  const [stepIndex, setStepIndex] = React.useState(0)

  // Portal container: right-side content area
  const contentContainer = React.useMemo(() => {
    if (typeof document === 'undefined') return null
    return document.querySelector('[data-slot="sidebar-inset"]') as HTMLElement | null
  }, [])

  // Open import dialog via route search (?import=true) or start with source
  React.useEffect(() => {
    if (mode === 'ready') return
    if (search?.source) {
      setSource(search.source)
      setMode('syncing')
      setSelectOpen(false)
      return
    }
    if (search?.import) {
      setSelectOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search?.import, search?.source])

  React.useEffect(() => {
    if (mode !== 'syncing') return
    setStepIndex(0)
    const timers: number[] = []
    steps.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => setStepIndex(i), (i + 1) * 1200)
      )
    })
    timers.push(
      window.setTimeout(() => {
        localStorage.setItem('dashboardImported', 'true')
        setMode('ready')
      }, (steps.length + 1) * 1200)
    )
    return () => timers.forEach((t) => clearTimeout(t))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const startImport = () => setSelectOpen(true)
  const chooseSource = (s: 'Zerodha' | 'Groww') => {
    setSource(s)
    setSelectOpen(false)
    setMode('syncing')
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header fixed>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Import flow ===== */}
      {mode !== 'ready' ? (
        <Main className='flex min-h-[60vh] items-center justify-center'>
          {mode === 'idle' && (
            <div className='text-center'>
              <h2 className='mb-2 text-xl font-semibold'>Import your portfolio</h2>
              <p className='text-muted-foreground mb-4 text-sm'>
                Bring positions from your broker to see insights here.
              </p>
              <Button onClick={startImport} className='bg-blue-600 hover:bg-blue-700'>
                Import
              </Button>
              <img
                src='/images/thinking.png'
                alt='Thinking mascot'
                className='mx-auto mt-6 w-[448px] max-w-[85vw] h-auto object-contain'
              />
            </div>
          )}
          {mode === 'syncing' && (
            <div className='max-w-md w-full rounded-lg border bg-background p-5 shadow-sm'>
              <div className='text-center'>
                <p className='text-sm text-muted-foreground'>We are working on</p>
                <h3 className='mt-1 text-lg font-semibold'>
                  {source ?? 'Portfolio'} Sync
                </h3>
              </div>
              <div className='mt-4 flex items-center justify-center gap-6 text-sm'>
                {steps.map((label, i) => (
                  <span
                    key={label}
                    className={
                      i === stepIndex
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className='mt-4 border-t pt-4 text-center text-xs text-muted-foreground'>
                <p>This process can take 10–15 minutes.</p>
                <p>We will notify you via email when the process finishes.</p>
              </div>
            </div>
          )}
        </Main>
      ) : (
        /* ===== Main (ready) ===== */
        <Main>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Explore</h1>
            <div className='flex items-center space-x-2'>
              <Button
                variant='ghost'
                className='group h-11 pl-2 pr-4 rounded-full bg-white text-black border border-black/10 shadow-[0_6px_16px_rgba(0,0,0,0.10)] transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:bg-neutral-800 dark:text-white dark:border-white/10'
              >
                <span className='flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-black dark:ring-white/10 transition-transform group-hover:-translate-y-[0.5px]'>
                  <ArrowUpRight className='size-4' />
                </span>
                <span className='text-sm font-semibold tracking-wide'>Analyze</span>
              </Button>
            </div>
          </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full pb-2 flex justify-center md:justify-start md:overflow-x-auto'>
            <TabsList className='inline-flex h-9 md:h-10 w-[320px] md:w-fit items-center justify-center rounded-3xl bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/30 ring-1 ring-black/10 dark:ring-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)] p-1 gap-1 overflow-hidden'>
              <TabsTrigger
                value='overview'
                className='rounded-xl px-2 md:px-3 py-0.5 md:py-1.5 text-xs md:text-sm font-medium transition-colors data-[state=active]:bg-black/8 dark:data-[state=active]:bg-white/12 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-black/12 dark:data-[state=active]:border-white/25 data-[state=active]:ring-1 data-[state=active]:ring-inset data-[state=active]:ring-black/10 dark:data-[state=active]:ring-white/20 data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:data-[state=active]:shadow-[0_2px_8px_rgba(255,255,255,0.08)]'
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value='portfolio'
                className='rounded-xl px-2 md:px-3 py-0.5 md:py-1.5 text-xs md:text-sm font-medium transition-colors data-[state=active]:bg-black/8 dark:data-[state=active]:bg-white/12 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-black/12 dark:data-[state=active]:border-white/25 data-[state=active]:ring-1 data-[state=active]:ring-inset data-[state=active]:ring-black/10 dark:data-[state=active]:ring-white/20 data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:data-[state=active]:shadow-[0_2px_8px_rgba(255,255,255,0.08)]'
              >
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value='holdings'
                className='rounded-xl px-2 md:px-3 py-0.5 md:py-1.5 text-xs md:text-sm font-medium transition-colors data-[state=active]:bg-black/8 dark:data-[state=active]:bg-white/12 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-black/12 dark:data-[state=active]:border-white/25 data-[state=active]:ring-1 data-[state=active]:ring-inset data-[state=active]:ring-black/10 dark:data-[state=active]:ring-white/20 data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:data-[state=active]:shadow-[0_2px_8px_rgba(255,255,255,0.08)]'
              >
                Holdings
              </TabsTrigger>
              <TabsTrigger
                value='watchlist'
                className='rounded-xl px-2 md:px-3 py-0.5 md:py-1.5 text-xs md:text-sm font-medium transition-colors data-[state=active]:bg-black/8 dark:data-[state=active]:bg-white/12 data-[state=active]:backdrop-blur-md data-[state=active]:border data-[state=active]:border-black/12 dark:data-[state=active]:border-white/25 data-[state=active]:ring-1 data-[state=active]:ring-inset data-[state=active]:ring-black/10 dark:data-[state=active]:ring-white/20 data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:data-[state=active]:shadow-[0_2px_8px_rgba(255,255,255,0.08)]'
              >
                Watchlist
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Value
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>₹524,350</div>
                  <p className='text-muted-foreground text-xs'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Gain
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M16 3h5v5M8 3H3v5M3 16v5h5M16 21h5v-5' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-green-500'>₹74,350</div>
                  <p className='text-muted-foreground text-xs'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Risk Score</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>6/10</div>
                  <p className='text-muted-foreground text-xs'>
                    Moderate risk assessment
                  </p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Diversification
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>7/10</div>
                  <p className='text-muted-foreground text-xs'>
                    Good portfolio diversification
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader>
                  <CardTitle>Your Holdings</CardTitle>
                  <CardDescription>
                    Detailed view of all your investments
                  </CardDescription>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader>
                  <CardTitle>Top Performing Assets</CardTitle>
                  <CardDescription>
                    Your best performing investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='portfolio' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>₹524,350</div>
                  <p className='text-xs text-muted-foreground'>+2.5%</p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Gain</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-emerald-500'>₹74,350</div>
                  <p className='text-xs text-muted-foreground'>+16.5%</p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>6/10</div>
                  <p className='text-xs text-muted-foreground'>Moderate risk portfolio</p>
                </CardContent>
              </Card>
              <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Diversification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>7/10</div>
                  <p className='text-xs text-muted-foreground'>Good portfolio diversification</p>
                </CardContent>
              </Card>
            </div>
            <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.08)]'>
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Detailed view of all your investments</CardDescription>
              </CardHeader>
              <CardContent className='ps-2'>
                <Overview />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='holdings' className='space-y-4'>
            {(() => {
              const totalValue = holdings.reduce((sum, h) => sum + h.qty * h.ltp, 0)
              const totalPnl = holdings.reduce(
                (sum, h) => sum + (h.ltp - h.avgPrice) * h.qty,
                0
              )
              const positions = holdings.length

              const bySector: Record<string, number> = {}
              for (const h of holdings) {
                bySector[h.sector] = (bySector[h.sector] ?? 0) + h.qty * h.ltp
              }
              const sectorEntries = Object.entries(bySector)
              const totalSector = sectorEntries.reduce((s, [, v]) => s + v, 0)
              const sectorView = sectorEntries
                .sort((a, b) => b[1] - a[1])
                .map(([name, value]) => ({
                  name,
                  percent: totalSector ? Math.round((value / totalSector) * 1000) / 10 : 0,
                }))

              return (
                <>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Market Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{formatINR(totalValue)}</div>
                        <p className='text-muted-foreground text-xs'>Across all positions</p>
                      </CardContent>
                    </Card>
            <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Unrealized P&L</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {formatINR(totalPnl)}
                        </div>
                        <p className='text-muted-foreground text-xs'>Based on avg price vs LTP</p>
                      </CardContent>
                    </Card>
            <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Positions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{positions}</div>
                        <p className='text-muted-foreground text-xs'>Distinct holdings</p>
                      </CardContent>
                    </Card>
            <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Cash (placeholder)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{formatINR(0)}</div>
                        <p className='text-muted-foreground text-xs'>Link broker to sync</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <Card className='col-span-1 lg:col-span-5 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader>
                        <CardTitle>Your Holdings</CardTitle>
                        <CardDescription>Positions, value, and P&L</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <HoldingsTable />
                      </CardContent>
                    </Card>
          <Card className='col-span-1 lg:col-span-2 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader>
                        <CardTitle>Sector Allocation</CardTitle>
                        <CardDescription>Breakdown by market value</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className='space-y-3'>
                          {sectorView.map((s) => (
                            <li key={s.name} className='flex items-center justify-between'>
                              <span className='text-muted-foreground'>{s.name}</span>
                              <span className='tabular-nums text-sm'>{s.percent}%</span>
                            </li>
                          ))}
                          {sectorView.length === 0 && (
                            <li className='text-muted-foreground text-sm'>No data</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )
            })()}
          </TabsContent>
          <TabsContent value='watchlist' className='space-y-4'>
            {(() => {
              const [basis, setBasis] = React.useState<PriceBasis>('prevClose')
              const [listKey, setListKey] = React.useState<'all' | 'banking' | 'it' | 'core'>('all')
              const items = React.useMemo(() => {
                switch (listKey) {
                  case 'banking':
                    return watchlist.filter((i) => i.sector === 'Banking')
                  case 'it':
                    return watchlist.filter((i) => i.sector === 'IT')
                  case 'core':
                    return watchlist.filter((i) => (i.group ?? '') === 'Core')
                  default:
                    return watchlist
                }
              }, [listKey])
              const advancers = items.filter((i) => (i.changePct ?? 0) > 0).length
              const decliners = items.filter((i) => (i.changePct ?? 0) < 0).length
              const avgChange = items.length
                ? items.reduce((s, i) => s + (i.changePct ?? 0), 0) / items.length
                : 0
              const alerts = items.filter((i) => i.alert).length

              const bySector: Record<string, number> = {}
              for (const i of items) {
                bySector[i.sector] = (bySector[i.sector] ?? 0) + 1
              }
              const sectorView = Object.entries(bySector)
                .sort((a, b) => b[1] - a[1])
                .map(([name, count]) => ({ name, count }))

              return (
                <>
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-muted-foreground'>Pre-built:</span>
                      <select
                        className='rounded-md border px-2 py-1 text-sm'
                        value={listKey}
                        onChange={(e) => setListKey(e.target.value as any)}
                      >
                        <option value='all'>All</option>
                        <option value='banking'>Banking</option>
                        <option value='it'>IT</option>
                        <option value='core'>Core Group</option>
                      </select>
                      <span className='ms-4 text-sm text-muted-foreground'>Price basis:</span>
                      <select
                        className='rounded-md border px-2 py-1 text-sm'
                        value={basis}
                        onChange={(e) => setBasis(e.target.value as PriceBasis)}
                      >
                        <option value='prevClose'>Previous Close</option>
                        <option value='open'>Open</option>
                      </select>
                    </div>
                    <div>
                      <Button variant='outline' onClick={() => window.open('/watchlist', '_blank')}>Pop out</Button>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2'>
          <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Watchlist Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{items.length}</div>
                        <p className='text-muted-foreground text-xs'>Total tracked securities</p>
                      </CardContent>
                    </Card>
          <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Advancers / Decliners</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>
                          <span className='text-emerald-600'>{advancers}</span>
                          <span className='text-muted-foreground'> / </span>
                          <span className='text-red-600'>{decliners}</span>
                        </div>
                        <p className='text-muted-foreground text-xs'>Change since open</p>
                      </CardContent>
                    </Card>
          <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Average Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold ${avgChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {formatPercent(avgChange)}
                        </div>
                        <p className='text-muted-foreground text-xs'>Across watchlist</p>
                      </CardContent>
                    </Card>
          <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Active Alerts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{alerts}</div>
                        <p className='text-muted-foreground text-xs'>Price/condition alerts</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-5 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader>
                        <CardTitle>Your Watchlist</CardTitle>
                        <CardDescription>Track prices, ranges, and caps</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <WatchlistTable items={items} basis={basis} />
                      </CardContent>
                    </Card>
        <Card className='col-span-1 lg:col-span-2 rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
                      <CardHeader>
                        <CardTitle>By Sector</CardTitle>
                        <CardDescription>Count of items per sector</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className='space-y-3'>
                          {sectorView.map((s) => (
                            <li key={s.name} className='flex items-center justify-between'>
                              <span className='text-muted-foreground'>{s.name}</span>
                              <span className='tabular-nums text-sm'>{s.count}</span>
                            </li>
                          ))}
                          {sectorView.length === 0 && (
                            <li className='text-muted-foreground text-sm'>No data</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )
            })()}
          </TabsContent>
        </Tabs>
      </Main>
      )}

      {/* Source selection dialog */}
      <Dialog open={selectOpen} onOpenChange={setSelectOpen}>
        <DialogContent align='container' portalContainer={contentContainer}>
          <DialogHeader>
            <DialogTitle>Import from</DialogTitle>
            <DialogDescription>
              Choose the broker to import your holdings.
            </DialogDescription>
          </DialogHeader>
          <div className='mt-2 flex items-center justify-center gap-4'>
            <Button
              variant='ghost'
              size='sm'
              className='gap-2'
              onClick={() => chooseSource('Zerodha')}
            >
              <IconZerodha className='w-5 h-5' />
              <span>Zerodha</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='gap-2'
              onClick={() => chooseSource('Groww')}
            >
              <IconGroww className='w-5 h-5' />
              <span>Groww</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '/_authenticated/',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Portfolio',
    href: '/_authenticated/portfolio/',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Watchlist',
    href: '/_authenticated/watchlist/',
    isActive: false,
    disabled: false,
  },
]
