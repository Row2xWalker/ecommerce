"use client"
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import { useCartContext } from '@/contexts/CartContext'
import AddToCartButton from "@/components/AddToCartButton";


const ProductPage = () => {
  const searchParams = useSearchParams();
  const productItemId = searchParams.get("id");
  const { addToCart, isInCart } = useCartContext();

  const [localQuantity, setLocalQuantity] = useState(1)
  const [renderImage, setRenderImage] = useState()
  const [productItem, setProductItem] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    images: [],
    stocks: 0,
    price: 0
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`/api/product/${productItemId}`);
      const data = await response.json();

      setProductItem({
        _id: data._id,
        name: data.name,
        category: data.category,
        description: data.description,
        images: data.images,
        stocks: data.quantity,
        price: data.price
      })
    };
    if (productItemId) fetchProductDetails();
  }, [productItemId])


  const handleImageClick = (src: string) => {
    setRenderImage(src)
  }

  const onAddQuantityClick = () => {
    if (localQuantity < productItem.stocks) {
      setLocalQuantity(previous => previous + 1)
    }
  }
  const onMinusQuantityClick = () => {
    if (localQuantity > 1) {
      setLocalQuantity(previous => previous - 1)
    }
  }
  const onLocalQuantityChange = (e) => {
    if (e.target.value > 1 && e.target.value < productItem.stocks) {
      setLocalQuantity(parseInt(e.target.value))
    }
  }

  return (
    <>
      <div className="xl:flex md:py-8">
        <div className="w-full">
          <div className="relative h-[300px] md:h-[600px]"> {productItem.images.length > 0 ? (
            <Image src={renderImage || productItem.images[0]}  alt="product image" fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'  />
          ) : null}
          </div>
          <div className="flex  mt-2 space-x-2 ">
            {productItem.images.map((image, index) => {
              if(index<5){
              return(
              <div className="relative h-[150px] w-[165px] my-2 hover:cursor-pointer hover:scale-105" key={index}>
                <Image src={image} alt="product-image" onClick={() => handleImageClick(image)}  fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
              </div>
            )}})}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h1 className="text-2xl font-bold ">{productItem?.name}</h1>
          <h1>{productItem?.category}</h1>
          <h1 className="text-2xl font-bold pt-4">Php {productItem?.price}</h1>
          <h1 className="py-4"><span className="font-bold">Stocks:</span> {productItem.stocks}</h1>
          <hr />
          <div className="flex gap-4 py-4">
            <h1 className="font-bold">Quantity: </h1>
            <div className="border flex items-center">
              <button onClick={onMinusQuantityClick} className="border-r px-2 " disabled={isInCart(productItemId)}>-</button>
              <input type="number" name="localQuantity" onChange={onLocalQuantityChange} disabled={isInCart(productItemId)} className="h-full w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={localQuantity} />
              <button onClick={onAddQuantityClick} className="border-l px-2 " disabled={isInCart(productItemId)}>+</button>
            </div>
          </div>
          <AddToCartButton productItem={productItem} localQuantity={localQuantity} isInCart={isInCart} addToCart={addToCart} />

          <hr className="my-4" />
          <h1 className="font-bold text-xl ">Description</h1>
          <p className="mt-2">{productItem?.description}</p>
        </div>

      </div>
    </>
  )
}

export default ProductPage