'use client'

import { Messenger } from "./Messenger"
import { useTheme } from "./ThemeProvider"
import { LoggedUser } from "../types"

interface Props {
  user: LoggedUser
}

export const ThemedApp: React.FC<Props> = ({ user }) => {
  const { themeClasses } = useTheme()

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${themeClasses}`}>
      <Messenger user={user} />
    </main>
  )
}