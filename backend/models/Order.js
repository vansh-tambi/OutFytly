// backend/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Price of the item at time of order
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Seller of this item
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user who placed the order
    orderItems: [orderItemSchema], // Use the detailed schema above
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card", "NetBanking"],
      required: true,
    },
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;