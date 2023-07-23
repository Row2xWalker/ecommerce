"use client"
import { Form } from "@components";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductProps } from '@types';
const ProductPage = ({ params }: { params: any }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        images: [],
        quantity: 0
    });
    const [renderImage, setRenderImage] = useState()
    const [edit, setEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleEdit = () => {
        router.push(`/admin/products/edit-product?id=${params.id}`)
    }

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`/api/product/${params.id}`);
            const data = await response.json();

            setProduct({
                name: data.name,
                category: data.category,
                description: data.description,
                images: data.images,
                quantity: data.quantity
            })
        };

        if (params?.id) fetchProductDetails();
    }, [params.id])

    const handleImageClick = (src: string) => {
        setRenderImage(src)
    }

    return (
        <div>
            {
                product && !edit ? (
                    <div className="flex gap-10 ml-20">
                        <div>
                            {product.images.map((image, index) => (
                                <div className=" h-[100px] w-[100px] my-2 hover:cursor-pointer" key={index}>
                                    <Image src={image} width={450} height={450} alt="product image" className="min-h-[100px] max-h-[100px]" onClick={() => (handleImageClick(image))} />
                                </div>
                            ))}
                        </div>
                        <div>
                            {product.images.length > 0 ? <Image src={renderImage || product.images[0]} width={450} height={450} alt="product image" /> : null}
                        </div>
                        <div className="">
                            <h1 className="text-4xl font-bold">{product?.name}</h1>
                            <h1>{product?.category}</h1>
                            <h1 className="text-xl font-bold">Php {product?.quantity}</h1>
                            <h1><span className="font-bold">In stock:</span> {product?.sold}</h1>
                            <h1>{product?.description}</h1>
                            <button className="border bg-gray-300 p-2 rounded-lg mt-4" onClick={handleEdit}>Edit Product</button>
                        </div>
                    </div>) : (null)
            }
        </div>
    )
}

export default ProductPage