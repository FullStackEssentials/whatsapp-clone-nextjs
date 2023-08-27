'use client'

import React from 'react';
import { useConnectClient } from '../hooks/useConnectClient';
import { LoggedUser } from '../types';
import { Channel, Chat, Window, LoadingIndicator, MessageInput, MessageList, Thread } from 'stream-chat-react';
import { SidebarPreviews } from './SidebarPreviews';
import { ThemeType, useTheme } from './ThemeProvider';
import { Navbar } from './Navbar';
import { EmptyChat } from './EmptyChat';
import { ConversationHeader } from './ConversationHeader';

interface Props {
  user: LoggedUser;
}

export const Messenger: React.FC<Props> = ({ user }) => {
  const { client } = useConnectClient(user)
  const { theme } = useTheme();

  const chatTheme = theme === ThemeType.LIGHT ? 'str-chat__theme-light' : 'str-chat__theme-dark ';
  console.log(user.id)

  if (!client || !client.user) return <LoadingIndicator />

  return (
    <Chat
      client={client}
      theme={`${chatTheme} bg-whatsappBgChat`}
      customClasses={{
        channelList: 'bg-white dark:bg-whatsappBg ',
      }}
    >
      <div className='w-full h-full flex'>
        <div className='max-w-sm w-full h-full'>
          <Navbar user={client.user} />

          <SidebarPreviews
            user={user}
          />
        </div>

        <div className='w-full h-screen'>
          <Channel EmptyStateIndicator={EmptyChat}>
            <Window>
              <ConversationHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
}
