import * as React from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import Dock, { type DockItemData } from './dock'
import { AppsOverlay } from './apps-overlay'

// Dock uses actual image icons from `/public/images`

export function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [appsOpen, setAppsOpen] = React.useState(false)

  const items: DockItemData[] = [
    {
      icon: <img src="/images/explore.png" alt="Explore" className="h-[85%] w-[85%] object-contain" draggable={false} />,
      label: 'Explore',
      onClick: () => navigate({ to: '/' }),
      active: pathname === '/',
    },
    {
      icon: <img src="/images/chat.png" alt="Chat" className="h-[85%] w-[85%] object-contain" draggable={false} />,
      label: 'Chat',
      onClick: () => navigate({ to: '/chats' }),
      active: pathname.startsWith('/chats'),
    },
    {
      icon: <img src="/images/tradetalkies.png" alt="Trade Talkies" className="h-[85%] w-[85%] object-contain" draggable={false} />,
      label: 'Trade Talkies',
      onClick: () => navigate({ to: '/trade-talkies' }),
      active: pathname.startsWith('/trade-talkies'),
    },
    {
      icon: <img src="/images/settings.png" alt="Profile" className="h-[85%] w-[85%] object-contain" draggable={false} />,
      label: 'Profile',
      onClick: () => navigate({ to: '/settings' }),
      active: pathname.startsWith('/settings'),
    },
  ]

  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 ${appsOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <Dock
        items={items}
        className="pointer-events-auto"
        collapsed={appsOpen}
        onSwipeUp={() => setAppsOpen(true)}
      />
      <AppsOverlay
        open={appsOpen}
        onClose={() => setAppsOpen(false)}
        items={[
          { label: 'Explore', to: '/', imageSrc: '/images/explore.png' },
          { label: 'Chat', to: '/chats', imageSrc: '/images/chat.png' },
          { label: 'Trade Talkies', to: '/trade-talkies', imageSrc: '/images/tradetalkies.png' },
          { label: 'Moneypoly', to: '/moneypoly', imageSrc: '/images/moneypoly.png' },
          { label: 'Learn', to: '/learn', imageSrc: '/images/learn.png' },
          { label: 'Profile', to: '/settings', imageSrc: '/images/settings.png' },
        ]}
        onSelect={(to) => {
          navigate({ to })
          setAppsOpen(false)
        }}
      />
    </div>
  )
}