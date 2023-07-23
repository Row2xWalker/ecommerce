"use client"
import { CategoryBar, ProductLists } from '@/components'
import { useRouter } from 'next/navigation'
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

  const handleOnClick = () => {

  }

  return (
    <main className="min-h-[1080px] ">
      <ProductLists products={products} />
    </main>
  )
}
