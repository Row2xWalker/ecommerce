"use client"

import { useCartContext } from '@contexts/CartContext';
import { useState } from 'react';
import Payment from '@components/payment/Payment';
import ShippingForm from '@components/ShippingForm';
import Image from 'next/image';
import PaymentSelection from '@components/payment/PaymentSelection';
const CheckOutPage = () => {
    const {cartItems, calculateSubTotal} = useCartContext();
    const totalAmount = calculateSubTotal();
    const description = "Item Summaries"
    const [selectedPayment, setSelectedPayment] = useState('');
    const handlePaymentChange = (e : Event) => {
        setSelectedPayment(e.target.value);
    };

    const [checkOutDetails, setCheckOutDetails] = useState({
        fullName:"",
        phone:"",
        address:"",
        postalCode:"",
        city:"",
        region:""
    })
   
    const handleShippingFormChange = (e: Event) => {
        const { name, value } = e.target;
        setCheckOutDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <section className="">
                <ShippingForm handleShippingFormChange={handleShippingFormChange} />
                <PaymentSelection handlePaymentChange={handlePaymentChange} selectedPayment={selectedPayment}/>
                <Payment amount={totalAmount+200} description={description} method={selectedPayment} billing={checkOutDetails}/>
            </section>
            <section className="md:border-l h-full px-4">
                <h1 className="text-xl pb-4 mb-4">Order Summary</h1>
                {cartItems?.map((item) => (
                    <div className="flex items-center justify-between py-2" key={item.cartItem._id}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-none relative w-24 h-24">
                                <Image src={item.cartItem.images[0]} alt={item.cartItem.description} fill className="object-fit border" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                            </div>
                            <div>
                            <p className="font-semibold break-normal">{item.cartItem.name}</p>
                            <p>{item.cart_quantity}x</p>
                            <div className="font-semibold md:hidden"><span>&#8369; </span>{item.total}</div>
                            </div>
                        </div>
                        <div className="font-semibold hidden md:block"><span>&#8369; </span>{item.total}</div>
                    </div>
                ))}
                <div className="mt-4">
                    <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p><span>&#8369; </span>{totalAmount}</p>
                    </div>
                    <div className="flex justify-between">
                    <p>Shipping:</p>
                    <p><span>&#8369; </span>200</p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                    <p>Total:</p>
                    <p><span>&#8369; </span>{totalAmount + 200}</p>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default CheckOutPage