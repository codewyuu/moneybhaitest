import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import { TradeTalkies } from '@/features/trade-talkies'
import { Polls } from '@/features/polls'

export function Social() {
  return (
    <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social</h2>
          <p className="text-muted-foreground">Trade Talkies and Moneypoly combined</p>
        </div>
      </div>

      <Tabs defaultValue="talkies" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="talkies">Trade Talkies</TabsTrigger>
          <TabsTrigger value="moneypoly">Moneypoly</TabsTrigger>
        </TabsList>
        <TabsContent value="talkies" className="space-y-4">
          <TradeTalkies />
        </TabsContent>
        <TabsContent value="moneypoly" className="space-y-4">
          <Polls />
        </TabsContent>
      </Tabs>
    </Main>
  )
}