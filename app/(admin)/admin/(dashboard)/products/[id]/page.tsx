"use client"
import { AdminAddProduct } from "@components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const ProductPage = ({ params }: { params: any }) => {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`/api/product/${params?.id}`);
            const data = await response.json();
            console.log(data)
            setProducts(data)
        };

        if (params?.id) fetchProducts();
    }, [params.id])

    return (
        <AdminAddProduct
        product={products}
        setProduct={setProducts}
        handleSubmit={()=> "dummy"}
        submitting={false}
      />
    )
}

export default ProductPage