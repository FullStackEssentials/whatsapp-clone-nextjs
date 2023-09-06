'use server'

import { StreamChat } from 'stream-chat'
import { STREAM_KEY, STREAM_SECRET } from '../../../constants'
import { NextResponse } from 'next/server'
import { InitialUser } from '../../../types'

const serverClient = StreamChat.getInstance(STREAM_KEY, STREAM_SECRET)

/**
 * /api/login
 * Logs in the user into the chat backend (Stream)
 */
export async function POST(
  req: Request,
) {
  const { user } = await req.json() as { user: InitialUser }

  try {
    const token = serverClient.createToken(user.id.toLocaleLowerCase())

    return NextResponse.json({ ...user, token })
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}