'use client'

import { useState } from 'react';
import { register } from '../api/user';

export default function Login() {
  const [username, setUsername] = useState('')

  const onRegister = () => register(username)
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>Login</h1>
      <div className='flex flex-col items-center justify-center'>
        <input
          className='border-2 border-gray-400 rounded-md p-2 m-2 text-black'
          type='text'
          onChange={onUsernameChange}
          placeholder='Username'
        />
        <button
          className='border-2 border-gray-400 rounded-md p-2 m-2'
          type='submit'
          onClick={onRegister}
        >
          Login
        </button>
      </div>
    </main>
  )
}
