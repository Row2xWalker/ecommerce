"use client"

import AdminProducts from '@/components/AdminProducts';
import DataTable from '@components/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import { Input } from '@components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" 
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { Form } from '@components';
import LocalForm from '@components/LocalForm';

const ProductPage = () => {
  const columns = [
    {
      header: 'Image',
      accessorFn: row => row.images[0],
      cell: image => <Image src={image.getValue()} width={60} height={60} alt="Product Image" className="mx-auto" />
    },
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Description',
      accessorKey: 'description'
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity'
    },
    {
      header: 'Price',
      accessorKey: 'price'
    },
    {
      header: 'Sold',
      accessorKey: 'sold'
    },
    {
      header: 'Action',
      accessorKey: '_id',
      cell: row => <div><Link href={"/admin/products/" + row.getValue()}><span className="mx-2">View</span></Link><span className="hover:cursor-pointer" onClick={() => handleDelete && handleDelete(row.getValue())}>Delete</span></div>
    }
  ]

  const [products, setProducts] = useState([])
  
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
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (product) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/product/${product}`, {
          method: "DELETE",
        });

        const filteredProducts = products.filter((item) => item._id !== product);
        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleOnChange = (changeEvent: any) => {
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
          images: ["http://res.cloudinary.com/digbmnogn/image/upload/v1688784299/ecommerce_images/ytrj4qpt3xpmgatzkive.jpg"],
          stocks_quantity: product.quantity,
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
    <div className="">
      <header>
        <h1 className="text-lg font-bold">Products</h1>
      </header>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Add Product</Button>
        </DialogTrigger>
        <DialogContent className="text-white"  
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle >Add Product</DialogTitle>
          </DialogHeader>
          <LocalForm
            type="Add"
            product={product}
            setProduct={setProduct}
            handleSubmit={addProduct}
            submitting={submitting}
            handleOnChange={handleOnChange}
            handleRemove={handleRemove}
            imageSrc={imageSrc}
          />
           <DialogFooter>
            {/* <Button type="submit" onSubmit={addProduct()}>Add</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable data={products} columns={columns} />
      
    </div>
  )
}

export default ProductPage