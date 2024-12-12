import express, { Application, Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";
import axios from "axios";
import dotenv from "dotenv";
import helmet from "helmet";

const app: Application = express();
const port = process.env.PORT || 5001;
console.log(`Port: ${port}`);

// Middleware

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGIN
      : "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: "../.env" });

console.log("Environment Variables:");
console.log("MONGO_URI:", process.env.MONGO_URI);

// Remove or modify these debug logs in production
// console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);
// console.log('STRIPE_PUBLIC_KEY', process.env.STRIPE_PUBLIC_KEY);
// console.log('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY);

app.use(helmet());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "";
console.log(`Mongo URI: ${mongoUri}`);
mongoose
  .connect(mongoUri, { dbName: "Topic2" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

// Stripe Payment
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// // Route to create a payment intent
// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent", error);
//     res.status(500).send({ error: error });
//   }
// });

// Route to fetch events using Google API
app.get("/api/events", async (req: Request, res: Response) => {
  const { zipcode } = req.query;

  if (!zipcode) {
    res.status(400).send({ error: "Zipcode is required" });
    return;
  }

  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const radius = 100 * 1609.34; // 100 miles in meters

    // Fetch latitude and longitude for the zipcode
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: zipcode,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const location = geocodeResponse.data.results[0]?.geometry.location;
    if (!location) {
      res.status(404).send({ error: "Invalid zipcode" });
      return;
    }

    const { lat, lng } = location;

    // Fetch nearby events or places
    const placesResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius,
          keyword: "tech events",
          key: GOOGLE_API_KEY,
        },
      }
    );

    res.send(placesResponse.data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .send({ error: "Unable to fetch events. Please try again later." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
