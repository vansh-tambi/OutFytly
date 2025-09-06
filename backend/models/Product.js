import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Accessories", "Kids"], // adjust as needed
    },
    price: {
      type: Number,
      required: true,
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    sizes: [
      {
        size: { type: String },
        stock: { type: Number, default: 0 },
      },
    ],
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
