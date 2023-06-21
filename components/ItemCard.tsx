import Image from 'next/image'
import React from 'react'

const ItemCard = () => {
  return (
    <div className="w-48 h-full bg-blue-100">
        <div className="">
         <Image src="/sample.jpg" alt="" width={100} height={48}  />
        </div>
        <h2>Sample Item</h2>
        <p>Details</p>
        <p><span>$</span>100</p>
    </div>
  )
}

export default ItemCard