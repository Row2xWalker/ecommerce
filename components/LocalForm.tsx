

import { IProductResponse } from "@/types";
import Image from "next/image";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { CloseCircleOutlined } from "@ant-design/icons";

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
                        required
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
                        required
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
                        required
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
                        required
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
                        value={product.stocks_quantity}
                        onChange={(e) => setProduct({ ...product, stocks_quantity: e.target.value })}
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="images" className="col-span-2 bg-white text-black p-4 border border-white rounded-md mx-auto cursor-pointer">
                        Upload Images
                    </Label>
                    <Input
                        id="images"
                        type="file"
                        name="images"
                        multiple
                        onChange={handleOnChange}
                        className="hidden"
                        value={product.images || null}
                    />
                </div>
                <div className="grid grid-cols-4  gap-4">
                            {imageSrc.length > 0 ?
                                imageSrc.map((img, index) => (
                                    <li className="list-none text-right" key={index}>
                                        <div className="relative">
                                            <CloseCircleOutlined className="absolute top-0 right-0 bg-black rounded-full inline-block hover:cursor-pointer " onClick={() => handleRemove(img)}/>
                                        </div>
                                        <Image src={img} alt="imageToBeUpload" height={150} width={150} className="" />
                                    </li>
                                )) : null
                            }
                </div>
                <button type="submit" className="border bg-gray-700 p-2 rounded-lg mt-4 w-1/5">
                    {submitting ? `${type}ing...` : type}
                </button>
            </form>
        </div>
    )
}

export default LocalForm