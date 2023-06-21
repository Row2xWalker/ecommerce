import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className="w-screen bg-blue-500 h-24">
        <div className="w-[1440px] flex items-center justify-between mx-auto h-full px-4">
            <span className="text-xl font-bold text-white">Ecommerce</span>
            <SearchBar />
            <nav className="w-1/3 flex list-none h-full items-center text-center text-white">
                <li className="w-full">Account</li>
                <li className="w-full">Cart</li>
                <li className="w-full">About</li>
            </nav>
        </div>
    </header>
  )
}

export default Header