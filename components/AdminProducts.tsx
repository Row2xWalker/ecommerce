"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { usePathname, useRouter } from 'next/navigation';
import { AdminProductsProps } from '@types';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
//{ products, handleEdit, handleDelete }: AdminProductsProps

interface IProduct {
  _id: string,
  name: string,
  category: string,
  images: [string],
  description: string
  quantity: number,
  sold: number
}

const AdminProducts = () => {
  const columns = [
    {
      key: "productName",
      label: "PRODUCT NAME"
    },
    {
      key: "category",
      label: "CATEGORY"
    },
    {
      key: "image",
      label: "IMAGE"
    },
    {
      key: "",
      label: "DESCRIPTION"
    },
    {
      key: "qty",
      label: "QTY"
    },
    {
      key: "sold",
      label: "SOLD"
    }
  ]

  const pathName = usePathname();
  const router = useRouter();

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
    <>
      {products.length > 0 && (
      <table className="overflow-hidden bg-red-100">
        <thead>
        <tr>
          <th>PRODUCT NAME</th>
          <th>CATEGORY</th>
          <th>IMAGE</th>
          <th>DESCRIPTION</th>
          <th>QTY</th>
          <th>SOLD</th>
          <th>ACTION</th>
          <th>ACTION</th>
        </tr>
        </thead>
        <tbody>
            {products.map(product =>(
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td><Image alt="Product Image" width={150} height={150} src={product.images[0]?product.images[0]:"/"} /></td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.sold}</td>
                <td>Delete</td>
                <td>Edit</td>
            </tr>
            ))}
          </tbody>
      </table>
        )}
    </>
  )
}

export default AdminProducts