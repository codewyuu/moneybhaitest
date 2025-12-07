import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import data from '../data/convo.json'

export function ChatSidebar() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Chat History</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.conversations.map(({ id, profile, username, fullName, messages }) => {
              const last = messages[0]
              const preview = last?.message ?? ''
              return (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton variant='outline'>
                    <Avatar className='size-6'>
                      <AvatarImage src={profile} alt={username} />
                      <AvatarFallback>{username}</AvatarFallback>
                    </Avatar>
                    <span className='truncate'>{fullName}</span>
                    <span className='text-muted-foreground truncate'>{preview}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
