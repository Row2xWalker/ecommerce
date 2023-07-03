"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { usePathname, useRouter } from 'next/navigation';
import { AdminProductsProps } from '@types';
import { Table } from '@nextui-org/react';
import Link from 'next/link';
//{ products, handleEdit, handleDelete }: AdminProductsProps

interface IProducts {
  _id: string,
  name: string,
  category: string,
  images: [string],
  description: string
  quantity: number,
  sold: number
}

const AdminProducts = () => {
  const pathName = usePathname();
  const router = useRouter();



  return (
    <>
      {products.length > 0 && (
        <table className="  w-full">
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
            {products.map(product => (
              <tr key={product._id} className="border border-black bg-blue-100">
                <td className="bg-white text-center w-[200px] border border-black">{product.name}</td>
                <td className="bg-white text-center w-[200px] border border-black">{product.category}</td>
                <td className="bg-white w-[200px] border border-black"><Image className="mx-auto" alt="Product Image" width={60} height={60} src={product.images[0] ? product.images[0] : "/"} /></td>
                <td className="bg-white text-center w-[200px] border border-black">{product.description}</td>
                <td className="bg-white text-center w-[200px] border border-black">{product.quantity}</td>
                <td className="bg-white text-center w-[200px] border border-black">{product.sold}</td>
                <td className="bg-white text-center w-[50px] border border-black">
                  <Link href={"/admin/products/" + product._id}>Edit </Link>
                </td>
                <td className="bg-white text-center w-[50px] border border-black">Delete</td>
              </tr>
            ))}
          </tbody>
        </table >
      )}
    </>
  )
}

export default AdminProducts