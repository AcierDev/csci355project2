"use client";

import { FormEvent, useState } from "react";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  income: string;
  ssn: string;
}

export default function CreditCard() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    income: "",
    ssn: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Credit Card Application:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.successMessage}>
            <h2>Thank You for Your Application!</h2>
            <p>We will review your application and contact you soon.</p>
            <a href="/" className={styles.backButton}>
              Return to Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Apply for EGGTech Credit Card</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={styles.input}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={styles.input}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.input}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.label}>
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={styles.input}
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="state" className={styles.label}>
              State:
            </label>
            <select
              id="state"
              name="state"
              className={styles.select}
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="NY">New York</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              {/* Add more states */}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="zip" className={styles.label}>
              ZIP Code:
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              className={styles.input}
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="income" className={styles.label}>
              Annual Income:
            </label>
            <input
              type="text"
              id="income"
              name="income"
              className={styles.input}
              value={formData.income}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ssn" className={styles.label}>
              Social Security Number:
            </label>
            <input
              type="password"
              id="ssn"
              name="ssn"
              className={styles.input}
              value={formData.ssn}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Application
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
