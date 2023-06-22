import React from 'react'

const DashboardSideBar = () => {
  return (
    <nav className='text-white text-center text-xl pt-[150px]'>
      <div>Hi Admin!</div>
      <ul className="flex flex-col gap-4 mt-[100px]">
        <li>Dashboard</li>
        <li>Products</li>
        <li>Orders</li>
        <li>Log Out</li>
      </ul>
    </nav>
  )
}

export default DashboardSideBar