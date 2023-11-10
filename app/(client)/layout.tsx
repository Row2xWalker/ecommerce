import { Header, Footer } from '@/components'
import '../../styles/globals.css'
import { SearchProvider } from '@contexts/SearchContext'
import CartProvider from '@contexts/CartContext'

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
        <body className="flex flex-col bg-gray-100 text-gray-700 overflow-x-hidden font-sans main min-h-screen">
          <CartProvider>
            <Header />
            <main className="flex-1 md:w-1/2 mx-auto py-8">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </body>
      </html>
  )
}