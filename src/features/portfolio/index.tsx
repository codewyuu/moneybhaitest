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
import { ArrowUpRight, TrendingUp } from 'lucide-react'

export function Portfolio() {
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
            <h2 className='text-2xl font-bold tracking-tight'>Portfolio</h2>
            <p className='text-muted-foreground'>
              Manage and track your investments
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='bg-white/10 backdrop-blur-md border-white/30 ring-1 ring-white/15 shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>₹524,350</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1 text-emerald-500'>
                <TrendingUp size={14} />
                +2.5%
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white/10 backdrop-blur-md border-white/30 ring-1 ring-white/15 shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-emerald-500'>₹74,350</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1 text-emerald-500'>
                <TrendingUp size={14} />
                +16.5%
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white/10 backdrop-blur-md border-white/30 ring-1 ring-white/15 shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>6/10</div>
              <p className='text-xs text-muted-foreground'>
                Moderate risk portfolio
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white/10 backdrop-blur-md border-white/30 ring-1 ring-white/15 shadow-[0_2px_10px_rgba(255,255,255,0.10)]'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Diversification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>7/10</div>
              <p className='text-xs text-muted-foreground'>
                Good portfolio diversification
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Button variant="default">Analyze with MoneyBhai</Button>
          <Button variant="outline">Add Holding</Button>
          <Button variant="outline">Import from Broker</Button>
          <Button variant="outline">Set Goals</Button>
        </div>

        <Card className='bg-white/8 backdrop-blur-md border-white/30 ring-1 ring-white/12 shadow-[0_2px_12px_rgba(255,255,255,0.08)]'>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>
              Detailed view of all your investments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between border-b border-white/12 pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-md p-2 bg-white/10 border border-white/20 backdrop-blur-sm'>
                    <span className='font-bold'>TCS</span>
                  </div>
                  <div>
                    <div className='font-medium'>Tata Consultancy Services</div>
                    <div className='text-xs text-muted-foreground'>IT Services</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='font-medium'>₹175,250</div>
                  <div className='text-xs text-emerald-500'>+12.5%</div>
                </div>
              </div>
              
              <div className='flex items-center justify-between border-b border-white/12 pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-md p-2 bg-white/10 border border-white/20 backdrop-blur-sm'>
                    <span className='font-bold'>HDFC</span>
                  </div>
                  <div>
                    <div className='font-medium'>HDFC Bank</div>
                    <div className='text-xs text-muted-foreground'>Banking</div>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='font-medium'>₹125,100</div>
                  <div className='text-xs text-emerald-500'>+8.3%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}