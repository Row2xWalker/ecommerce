"use client"

import AdminProducts from '@components/AdminProducts';
import DataTable from '@components/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const ProductPage = () => {
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Category',
      accessorKey: 'category'
    },
    {
      header: 'Image',
      accessorFn: row => row.images[0],
      cell: image => <Image src={image.getValue()} width={60} height={60} alt="Product Image" className="mx-auto" />
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
      header: 'Sold',
      accessorKey: 'sold'
    },
    {
      header: 'Action',
      accessorKey: '_id',
      cell: row => <div><Link href={"/admin/products/"+row.getValue()}><span>View</span></Link><span>Edit</span><span>Delete</span></div>
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

  return (
    <div className="w-10/12 mx-auto">
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