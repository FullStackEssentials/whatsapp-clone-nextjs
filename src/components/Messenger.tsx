'use client'

import React, { useState } from 'react';
import { useConnectClient } from '../hooks/useConnectClient';
import { LoggedUser, User } from '../types';
import { Channel, Chat, Window, ChannelHeader, LoadingIndicator, MessageInput, MessageList, Thread } from 'stream-chat-react';
import { UsersList } from './UsersList';
import { ThemeType, useTheme } from './ThemeProvider';
import { Navbar } from './Navbar';
import { UserSearchBar } from './UserSearchBar';

interface Props {
  user: LoggedUser
  users: User[]
}

export const Messenger: React.FC<Props> = ({ user, users }) => {
  const [addedUsers, setAddedUsers] = useState<User[]>([])
  const [searchText, setSearchText] = useState<string>('')

  const { client } = useConnectClient(user)
  const { theme } = useTheme();

  const chatTheme = theme === ThemeType.LIGHT ? 'str-chat__theme-light' : 'str-chat__theme-dark';

  const handleUserAdd = (user: User) => () => setAddedUsers([...addedUsers, user])

  const handleUserRemove = (user: User) => () => setAddedUsers(addedUsers.filter(u => u.id !== user.id))

  const onStartConversation = async () => {
    const channel = await client?.channel('messaging', {
      members: [user.id, ...addedUsers.map(u => u.id)],
    })
    await channel?.watch()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)

  const selectedUsersString = addedUsers.map(u => u.name).join(', ')
  const hasUsersSelected = addedUsers.length > 0

  const searchedUsers = users.filter((u) => searchText && u.name.toLowerCase().includes(searchText.toLowerCase()))

  if (!client) return <LoadingIndicator />

  return (
    <Chat
      client={client}
      theme={chatTheme}
      customClasses={{
        channelList: 'bg-whatsappBg',
      }}
    >
      <div className='w-full h-full flex'>
        <div className='max-w-sm w-full h-full'>
          <Navbar user={user} />

          <UserSearchBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />

          {hasUsersSelected && (
            <button
              className='mt-4 text-green-500 text-lg border-rose-50 border p-2 rounded'
              onClick={onStartConversation}
            >
              Start conversation with {selectedUsersString}
            </button>)}

          <UsersList
            user={user}
            contacts={searchedUsers}
            addedUsers={addedUsers}
            onUserAdd={handleUserAdd}
            onUserRemove={handleUserRemove}
          />
        </div>

        <div className='w-full h-screen '>
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
}
