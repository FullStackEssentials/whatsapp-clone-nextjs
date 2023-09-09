'use client'

import { Messenger } from "./Messenger"
import { ThemeType, useTheme } from "../context/ThemeProvider"
import { ClientProviders } from "../context/ClientProviders"
import clsx from "clsx"
import { useUser } from "../context/UserProvider"
import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"

export const AuthenticatedApp = () => {
  const { themeClasses, theme } = useTheme()
  const storedUsername = getCookie('username') || '';
  const { user, setUser } = useUser()
  const router = useRouter()

  const chatTheme = theme === ThemeType.LIGHT ? 'str-chat__theme-light' : 'str-chat__theme-dark ';

  useEffect(() => {
    if (storedUsername) return

    return router.push('/login')
  }, [router, storedUsername])

  useEffect(() => {
    if (!user?.name) return
    if (user?.id) return

    const getStreamUser = async (username: string) => {
      const userData = {
        id: username,
        name: username,
        image: `https://getstream.io/random_png/?id=${username}&name=${username}`,
      }

      try {
        const loggedUser = await axios.post('/api/login', { user: userData })

        setUser(loggedUser.data)
      } catch (error) {
        console.log(error)
      }
    }

    getStreamUser(user?.name)
  }, [setUser, user])

  if (!user?.id) return

  return (
    <main className={clsx('flex min-h-screen flex-col items-center justify-between', themeClasses)}>
      <ClientProviders
        loggedUser={user}
        className={chatTheme}
      >
        <Messenger user={user} />
      </ClientProviders>
    </main >
  )
}