import 'dotenv/config';
import Razorpay from "razorpay";

// console.log("⚠️ Variable as seen in razorpay.js:", process.env.RAZORPAY_KEY_ID);

// Ensure these env vars are present
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are missing in .env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
