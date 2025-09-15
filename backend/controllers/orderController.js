import Order from "../models/Order.js";
import Product from "../models/Product.js";
import  sendEmail  from "../utils/sendEmail.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = new Order({
      user: req.user._id,
      items: items.map((i) => ({
        product: i.product,
        size: i.size,
        quantity: i.quantity,
      })),
      totalPrice,
      shippingAddress,
    });

    const createdOrder = await order.save();

    // ✅ Send confirmation email
    const emailContent = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Total:</strong> ₹${totalPrice}</p>
      <p><strong>Status:</strong> Pending</p>
    `;
    await sendEmail(
      shippingAddress.email,
      "Your Order is Confirmed - OutFytly",
      emailContent
    );

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'orderItems.product',
      'title images'
    );
    res.json(orders);
  } catch (error) {
    console.error('GET MY ORDERS ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "title images rentalPrice");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate("user", "email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    // ✅ Notify user about status update
    const emailContent = `
      <h2>Order Update</h2>
      <p>Your order status has been updated.</p>
      <p><strong>New Status:</strong> ${status}</p>
    `;
    await sendEmail(
      order.shippingAddress.email || order.user.email,
      "Order Status Update - OutFytly",
      emailContent
    );

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
