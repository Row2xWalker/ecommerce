"use client"
import React, { createContext, useState, useContext, useEffect, PropsWithChildren  } from 'react';

interface CartItem {
    _id: string;
    name: string;
    category: string;
    description: string;
    images: string[];
    quantity: number;
    price: number;
  }
  
  interface CartItemWithQuantity {
    cartItem: CartItem;
    cart_quantity: number;
    total: number;
  }
  
  interface CartContextValue {
    cartItems: CartItemWithQuantity[];
    addToCart: Function,
    isInCart: Function,
    removeFromCart: Function,
    increaseQuantity: Function,
    decreaseQuantity: Function,
    handleQuantityChange: Function,
    calculateSubTotal: Function
  }

const CartContext = createContext<CartContextValue| undefined>(undefined);
interface CartProviderProps {
  children : React.ReactNode
}
export function useCartContext() {
    return useContext(CartContext);
}

 export function CartProvider ({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState([]);
    // Fetch cart data from local storage after the component mounts
    useEffect(() => {
        const cartData = localStorage.getItem('Cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    const isInCart = (productId) => {
        return cartItems.some((item) => item.cartItem._id === productId);
    }
    const handleItemQuantityChange = (itemId, newQuantity, newTotalPrice) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) => (item.cartItem._id === itemId ? { ...item, cart_quantity: newQuantity, total: newTotalPrice } : item))
        );
        // Update the cart items in local storage
        updateCartInLocalStorage(cartItems.map((item) => (item.cartItem._id === itemId ? { ...item, cart_quantity: newQuantity, total: newTotalPrice } : item)));
        calculateSubTotal();
    };

    const handleQuantityChange = (itemId, event) => {
        const existingItem = cartItems.find((item) => item.cartItem._id === itemId);
        const newQuantity = parseInt(event.target.value, 10);
        const newTotalPrice = newQuantity * existingItem.cartItem.price
        handleItemQuantityChange(itemId, newQuantity, newTotalPrice);
    };

    // Function to update cart items in local storage
    const updateCartInLocalStorage = (items) => {
        localStorage.setItem('Cart', JSON.stringify(items));
    };

    const addToCart = (productToAdd, localQuantity) => {
        const cartCopy = [...cartItems];
        const existingItemIndex = cartCopy.findIndex((item) => item.cartItem._id === productToAdd._id);

        if (existingItemIndex !== -1) {
            // Item already exists in cart, update the quantity
            cartCopy[existingItemIndex].cart_quantity += productToAdd.cart_quantity;
        } else {
            // Item does not exist in cart, add it to the cart

            cartCopy.push({
                cartItem: productToAdd,
                cart_quantity: localQuantity,
                total: localQuantity * productToAdd.price,
            });
            setCartItems(cartCopy)
            updateCartInLocalStorage(cartCopy)
        }
    }
    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        const updatedItems = cartItems.filter((item) => item.cartItem._id !== itemId);
        setCartItems(updatedItems);
        updateCartInLocalStorage(updatedItems);
    };


    const increaseQuantity = (itemId) => {
        const existingItem = cartItems.find((item) => item.cartItem._id === itemId);
        if (existingItem) {
            const newQuantity = existingItem.cart_quantity + 1;
            const newTotalPrice = newQuantity * existingItem.cartItem.price
            handleItemQuantityChange(itemId, newQuantity, newTotalPrice);
        }
    };

    const decreaseQuantity = (itemId) => {
        const existingItem = cartItems.find((item) => item.cartItem._id === itemId);
        if (existingItem && existingItem.cart_quantity > 1) {
            const newQuantity = existingItem.cart_quantity - 1;
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

    // Context value to be provided to consuming components
    const cartContextValue = {
        cartItems,
        addToCart,
        isInCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        handleQuantityChange,
        calculateSubTotal
    };

    // Provide the cart context value to all child components
    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;