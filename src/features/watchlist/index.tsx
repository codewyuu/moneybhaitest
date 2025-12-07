import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WatchlistTable } from '@/features/dashboard/components/watchlist-table'
import { watchlist } from '@/features/dashboard/data/watchlist'
import { formatINR, formatPercent } from '@/features/dashboard/data/schema'
import { type PriceBasis } from '@/features/dashboard/components/watchlist-columns'

export function Watchlist() {
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

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Watchlist</h2>
            <p className='text-muted-foreground'>
              Track and analyze your favorite stocks
            </p>
          </div>
        </div>

        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist" className="space-y-4">
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
                  </div>

                  <div className='grid grid-cols-1 items-start gap-4 xl:grid-cols-3'>
                    <div className='xl:col-span-2'>
                      <WatchlistTable items={items} basis={basis} />
                    </div>
                    <div className='space-y-4'>
                      <Card>
                        <CardHeader>
                          <CardTitle>Market Summary</CardTitle>
                          <CardDescription>Session overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className='space-y-2 text-sm'>
                            <li className='flex justify-between'>
                              <span className='text-muted-foreground'>Advancers</span>
                              <span className='tabular-nums'>{advancers}</span>
                            </li>
                            <li className='flex justify-between'>
                              <span className='text-muted-foreground'>Decliners</span>
                              <span className='tabular-nums'>{decliners}</span>
                            </li>
                            <li className='flex justify-between'>
                              <span className='text-muted-foreground'>Avg change</span>
                              <span className='tabular-nums'>{formatPercent(avgChange)}</span>
                            </li>
                            <li className='flex justify-between'>
                              <span className='text-muted-foreground'>Active alerts</span>
                              <span className='tabular-nums'>{alerts}</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )
            })()}
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                  <CardDescription>Distribution across different sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 rounded bg-amber-500"></div>
                        <span>IT</span>
                      </div>
                      <span className="text-sm">42.9% (₹224,550)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 rounded bg-emerald-500"></div>
                        <span>Banking</span>
                      </div>
                      <span className="text-sm">28.3% (₹148,200)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 rounded bg-blue-500"></div>
                        <span>Oil & Gas</span>
                      </div>
                      <span className="text-sm">13.1% (₹68,700)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 rounded bg-purple-500"></div>
                        <span>Crypto</span>
                      </div>
                      <span className="text-sm">15.8% (₹82,900)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Portfolio risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Risk Score</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                        <span>6/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Diversification</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                        <span>7/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Volatility</span>
                      <span>12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Beta</span>
                      <span>1.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sharpe Ratio</span>
                      <span>1.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>MoneyBhai's Analysis</CardTitle>
                <CardDescription>AI-powered investment insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm italic">"Great work, your portfolio analysis shows good diversification across sectors. Consider adding more defensive stocks to balance your tech-heavy portfolio."</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            {/* Performance content */}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            {/* History content */}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}