"use client"
import { useContext, useEffect, useState } from 'react'

import SearchBar from './SearchBar'
import Link from 'next/link'
import { useCartContext } from '@contexts/CartContext'
const Header = () => {
  const { cartItems } = useCartContext();

  return (
    <header className="flex-none w-screen bg-gray-900 h-24 text-white">
      <div className="w-full md:w-1/2 flex items-center justify-between mx-auto h-full px-4">
        <Link href="/">
          <span className="text-xl font-bold">JnP Store</span>
        </Link>
        <SearchBar />
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/cart" className="hover:text-white">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span>Cart</span>
              <span className="bg-gray-400 rounded-full border border-white px-1 text-sm">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </nav>
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/cart" className="text-gray-400 hover:text-white">
            Cart
            <span className="bg-gray-400 rounded-full border border-white px-1 text-sm ml-1">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header