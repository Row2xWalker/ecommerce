"use client"
import SearchBar from './SearchBar'
import Link from 'next/link'
import { useCartContext } from '@contexts/CartContext'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react'
const Header = () => {
  const { cartItems } = useCartContext();
  const [searchBarToggle, setSearchBarToggle] = useState(false);
  return (
    <header className="bg-gray-900 h-24 text-white">
      <div className="2xl:w-1/2 flex items-center justify-between mx-auto h-full px-4">
        <Link href="/">
          <span className={`text-4xl font-bold ${searchBarToggle ? "md:block hidden" : null}`}>JnP Store</span>
        </Link>
        <SearchBar toggle={searchBarToggle ? "w-full md:w-1/2 " : "md:block w-1/2 hidden"} />
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/cart" className="hover:text-white hover:text-gray-400">
            <div className="flex items-center space-x-1 cursor-pointer">
              <AiOutlineShoppingCart size="24px" />
              <span className="rounded-full border border-white px-2 text-sm">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </nav>
        {/* if mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="pl-2 text-gray-400 hover:text-white rounded-md" onClick={() => { setSearchBarToggle(!searchBarToggle) }}>
            <AiOutlineSearch size="24px" />
          </button>
          <Link href="/cart" className="text-gray-400 hover:text-white">
            <AiOutlineShoppingCart size="24px" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header