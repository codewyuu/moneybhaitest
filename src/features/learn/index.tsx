import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Video, FileText, Clock, TrendingUp } from 'lucide-react'

export function Learn() {
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
            <div className='flex flex-wrap items-end justify-between gap-2'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>Learn</h2>
                <p className='text-muted-foreground'>
                  Expand your financial knowledge
                </p>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mt-3 sm:mt-4 mb-4 rounded-xl border border-white/30 dark:border-white/20 bg-white/55 dark:bg-slate-900/30 backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                <TabsTrigger value="all">All Content</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
              </TabsList>
          
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Course</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>4 hours</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Investing Fundamentals</CardTitle>
                    <CardDescription>Learn the basics of investing in stocks, bonds, and ETFs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span>Beginner</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Learning</Button>
                  </CardFooter>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Article</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>10 min read</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Understanding Market Volatility</CardTitle>
                    <CardDescription>How to navigate market ups and downs with confidence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-1 h-4 w-4" />
                      <span>Intermediate</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Read Now</Button>
                  </CardFooter>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">Video</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>25 minutes</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Technical Analysis Explained</CardTitle>
                    <CardDescription>Master chart patterns and technical indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Video className="mr-1 h-4 w-4" />
                      <span>Advanced</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Watch Now</Button>
                  </CardFooter>
                  </Card>
                </div>
            
                <h3 className="text-xl font-semibold mt-6 mb-3">Popular Topics</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <BookOpen className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium">Stock Investing</h4>
                    <p className="text-sm text-muted-foreground">12 resources</p>
                  </CardContent>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <BookOpen className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium">Crypto Basics</h4>
                    <p className="text-sm text-muted-foreground">8 resources</p>
                  </CardContent>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <BookOpen className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium">Retirement Planning</h4>
                    <p className="text-sm text-muted-foreground">15 resources</p>
                  </CardContent>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <BookOpen className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium">Tax Strategies</h4>
                    <p className="text-sm text-muted-foreground">9 resources</p>
                  </CardContent>
                  </Card>
                </div>
            
                <h3 className="text-xl font-semibold mt-6 mb-3">Continue Learning</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Course</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-primary">75% complete</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Portfolio Diversification</CardTitle>
                    <CardDescription>Strategies to balance risk and reward</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                  </Card>
              
                  <Card className='rounded-xl bg-black/8 dark:bg-white/12 backdrop-blur-md border border-black/12 dark:border-white/25 ring-1 ring-black/10 dark:ring-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.10)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.10)]'>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Course</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-primary">30% complete</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Options Trading</CardTitle>
                    <CardDescription>Master advanced options strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Other tab contents would go here */}
            </Tabs>
          </div>
        </div>
      </Main>
    </>
  )
}
