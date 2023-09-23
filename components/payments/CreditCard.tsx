// Function to Create a Payment Intent by calling the site's api
const createPaymentIntent = async () => {
    setPaymentStatus("Creating Payment Intent");
    const paymentIntent = await fetch("/api/createPaymentIntent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    amount: amount * 100,
                    payment_method_allowed: ["card"],
                    payment_method_options: {
                        card: { request_three_d_secure: "any" },
                    },
                    currency: "PHP",
                    description: description,
                    statement_descriptor: "descriptor business name",
                },
            },
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            return response.body.data;
        });

    return paymentIntent;
};


// Function to Create a Payment Method by calling the PayMongo API
const createPaymentMethod = async () => {
    setPaymentStatus("Creating Payment Method");
    const paymentMethod = fetch("https://api.paymongo.com/v1/payment_methods", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`,
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    details: {
                        card_number: `${number}`, //"4343434343434345",
                        exp_month: parseInt(`${month}`), //2
                        exp_year: parseInt(`${year}`), //22
                        cvc: `${code}`, //"123",
                    },
                    billing: {
                        name: `${name}`,
                        email: `${email}`,
                        phone: `${phone}`,
                    },
                    type: "card",
                },
            },
        }),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
            setPaymentStatus(err);
            return err;
        });

    return paymentMethod;
};


// Function to Attach a Payment Method to the Intent by calling the PayMongo API
const attachIntentMethod = async (intent, method) => {
    setPaymentStatus("Attaching Intent to Method");
    fetch(`https://api.paymongo.com/v1/payment_intents/${intent.id}/attach`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`,
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    payment_method: `${method.id}`,
                    client_key: `${intent.attributes.client_key}`,
                },
            },
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            const paymentIntent = response.data;
            console.log(paymentIntent)
            const paymentIntentStatus = paymentIntent.attributes.status;
            if (paymentIntentStatus === 'awaiting_next_action') {
                // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
                setPaymentStatus(paymentIntentStatus);
                window.open(
                    paymentIntent.attributes.next_action.redirect.url, "_blank");
            } else {
                setPaymentStatus(paymentIntentStatus);
            }
        })
        .catch((err) => {
            console.log(err);
            setPaymentStatus(JSON.stringify(err));
        });
};

const onSubmit = async (event) => {
    event.preventDefault();
    const paymentIntent = await createPaymentIntent();
    const paymentMethod = await createPaymentMethod();
    await attachIntentMethod(paymentIntent, paymentMethod);
};


// Function to Listen to the Payment in the Front End
const listenToPayment = async (fullClient) => {
    const paymentIntentId = fullClient.split('_client')[0];
    let i = 5;
    for (let i = 5; i > 0; i--) {
        setPaymentStatus(`Listening to Payment in ${i}`)
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (i == 1) {
            const paymentIntentData = await fetch(
                'https://api.paymongo.com/v1/payment_intents/' + paymentIntentId + '?client_key=' + fullClient,
                {
                    headers: {
                        // Base64 encoded public PayMongo API key.
                        Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC).toString("base64")}`
                    }
                }
            ).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response.data)
                return response.data
            })

            if (paymentIntentData.attributes.last_payment_error) {
                setPaymentStatus(JSON.stringify(paymentIntentData.attributes.last_payment_error))
            }
            else if (paymentIntentData.attributes.status === "succeeded") {
                setPaymentStatus("Payment Success")
            }
            else {
                i = 5;
            }
        }
    }
}
