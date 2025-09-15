import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getCart, addItemToCart, removeItemFromCart, updateItemQuantity } from '../api/cartService';
import toast from 'react-hot-toast';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const cartData = await getCart();
          dispatch({ type: 'SET_CART', payload: cartData });
        } catch (error) {
          toast.error("Failed to load cart.");
        } finally {
          setLoading(false);
        }
      } else {
        dispatch({ type: 'SET_CART', payload: { items: [] } });
        setLoading(false);
      }
    };
    loadCart();
  }, [user]);
  
  const addItem = async (itemData) => {
    try {
      const updatedCart = await addItemToCart(itemData);
      dispatch({ type: 'SET_CART', payload: updatedCart });
      toast.success('Item added to cart!');
    } catch (error) {
      toast.error(error.message || 'Could not add item to cart.');
      throw error;
    }
  };
  
  const removeItem = async (itemId) => {
    try {
      // ✅ THE FIX: Don't destructure { data: ... }
      const updatedCart = await removeItemFromCart(itemId);
      dispatch({ type: 'SET_CART', payload: updatedCart });
      toast.success('Item removed from cart.');
    } catch (error) {
      toast.error('Could not remove item.');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      return removeItem(itemId);
    }
    try {
      // ✅ THE FIX: Don't destructure { data: ... }
      const updatedCart = await updateItemQuantity(itemId, quantity);
      dispatch({ type: 'SET_CART', payload: updatedCart });
    } catch (error) {
      toast.error('Could not update quantity.');
    }
  };
  
  const value = { cart, loading, addItem, removeItem, updateQuantity };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};