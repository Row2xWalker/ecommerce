"use client"
import { ProductLists } from '@/components'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data)
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <>
      {isLoading ?
        (<div className="h-screen flex justify-center items-center">
          <div className="pulsating-circle bg-gray-800 h-16 w-16 rounded-full animate-pulse">
          </div>
        </div>)
        : (<ProductLists products={products} />)
      }
    </>
  )

  // : ()
}
