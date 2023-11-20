import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  cartItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      total: Number
    },
  ],
  totalAmount: Number,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  shipping: {
    fullName: String,
    phone: String,
    address: String,
    postalCode: String,
    city: String,
    region: String
  }, 
  payment: {
    paymentMethod: String, 
    paymentIntentId: String,
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    }
  }, // Reference to the Payment model
  // Add more fields as needed
});

const Order = models.Order || model("Order", orderSchema);

module.exports = Order;
