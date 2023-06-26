import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <form>
            <input type="text" name="search" id="search" placeholder="Search..." className="w-[200px] px-2"/>
            <button className="px-4 text-white border border-black">Search</button>
        </form>
    </div>
  )
}

export default SearchBar