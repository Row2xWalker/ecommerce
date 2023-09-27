export const POST = async (req) =>{
    const {paymentIntentClientKey, paymentMethodId} = await req.json();
    const paymentIntentId = paymentIntentClientKey.split('_client')[0];
    // Creating our options for the Create a Payment Intent Call
    const optionsIntent = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET).toString(
          "base64"
        )}` 
      },
      //body: JSON.stringify(request),
      body: JSON.stringify({
          data: {
              attributes: {
                  client_key: paymentIntentClientKey,
                  payment_method: paymentMethodId,
                  return_url: "https://localhost:3000/checkout"
              }
          }
      })
    };
    try{
      const response = await fetch('https://api.paymongo.com/v1/payment_intents/'+ paymentIntentId +'/attach', optionsIntent);
      const responseData = await response.json();
      console.log(responseData)
      // return newResponsedata
      return new Response(JSON.stringify(responseData), { status: 200 });
    }catch(error){
      console.error(error);
    }
  }