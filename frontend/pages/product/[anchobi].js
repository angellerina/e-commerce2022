import React, { useEffect } from "react";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";

// Styles
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";

// Icons
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

// Context
import { useStateContext } from "../../lib/context";

// Hot Toast Animation
import toast from "react-hot-toast";

export default function ProductDetails() {
  // UseState
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  // Reset quantity number on every page load
  useEffect(() => {
    setQty(1);
  }, []);

  // Fetch anchobi data
  const { query } = useRouter();

  // Fetch GraphQL Data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { anchobi: query.anchobi },
  });

  const { data, fetching, error } = results;

  // Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  // Deconstruct data
  const { title, description, image } = data.products.data[0].attributes;

  // Create a toast - notify item added to cart
  const notify = () => {
    toast.success(
      `${title} 
    added to your cart!`,
      {
        duration: 1500,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />

      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>Quantity</span>

          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>

          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>

        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
