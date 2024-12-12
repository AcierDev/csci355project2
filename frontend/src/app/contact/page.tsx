"use client";

import { useState, FormEvent } from "react";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

interface Location {
  name: string;
  image: string;
  address: string;
}

export default function Contact() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const locations: Location[] = [
    {
      name: "Dallas",
      image: "/CS355 Project images/dallas.jpg",
      address:
        "Located in: Galleria Dallas, 13350 Dallas Pkwy, Dallas, TX 75240",
    },
    {
      name: "New York",
      image: "/CS355 Project images/NYC.jpeg",
      address: "767 5th Ave, New York, NY 10153",
    },
    {
      name: "San Francisco",
      image: "/CS355 Project images/SanFran.jpg",
      address: "300 Post St, San Francisco, CA 94108",
    },
    {
      name: "Miami",
      image: "/CS355 Project images/miami.jpg",
      address: "701 S Miami Ave, Miami, FL 33130",
    },
    {
      name: "Los Angeles",
      image: "/CS355 Project images/LA.webp",
      address: "802 S Broadway, Los Angeles, CA 90014",
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Here you would typically send the form data to your backend
    console.log({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    // Clear form
    e.currentTarget.reset();
    alert("Message sent successfully!");
  };

  return (
    <>
      <section className={styles.contactBanner}>
        <div className={styles.bannerContent}>
          <h2>Connect with EGGTech</h2>
          <p>Your go-to tech team is just a message away!</p>
        </div>
      </section>

      <main className={styles.contactContainer}>
        <div className={styles.contactFormSection}>
          <h1 className={styles.contactTitle}>Get in Touch</h1>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>

        <div className={styles.locationsContainer}>
          <h2 className={styles.locationsTitle}>Our Locations</h2>
          <div className={styles.locations}>
            {locations.map((location) => (
              <div
                key={location.name}
                className={`${styles.card} ${
                  activeLocation === location.name ? styles.active : ""
                }`}
                style={{ backgroundImage: `url(${location.image})` }}
                onClick={() => setActiveLocation(location.name)}
              >
                <h3>{location.name}</h3>
              </div>
            ))}
          </div>
          {activeLocation && (
            <div className={`${styles.locationInfo} ${styles.show}`}>
              {locations.find((loc) => loc.name === activeLocation)?.address}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
