"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import styles from "./styles.module.css";

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What products do you offer?",
      answer:
        "We offer a wide range of tech products including laptops, smartphones, tablets, accessories, and more.",
      isOpen: false,
    },
    {
      question: "What is the return policy?",
      answer:
        "Our return policy allows returns within 30 days of purchase for a full refund or exchange, provided the item is in its original condition.",
      isOpen: false,
    },
    {
      question: "How long will it take to process my refund?",
      answer:
        "Refunds typically take 5-7 business days to process once the returned item is received.",
      isOpen: false,
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing an order, you'll receive a confirmation email with tracking details.",
      isOpen: false,
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping usually takes 3-5 business days.",
      isOpen: false,
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "Orders can be canceled within 24 hours of placing the order.",
      isOpen: false,
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, AMEX).",
      isOpen: false,
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping fees and delivery times may vary depending on the destination.",
      isOpen: false,
    },
    {
      question: "Is there a warranty on your products?",
      answer:
        "Yes, all our products come with a manufacturer's warranty. Warranty periods may vary based on the product. Please check individual product details for specific information.",
      isOpen: false,
    },
    {
      question: "Can I change my delivery address after placing an order?",
      answer:
        "You can change your delivery address within 24 hours of placing the order by contacting our customer service team.",
      isOpen: false,
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via our Contact Us page, by phone, or through live chat available on our website.",
      isOpen: false,
    },
    {
      question: "What should I do if I receive a damaged or defective item?",
      answer:
        "If you receive a damaged or defective item, please contact our customer support team immediately for assistance with a replacement or refund.",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : faq.isOpen,
      }))
    );
  };

  return (
    <>
      <div className={styles.faqContainer}>
        <header className={styles.faqHeader}>
          <h1>Frequently Asked Questions</h1>
        </header>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faq} ${faq.isOpen ? styles.active : ""}`}
            >
              <h3 className={styles.faqTitle}>{faq.question}</h3>
              <p className={styles.faqText}>{faq.answer}</p>
              <button
                className={styles.faqToggle}
                onClick={() => toggleFAQ(index)}
                aria-label={faq.isOpen ? "Close answer" : "Show answer"}
              >
                <i
                  className={`fas ${
                    faq.isOpen ? "fa-times" : "fa-chevron-down"
                  }`}
                ></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
