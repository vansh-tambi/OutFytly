import razorpay from "../config/razorpay.js";
import crypto from "crypto";

// Create an order in Razorpay
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `order_receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expectedSignature === signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
