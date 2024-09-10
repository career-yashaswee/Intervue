// routes/stripeRoutes.js
const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripe");

// Define the route for creating a checkout session
router.post("/checkout", createCheckoutSession);

module.exports = router;
