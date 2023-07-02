"use client"

import { AdminAddProduct } from "@components"
import { useRouter } from "next/navigation"
import { useState } from "react"
const AddProductPage = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    images: [""],
    quantity: 0
  })

  const addProduct = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/product/new', {
        method: 'POST',
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          description: product.description,
          images: product.images,
          quantity: product.quantity
        })
      });

      if (response.ok) {
        router.push('/admin/products');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <AdminAddProduct
        product={product}
        setProduct={setProduct}
        handleSubmit={addProduct}
        submitting={submitting}
      />
    </>
  )
}
export default AddProductPage;