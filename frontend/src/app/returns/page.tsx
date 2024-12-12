"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

export default function Returns() {
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleStatusCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const orderNumber = formData.get("statusOrderNumber");
    // Mock status check - in real app, this would call an API
    setOrderStatus(
      `Order ${orderNumber} is currently being processed for return. Expected refund date: ${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString()}`
    );
  };

  return (
    <>
      <main className={styles.returnContainer}>
        <h1>Returns and Exchanges</h1>

        <section className={styles.returnBoxes}>
          <div className={styles.returnBoxWithLabel}>
            <h2 className={styles.returnLabel}>Start a Return</h2>
            <div
              className={styles.returnBox}
              onClick={() => setShowReturnForm(true)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowReturnForm(true);
                }
              }}
            >
              <h3 className={styles.title}>Ship it back to us</h3>
              <p className={styles.faqText}>
                Ship it for free with a prepaid UPS shipping label
              </p>
            </div>
          </div>

          <div className={styles.returnBoxWithLabel}>
            <h2 className={styles.returnLabel}>Check Your Return Status</h2>
            <div
              className={styles.returnStatusBox}
              onClick={() => setShowStatusForm(true)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowStatusForm(true);
                }
              }}
            >
              <h3 className={styles.title}>Return status</h3>
              <p className={styles.faqText}>See your return's progress</p>
            </div>
          </div>
        </section>

        {(showStatusForm || showReturnForm) && (
          <section className={styles.formOverlay}>
            <div className={styles.formContainer}>
              {showStatusForm && (
                <div className={styles.formContent}>
                  <div className={styles.formHeader}>
                    <h2>Check Return Status</h2>
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowStatusForm(false)}
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={handleStatusCheck}>
                    <div className={styles.formGroup}>
                      <label htmlFor="statusOrderNumber">Order Number:</label>
                      <input
                        type="text"
                        id="statusOrderNumber"
                        name="statusOrderNumber"
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                      Check Status
                    </button>
                  </form>
                  {orderStatus && (
                    <div className={styles.statusResult}>{orderStatus}</div>
                  )}
                </div>
              )}

              {showReturnForm && (
                <div className={styles.formContent}>
                  <div className={styles.formHeader}>
                    <h2>Start Your Return</h2>
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowReturnForm(false)}
                    >
                      ×
                    </button>
                  </div>
                  <form>
                    <div className={styles.formGroup}>
                      <label htmlFor="orderNumber">Order Number:</label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address:</label>
                      <input type="email" id="email" name="email" required />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="reason">Reason for Return:</label>
                      <select id="reason" name="reason" required>
                        <option value="">Select a reason</option>
                        <option value="wrong-item">Wrong item received</option>
                        <option value="defective">Item is defective</option>
                        <option value="not-needed">No longer needed</option>
                        <option value="not-as-described">
                          Not as described
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className={styles.buttonGroup}>
                      <button type="submit" className={styles.submitBtn}>
                        Submit Return Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        )}

        <section className={styles.returnPromise}>
          <div className={styles.textContent}>
            <h2>Our Promise</h2>
            <p className={styles.promiseParagraph}>
              At EGGTech, your satisfaction is our top priority. We are
              committed to delivering high-quality products and exceptional
              service. If for any reason you're not completely satisfied, we
              promise to make it right.
            </p>
          </div>
          <Image
            src="/CS355 Project images/EGGTech Logo.jpg"
            alt="EGGTech Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
        </section>

        <section className={styles.returnPeriod}>
          <h2>Return and Exchange Policy</h2>
          <hr />
          <p>
            We offer a 30-day return and exchange period from the date of
            purchase.
          </p>
          <ul>
            <li>Items must be in their original condition and packaging.</li>
            <li>
              Proof of purchase is required for all returns and exchanges.
            </li>
          </ul>
          <p>
            If you have any questions, feel free to{" "}
            <Link href="/contact">contact us here</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
