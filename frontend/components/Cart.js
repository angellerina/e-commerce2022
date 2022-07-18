// Context
import { useStateContext } from "../lib/context";

// Styles
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Quantity,
} from "../styles/CartStyles";

// Icons
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function Cart() {
  const { cartItems, setShowCart } = useStateContext();

  return (
    <CartWrapper onClick={() => setShowCart(false)}>
      {/* onClick stop parent function from running */}
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>Empty cart!</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}

        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}</h3>

                  <Quantity>
                    <span>Quantity</span>
                    <button>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}</p>
                    <button>
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
      </CartStyle>
    </CartWrapper>
  );
}