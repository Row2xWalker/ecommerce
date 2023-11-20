import { connectToDB } from "@utils/database";
import Order from "@models/order";

export const PATCH = async (request, { params }) => {
    try {
      await connectToDB();
      const existingOrder = await Order.findOneAndUpdate({'payment.paymentIntentId': params.id}, {status: "completed"}, {new:true});
      if (!existingOrder)
        return new Response("Order not Found", { status: 404 });
      return new Response(JSON.stringify(existingOrder), { status: 200 });
    } catch (error) {
        throw new Error(error.message, {status: 500})
    }
};