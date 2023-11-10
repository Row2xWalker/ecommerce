"use client "

import { useEffect, useState } from "react";
import iFrame from "./PaymentIframe";
import PaymentIframe from "./PaymentIframe";
import { useRouter } from "next/navigation";


const GCash = ({ amount, description }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [payProcess, setPayProcess] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState("")

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);





    
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

          const paymentMethod = await fetch('api/payment/createPaymentMethod', {
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

  // Function to Listen to the Source in the Front End
  const listenToPayment = async (paymentIntentId) => {
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (i == 1) {
        const data = await fetch('/api/payment/getPaymentIntent/' + paymentIntentId)
        const jsonData = await data.json();

        if (jsonData.data?.attributes.status === "succeeded") {
           setPaymentStatus("Payment Success")
           closeModal();
        }
        // else if (jsonData.data?.attributes.status === "paid") {
            // ***failed****
        // }
        else {
          i = 5;
          setPayProcess(jsonData.data?.attributes.status)
        }
      }
    }
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const payment = await createPayment();
    const paymentData = await payment.json();

    const paymentIntentStatus = paymentData.data.attributes.status;
    if (paymentIntentStatus === 'awaiting_next_action') {
      // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
      router.push(paymentData.data.attributes.next_action.redirect.url);
      // openModal();
      // listenToPayment(paymentData.data.id) 
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
      {/* {isModalOpen && <PaymentIframe modalUrl={modalUrl} />} */}
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="inline-block text-gray-700 font-bold mb-2" htmlFor="customer-name">Customer Name:</label>
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

export default GCash