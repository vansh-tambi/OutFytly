import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rentalPrice: { type: Number, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String }],
    images: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // ⭐ Reviews (ref to Review model)
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
