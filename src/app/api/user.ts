'use server'

import { StreamChat } from 'stream-chat'
import { cookies } from 'next/headers'
import { User } from '../../types'
import { STREAM_KEY, STREAM_SECRET } from '../../constants'

const serverClient = StreamChat.getInstance(STREAM_KEY, STREAM_SECRET)

export const generateToken = async (user: User) => {
  const token = serverClient.createToken(user.id)
  return { ...user, token }
}

export const getUsers = () => {
  const users = [
    { id: 'tiago', name: 'Tiago', image: 'https://ui-avatars.com/api/?name=tiago' },
    { id: 'mariana', name: 'Mariana', image: 'https://ui-avatars.com/api/?name=mariana' },
  ]

  return users
}

export const register = async (username: string) => {
  cookies().set('username', username)
}

export const logout = async () => {
  cookies().delete('username')
}