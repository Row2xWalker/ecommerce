'use client';
import '@styles/globals.css'
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react";

const RootLayout = ({
  children,
  session
}: {
  children: React.ReactElement,
  session: Session
}) => {
  return (
    <html lang="en">
      <body className="main">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout