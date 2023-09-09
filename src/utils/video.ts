import { Channel } from "stream-chat";

export const createVideoCallId = (channel?: Channel) => {
  if (!channel) {
    const randomNum = Math.random().toString(16).substring(2);
    return `random-call-id-${randomNum}`;
  }

  const validChannelId = channel.id?.split('!members-')[1]
  return validChannelId || '';
}