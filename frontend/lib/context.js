import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

// Children are rest of components wrapped within _app.js
export const StateContext = ({ children }) => {
  // Add data for state
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [qty, setQty] = useState(1);

  // Increase product quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <ShopContext.Provider
      value={{ qty, increaseQty, decreaseQty, showCart, setShowCart }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
