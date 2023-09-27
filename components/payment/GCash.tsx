"use client "

import { useState } from "react";


const GCash = ({ amount, description }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [payProcess, setPayProcess] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    
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
  const listenToPayment = async (sourceId) => {
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (i == 1) {
        const sourceData = await fetch('/api/payment/' + sourceId)
        const resSourceData = await sourceData.json();

        if (resSourceData.attributes.status === "failed") {
          setPaymentStatus("Payment Failed")
        }
        else if (resSourceData.attributes.status === "paid") {
          setPaymentStatus("Payment Success")
        }
        else {
          i = 5;
          setPayProcess(resSourceData.attributes.status)
        }
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const payment = await createPayment();
    const paymentData = await payment.json();

    console.log(paymentData)
    window.open(
      paymentData.data.attributes.next_action.redirect.url, "_blank"
    );
    // listenToPayment(sourceData.data.id)

    // pop up
    // const newWindow = window.open(
    //   sourceData.data.attributes.redirect.checkout_url, "_blank", "width=500,height=500"
    // );
    
    // listenToPayment(sourceData.data.id);
    
    // if (newWindow) {
    //   newWindow.focus();
    // } else {
    //   // Handle if the pop-up blocker prevents the new window from opening
    //   alert('Please allow pop-ups for this website to proceed with the payment.');
    // }
  };

  return (
    <div>
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