'use client'

import React from 'react';
import { LoggedUser } from '../types';
import { Channel, Window, LoadingIndicator, Thread, useChatContext, ChannelList } from 'stream-chat-react';
import { Navbar } from './Navbar';
import { EmptyChat } from './EmptyChat';
import { VideoCallNotification } from './VideoCallNotification';
import { Video } from './Video';
import { ChatView } from './ChatView';
import { useCalls } from '@stream-io/video-react-sdk';
import { NoSelectedChannel } from './NoSelectedChannel';
import { ConversationPreview } from './ConversationPreview';
import { EmptyConversations } from './EmptyConversations';
import { ChannelOptions, ChannelSort } from 'stream-chat';

interface Props {
  user: LoggedUser;
}

const options: ChannelOptions = { state: true, presence: true, limit: 100, watch: true };
const sort: ChannelSort = { last_message_at: -1 };

export const Messenger: React.FC<Props> = ({ user }) => {
  const { client: chatClient } = useChatContext();
  const calls = useCalls();

  if (!chatClient || !chatClient?.user) return <LoadingIndicator />;

  const isInACall = calls.length > 0 && calls.find((call) => call.currentUserId === user.id)

  return (
    <>
      <div className='w-full h-full flex'>
        <div className='max-w-sm w-full h-full'>
          <Navbar user={chatClient.user} />

          <div className='flex-col bg-whatsappBgDeep h-full'>
            <ChannelList
              filters={{
                members: {
                  $in: [user.id],
                },
              }}
              sort={sort}
              options={options}
              showChannelSearch
              EmptyStateIndicator={EmptyConversations}
              Preview={(props) => (
                <ConversationPreview key={props.key} {...props} />
              )}
            />

          </div>
        </div>

        <div className='w-full h-screen'>
          <Channel
            EmptyStateIndicator={EmptyChat}
            EmptyPlaceholder={<NoSelectedChannel />}
          >
            <Window>
              <Video />
              {!isInACall && <ChatView loggedUser={user} />}
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>

      <VideoCallNotification />
    </>
  );
}
