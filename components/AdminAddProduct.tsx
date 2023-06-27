"use client"

import { useState } from "react";


const AdminAddProduct = () => {
  return (
    <div>
        <form className="flex flex-col w-3/5 gap-4 mx-auto rounded-md font-bold">
            Name: <input type="text" name="name" id="name" />
            Category: <input type="text" name="category" id="category" />
            Description: <input type="text" name="description" id="description" />
            Quantity: <input type="number" name="quantity" id="quantity" />
            Image: <input type="text" name="description" id="description" />
            <button className="border border-black px-2">Add Product</button>
        </form>
    </div>
  )
}

export default AdminAddProduct