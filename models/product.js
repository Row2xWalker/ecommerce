import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
  },
  category: {
    type: String,
    required: [true, "Please provide a product category"],
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  images: [String],
  stocks_quantity: {
    type: Number,
    required: [true, "Please provide the product stocks quantity"],
    min: 0,
  },
  price: {
    type: Number,
    required: [true, "Please provide the product price"],
    min: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
});

// Add a virtual property for remaining stock
ProductSchema.virtual("remainingStock").get(function () {
  return this.stocks - this.sold;
});

// Define a method to update sold count
ProductSchema.methods.updateSold = async function (quantitySold) {
  this.sold += quantitySold;
  await this.save();
};

const Product = models.Product || model("Product", ProductSchema);

export default Product;
