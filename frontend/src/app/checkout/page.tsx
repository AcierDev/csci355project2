"use client";

import { useState, FormEvent } from "react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import styles from "./styles.module.css";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  paymentMethod: "credit" | "paypal";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "credit",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <>
        <div className={styles.checkoutContainer}>
          <div className={styles.successMessage}>
            <h2>Thank you for your purchase, {formData.fullName}!</h2>
            <p>Your order has been successfully placed.</p>
            <a href="/">Return to Home</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={styles.checkoutContainer}>
        <h1>Checkout</h1>
        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <h2>Billing Information</h2>

          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />

          <h2>Payment Information</h2>

          <div className={styles.paymentMethod}>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === "credit"}
                onChange={handleChange}
              />
              Credit Card
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              PayPal
            </label>
          </div>

          {formData.paymentMethod === "credit" && (
            <>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />

              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />

              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            {cart.map((item) => (
              <div key={item.name} className={styles.orderItem}>
                <h3>
                  {item.name} x {item.quantity}
                </h3>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className={styles.totalAmount}>
              <h3>Total:</h3>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
