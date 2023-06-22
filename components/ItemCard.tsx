import Image from 'next/image'
import React from 'react'

const ItemCard = () => {
  return (
    <div className="bg-red-100 border border-gray-400" >
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