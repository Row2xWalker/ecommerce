export const POST = async (req, {params}) =>{
    const {name,email,phone} = await req.json();
    const payment = params.payment
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
      body: JSON.stringify({
        data: {
             attributes: {
                      type: payment,
               //    "details": {
               //         "card_number": "4343434343434345",
               //         "exp_month": 1,
               //         "exp_year": 23,
               //         "cvc": "123",
               //         "bank_code": "test_bank_one"
               //    },
                  billing: {
                      //  address: {
                      //       line1: "line 1",
                      //       line2: "line 2",
                      //       city: "Manila",
                      //       postal_code: "1700",
                      //       country: "PH"
                      //  },
                       name,
                       email,
                       phone
                  },
               //    "payment_method_option": { 
               //         "card": {
               //              "installments": {
               //                   "plan": {
               //                        "tenure": 12,
               //                        "issuer_id": "ISSUERID"
               //                   }
               //              }
               //         }
               //    },
                  metadata: {
                        key: "value",
                        key2: "value"
                  }
                  
             }
        }
   }),
    };
    try{
      const response = await fetch('https://api.paymongo.com/v1/payment_methods', optionsIntent);
      const data = await response.json();
      console.log(data)
      // return newResponsedata
      return new Response(JSON.stringify(data), { status: 200 });
    }catch(error){
      console.error(error);
    }
  }