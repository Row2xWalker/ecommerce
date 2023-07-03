"use client";

import Image from "next/image";
import { useState } from "react";

interface IProductResponse {
  product: {
    name: string,
    category: string,
    description: string,
    images: string[],
    quantity: number
  },
  submitting: boolean,
  setProduct: any,
  handleSubmit: Function
}

const AdminAddProduct = ({ product, submitting, setProduct, handleSubmit }: IProductResponse) => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent: Event) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  return (
    <div>
      <form className="flex flex-col w-[800px] gap-4 mx-auto rounded-md"
        onSubmit={handleSubmit} encType="multipart/form-data">
        <span className="font-bold">Name:</span> <input type="text" name="name" id="name"
          className="rounded-md w-[600px] px-4 py-2"
          placeholder="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <span className="font-bold">Category:</span><input type="text" name="category" id="category"
          className="rounded-md w-[600px] px-4 py-2"
          placeholder="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })} />
        <span className="font-bold">Description:</span><input type="text" name="description" id="description"
          className="rounded-md w-[600px] px-4 py-2"
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        <span className="font-bold">Quantity:</span><input type="number" name="quantity" id="quantity"
          className="rounded-md w-[600px] px-4 py-2"
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
        <span className="font-bold">Image:</span><input type="file" name="file" onChange={handleOnChange} className="rounded-md w-[600px] px-4 py-2 border bg-white " />
        {imageSrc ? (<Image src={imageSrc} alt="imageToBeUpload" height={200} width={200} />) : (null)}
        <button type="submit" className="border border-black px-2 w-1/5">Add Product</button>
      </form>
    </div>
  )
}

export default AdminAddProduct