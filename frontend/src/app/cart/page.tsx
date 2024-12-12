"use client";

import Link from "next/link";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import styles from "./styles.module.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Your Cart</h1>

        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.name} className={styles.cartItem}>
                <img
                  src={`/CS355 Project images/${item.name}.jpg`}
                  alt={item.name}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className={styles.itemQuantity}>
                    <i
                      className="fas fa-minus-circle decrease"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.name, item.quantity - 1);
                        }
                      }}
                    ></i>
                    <span className="quantity">{item.quantity}</span>
                    <i
                      className="fas fa-plus-circle increase"
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                    ></i>
                  </div>
                  <i
                    className={`fas fa-trash ${styles.trashIcon}`}
                    aria-label="Remove Item"
                    onClick={() => removeFromCart(item.name)}
                  ></i>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.cartSummary}>
          <h2>Total: ${total.toFixed(2)}</h2>
          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
