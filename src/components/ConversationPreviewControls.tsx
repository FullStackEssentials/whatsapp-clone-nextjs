import {
  AcceptCallButton,
  CallingState,
  CancelCallButton,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useChatContext } from 'stream-chat-react';

export const ConversationPreviewCallControls = () => {
  const { channel: activeChannel } = useChatContext();
  // the Call instance is passed down from StreamCallProvider located in StreamCall
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const callingToActiveChannel =
    activeChannel && call && activeChannel.cid === call.state.custom.channelCid;

  const isRinging = callingState === CallingState.RINGING;
  
  if (call && isRinging && !callingToActiveChannel) {
    return (
      <div className="rmc__channel-preview__call-controls">
        <AcceptCallButton
          onClick={(e) => {
            e.stopPropagation();
            call.join();
          }}
        />
        <CancelCallButton
          onClick={(e) => {
            e.stopPropagation();
            call.leave({ reject: true });
          }}
        />
      </div>
    );
  }
  return null;
};