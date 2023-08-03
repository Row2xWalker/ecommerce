"use client"
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ProductPage = () => {
  const searchParams = useSearchParams();
  const productItemId = searchParams.get("id")
  const [cart, setCart] = useState([])
  const [localQuantity, setLocalQuantity] = useState(1)
  const [renderImage, setRenderImage] = useState()
  const [isInCart, setIsInCart] = useState(false)
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
      console.log("rowdata", data)
      setProductItem({
        id: data._id,
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

  useEffect(() => {
    const data = window.localStorage.getItem("Cart")
    const initializeLocalCart = (data) => {
      setCart(JSON.parse(data))

      const cartCopy = [...JSON.parse(data)]
      console.log("Cart Copy", cartCopy)
      const existingItem = cartCopy.find(item => item.cartItem.id == productItemId)
      if (existingItem) {
        setIsInCart(true)
      }
    }
    if (data !== null) initializeLocalCart(data)
  }, [isInCart])

  const handleImageClick = (src: string) => {
    setRenderImage(src)
  }

  const addToCartClick = (productToAdd) => {
    const cartCopy = [...cart];
    const existingItemIndex = cartCopy.findIndex((item) => item.cartItem.id === productItemId);

    if (existingItemIndex !== -1) {
      // Item already exists in cart, update the quantity
      cartCopy[existingItemIndex].quantity += productToAdd.quantity;
    } else {
      // Item does not exist in cart, add it to the cart
      cartCopy.push({
        cartItem: productToAdd,
        quantity: localQuantity,
        total: localQuantity * productItem.price,
      });
    }

    // Calculate the total price of the cart
    const cartTotal = cartCopy.reduce((total, item) => total + item.total, 0);

    setCart(cartCopy);
    setIsInCart(true);
    localStorage.setItem("Cart", JSON.stringify(cartCopy));
    localStorage.setItem("CartTotal", JSON.stringify(cartTotal)); // Store the cart total separately
  };

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
    <div className="max-w-[990px] mx-auto">
      <div className="flex min-h-[500px] bg-white ">
        <div className="pl-4 py-2">
          {productItem.images.map((image, index) => (
            <div className=" h-[100px] w-[100px] my-2 hover:cursor-pointer" key={index}>
              <Image src={image} width={450} height={450} alt="product image" className="min-h-[100px] max-h-[100px]" onClick={() => (handleImageClick(image))} />
            </div >
          ))}
        </div>
        <div className="py-4 pl-4">
          {productItem.images.length > 0 ? <Image src={renderImage || productItem.images[0]} width={450} height={450} alt="product image" className="max-h-[500px] min-h-[500px]" /> : null}
        </div>
        <div className="py-4 pl-8 break-words w-max[300px]">
          <h1 className="text-4xl font-bold">{productItem?.name}</h1>
          <h1>{productItem?.category}</h1>
          <h1 className="text-xl font-bold">Php {productItem?.price}</h1>
          <h1>Stocks: {productItem.stocks}</h1>
          <div className="flex gap-4">
            <h1>Quantity: </h1>
            <div className="border w-[70px]">
              <button className="w-[25px]" onClick={onMinusQuantityClick} disabled={isInCart}>-</button>
              <input type="number" name="localQuantity" onChange={onLocalQuantityChange} disabled={isInCart} className=" w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={localQuantity} />
              <button className="w-[25px]" onClick={onAddQuantityClick} disabled={isInCart}>+</button>
            </div>
          </div>
          <button className="border text-white bg-blue-500 p-2 rounded-lg mt-4 hover:text-black hover:bg-blue-200" onClick={() => addToCartClick(productItem)} disabled={isInCart}>{isInCart ? `Added in the cart` : `Add to Cart`}</button>

        </div>
      </div>
      <div className="bg-white min-h-[500px] pt-12">
        <h1 className="pl-[104px] font-bold text-xl">Description</h1>
        <p className="pl-[104px] pt-4">{productItem?.description}</p>
      </div>
    </div>
  )
}

export default ProductPage