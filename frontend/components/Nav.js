import Link from "next/link";

// Styles
import { NavStyles, NavItems } from "../styles/NavStyles";

// Icons
import { FiShoppingBag } from "react-icons/fi";

export default function Nav() {
  return (
    <NavStyles>
      <Link href={"/"}>Bimch.</Link>

      <NavItems>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
    </NavStyles>
  );
}
