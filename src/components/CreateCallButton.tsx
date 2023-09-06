
import React from 'react';
import { PhoneCallIcon } from 'lucide-react';
import { useVideoCall } from '../hooks/useVideoCall';
import { LoggedUser } from '../types';

interface Props {
  loggedUser: LoggedUser
}

export const CreateCallButton: React.FC<Props> = ({
  loggedUser
}) => {
  const {
    videoClient,
    currentCall,
    onCurrentVideoCallStart,
  } = useVideoCall(loggedUser)
  
  const disableCreateCall = Boolean(!videoClient || currentCall);

  return (
    <button
      disabled={disableCreateCall}
      onClick={onCurrentVideoCallStart}
      className='mt-2'
    >
      <PhoneCallIcon
        height={20}
        className={currentCall ? 'hidden' : ''}
      />
    </button>
  );
}