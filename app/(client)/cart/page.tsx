"use client"

import Cart from '@components/Cart';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CartPage = () => {
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
            <div className="min-h-[1080px] bg-white ">
                <Cart />

            </div>
        </div>
    )
}

export default CartPage