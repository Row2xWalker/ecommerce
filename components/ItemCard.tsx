import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
const ItemCard = ({ productDetails }) => {
  return (
    <div className="bg-white  border ">
      <div className=" hover:cursor-pointer group" >
        <Link href={`products?id=${productDetails._id}`}>
          <Image src={productDetails.images[0]} alt="" width={200} height={200} className="group-hover:text-blue-600 group-hover:underline hover:scale-105 min-h-[300px] max-h-[300px] mx-auto pt-4" />
          <div className="pl-8 pt-4 ">
            <h2 className="text-xl font-bold group-hover:text-blue-600 group-hover:underline ">{productDetails.name}</h2>
            <p className="group-hover:text-blue-600 group-hover:underline "><span>Php </span>{productDetails.price}</p>
          </div>
        </Link>
      </div>
      <div className="my-4 w-full text-center ">
        <button className="bg-blue-600 px-2 border border-black w-3/4  text-blue-50 text-xl hover:bg-blue-300 hover:text-black rounded-md ">Add to Cart</button>
      </div>
    </div>
  )
}

export default ItemCard