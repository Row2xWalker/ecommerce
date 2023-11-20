import { connectToDB } from "@utils/database";
import Order from "@models/order";

export const POST = async (req) => {
  const { cartItems, totalAmount, status, shipping, payment } =
    await req.json();

    
  try {
    await connectToDB();
    const newOrder = new Order({ cartItems, totalAmount, status, shipping, payment  })
    await newOrder.save();

    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
