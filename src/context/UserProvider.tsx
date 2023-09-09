'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoggedUser } from '../types'
import { getCookie, setCookie } from 'cookies-next';

interface UseUserReturn {
  user: LoggedUser | null;
  onLogin: (username: string) => void;
  setUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
}


const UserContext = createContext<UseUserReturn>({
  user: null,
  onLogin: () => { },
  setUser: () => { },
})

export const useUser = (): UseUserReturn => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserContext')
  }
  return context
}

const initialUser = {
  id: '',
  name: '',
  token: '',
}

export const UserProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const username = getCookie('username') || '';
  const [user, setUser] = useState<LoggedUser | null>({
    id: '',
    token: '',
    name: username,
  })

  const onLogin = async (username: string) => {
    const name = username.toLocaleLowerCase()
    setCookie('username', name)
    setUser({ id: '', token: '', name })
  }

  return (
    <UserContext.Provider value={{ onLogin, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
