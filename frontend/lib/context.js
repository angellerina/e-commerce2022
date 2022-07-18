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

  // Add product to cart
  const onAdd = (product, quantity) => {
    //   Check if the product is already in the cart array
    const exist = cartItems.find((item) => item.anchobi === product.anchobi);

    // If target product in cart array, loop over the cart array
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          // Match target product to existing product in cart array
          item.anchobi === product.slug
            ? // Spread the properties, but only updating the quantity
              { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      // Keep current items in cart
      // Add new product with new quantity
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
