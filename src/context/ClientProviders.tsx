import { PropsWithChildren, useEffect, useState } from 'react';
import { Chat } from 'stream-chat-react';
import { LoadingIndicator, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { LoggedUser } from '../types';
import { useCreateChatClient } from '../hooks/useCreateChatClient';
import { STREAM_KEY } from '../constants';

export const ClientProviders = ({
  loggedUser,
  className,
  children,
}: PropsWithChildren<{ loggedUser: LoggedUser, className?: string }>) => {
  const { token, ...user } = loggedUser

  const chatClient = useCreateChatClient(loggedUser);
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!chatClient) return;

    const client = new StreamVideoClient({
      apiKey: STREAM_KEY,
      user,
      token,
    });
    setVideoClient(client);
    console.log('[Stream Video]: Connected!')

    return () => {
      client
        .disconnectUser()
        .catch((error) => console.error(`StreamVideo: Couldn't disconnect user`, error));
      setVideoClient(undefined);
    };
  }, [chatClient]);

  if (!chatClient || !videoClient) return <LoadingIndicator />;

  return (
    <Chat
      client={chatClient}
      theme={`${className} bg-whatsappBgChat`}
      customClasses={{
        channelList: 'bg-white dark:bg-whatsappBg ',
      }}
    >
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    </Chat>
  );
};