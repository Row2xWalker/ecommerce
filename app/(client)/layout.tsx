import { Header, Footer } from '@/components'
import '../../styles/globals.css'

export const metadata = {
  title: 'Ecommerce',
  description: 'Sample Ecommerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="main">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}