import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { LoggedUser } from "../types";
import { useChatContext } from "stream-chat-react";
import { Event, EventTypes } from "stream-chat";
import { useNotifications } from "../context/NotificationsProvider";
import { createVideoCallId } from "../utils/video";

interface StarCallEvent extends Event {
  callId?: string,
  callerName?: string,
  callerId?: string,
}

/**
 * Hook is used to get the current call and start a new call
 */
export const useVideoCall = (loggedUser: LoggedUser) => {
  const videoClient = useStreamVideoClient();

  const { client, channel } = useChatContext();
  const { setIncomingCall, acceptedCallId } = useNotifications();

  const [currentCall, setCurrentCall] = useState<Call | null>(null);

  const callId = createVideoCallId(channel)

  useEffect(() => {
    if (!client) return

    const handleStartCallNotification = ({
      callId = '',
      callerName = '',
      callerId = '',
    }: StarCallEvent) => {
      if (callerId === loggedUser.id) return;
      const isAlreadyInCall = currentCall?.id === callId;
      if (isAlreadyInCall) return;

      setIncomingCall(callId, callerName);
    }

    client.on('call-start', handleStartCallNotification)

    return () => {
      client.off('call-start', handleStartCallNotification)
    }
  }, [client, currentCall?.id, loggedUser.id, setIncomingCall])

  useEffect(() => {
    if (!videoClient || !currentCall) return;

    return () => {
      setCurrentCall(null);
    }

  }, [currentCall, videoClient])

  useEffect(() => {
    if (!videoClient || !acceptedCallId) return;

    const joinCall = async () => {
      console.log('joinCall', acceptedCallId);

      const call = videoClient.call('default', acceptedCallId);
      await call.join();

      setCurrentCall(call);

      // clean notification
      setIncomingCall('', '');
    }

    joinCall();
  }, [acceptedCallId, setIncomingCall, videoClient])

  const handleCallEnd = async () => {
    if (!currentCall) return;

    await currentCall.leave();
    setCurrentCall(null);
  }

  const handleCurrentVideoCallStart = async () => {
    if (!videoClient) return;

    if (currentCall) return handleCallEnd();

    const call = videoClient.call('default', callId);
    await call.join({ create: true });

    if (!channel) return

    await channel.sendEvent({
      type: 'call-start' as EventTypes,
      callId,
      callerName: loggedUser.name,
      callerId: loggedUser.id,
    });

    await channel.sendMessage({
      text: `📞 Hey I started a call! Let's talk!`,
    })

    setCurrentCall(call);
  }

  const handleVideoCallEnd = () => setCurrentCall(null);

  return {
    videoClient,
    currentCall,
    onCurrentVideoCallStart: handleCurrentVideoCallStart,
    onCurrentVideoCallEnd: handleVideoCallEnd,
  }
}