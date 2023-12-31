import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeProvider'
import { NotificationsProvider } from '../context/NotificationsProvider'
import { UserProvider } from '../context/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Clone',
  description: 'Chat with your friends and family in real time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <UserProvider>
          <ThemeProvider>
            <NotificationsProvider>
              {children}
            </NotificationsProvider>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
