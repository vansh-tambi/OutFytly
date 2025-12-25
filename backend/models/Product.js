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

// ✅ Database indexes for faster queries
productSchema.index({ category: 1 }); // Fast category filtering
productSchema.index({ user: 1 }); // Fast user-based queries
productSchema.index({ createdAt: -1 }); // Fast sorting by newest
productSchema.index({ rentalPrice: 1 }); // Fast price sorting
productSchema.index({ title: "text" }); // Fast text search
productSchema.index({ category: 1, rentalPrice: 1 }); // Compound index for category + price filters

const Product = mongoose.model("Product", productSchema);
export default Product;
