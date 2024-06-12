"use client"

import AdminProducts from '@/components/AdminProducts';
import DataTable from '@/components/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" 
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import LocalForm from '@/components/LocalForm';

const ProductPage = () => {
  
  const router = useRouter();
  const columns = [
    {
      header: 'Image',
      accessorFn: row => row.images[0],
      cell: image => <div className="w-16 h-16 relative mx-auto"><Image src={image.getValue()} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' alt="Product Image"/> </div>
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Description',
      accessorFn: row => row.description,
      cell: row => <div>{(row.getValue().length>75?row.getValue().substr(0,75)+"...":row.getValue())}</div>
    },
    {
      header: 'Quantity',
      accessorKey: 'stocks_quantity'
    },
    {
      header: 'Price',
      accessorKey: 'price'
    },
    {
      header: 'Sold',
      accessorKey: 'sold',
    },
    {
      header: 'Action',
      accessorKey: '_id',
      cell: row => <div><Link href={"/admin/products/" + row.getValue()}><span className="mx-2">View</span></Link><span className="hover:cursor-pointer" onClick={() => handleDelete && handleDelete(row.getValue())}>Delete</span></div>
    }
  ]

  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [submitting, setIsSubmitting] = useState(false);
  const [imageSrc, setImageSrc] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    images: [],
    stocks_quantity: 0,
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
          images: product.images,
          stocks_quantity: product.stocks_quantity,
          price: product.price
        })
      });

      if (response.ok) {
        setProduct({
          name: "",
          category: "",
          description: "",
          images: [],
          stocks_quantity: 0,
          price: 0
        })
        setImageSrc([])
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data)
        setOpen(false)
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header>
        <h1 className="text-lg font-bold">Products</h1>
      </header>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant="secondary" onClick={()=>{ setProduct({
                name: "",
                category: "",
                description: "",
                images: [],
                stocks_quantity: 0,
                price: 0
              })
              setImageSrc([])}}>Add Product</Button>
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
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={products} columns={columns} />
      
    </>
  )
}

export default ProductPage