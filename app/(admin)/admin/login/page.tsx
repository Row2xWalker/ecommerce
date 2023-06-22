
const page = () => {
  return (
    <div className="flex mx-auto h-screen items-center justify-center border border-black">
      <div className="h-[500px] w-[500px]">
        <form className="flex flex-col gap-4 items-center h-full w-full justify-center font-bold">
          <span className="mx-auto">
            Username:
            <input className="" />
          </span>
          <span className="mx-auto">
            Password: 
            <input  />
          </span>
          <button className="border border-black w-1/5 mx-auto">Login</button>
        </form>
      </div>
    </div>
  )
}

export default page