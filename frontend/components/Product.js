import Link from "next/link";

// Styles
import { ProductSyles } from "../styles/ProductStyle";

export default function Product({ product }) {
  // Deconstruct data from props
  const { title, price, image, anchobi } = product.attributes;

  return (
    <ProductSyles>
      <Link href={`/product/${anchobi}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt="cover" />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductSyles>
  );
}
