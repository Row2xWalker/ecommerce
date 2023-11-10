"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


const PaymentPage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('payment_intent_id');
    const [paymentIsSuccess, setPaymentIsSuccess] = useState(false);
    useEffect(()=>{
      const fetchPaymentDetails = async() =>{
        try{
          const getPayment = await fetch('/api/payment/getPaymentIntent/'+search)
          const getPaymentData = await getPayment.json();
          const paymentIntentStatus = getPaymentData.data.attributes.status;

          if (paymentIntentStatus=== "succeeded"){
            setPaymentIsSuccess(true)
          }
        }catch(error){
    
        }
      }
      
      if(search) fetchPaymentDetails()
    },[])
    
    
    return (
      <div>
       {paymentIsSuccess?"Order completed":null}
      </div>
    );
}

export default PaymentPage