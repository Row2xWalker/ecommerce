import React from 'react'
import '@styles/globals.css'

const RootLayout = ({
    children,
  }: {
    children: React.ReactElement
  }) => {
  return (
    <html lang="en">
      <body className="main">
        {children}
      </body>
    </html>
  )
}

export default RootLayout