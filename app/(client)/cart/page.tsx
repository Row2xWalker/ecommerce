"use client"

import Cart from '@components/Cart';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
    //const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // Fetch cart data from local storage after the component mounts
    useEffect(() => {
        const cartData = localStorage.getItem('Cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    const handleItemQuantityChange = (itemId, newQuantity, newTotalPrice) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) => (item.cartItem.id === itemId ? { ...item, quantity: newQuantity, total: newTotalPrice } : item))
        );

        // Update the cart items in local storage
        updateCartInLocalStorage(cartItems.map((item) => (item.cartItem.id === itemId ? { ...item, quantity: newQuantity, total: newTotalPrice } : item)));
        calculateSubTotal();
    };

    const handleQuantityChange = (itemId, event) => {
        const existingItem = cartItems.find((cartItem) => cartItem.cartItem.id === itemId);
        const newQuantity = parseInt(event.target.value, 10);
        const newTotalPrice = newQuantity * existingItem.cartItem.price
        handleItemQuantityChange(itemId, newQuantity, newTotalPrice);
    };

    // Function to update cart items in local storage
    const updateCartInLocalStorage = (items) => {
        localStorage.setItem('Cart', JSON.stringify(items));
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        const updatedItems = cartItems.filter((cartItem) => cartItem.cartItem.id !== itemId);
        setCartItems(updatedItems);
        updateCartInLocalStorage(updatedItems);
    };


    const increaseQuantity = (itemId) => {
        const existingItem = cartItems.find((cartItem) => cartItem.cartItem.id === itemId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            const newTotalPrice = newQuantity * existingItem.cartItem.price
            handleItemQuantityChange(itemId, newQuantity, newTotalPrice);
        }
    };

    const decreaseQuantity = (itemId) => {
        const existingItem = cartItems.find((cartItem) => cartItem.cartItem.id === itemId);
        if (existingItem && existingItem.quantity > 1) {
            const newQuantity = existingItem.quantity - 1;
            const newTotalPrice = newQuantity * existingItem.cartItem.price
            handleItemQuantityChange(itemId, newQuantity, newTotalPrice);
        } else {
            removeFromCart(itemId);
        }
    };


    // Function to calculate the sub total price of the cart
    const calculateSubTotal = () => {
        return cartItems.reduce((total, item) => total + item.total, 0);
    };

    return (
        <div className="max-w-[990px] mx-auto">
            <div className="min-h-[1080px] bg-white ">
                <section className="px-8 py-4">
                    <h1 className="font-bold text-xl">Your Cart</h1>
                    <div className="flex pt-4 font-bold mb-4">
                        <div className="w-[600px]">Product</div>
                        <div className="w-[200px]">Quantity</div>
                        <div className="w-[100px] text-right">Total</div>
                    </div>
                    {cartItems?.map((cartItem) => (
                        <div className="flex py-2" key={cartItem.cartItem.id}>
                            <div className="flex w-[600px]">
                                <Image src={cartItem.cartItem.images[0]} alt="cartlist-item" width={100} height={100} className="rounded" />
                                <div className="pl-8 pt-4 flex flex-col gap-2 w-full">
                                    <Link href={`products?id=${cartItem.cartItem.id}`}>
                                        <span className="font-bold hover:underline hover:text-blue-500 ">{cartItem.cartItem.name}</span>
                                    </Link>
                                    <span><span className="text-xl">Php </span>{cartItem.cartItem.price}</span>
                                </div>
                            </div>
                            <div className="w-[200px]">
                                <div className="flex  pt-8 h-[70px] ">
                                    <button className="border w-[25px]" onClick={() => decreaseQuantity(cartItem.cartItem.id)}>-</button>
                                    <input type="number" onChange={(e) => handleQuantityChange(cartItem.cartItem.id, e)} className="border w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={cartItem.quantity} />
                                    <button className="border w-[25px]" onClick={() => increaseQuantity(cartItem.cartItem.id)}>+</button>
                                    <button onClick={() => removeFromCart(cartItem.cartItem.id)}>Delete</button>
                                </div>
                            </div>
                            <div className="w-[100px] pt-8 text-right">Php {cartItem.total}</div>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex">
                        <div className="w-[700px] bg-red">
                            <h2>Order Instructions</h2>
                            <textarea className="border rounded-md w-3/4 resize-none px-2">
                            </textarea>
                        </div>
                        <div>
                            <span className="font-semibold text-xl">Subtotal:</span> {calculateSubTotal()}
                            <button className="bg-blue-600 text-white h-12 px-8 border rounded-md hover:bg-blue-400 ">Check Out</button>
                        </div>
                    </div>
                </section >
            </div>
        </div>
    )
}

export default CartPage