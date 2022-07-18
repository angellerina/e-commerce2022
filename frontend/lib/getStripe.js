// Load instance of Stripe
import { loadStripe } from "@stripe/stripe-js";

let stripe;

const getStripe = async () => {
  // If not hooked up to Stripe
  if (!stripe) {
    // Load it up
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  // Once loaded up, return stripe acc
  return stripe;
};

export default getStripe;
