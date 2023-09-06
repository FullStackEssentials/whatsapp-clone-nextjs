'use client'

import { createContext, useContext, useState } from 'react';

interface NotificationsProviderReturn {
  incomingCall: {
    id: string;
    callerName: string;
  };
  acceptedCallId?: string;
  setIncomingCall: (incomingCallId: string, callerId: string) => void;
  handleSetAcceptedCall: (callId: string) => void;
}

interface NotificationsProviderProps { 
  children: React.ReactNode;
}

const NotificationsContext = createContext<NotificationsProviderReturn>({
  incomingCall: {
    id: '',
    callerName: '',
  },
  setIncomingCall: () => { },
  handleSetAcceptedCall: () => { },
});

export const useNotifications = (): NotificationsProviderReturn => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
}) => {
  const [incomingCallId, setIncomingCallId] = useState('');
  const [callerName, setCallerName] = useState<string>('');
  const [acceptedCallId, setAcceptedCallId] = useState<string>();

  const setIncomingCall = (incomingCallId: string, callerId: string) => {
    setIncomingCallId(incomingCallId);
    setCallerName(callerId);
    setAcceptedCallId('')
  }

  const incomingCall = {
    id: incomingCallId,
    callerName,
  }

  const handleSetAcceptedCall = (callId: string) => {
    setAcceptedCallId(callId);
    setIncomingCallId('');
    setCallerName('');
  }

  return (
    <NotificationsContext.Provider value={{
      incomingCall,
      acceptedCallId,
      setIncomingCall,
      handleSetAcceptedCall,
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}