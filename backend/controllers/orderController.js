import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" });

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.rentalPrice * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalPrice,
      shippingAddress: req.body.shippingAddress,
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
