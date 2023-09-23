const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" }, // Reference to the Shipping model
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }, // Reference to the Payment model
  // Add more fields as needed
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
