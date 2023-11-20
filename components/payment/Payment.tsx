"use client"

import { useCartContext } from '@contexts/CartContext';

import { useState } from "react";
import { useRouter } from "next/navigation";

type PaymentProps={
  amount: number,
  description: string,
  method: string,
  billing:{}
}


type orderDetailProps={
  cartItem: {},
  cart_quantity: number,
  total: number
}

const Payment = ({ amount, description, method, billing}: PaymentProps) => {
  
    const {cartItems, calculateSubTotal} = useCartContext();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    
    // Function to trigger payment process
    const createPayment = async () => {
        try{
          //Create Payment Intent
          const paymentIntent = await fetch('api/payment/createPaymentIntent', {
              method: 'POST',
              body: JSON.stringify({amount})
          })
          const paymentIntentData = await paymentIntent.json();
          const paymentIntentClientKey = paymentIntentData.data.attributes.client_key
          //Create Payment Method

          const paymentMethod = await fetch(`api/payment/createPaymentMethod/${method}`, {
            method: 'POST',
            body: JSON.stringify({name, phone, email})
          })
          const paymentMethodData = await paymentMethod.json();
          const paymentMethodId = paymentMethodData.data.id

          //Attach Payment 
          const attachPayment = await fetch('api/payment/attachPaymentIntent', {
            method: 'POST',
            body: JSON.stringify({
              paymentIntentClientKey,
              paymentMethodId
            })
          })
          const attachPaymentData = await attachPayment.json();

          return new Response(JSON.stringify(attachPaymentData))
        }catch(err){
          throw new Error('Failed to create payment'+ err.message);
        }
    }

    const saveOrder = async() =>{
      const orderDetails = {
        cartItems : cartItems.map((item:orderDetailProps)=>({
          product: item.cartItem,
          quantity : item.cart_quantity,
          total : item.total
        })),
        totalAmount: calculateSubTotal(),
        status: "pending",
        shipping: billing,
        payment: {
          paymentMethod: method,
          status: "pending",
          amount: calculateSubTotal()
        }
      }
      try{
        const order = await fetch(`api/orders/new`, {
          method: 'POST',
          body: JSON.stringify(orderDetails)
        })
        const orderData = await order.json()
        return new Response(JSON.stringify(orderData))
      }catch(err){
        throw new Error('Failed to Save Order'+ err.message);
      }
    }
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const order = await saveOrder();
    const orderData = await order.json();
    const payment = await createPayment();
    const paymentData = await payment.json();
    const paymentIntentStatus = paymentData.data.attributes.status;
    if (paymentIntentStatus === 'awaiting_next_action') {
      // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
      router.push(paymentData.data.attributes.next_action.redirect.url);
    } else if (paymentIntentStatus === 'succeeded') {
      // You already received your customer's payment. You can show a success message from this condition.
    } else if(paymentIntentStatus === 'awaiting_payment_method') {
      // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
    }  else if (paymentIntentStatus === 'processing'){
      // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
    }
  };

  return (
    <div>
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="inline-block text-gray-700 font-bold mb-2" htmlFor="customer-name">Full Name:</label>
            <input
              id="customer-name"
              placeholder="Full Name"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              placeholder="09xxxxxxxxx"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">E-mail:</label>
            <input
              id="email"
              placeholder="user@domain.com"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>  
          <div className="pt-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Complete Order
        </button>
        </div>
      </form>
    </div>
  )
}

export default Payment