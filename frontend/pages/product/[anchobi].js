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

export default function ProductDetails() {
  // UseState
  const { qty, increaseQty, decreaseQty } = useStateContext();

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

        <Buy>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
