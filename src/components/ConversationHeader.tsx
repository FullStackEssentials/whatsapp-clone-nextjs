import { useChatContext } from "stream-chat-react";
import { Event } from "stream-chat";
import { Avatar } from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";


export const ConversationHeader: React.FC = () => {
  const { channel, client } = useChatContext()

  const member = Object.values(channel?.state.members || {})
    .filter(({ user }) => user?.id !== client.userID)[0].user;

  const [isOnline, setIsOnline] = useState<boolean>(!!member?.online)

  useEffect(() => {
    if (!client) return

    const handlePresenceChanged = ({ user }: Event) => {
      console.log('user.presence.changed', user)

      if (user?.id !== member?.id) return

      setIsOnline(!!user?.online)
    }

    client.on('user.presence.changed', handlePresenceChanged)

    return () => {
      client.off('user.presence.changed', handlePresenceChanged)
    }
  }, [client, member?.id])

  if (!channel || !member) return null

  const date = new Date(member.last_active as string);
  const lastActiveTime = formatDistanceToNow(date, { addSuffix: true });
  const online = isOnline || member.online

  const handleDeleteChannel = () => channel.delete()

  return (
    <div>
      <div
        className='flex items-center justify-between px-4 py-3 border-b border-whatsappBorder dark:bg-whatsappBg2 bg-whatsappBg2Light h-16'
      >
        <div className='flex items-center'>
          <Avatar
            image={member.image || ''}
            name={member.name || ''}
            online={online}
          />
          <div className='ml-4'>
            <p className='dark:text-whatsappFgPrimaryStrong font-bold'>{member.name}</p>
            {
              online ?
                <p className='text-whatsappFgPrimaryLight text-sm'>Online</p>
                :
                <p className='text-whatsappFgSecondary text-sm'>Last online {lastActiveTime}</p>
            }
          </div>
        </div>

        <div className='flex items-center dark:text-whatsappFgPrimaryStrong'>
          <button className='mr-6'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SearchIcon height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dark:bg-whatsappBg2 p-4 mr-6'>
                <DropdownMenuLabel>Search in Conversation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Input placeholder='Search for Messages' className="dark:bg-whatsappBg" />
              </DropdownMenuContent>
            </DropdownMenu>
          </button>

          <button className='mr-2'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVerticalIcon height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dark:bg-whatsappBg2 p-4 mr-6'>
                <DropdownMenuItem>Report {member.name}</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteChannel}
                  className="text-red-400">Delete Conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </button>
        </div>
      </div>
    </div>
  )
}