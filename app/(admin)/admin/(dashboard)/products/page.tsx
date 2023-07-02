"use client"

import AdminProducts from '@components/AdminProducts';
import Link from 'next/link';
const ProductPage = () => {


  return (
    <div className="w-10/12 mx-auto">
      <AdminProducts />
      <Link href="/admin/products/add-product">
        <button className="border bg-gray-300 p-2 rounded-lg mt-4">
          Add Product
        </button>
      </Link>
    </div>
  )
}

export default ProductPage