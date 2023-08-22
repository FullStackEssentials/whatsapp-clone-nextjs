import { formatDistanceToNow } from 'date-fns';
import { ChannelPreviewUIComponentProps } from 'stream-chat-react';
import { Avatar } from './Avatar';
import { User } from '../types';
import clsx from 'clsx';
import { CheckCheckIcon } from 'lucide-react'

interface Props extends ChannelPreviewUIComponentProps<any> {
  contacts: User[];
}

export const UserPreview: React.FC<Props> = ({
  channel,
  setActiveChannel,
  displayImage = '',
  displayTitle = '',
  activeChannel,
  lastMessage,
  unread,
}) => {
  const members = Object.values(channel.state.members)
  const user = members[0].user;
  if (!user) return null;

  const date = new Date(user.last_active as string);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  const isActiveConversation = activeChannel?.id === channel.id;

  const handleSetActiveChannel = () => {
    if (!setActiveChannel) return;
    setActiveChannel(channel);
  }
  console.log(lastMessage)
  return (
    <div
      className={clsx('bg-whatsappBg flex items-center p-4 border-b border-whatsappBgBorder cursor-pointer', {
        'bg-whatsappBgSelected': isActiveConversation,
      })}
      onClick={handleSetActiveChannel}
    >
      <Avatar
        className='mr-4'
        image={displayImage}
        name={displayTitle}
      />
      <div className='flex-col w-full'>
        <div className='flex justify-between'>
          <div className='text-gray-400 dark:text-white text-base'>{displayTitle}</div>
          <div className='text-gray-400 text-sm'>{relativeTime}</div>
        </div>
        <div className='text-gray-400 text-sm'>{user?.online}</div>

        <div className='flex'>
          <CheckCheckIcon
            className={clsx('w-4 h-4', {
              'text-blue-500': lastMessage?.status === 'received'
            })}
          />
          {lastMessage && (
            <div
              className='text-gray-400 text-sm pl-2'
              dangerouslySetInnerHTML={lastMessage.html ? { __html: lastMessage.html } : undefined}
            />)}
        </div>
        {Number(unread) > 0 && <div className='text-gray-400 text-sm'>{unread}</div>}
      </div>
    </div>
  )
}