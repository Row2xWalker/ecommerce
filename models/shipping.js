const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  address: String,
  city: String,
  country: String,
  postalCode: String,
  shippingMethod: String,
  // Add more fields as needed
});

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
