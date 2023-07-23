

import { IProductResponse } from "@types";
import Image from "next/image";


const Form = ({ type, product, submitting, setProduct, handleSubmit, handleOnChange, handleRemove, imageSrc }: IProductResponse) => {
    return (
        <div>
            <form id="upload-form" className="flex flex-col w-[800px] gap-4 mx-auto rounded-md"
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
                <span className="font-bold">Price:</span><input type="number" name="quantity" id="quantity"
                    className="rounded-md w-[600px] px-4 py-2"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                <span className="font-bold">Quantity:</span><input type="number" name="quantity" id="quantity"
                    className="rounded-md w-[600px] px-4 py-2"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
                <span className="font-bold">Image:</span>
                <input type="file" name="file" multiple onChange={handleOnChange} className="rounded-md w-[600px] px-4 py-2 border bg-white " />
                <div className="relative w-[600px]">
                    <nav className="flex gap-4">
                        {imageSrc.length > 0 ?
                            imageSrc.map((img, index) => (
                                <li className=" list-none w-[150px] text-right" key={index}>
                                    <span className="bg-white border border-black rounded-2xl px-2 inline-block hover:cursor-pointer" onClick={() => handleRemove(img)}>X</span>
                                    <Image src={img} alt="imageToBeUpload" height={150} width={150} className="" />
                                </li>
                            )) : null
                        }
                    </nav>
                </div>
                <button type="submit" className="border bg-gray-300 p-2 rounded-lg mt-4 w-1/5">
                    {submitting ? `${type}ing...` : type}
                </button>
            </form>
        </div>
    )
}

export default Form