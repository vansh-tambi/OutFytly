import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        startDate: { type: Date, required: true }, // ✅ ADD THIS
        endDate: { type: Date, required: true }, 
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
