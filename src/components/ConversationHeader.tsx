import { useChatContext } from "stream-chat-react";
import { Event } from "stream-chat";
import { Avatar } from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <div
        className='flex items-center justify-between px-4 py-3 border-b border-whatsappBorder dark:bg-whatsappBg2 h-16'
      >
        <div className='flex items-center'>
          <Avatar
            image={member.image || ''}
            name={member.name || ''}
            online={online}
          />
          <div className='ml-4'>
            <p className='text-whatsappFgPrimaryStrong font-bold'>{member.name}</p>
            {
              online ?
                <p className='text-whatsappFgPrimaryLight text-sm'>Online</p>
                :
                <p className='text-whatsappFgSecondary text-sm'>Last online {lastActiveTime}</p>
            }
          </div>
        </div>

        <div className='flex items-center text-whatsappFgPrimaryStrong'>
          <button className='mr-6'>
            <SearchIcon height={20} />
          </button>

          <button className='mr-2'>
            <MoreVerticalIcon height={20} />
          </button>
        </div>
      </div>
    </div>
  )
}