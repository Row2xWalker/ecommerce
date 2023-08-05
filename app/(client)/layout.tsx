import { Header, Footer } from '@/components'
import '../../styles/globals.css'
import { SearchProvider } from '@contexts/SearchContext'

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
    <SearchProvider>
      <html lang="en">
        <body className="main">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </SearchProvider>
  )
}