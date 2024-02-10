'use client';
import '@styles/globals.css'
import { Session } from 'next-auth';
import  Provider  from "@components/Provider";

const RootLayout = ({
  children
}:{
  children:React.ReactElement
}) => {
  return (
    <html lang="en">
      <body className="main">
        <Provider>
          {children}
          </Provider>
      </body>
    </html>
  )
}

export default RootLayout