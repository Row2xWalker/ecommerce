import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const GET = async (request) => {
  try {
    await connectToDB();

    const products = await Product.find({}).populate("name");

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

//update all price
export const PATCH = async (req) => {
  const { price } = await req.json();

  try {
    await connectToDB();
    const updateProductPrices = await Product.updateMany(
      { price: null },
      { price }
    );

    console.log(updateProductPrices);
    return new Response("Update Successful", { status: 500 });
  } catch {
    return new Response("Update Failed", { status: 500 });
  }
};
