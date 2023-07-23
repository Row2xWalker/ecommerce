"use client"

import { Form } from "@components"
import { useRouter } from "next/navigation"
import { useState } from "react"


const AddProductPage = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [imageSrc, setImageSrc] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    images: [],
    quantity: 0,
    price: 0
  })

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
  const addProduct = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);

    // product upload
    try {
      //image uploads
      const formData = new FormData();

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

      const response = await fetch('/api/product/new', {
        method: 'POST',
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          description: product.description,
          images: product.images,
          quantity: product.quantity,
          price: product.price
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
      <Form
        type="Add"
        product={product}
        setProduct={setProduct}
        handleSubmit={addProduct}
        submitting={submitting}
        handleOnChange={handleOnChange}
        handleRemove={handleRemove}
        imageSrc={imageSrc}
      />
    </>
  )
}
export default AddProductPage;