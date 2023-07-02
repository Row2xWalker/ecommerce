"use client";

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
  handleSubmit: any
}

const AdminAddProduct = ({ product, submitting, setProduct, handleSubmit }: IProductResponse) => {
  const [files, setFiles]: any = useState([]);
  const [message, setMessage] = useState("")
  const handleFile = (e: Event) => {
    let file = e.target?.files

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFiles([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }

    }

  }

  const removeImage = (i: string) => {
    setFiles(files.filter(x => x.name !== i));
  }

  return (
    <div>
      <form className="flex flex-col w-3/5 gap-4 mx-auto rounded-md font-bold"
        onSubmit={handleSubmit} encType="multipart/form-data">
        Name: <input type="text" name="name" id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        Category: <input type="text" name="category" id="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })} />
        Description: <input type="text" name="description" id="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })} />
        Quantity: <input type="number" name="quantity" id="quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
        Image: <input type="file" name="images[]" id="images" multiple onChange={handleFile} />
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file: any, key: string) => {
            return (
              <div key={key} className="overflow-hidden relative">
                <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"></i>
                <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
              </div>
            )
          })}
        </div>
        <button type="submit" className="border border-black px-2">Add Product</button>
      </form>
    </div>
  )
}

export default AdminAddProduct