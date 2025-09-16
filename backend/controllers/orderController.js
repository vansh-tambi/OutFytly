import Order from "../models/Order.js";
import Product from "../models/Product.js";
import  sendEmail  from "../utils/sendEmail.js";
import Cart from "../models/Cart.js";
import { differenceInCalendarDays } from "date-fns";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    // ✅ 2. Get orderItems from the request body now
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // ✅ 3. Recalculate price on the server for security
    let calculatedTotalPrice = 0;
    const processedOrderItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const rentalDays = differenceInCalendarDays(endDate, startDate) + 1;
      
      const itemTotal = product.rentalPrice * item.quantity * rentalDays;
      calculatedTotalPrice += itemTotal;

      processedOrderItems.push({ ...item, price: product.rentalPrice });
    }

    const shippingCost = 50;
    calculatedTotalPrice += shippingCost;

    const order = new Order({
      user: req.user._id,
      orderItems: processedOrderItems,
      shippingAddress,
      paymentMethod,
      totalPrice: calculatedTotalPrice, // Use the server-calculated price
    });

    const createdOrder = await order.save();
    
    // In a full app, you would also clear only the specific items from the cart.
    // For now, we clear the whole cart.
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
