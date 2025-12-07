import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { WatchItem } from '../data/schema'
import { formatINR, formatCompact } from '../data/schema'

type Props = {
  item: WatchItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveNote?: (symbol: string, note: string) => void
}

export function InstrumentDetailsDialog({ item, open, onOpenChange, onSaveNote }: Props) {
  const [note, setNote] = React.useState<string>('')

  React.useEffect(() => {
    setNote(item?.note ?? '')
  }, [item])

  if (!item) return null

  const ohlc = {
    open: item.open ?? item.ltp,
    high: item.dayHigh,
    low: item.dayLow,
    close: item.prevClose ?? item.ltp,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Badge variant='outline'>{item.symbol}</Badge>
            <span>{item.name}</span>
          </DialogTitle>
          <DialogDescription>
            {item.exchange ?? 'NSE'} • {item.sector} • Market Cap {formatCompact(item.marketCap)}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='text-muted-foreground text-xs'>OHLC</div>
            <ul className='mt-1 space-y-1 text-sm'>
              <li className='flex justify-between'><span>Open</span><span className='tabular-nums'>{formatINR(ohlc.open)}</span></li>
              <li className='flex justify-between'><span>High</span><span className='tabular-nums'>{formatINR(ohlc.high)}</span></li>
              <li className='flex justify-between'><span>Low</span><span className='tabular-nums'>{formatINR(ohlc.low)}</span></li>
              <li className='flex justify-between'><span>Prev Close</span><span className='tabular-nums'>{formatINR(ohlc.close)}</span></li>
            </ul>
          </div>
          <div>
            <div className='text-muted-foreground text-xs'>Market Stats</div>
            <ul className='mt-1 space-y-1 text-sm'>
              <li className='flex justify-between'><span>LTP</span><span className='tabular-nums'>{formatINR(item.ltp)}</span></li>
              <li className='flex justify-between'><span>Volume</span><span className='tabular-nums'>{formatCompact(item.volume)}</span></li>
              {typeof item.oi === 'number' && (
                <li className='flex justify-between'><span>Open Interest</span><span className='tabular-nums'>{formatCompact(item.oi)}</span></li>
              )}
              <li className='flex justify-between'><span>52W</span><span className='tabular-nums'>{formatINR(item.week52Low)} – {formatINR(item.week52High)}</span></li>
            </ul>
          </div>
        </div>

        <div className='mt-4'>
          <div className='text-muted-foreground text-xs'>Market Depth (mock)</div>
          <div className='mt-2 grid grid-cols-2 gap-2 text-sm'>
            <div>
              <div className='font-medium'>Bids</div>
              <ul className='mt-1 space-y-1'>
                {[1,2,3,4,5].map((lvl) => (
                  <li key={`bid-${lvl}`} className='flex justify-between'>
                    <span>Qty {1000 * lvl}</span>
                    <span className='tabular-nums'>{formatINR((item.ltp - 0.5 * lvl))}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className='font-medium'>Asks</div>
              <ul className='mt-1 space-y-1'>
                {[1,2,3,4,5].map((lvl) => (
                  <li key={`ask-${lvl}`} className='flex justify-between'>
                    <span>Qty {1000 * lvl}</span>
                    <span className='tabular-nums'>{formatINR((item.ltp + 0.5 * lvl))}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='text-muted-foreground text-xs'>Notes</div>
          <textarea
            className='mt-1 w-full rounded-md border p-2 text-sm'
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='Add a trading note for this instrument'
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (item && onSaveNote) onSaveNote(item.symbol, note)
              onOpenChange(false)
            }}
          >
            Save Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}