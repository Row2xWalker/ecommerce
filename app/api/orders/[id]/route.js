import { connectToDB } from "@utils/database";
import Order from "@models/order";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const order = await Order.findById(params.id);
    if (!order) return new Response("Order not found", { status: 404 });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response("Failed to order.", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
    const { paymentIntentId } = await request.json();
  
    try {
      await connectToDB();
      const existingOrder = await Order.findByIdAndUpdate(params.id, {'payment.paymentIntentId': paymentIntentId}, {new:true});
      if (!existingOrder)
        return new Response("Order not Found", { status: 404 });
      return new Response(JSON.stringify(existingOrder), { status: 200 });
    } catch (error) {
        throw new Error(error.message, {status: 500})
    }
};