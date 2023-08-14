"use client"
import { useSearchContext } from "@contexts/SearchContext"
import { useState } from "react";

const SearchBar = () => {
  const { handleSearchChange } = useSearchContext();

  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault()
    handleSearchChange(searchInput);
  };

  return (
    <form className="w-[450px] h-[30px] border rounded-md hidden md:block ">
      <input type="text" placeholder="Search..." className="h-full w-5/6 px-2 text-black" onChange={handleInputChange} value={searchInput} />
      <button onClick={handleSearchButtonClick} className="w-1/6 text-white  h-full ">Search</button>
    </form>
  )
}

export default SearchBar