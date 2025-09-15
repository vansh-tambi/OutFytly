// ✅ STEP 1: Load environment variables IMMEDIATELY
import dotenv from "dotenv";
dotenv.config();

// ✅ STEP 2: Import core modules
import express from "express";
import cors from "cors";

// ✅ STEP 3: Import DB + routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
// ❌ REMOVED incorrect reviewRoutes import

import "./config/razorpay.js";

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes); // ✅ Kept the plural version
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
// ❌ REMOVED duplicate /api/payment route
app.use("/api/users", userRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/admin", analyticsRoutes); // Note: This still uses a duplicate prefix
// ❌ REMOVED incorrect /api/reviews route


app.get("/", (req, res) => {
  res.send("✅ API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);