"use client"

import Cart from '@components/Cart';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useCartContext } from '@contexts/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateSubTotal } = useCartContext();


    if (cartItems.length === 0) {
        return (
            <div className="">
                <section className="px-8 py-4">
                    <h1 className="font-bold text-4xl">Your Cart is Empty</h1>
                </section >
            </div>
        )
    }
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="bg-white shadow-md rounded-md p-8 col-span-2">
                <h1 className="font-bold text-4xl mb-6">Your Cart</h1>
                <div className="flex font-bold mb-4">
                    <div className="flex-1">Product</div>
                    <div className="w-64 text-center">Quantity</div>
                    <div className="w-32 text-right">Total</div>
                </div>

                {cartItems?.map((item) => (
                    <Cart
                        item={item}
                        removeFromCart={removeFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        key={item.cartItem._id}
                    />
                ))}
            </section>
            <section className=" lg:sticky top-8">
                <div className="bg-white shadow-md rounded-md p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <h2 className="font-semibold text-xl mb-2">Order Instructions</h2>
                    <textarea className="border rounded-md w-full h-20 resize-none px-2 mb-4"></textarea>
                    <div className="mb-4">
                        <span className="font-semibold text-xl">Subtotal:</span> {calculateSubTotal()}
                    </div>
                    <div className="flex">
                        <button className="bg-blue-500 text-white h-12 px-8 border rounded-md transition duration-300 ease-in-out hover:bg-blue-600">
                            Check Out
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartPage