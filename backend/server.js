// ✅ STEP 1: Load environment variables IMMEDIATELY.
import dotenv from "dotenv";
dotenv.config();

// ✅ STEP 2: Now, import all other modules.
import express from "express";
import connectDB from "./config/db.js"; // This will now see the loaded env variables
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Database connection can now safely use process.env.MONGO_URI
// console.log("✅ Variables loaded in server.js:", process.env.RAZORPAY_KEY_ID);
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);