import { Channel } from "stream-chat";

export const createVideoCallId = (channel?: Channel) => {
  if (!channel) return `random-call-id-${Math.random().toString(16).substring(2)}`;

  const validChannelId = channel.id?.split('!members-')[1]
  return validChannelId || '';
}