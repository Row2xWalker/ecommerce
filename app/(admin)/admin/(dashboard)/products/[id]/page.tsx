"use client"
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
        <div>
            <div>
                {products.name}
            </div>
            <div>
                {products.category}
            </div>
            <div>
                {products.images}
            </div>
            <div>
                {products.description}
            </div>
            <div>
                {products.quantity}
            </div>
            <div>
                {products.sold}
            </div>
        </div>
    )
}

export default ProductPage