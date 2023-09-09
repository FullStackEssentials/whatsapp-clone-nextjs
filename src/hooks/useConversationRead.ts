import { useState, useEffect } from "react";
import { UserResponse, ChannelResponse, Event } from "stream-chat";
import { useChatContext } from "stream-chat-react";

interface Props {
  member: UserResponse;
  channel: ChannelResponse<any>
}

/**
 * Hook to check if a conversation is read or not
 * It updates the state when a new message is sent or when a message is * read in real-time
 */
export const useConversationRead = ({ member, channel }: Props) => {
  const { client } = useChatContext();

  const unreadMemberCount = channel.state.read[member.id]?.unread_messages;
  const [isRead, setIsRead] = useState<boolean>(unreadMemberCount === 0)

  /**
   * When a message is read, the conversation is marked as read
   */
  useEffect(() => {
    if (!client) return

    const handleMessageRead = ({ user }: Event) => {
      if (user?.id !== member?.id) return
      setIsRead(true)
    }

    client.on('message.read', handleMessageRead)

    return () => {
      client.off('message.read', handleMessageRead)
    }
  }, [client, member?.id])


  /**
   * When a new message is sent, the conversation is marked as unread
   */
  useEffect(() => {
    if (!client) return

    const handleNewMessageSent = () => setIsRead(false)

    client.on('message.new', handleNewMessageSent)

    return () => {
      client.off('message.new', handleNewMessageSent)
    }
  }, [client])

  return { isRead }
}