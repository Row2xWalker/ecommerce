"use client"

import AdminProducts from '@/components/AdminProducts';
import DataTable from '@components/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


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

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      const data = await response.json();
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (product) => {
    console.log("row", product)
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

  return (
    <div className="w-2/3 mx-auto">
      <DataTable data={products} columns={columns} />
      <Link href="/admin/products/add-product">
        <button className="border bg-gray-300 p-2 rounded-lg mt-4">
          Add Product
        </button>
      </Link>
    </div>
  )
}

export default ProductPage