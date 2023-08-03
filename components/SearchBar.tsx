

const SearchBar = () => {


  return (
    <form className="w-[450px] h-[30px] border rounded-md">
      <input type="text" name="search" id="search" placeholder="Search..." className="h-full w-5/6 px-2 " />
      <button className="w-1/6 text-white  h-full ">Search</button>
    </form>
  )
}

export default SearchBar