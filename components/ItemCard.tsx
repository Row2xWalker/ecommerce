import Image from 'next/image'
import React from 'react'

const ItemCard = () => {
  return (
    <div className="bg-gray-100 border border-gray-400 pb-2 hover:border-blue-700  hover:scale-105 hover:cursor-pointer" >
          <Image src="/sample.jpg" alt="" width={250} height={250} className="mx-auto" />
          <div className="pl-[50px]">
            <h2 className="text-xl">Sample Item</h2>
            <p><span>$</span>100</p>
            <p>Details</p>
          </div>
        
    </div>
  )
}

export default ItemCard