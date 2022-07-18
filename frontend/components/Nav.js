import Link from "next/link";

// Components
import Cart from "./Cart";

// Styles
import { NavStyles, NavItems, totalQuantities } from "../styles/NavStyles";

// Icons
import { FiShoppingBag } from "react-icons/fi";

// Context
import { useStateContext } from "../lib/context";

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <NavStyles>
      <Link href={"/"}>Bimch.</Link>

      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <span>{totalQuantities}</span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      {showCart && <Cart />}
    </NavStyles>
  );
}
