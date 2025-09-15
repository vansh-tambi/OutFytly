import Order from "../models/Order.js";
import Product from "../models/Product.js";
import  sendEmail  from "../utils/sendEmail.js";
import Cart from "../models/Cart.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // 1. Get the user's cart from the DB
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // 2. Prepare order items and calculate total price from backend data (for security)
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }
      const itemPrice = product.rentalPrice * item.quantity;
      totalPrice += itemPrice;
      orderItems.push({
        product: item.product,
        size: item.size,
        quantity: item.quantity,
        price: product.rentalPrice,
        seller: product.user, // Important for your dashboard stats!
      });
    }

    // Add shipping cost
    const shippingCost = 50;
    totalPrice += shippingCost;

    // 3. Create the new order object
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // 4. Save the order to the database
    const createdOrder = await order.save();

    // 5. Clear the user's cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({ message: 'Server Error' });
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
