"use client"
import { ProductLists } from '@/components'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <main className="h-min-screen bg-white w-[990px] mx-auto">
      <ProductLists products={products} />
    </main>
  )
}
