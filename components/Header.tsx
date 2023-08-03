"use client"
import { useEffect, useState } from 'react'

import SearchBar from './SearchBar'
import Link from 'next/link'

const Header = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const data = window.localStorage.getItem("Cart")
    if (data !== null) setCart(JSON.parse(data))
    console.log("useEffect", data)
  }, [])
  return (
    <header className="w-screen bg-blue-700 h-24">
      <div className="max-w-[990px] flex items-center justify-between mx-auto h-full px-4">
        <Link href="/">
          <span className="text-xl font-bold text-white">Ecommerce</span>
        </Link>
        <SearchBar />
        <nav className="flex list-none h-full items-center text-center text-white">
          <Link href="/cart"><li className=" hover:cursor-pointer " >Cart<span className="bg-gray-100 rounded-full text-black px-1 text-sm ml-1">{cart ? cart.length : 0}</span></li></Link>
        </nav>
      </div>
    </header>
  )
}

export default Header