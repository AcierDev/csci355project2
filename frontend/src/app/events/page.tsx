"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

interface Event {
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (zipcode: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5001/api/events?zipcode=${zipcode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events. Please try again later.");
      }
      const data = await response.json();
      setEvents(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validateAndSearch = (zipcode: string) => {
    if (/^\d{5}$/.test(zipcode)) {
      handleSearch(zipcode);
    } else {
      alert("Please enter a valid 5-digit ZIP code.");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Explore Tech Events Near You</h1>
        <p>
          Enter your ZIP code below to find exciting tech events happening in
          your area!
        </p>
      </header>

      <main className={styles.eventsContainer}>
        <section className={styles.zipcodeSection}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Enter ZIP code"
            maxLength={5}
            pattern="\d{5}"
            title="Please enter a valid 5-digit ZIP code"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                const input = e.currentTarget as HTMLInputElement;
                validateAndSearch(input.value);
              }
            }}
          />
          <button
            className={styles.searchButton}
            onClick={(e) => {
              const input = e.currentTarget
                .previousElementSibling as HTMLInputElement;
              validateAndSearch(input.value);
            }}
          >
            Find Events
          </button>
        </section>

        <section id="results" className={styles.resultsContainer}>
          {loading && <p className={styles.message}>Loading events...</p>}
          {error && (
            <p className={`${styles.message} ${styles.error}`}>{error}</p>
          )}
          {!loading && !error && events.length === 0 && (
            <p className={styles.message}>
              No events found. Try searching with a ZIP code.
            </p>
          )}
          {!loading && !error && events.length > 0 && (
            <div className={styles.eventGrid}>
              {events.map((event, index) => (
                <div key={index} className={styles.eventCard}>
                  <h2>{event.name || "Unnamed Event"}</h2>
                  <p>Location: {event.vicinity || "Unknown"}</p>
                  {event.rating && (
                    <p>
                      Rating: {event.rating} ({event.user_ratings_total || 0}{" "}
                      reviews)
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
