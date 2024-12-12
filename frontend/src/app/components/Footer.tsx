import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <section className={styles.footerSection}>
          <h2>About Us</h2>
          <p>
            EGGTech is your premier destination for cutting-edge technology and
            electronics. We're committed to bringing you the latest innovations
            at competitive prices.
          </p>
        </section>

        <section className={styles.footerSection}>
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sale">Sale</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/credit-card">EGGTech Card</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </section>

        <section className={styles.footerSection}>
          <h2>Customer Service</h2>
          <ul>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/shipping">Shipping Info</Link>
            </li>
            <li>
              <Link href="/returns">Returns</Link>
            </li>
            <li>
              <Link href="/order-status">Order Status</Link>
            </li>
          </ul>
        </section>

        <section className={styles.footerSection}>
          <h2>Connect With Us</h2>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>
      </div>

      <div className={styles.footerBottom}>
        <p>
          © 2024 EGGTech. Created by Roni Mikhaylov, Esteban Mesa, Toufiq
          Hossian, Jin H Chen, Hannah Zahler
        </p>
      </div>
    </footer>
  );
}
