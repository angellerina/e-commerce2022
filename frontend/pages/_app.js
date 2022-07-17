import "../styles/globals.css";
import { Provider, createClient } from "urql";

// get auto replace during deployment
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    // Provider gives access to our graphQL backend from strapi
    // Allows all the data request we desire
    <Provider value={client}>
      {/* Render all diff pages created */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
