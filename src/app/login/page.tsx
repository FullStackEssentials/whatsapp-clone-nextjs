'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/UserProvider'
import { getCookie } from 'cookies-next'
import { BirdChatSvg } from '../../components/svg/BirdChatSvg'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export default function Login() {
  const [username, setUsername] = useState('')
  const storedUsername = getCookie('username') || '';
  const { onLogin } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!storedUsername) return

    return router.push('/')
  }, [router, storedUsername])

  const handleLoginClick = () => onLogin(username)

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-whatsappBg2'>
      <h1 className='text-4xl font-bold text-white'>Login</h1>

      <BirdChatSvg />

      <div className='flex items-center justify-center'>
        <Input
          className='rounded-md p-2 m-2 text-white bg-whatsappBgDeep'
          type='text'
          onChange={onUsernameChange}
          placeholder='Username'
        />
        
        <Button className='bg-whatsAppPrimary rounded-sm' onClick={handleLoginClick}>Login</Button>
      </div>
    </main>
  )
}
