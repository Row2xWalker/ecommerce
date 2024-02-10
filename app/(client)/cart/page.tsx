"use client"

import Cart from '@components/Cart';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useCartContext } from '@contexts/CartContext';

const CartPage = () => {
    const router = useRouter();
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateSubTotal } = useCartContext();
    const subTotal = calculateSubTotal();
    
     const onCheckOut =  async (e) => {
        e.preventDefault();
        router.push('/checkout')
    }
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
        <div className="grid grid-cols-1 2xl:grid-cols-3 lg:gap-2">
            <section className="bg-white shadow-md rounded-md p-4 md:p-8 col-span-2">
                <h1 className="font-bold text-2xl mb-6">Your Cart</h1>
                <div className="flex font-bold mb-4">
                    <div className="flex-1">Product</div>
                    <div className="hidden md:block text-center">Quantity</div>
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
            <section className="lg:sticky top-8">
                <div className="w-full bg-white shadow-md rounded-md p-4 md:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="mb-4">
                        <span className="font-semibold text-xl">Total: </span><span>&#8369;</span>{subTotal}
                    </div>
                    <div className="flex">
                        <button onClick={onCheckOut} className="bg-blue-500 text-white h-12 w-full px-8 border rounded-md transition duration-300 ease-in-out hover:bg-blue-600">
                            Check Out
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartPage