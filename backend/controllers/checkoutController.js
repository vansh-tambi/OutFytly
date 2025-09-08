import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

// @desc    Checkout and create order
// @route   POST /api/checkout
// @access  Private
export const checkout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // 1️⃣ Get user cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "title rentalPrice"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Calculate total
    const totalPrice = cart.items.reduce(
      (sum, i) => sum + i.product.rentalPrice * i.quantity,
      0
    );

    // 3️⃣ Create order
    const order = new Order({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        size: i.size,
        quantity: i.quantity,
      })),
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Processing",
    });

    await order.save();

    // 4️⃣ Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
