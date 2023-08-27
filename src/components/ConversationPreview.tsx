import { formatDistanceToNow } from 'date-fns';
import { ChannelResponse, UserResponse } from "stream-chat";
import { ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';
import { Avatar } from './Avatar';
import clsx from 'clsx';
import { CheckCheckIcon } from 'lucide-react'
import { useConversationRead } from '../hooks/useConversationRead';
import { useConversationPreview } from '../hooks/useConversationPreview';


export const ConversationPreview: React.FC<ChannelPreviewUIComponentProps<any>> = ({
  channel,
  setActiveChannel,
  latestMessage,
  displayImage = '',
  displayTitle = '',
  activeChannel,
  unread,
  lastMessage
}) => {
  const { client } = useChatContext();

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );

  const member = members[0]?.user as UserResponse || { id: 'deleted-user', unread_messages: 0, last_active: new Date()};

  const { isRead } = useConversationRead({ member, channel })
  const {
    isOnline,
    lastActiveTime,
    showReadMarker,
    showLastActiveTime,
    handleSetActiveChannel,
    isActiveConversation,
  } = useConversationPreview({
    channel,
    member,
    activeChannel,
    setActiveChannel,
    lastMessage
  })

  if (!member) return null;
  
  return (
    <div
      className={clsx('dark:bg-whatsappBg flex items-center p-4 dark:border-b-slate-700 border cursor-pointer', {
        'dark:bg-whatsappBgSelected bg-whatsappBgBorder': isActiveConversation,
      })}
      onClick={handleSetActiveChannel}
    >
      <Avatar
        className='mr-4'
        image={displayImage}
        name={displayTitle}
        online={isOnline}
      />
      <div className='flex-col w-full'>
        <div className='flex justify-between'>
          <div className='text-gray-400 dark:text-white text-base'>{displayTitle}</div>
          {showLastActiveTime && (
            <div className='text-gray-400 text-sm'>{lastActiveTime}</div>
          )}
        </div>

        <div className='flex'>
          {showReadMarker && (
            <CheckCheckIcon
              className={clsx('w-4 h-4', {
                'text-blue-500': isRead,
              })}
            />
          )}

          <div
            className='text-gray-400 text-sm pl-2'>
            {latestMessage || 'Send a message'}
          </div>
        </div>

        {Number(unread) > 0 && (
          <div className='text-gray-400 text-sm'>{unread}</div>
        )}
      </div>
    </div>
  )
}