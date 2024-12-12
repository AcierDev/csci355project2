"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartCount = cart.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      );
      const cartCountElement = document.getElementById("cart-count");
      if (cartCountElement) {
        cartCountElement.textContent = cartCount.toString();
      }
    };

    // Handle navbar color change on scroll
    const handleScroll = () => {
      const navbar = document.querySelector("header");
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.backgroundColor = "#002a7f"; // Darker color after scrolling
        } else {
          navbar.style.backgroundColor = "#004aad"; // Default color
        }
      }
    };

    updateCartCount();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", (event) => {
      if (event.key === "cart") {
        updateCartCount();
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <h1>EGGTech</h1>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/events" className={styles.navLink}>
            Events
          </Link>
          <Link href="/sale" className={styles.navLink}>
            Sale
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact Us
          </Link>
          <Link href="/cart" className={styles.cart}>
            <i className="fas fa-shopping-cart"></i>
            <span id="cart-count" className={styles.cartCount}>
              0
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
