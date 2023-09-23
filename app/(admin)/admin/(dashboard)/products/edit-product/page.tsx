"use client"
import { Form } from '@components';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const EditProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("id")
    console.log("row Id", productId)
    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        images: [],
        quantity: 0,
        price: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [edit, setEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`/api/product/${productId}`);
            const data = await response.json();

            setProduct({
                name: data.name,
                category: data.category,
                description: data.description,
                images: data.images,
                quantity: data.quantity,
                price: data.price
            })

            setImageSrc(data.images)
        };

        if (productId) fetchProductDetails();
    }, [productId])

    const handleOnChange = (changeEvent: Event) => {
        for (const file of changeEvent.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImageSrc((imgs) => ([...imgs, reader.result]))
            }
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    }

    const handleRemove = (fileName) => {
        setImageSrc(imageSrc.filter(name => name !== fileName));
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!productId) return alert("Missing Product Id!");

        try {
            //image uploads
            const formData = new FormData();
            product.images = [];
            for (const file of imageSrc) {
                formData.append('file', file);
                formData.append('upload_preset', 'Ecommerce_Application')
                const data = await fetch('https://api.cloudinary.com/v1_1/digbmnogn/image/upload', {
                    method: 'POST',
                    body: formData
                }).then(r => r.json())

                product.images.push(data.url)
            }
            //end of image uploads
            const response = await fetch(`/api/product/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    images: product.images,
                    quantity: product.quantity,
                    price: product.price
                }),
            });

            if (response.ok) {
                router.push("/admin/products");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            product={product}
            setProduct={setProduct}
            submitting={false}
            handleSubmit={updateProduct}
            handleOnChange={handleOnChange}
            handleRemove={handleRemove}
            imageSrc={imageSrc}
        />
    )
}

export default EditProduct