'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/UserProvider'
import { getCookie } from 'cookies-next'
import { ChatSvg } from '../../components/svg/ChatSvg'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export default function Login() {
  const [username, setUsername] = useState('')
  const storedUsername = getCookie('username') || '';
  const { onLogin, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!storedUsername) return

    return router.push('/')
  }, [router, storedUsername])

  const handleLoginClick = () => onLogin(username)

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-whatsappBg'>
      <h1 className='text-4xl font-bold'>Login</h1>

      <ChatSvg />

      <div className='flex items-center justify-center'>
        <Input
          className='rounded-md p-2 m-2'
          type='text'
          onChange={onUsernameChange}
          placeholder='Username'
        />
        
        <Button onClick={handleLoginClick}>Login</Button>
      </div>
    </main>
  )
}
