"use client";

import { useState, useEffect } from "react";
import styles from "./TestimonialSection.module.css";

const testimonials = [
  {
    name: "Miyah Myles",
    photo: "https://randomuser.me/api/portraits/women/46.jpg",
    text: "EGGTech has become my go-to for tech advice and product comparisons!",
  },
  {
    name: "John Doe",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    text: "Excellent service and reliable products. Highly recommend EGGTech!",
  },
  {
    name: "Jane Smith",
    photo: "https://images.unsplash.com/photo-1548142813-9b1a1a4d8551",
    text: "A seamless shopping experience with top-notch customer support.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <>
      <section className={styles.border}>
        <div>Read the testimonials of our satisfied customers:</div>
      </section>
      <div className={styles.testimonialContainer}>
        <div key={key} className={styles.progressBar}></div>
        <div className={styles.faQuote + " " + styles.faQuoteRight}>❝</div>
        <div className={styles.faQuote + " " + styles.faQuoteLeft}>❞</div>
        <p className={styles.testimonial}>{current.text}</p>
        <div className={styles.user}>
          <img src={current.photo} alt="user" className={styles.userImage} />
          <div className={styles.userDetails}>
            <h4 className={styles.username}>{current.name}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
