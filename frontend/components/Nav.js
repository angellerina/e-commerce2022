import Link from "next/link";

// Components
import Cart from "./Cart";

// Styles
import { NavStyles, NavItems } from "../styles/NavStyles";

// Icons
import { FiShoppingBag } from "react-icons/fi";

// Context
import { useStateContext } from "../lib/context";

export default function Nav() {
  const { showCart, setShowCart } = useStateContext();

  return (
    <NavStyles>
      <Link href={"/"}>Bimch.</Link>

      <NavItems>
        <div onClick={() => setShowCart(true)}>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      {showCart && <Cart />}
    </NavStyles>
  );
}
