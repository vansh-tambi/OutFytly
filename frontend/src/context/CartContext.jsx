import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item is already in cart
      const existingItem = state.find(item => item.id === action.payload.id && item.size === action.payload.size);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id || item.size !== action.payload.size);
      
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: Math.max(1, action.payload.quantity) } // Ensure quantity is at least 1
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);