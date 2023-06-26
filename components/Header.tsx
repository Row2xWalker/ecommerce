import SearchBar from './SearchBar'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-screen bg-blue-700 h-24">
        <div className="w-[1440px] flex items-center justify-between mx-auto h-full px-4">
            <Link href="/">
              <span className="text-xl font-bold text-white">Ecommerce</span>
            </Link>
            <SearchBar />
            <nav className="flex list-none h-full items-center text-center text-white">
                <li className="w-[200px]">Cart<span className="bg-gray-100 rounded-full text-black px-1 text-sm ml-1">45</span></li>
            </nav>
        </div>
    </header>
  )
}

export default Header