import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";

// Components
import Product from "../components/Product";

// Styles
import { Gallery } from "../styles/Gallery";

export default function Home() {
  // Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  // Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  // Get products data
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Peach. Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Gallery>
          {products.map((product) => (
            <Product key={product.attributes.anchobi} product={product} />
          ))}
        </Gallery>
      </main>
    </div>
  );
}
