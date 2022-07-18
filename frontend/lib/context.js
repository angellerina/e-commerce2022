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
          item.anchobi === product.anchobi
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

  // Remove product
  const onRemove = (product) => {
    //   Check if the product is already in the cart array
    const exist = cartItems.find((item) => item.anchobi === product.anchobi);

    if (exist.quantity === 1) {
      // If target product with 1 qty does not match product in cart array, remove product
      setCartItems(
        cartItems.filter((item) => item.anchobi !== product.anchobi)
      );
    } else {
      // Map over all items in cart array
      setCartItems(
        cartItems.map((item) =>
          // if target product found, update ONLY the quantity by decreasing it by 1
          item.anchobi === product.anchobi
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
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
        onRemove,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
