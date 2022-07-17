import { ProductSyles } from "../styles/ProductStyle";

export default function Product({ product }) {
  // Deconstruct data from props
  const { title, price, image } = product.attributes;

  return (
    <ProductSyles>
      <div>
        <img src={image.data.attributes.formats.small.url} alt="cover" />
      </div>

      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductSyles>
  );
}
