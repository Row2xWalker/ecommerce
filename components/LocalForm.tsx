

import { IProductResponse } from "@types";
import Image from "next/image";

import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';

const LocalForm = ({ type, product, submitting, setProduct, handleSubmit, handleOnChange, handleRemove, imageSrc }: IProductResponse) => {
    return (
        <div>
            <form id="upload-form" className="grid gap-4 py-4"
                onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        placeholder="name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                        Category
                    </Label>
                    <Input
                        id="category"
                        className="col-span-3"
                        placeholder="category"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        className="col-span-3"
                        placeholder="Description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                        Price
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        className="col-span-3"
                        placeholder="Price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                        Quantity
                    </Label>
                    <Input
                        id="quantity"
                        type="number"
                        className="col-span-3"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                        Quantity
                    </Label>
                    <Input
                        id="quantity"
                        type="file"
                        name="file"
                        multiple
                        onChange={handleOnChange}
                        className="col-span-3"
                        placeholder="Quantity"
                        value={product.quantity}
                    />
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
                </div> */}
                <button type="submit" className="border bg-gray-300 p-2 rounded-lg mt-4 w-1/5">
                    {submitting ? `${type}ing...` : type}
                </button>
            </form>
        </div>
    )
}

export default LocalForm