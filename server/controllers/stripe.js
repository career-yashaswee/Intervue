// controllers/stripeController.js
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key from the .env file

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", // Change to your currency
            product_data: {
              name: "Intervue 100K Credits", // Replace with your product name
            },
            unit_amount: 2000, // Price in cents, e.g., $20.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`, // URL to redirect after success
      cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL to redirect after cancellation
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
