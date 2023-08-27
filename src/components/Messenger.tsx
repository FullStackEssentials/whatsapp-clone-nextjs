'use client'

import React, { useState } from 'react';
import { useConnectClient } from '../hooks/useConnectClient';
import { LoggedUser } from '../types';
import { Channel, Chat, Window, LoadingIndicator, MessageInput, MessageList, Thread } from 'stream-chat-react';
import { SidebarPreviews } from './SidebarPreviews';
import { ThemeType, useTheme } from './ThemeProvider';
import { Navbar } from './Navbar';
import { EmptyChat } from './EmptyChat';
import { ConversationHeader } from './ConversationHeader';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface Props {
  user: LoggedUser;
}

export const Messenger: React.FC<Props> = ({ user }) => {
  const { client } = useConnectClient(user)
  const { theme } = useTheme();
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [username, setUsername] = useState(user.name);

  const chatTheme = theme === ThemeType.LIGHT ? 'str-chat__theme-light' : 'str-chat__theme-dark ';

  if (!client || !client.user) return <LoadingIndicator />

  const handleToggleEditProfile = () => setIsOpenEditProfile(!isOpenEditProfile)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  const handleUserUpdate = async () => {
    if (!client.userID) return;

    await client.upsertUser({
      id: client.userID,
      name: username,
      username
    })
  }

  return (
    <>
      <Chat
        client={client}
        theme={`${chatTheme} bg-whatsappBgChat`}
        customClasses={{
          channelList: 'bg-white dark:bg-whatsappBg ',
        }}
      >
        <div className='w-full h-full flex'>
          <div className='max-w-sm w-full h-full'>
            <Navbar
              user={client.user}
              onToggleEditProfile={handleToggleEditProfile}
            />

            <SidebarPreviews
              user={client.user}
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


      <Dialog open={isOpenEditProfile} onOpenChange={handleToggleEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <div className="grid mt-4 w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />

              <Button variant="outline" onClick={handleUserUpdate}>Update</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </>
  );
}
