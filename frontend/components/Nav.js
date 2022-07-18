import Link from "next/link";

// Components
import Cart from "./Cart";

// Styles
import { NavStyles, NavItems } from "../styles/NavStyles";

// Icons
import { FiShoppingBag } from "react-icons/fi";

// Context
import { useStateContext } from "../lib/context";

// Animation
const { AnimatePresence } = require("framer-motion");
const { motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <NavStyles>
      <Link href={"/"}>Peach.</Link>

      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence> {showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
