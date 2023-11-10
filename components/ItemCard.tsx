"use client"
import { useCartContext } from '@contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import { CldImage } from 'next-cloudinary';

const ItemCard = ({ productDetails }) => {

  const { isInCart, addToCart } = useCartContext();
  const extractImage = (imageUrl) =>{
    const newUrl = imageUrl.split("ecommerce_images/")
    return "ecommerce_images/"+newUrl[1];
  }
  return (
    <div className="transition duration-300 transform hover:shadow-md my-4">
      <div className="hover:cursor-pointer group" >
        <Link href={`products?id=${productDetails._id}`}>
          <div className="group-hover:scale-105 pt-4 transition-transform">
            {/* <Image src={productDetails.images[0]} alt="displayProduct" fill={true} sizes="(min-width: 500px) 50vw, 100vw" /> */}
            <div className="h-72 w-72 relative">
              <CldImage src={extractImage(productDetails.images[0])} alt="displayProduct" fill sizes='100'/>
             </div>
          </div>
          <div className="pt-4 ">
            <h2 className="text-xl font-bold group-hover:text-gray-700 group-hover:underline ">{productDetails.name}</h2>
            <p className="group-hover:text-gray-700  group-hover:underline "><span>&#8369; </span>{productDetails.price}</p>
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