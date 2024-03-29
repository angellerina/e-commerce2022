// Context
import { useStateContext } from "../lib/context";

// Stripe
import getStripe from "../lib/getStripe";

// Hot Toast Animation
import toast from "react-hot-toast";

import { useUser } from "@auth0/nextjs-auth0";

// Styles
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "../styles/CartStyles";

import { Quantity } from "../styles/ProductDetails";

// Icons
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

// Animation Variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export default function Cart() {
  const { user } = useUser();

  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  // Stripe Payment
  const handleCheckout = async () => {
    if (!user) {
      return notifyLogIn();
    } else {
      const stripe = await getStripe();
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.id });
    }
  };

  // Create a toast - notify to login before cart checkout
  const notifyLogIn = () => {
    toast.error("Please login before checking out", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      {/* onClick stop parent function from running */}
      <CartStyle
        layout
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Empty cart!</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card layout variants={card} key={item.anchobi}>
                  <img
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}$</h3>

                    <Quantity>
                      <span>Quantity</span>

                      <button>
                        <AiFillMinusCircle onClick={() => onRemove(item)} />
                      </button>
                      <p>{item.quantity}</p>

                      <button>
                        <AiFillPlusCircle onClick={() => onAdd(item, 1)} />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>

        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: ${totalPrice}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
