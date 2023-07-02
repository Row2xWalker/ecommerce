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
    <div className="h-full">
      <Table aria-label="Product Table">
        <Table.Header>
          <Table.Column>PRODUCT NAME</Table.Column>
          <Table.Column>CATEGORY</Table.Column>
          <Table.Column>IMAGE</Table.Column>
          <Table.Column>DESCRIPTION</Table.Column>
          <Table.Column>QTY</Table.Column>
          <Table.Column>SOLD</Table.Column>
          <Table.Column>ACTION</Table.Column>
          <Table.Column>ACTION</Table.Column>
        </Table.Header>
        <Table.Body items={products}>
          {(product: IProduct) => (
            <Table.Row key={product._id} >
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell><CldImage alt="Product Image" width="150" height="150" src="https://res.cloudinary.com/digbmnogn/image/upload/v1687751727/cld-sample-5.jpg" /></Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>{product.sold}</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
              <Table.Cell>Edit</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
        />
      </Table>
    </div >
  )
}

export default AdminProducts