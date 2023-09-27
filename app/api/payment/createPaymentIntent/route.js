export const POST = async (req) =>{
  const {amount, description} = await req.json();
  // Creating our options for the Create a Payment Intent Call
  const optionsIntent = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET).toString(
        "base64"
      )}`, 
    },
    //body: JSON.stringify(request),
    body: JSON.stringify({
      data: {
        attributes: {
          //amount is multiplied by 100 as paymongo includes centavos
            amount: amount*100,
            payment_method_allowed: ['card', 'paymaya', 'billease', 'gcash', 'grab_pay'],
            payment_method_options: {
              card: {
                  request_three_d_secure: 'any',
              },
            },
            description,
            currency: 'PHP',
            capture_type: 'automatic',
        },
      },
    }),
  };
  try{
    const response = await fetch('https://api.paymongo.com/v1/payment_intents', optionsIntent);
    const data = await response.json();
    console.log(data)
    // return newResponsedata
    return new Response(JSON.stringify(data), { status: 200 });
  }catch(error){
    console.error(error);
  }
}