import { Provider, createClient } from "urql";

//Styles
import "../styles/globals.css";

// Components
import Nav from "../components/Nav";

// Context
import { StateContext } from "../lib/context";

// get auto replace during deployment
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    // Provider gives access to our graphQL backend from strapi
    // Allows all the data request we desire
    <StateContext>
      <Provider value={client}>
        {/* Render all diff pages created */}
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}

export default MyApp;
