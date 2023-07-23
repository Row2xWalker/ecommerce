import React from 'react'

const SearchBar = () => {


  return (
    <div>
      <form>
        <input type="text" name="search" id="search" placeholder="Search..." className="w-[200px] px-2 rounded-md h-[35px]" />
        <button className="px-4 text-white border border-black rounded-md h-[35px]">Search</button>
      </form>
    </div>
  )
}

export default SearchBar