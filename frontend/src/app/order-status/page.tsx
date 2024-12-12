"use client";

import { useEffect } from "react";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

export default function OrderStatus() {
  useEffect(() => {
    // Animate label letters going up on focus
    const labels = document.querySelectorAll(`.${styles.formControl} label`);
    labels.forEach((label) => {
      if (label instanceof HTMLElement) {
        label.innerHTML = label.innerText
          .split("")
          .map(
            (letter, idx) =>
              `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
          )
          .join("");
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add order tracking logic here
    alert("Order tracking functionality will be implemented soon!");
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Track Your Order</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <input type="text" id="orderNumber" name="orderNumber" required />
            <label htmlFor="orderNumber">Order Number</label>
          </div>

          <div className={styles.formControl}>
            <input type="email" id="email" name="email" required />
            <label htmlFor="email">Email Address</label>
          </div>

          <button className={styles.btn}>Track Order</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
