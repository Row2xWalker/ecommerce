"use client"
import { useCartContext } from '@contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
// import { CldImage } from 'next-cloudinary';

const ItemCard = ({ productDetails }) => {

  const { isInCart, addToCart } = useCartContext();
  return (
    <div className="transition duration-300 transform my-4">
      <div className="mb-4 hover:cursor-pointer group" >
        <Link href={`products?id=${productDetails._id}`}>
          <div className=" pt-4 transition-transform">
            <div className="w-full h-72 relative">
              <Image src={productDetails.images[0]} alt="displayProduct" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'/>
             </div>
          </div>
          <div className="pt-4 ">
            <h2 className="text-xl font-bold group-hover:text-gray-700 group-hover:underline ">{productDetails.name}</h2>
            <p className="group-hover:text-gray-700  group-hover:underline "><span>&#8369;</span> {productDetails.price}</p>
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