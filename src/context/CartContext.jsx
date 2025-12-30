import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const CART_KEY = "cart";
const savedCart = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  items: Array.isArray(JSON.parse(localStorage.getItem("cart"))) 
    ? JSON.parse(localStorage.getItem("cart")) 
    : [],
};

function cartReducer(state, action) {
  let updatedItems;
  switch (action.type) {
    case "ADD_TO_CART":
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        updatedItems = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems };

    case "UPDATE_QUANTITY":
      updatedItems = state.items.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
      );
      localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems };

    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems };

    case "CLEAR_CART":
      localStorage.removeItem(CART_KEY);
      return { items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;