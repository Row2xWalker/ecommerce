"use client"
import { useSearchContext } from "@contexts/SearchContext"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const SearchBar = ({toggle}) => {
  // const { handleSearchChange } = useSearchContext();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    if (!search) {
      setSearchInput('');
    }
  }, [search]);
  
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault()
    router.push(`/?search=${searchInput}`);
    // handleSearchChange(searchInput);
  };

  return (
    <form className={`"flex-initial h-2/5 border rounded-md  ${toggle} "`}>
      <input type="text" placeholder="Search..." className="h-full w-5/6 px-2 text-black" onChange={handleInputChange} value={searchInput} />
      <button onClick={handleSearchButtonClick} className="w-1/6 text-white  h-full ">Search</button>
    </form>
  )
}

export default SearchBar