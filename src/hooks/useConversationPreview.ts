import { formatDistanceToNow } from "date-fns";
import { ChannelResponse, UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";

interface Props {
  channel: ChannelResponse<any>;
  member: UserResponse;
  setActiveChannel?: React.Dispatch<React.SetStateAction<ChannelResponse<any> | undefined>>;
  activeChannel?: ChannelResponse<any>;
  lastMessage?: any;

}

/**
 * Hook to get data for a conversation preview
 */
export const useConversationPreview = ({
  channel,
  member,
  activeChannel,
  setActiveChannel,
  lastMessage
}: Props) => {
  const { client } = useChatContext();

  const date = new Date(member.last_active || '');
  const lastActiveTime = formatDistanceToNow(date, { addSuffix: true });

  const isActiveConversation = activeChannel?.id === channel.id;
  const isOnline = member.online


  const handleSetActiveChannel = () => {
    if (!setActiveChannel) return;
    setActiveChannel(channel);
  }

  const firstTimeConversation = Boolean(channel.state.last_message_at)
  const isLastMessageFromMe = lastMessage?.user?.id === client.userID

  const showLastActiveTime = firstTimeConversation && !isOnline
  const showReadMarker = firstTimeConversation && isLastMessageFromMe

  return {
    isOnline,
    lastActiveTime,
    showReadMarker,
    showLastActiveTime,
    isActiveConversation,
    handleSetActiveChannel,
  }
}
