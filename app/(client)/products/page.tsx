"use client"
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ProductPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const productId = searchParams.get("id")

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    images: [],
    quantity: 0
  });
  const [renderImage, setRenderImage] = useState()

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`/api/product/${productId}`);
      const data = await response.json();
      console.log(data)
      setProduct({
        name: data.name,
        category: data.category,
        description: data.description,
        images: data.images,
        quantity: data.quantity
      })
    };

    if (productId) fetchProductDetails();
  }, [productId])

  const handleImageClick = (src: string) => {
    setRenderImage(src)
  }

  return (
    <div className="max-w-[990px] mx-auto">
      <div className="flex min-h-[500px] bg-white ">
        <div className="pl-4 py-2">
          {product.images.map((image, index) => (
            <div className=" h-[100px] w-[100px] my-2 hover:cursor-pointer" key={index}>
              <Image src={image} width={450} height={450} alt="product image" className="min-h-[100px] max-h-[100px]" onClick={() => (handleImageClick(image))} />
            </div >
          ))}
        </div>
        <div className="py-4 pl-4">
          {product.images.length > 0 ? <Image src={renderImage || product.images[0]} width={450} height={450} alt="product image" className="max-h-[500px] min-h-[500px]" /> : null}
        </div>
        <div className="py-4 pl-8 break-words w-max[300px]">
          <h1 className="text-4xl font-bold">{product?.name}</h1>
          <h1>{product?.category}</h1>
          <h1 className="text-xl font-bold">Php {product?.quantity}</h1>
          <h1><span className="font-bold">In stock:</span> {product?.sold}</h1>
          <button className="border bg-gray-300 p-2 rounded-lg mt-4">Add to Cart</button>
        </div>
      </div>
      <div className="bg-white min-h-[500px] pt-12">
        <h1 className="pl-[104px] font-bold text-xl">Description</h1>
        <p className="pl-[104px] pt-4">{product?.description}</p>
      </div>
    </div>
  )
}

export default ProductPage