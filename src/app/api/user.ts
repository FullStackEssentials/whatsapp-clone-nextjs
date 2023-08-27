'use server'

import { StreamChat } from 'stream-chat'
import { cookies } from 'next/headers'
import { InitialUser } from '../../types'
import { STREAM_KEY, STREAM_SECRET } from '../../constants'

const serverClient = StreamChat.getInstance(STREAM_KEY, STREAM_SECRET)

export const generateToken = async (user: InitialUser) => {
  const token = serverClient.createToken(user.id)
  return { ...user, token }
}

export const updateUser = async (userId: string, username: string) => {
  if (!userId || !username) return;

  return serverClient.upsertUser({
    id: userId,
    name: username,
    username
  })
}

export const register = async (username: string) => {
  cookies().set('username', username)
}

export const logout = async () => {
  cookies().delete('username')
}