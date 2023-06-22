import { Header } from '@/components'
import React from 'react'
import '../../styles/globals.css'
const AdminLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <html lang="en">
      <body className="main">
        {children}
      </body>
    </html>
  )
}

export default AdminLayout