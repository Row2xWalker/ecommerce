"use client"
import { useCartContext } from '@contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

const ItemCard = ({ productDetails }) => {
  const { isInCart, addToCart } = useCartContext();
  return (
    <div className="transition duration-300 transform hover:shadow-md my-4">
      <div className="hover:cursor-pointer group" >
        <Link href={`products?id=${productDetails._id}`}>
          <div className="relative w-[200px] h-[200px]  group-hover:scale-105 mx-auto pt-4 transition-transform">
            <Image src={productDetails.images[0]} alt="displayProduct" fill={true} sizes="(min-width: 500px) 50vw, 100vw" />
          </div>
          <div className="pl-8 pt-4 ">
            <h2 className="text-xl font-bold group-hover:text-gray-700 group-hover:underline ">{productDetails.name}</h2>
            <p className="group-hover:text-gray-700  group-hover:underline "><span>Php </span>{productDetails.price}</p>
          </div>
        </Link>
      </div>
      <div className="my-4 w-full text-center hidden md:block ">
        <AddToCartButton productItem={productDetails} localQuantity={1} isInCart={isInCart} addToCart={addToCart} key={productDetails._id} />
      </div>
    </div>
  )
}

export default ItemCard