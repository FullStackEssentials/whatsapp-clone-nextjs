import { useChatContext } from "stream-chat-react";
import { useNotifications } from "../context/NotificationsProvider";
import { Button } from "./ui/button";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

export const VideoCallNotification: React.FC = () => {
  const { client, setActiveChannel } = useChatContext();
  const { incomingCall, setIncomingCall, handleSetAcceptedCall } = useNotifications();
  const videoClient = useStreamVideoClient();

  const handleAcceptCall = async () => {
    if (!videoClient || !incomingCall?.id) return;

    const channel = await client.channel('messaging', `!members-${incomingCall.id}`)
    setActiveChannel(channel);
    channel.watch({ presence: true, state: true });
    
    handleSetAcceptedCall(incomingCall.id);
  }

  const handleRejectCall = () => setIncomingCall('', '')

  return (
    <div className='absolute left-1/2 bottom-4 w-96 z-10 text-center'>
      {incomingCall?.id && (
        <div className=' bg-whatsappBgDeep h-full p-4'>
          <p>A call from {incomingCall.callerName}</p>
          <div className='pt-2'>
            <Button onClick={handleAcceptCall}>Accept</Button>
            <Button variant='destructive' onClick={handleRejectCall}>Reject</Button>
          </div>
        </div>
      )}
    </div>
  )
} 