"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


const PaymentPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('payment_intent_id');
    const [paymentIsSuccess, setPaymentIsSuccess] = useState(false);
    useEffect(()=>{
      const updateOrderPayment = async()=>{
        try{
          const updateOrder = await fetch('/api/orders/payment/'+search);
          const updateOrderData = await updateOrder.json();
        }catch(error){

        }
      }
      const fetchPaymentDetails = async() =>{
        try{
          const getPayment = await fetch('/api/payment/getPaymentIntent/'+search)
          const getPaymentData = await getPayment.json();
          const paymentIntentStatus = getPaymentData.data.attributes.status;
          
          if (paymentIntentStatus=== "succeeded"){
            localStorage.clear()
            await updateOrderPayment();
            setPaymentIsSuccess(true)
          }
        }catch(error){
    
        }
      }
      
      if(search) fetchPaymentDetails()
    },[])
    
    
    return (
      <div>
        {paymentIsSuccess?(
            <div className="text-center">
              <h1 className="text-2xl">Thank you for your purchase! Order completed.</h1> 
            </div>

        ):null}
      </div>
    );
}

export default PaymentPage