import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.id).populate("name");
    if (!product) return new Response("Product not found", { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};
// // PATCH (update)
export const PATCH = async (request, { params }) => {
  const { name, category, description, images, stocks, price } =
    await request.json();

  try {
    await connectToDB();

    const existingProduct = await Product.findById(params.id);

    if (!existingProduct)
      return new Response("Product not Found", { status: 404 });
    existingProduct.name = name;
    existingProduct.category = category;
    existingProduct.description = description;
    existingProduct.images = images;
    existingProduct.stocks = stocks;
    existingProduct.price = price;

    await existingProduct.save();

    return new Response(JSON.stringify(existingProduct), { status: 200 });
  } catch (error) {}
};
// DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Product.findByIdAndRemove(params.id);

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete product", { status: 500 });
  }
};
