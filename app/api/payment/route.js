// This function is called to create a Payment intent
// Step 1 of https://developers.paymongo.com/docs/accepting-cards

async function createPaymentIntent(req: NextApiRequest, res: NextApiResponse) {
  const request = await req.json();
  // Creating our options for the Create a Payment Intent Call
  const optionsIntent = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET).toString(
        "base64"
      )}`, // HTTP Basic Auth and Encoding
    },
    body: JSON.stringify(request),
    // The req.body should follow this specific format
    //   {
    //     "data": {
    //          "attributes": {
    //               "amount": 10000 (int32) note that 10000 = PHP 100.00,
    //               "payment_method_allowed": [
    //                    "card",
    //                    "paymaya"
    //               ](string array),
    //               "payment_method_options": {
    //                    "card": {
    //                         "request_three_d_secure": "any"
    //                    }
    //               },
    //               "currency": "PHP" (string),
    //               "description": "description" (string),
    //               "statement_descriptor": "descriptor business name" (string)
    //          }
    //     }
    //  }
  };

  // Calling the Create a Payment Intent API
  async function createPaymentIntent(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}
