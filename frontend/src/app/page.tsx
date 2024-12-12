"use client";

import Link from "next/link";
import Image from "next/image";
import TestimonialSection from "./components/TestimonialSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <main>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1>Welcome to EGGTech</h1>
              <p>
                Discover cutting-edge tech at unbeatable prices, designed to
                elevate your digital life!
              </p>
              <Link href="/sale" className={styles.ctaBtn}>
                Shop Now
              </Link>
            </div>
            <div className={styles.floatingTechAnimations}>
              <div className={styles.techIcon} id="tech-icon1"></div>
              <div className={styles.techIcon} id="tech-icon2"></div>
              <div className={styles.techIcon} id="tech-icon3"></div>
            </div>
          </section>

          <AboutSection />
          <TestimonialSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}
