import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "title images rentalPrice user"
    );
    
    if (!cart) {
      return res.status(200).json({ user: req.user._id, items: [] });
    }
    
    // Filter out items where the product was deleted (product is null after populate)
    const validItems = cart.items.filter(item => item.product != null);
    
    // If some products were deleted, we might want to update the cart, but for a GET request, just returning valid items is safer.
    cart.items = validItems;
    
    res.status(200).json(cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Failed to fetch cart. Please try again later." });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { product, size, quantity, startDate, endDate } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === product && i.size === size
    );

    if (itemIndex > -1) {
      // In a real rental app, you'd check for date conflicts before increasing quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, size, quantity, startDate, endDate });
    }

    await cart.save();
    await cart.populate("items.product", "title images rentalPrice user");
    res.status(201).json(cart);
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      await cart.populate("items.product", "title images rentalPrice user");
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("UPDATE QUANTITY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i._id.toString() !== req.params.itemId
    );
    await cart.save();
    await cart.populate("items.product", "title images rentalPrice user");
    res.json(cart);
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};