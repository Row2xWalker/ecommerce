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
    images: [],
    quantity: 0
  })

  const addProduct = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    //image upload:
    const form = e.currentTarget
    const fileInput = Array.from(form.elements).find(({ name })=>name==='file')
    
    const formData = new FormData();

    for(const file of fileInput.files){
      formData.append('file', file);
    }

    formData.append('upload_preset', 'Ecommerce_Application')
    const data = await fetch('https://api.cloudinary.com/v1_1/digbmnogn/image/upload',{
      method: 'POST',
      body: formData
    }).then(r=> r.json())
    
    product.images.push(data.url)
    //product upload
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