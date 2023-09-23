const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  paymentMethod: String, // Credit card, PayPal, etc.
  transactionId: String, // Unique ID for the payment transaction
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
  },
  // Add more fields as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
