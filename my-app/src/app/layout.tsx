// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import AuthSessionProvider from '@/components/providers/SessionProvider'

export const metadata: Metadata = {
  title: 'My App',
  description: 'NextAuth v4 with Google OAuth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}