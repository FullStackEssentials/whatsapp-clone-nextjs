'use client'

import { Messenger } from "./Messenger"
import { useTheme } from "./ThemeProvider"
import { LoggedUser, User } from "../types"

interface Props {
  users: User[]
  user: LoggedUser
}

export const Root: React.FC<Props> = ({ user, users }) => {
  const { themeClasses } = useTheme()

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${themeClasses}`}
    >
      <Messenger
        user={user}
        users={users}
      />
    </main >
  )
}