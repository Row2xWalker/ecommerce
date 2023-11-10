"use client"

import { useCartContext } from '@contexts/CartContext';
import { ReactEventHandler, useState } from 'react';
import GCash from '@components/payment/GCash';
import ShippingForm from '@components/ShippingForm';
import Image from 'next/image';
const CheckOutPage = () => {

    const {cartItems, calculateSubTotal} = useCartContext();
    const totalAmount = calculateSubTotal();
    const description = "Item Summaries"
    const [selectedPayment, setSelectedPayment] = useState('GCash');
    const [status, setStatus] = useState("");
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

    const handleShippingFormSubmit = (e: Event) =>{
        e.preventDefault();
        setStatus('payment');
        localStorage.setItem('checkOutDetails', JSON.stringify(checkOutDetails))
        
        // try {
        //     const parFormData = await fetch('/api/propertyacknowledgement/new', {
        //         "method": 'post',
        //         "Content-Type": "application/json",
        //         "body": JSON.stringify(formDataToSubmit)
        //     })
        //     // const parFormJsonData = await parFormData.json();
        // } catch (err) {
        //     throw new Error("Failed saving PAR request", { status: 401 })
        // }

        // router.push("/records/par");
    }

    return (
        <div className="grid grid-cols-2">
            <section className="">
                <ShippingForm handleShippingFormSubmit={handleShippingFormSubmit} handleShippingFormChange={handleShippingFormChange} />
                {status=="payment" && (<><fieldset className="my-2">
                    <legend className="text-xl py-4">Payment Information</legend>
                    <div className="px-8 space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                        type="radio"
                        id="gcash"
                        name="payment"
                        value="GCash"
                        onChange={handlePaymentChange}
                        checked={selectedPayment === 'GCash'}
                        className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2">GCash</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                        type="radio"
                        id="maya"
                        name="payment"
                        value="Maya"
                        onChange={handlePaymentChange}
                        checked={selectedPayment === 'Maya'}
                        className="form-radio h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2">Maya</span>
                    </label>
                    </div>
                </fieldset>
                
            <GCash amount={totalAmount+200} description={description} />
            </>)}
                
            </section>
            <section className="border-l h-full px-4">
                <h1 className="text-xl pb-4 mb-4">Order Summary</h1>
                {cartItems?.map((item) => (
                    <div className="flex items-center justify-between py-2" key={item.cartItem.id}>
                    <div className="flex items-center space-x-4">
                        <Image src={item.cartItem.images[0]} alt={item.cartItem.description} width={80} height={80} />
                        <div>
                        <p className="font-semibold">{item.cartItem.name}</p>
                        <p>qty: {item.cart_quantity}</p>
                        </div>
                    </div>
                    <div className="font-semibold">Php {item.total}</div>
                    </div>
                ))}

                <div className="mt-4">
                    <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>Php {totalAmount}</p>
                    </div>
                    <div className="flex justify-between">
                    <p>Shipping:</p>
                    <p>Php 200</p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                    <p>Total:</p>
                    <p>Php {totalAmount + 200}</p>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default CheckOutPage