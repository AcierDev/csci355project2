import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutContent}>
        <div className={styles.aboutInfo}>
          <h2>About EGGTech</h2>
          <p>
            At EGGTech, we're passionate about bringing you the latest
            innovations in technology. From top-tier gadgets to everyday tech
            essentials, we ensure quality and performance with every product.
          </p>
        </div>
        <div className={styles.aboutIcons}>
          <div className={styles.aboutIcon}>
            <i className="bi bi-lightning-fill"></i>
            <p>Innovation</p>
          </div>
          <div className={styles.aboutIcon}>
            <i className="bi bi-shield-fill-check"></i>
            <p>Quality</p>
          </div>
          <div className={styles.aboutIcon}>
            <i className="bi bi-people-fill"></i>
            <p>Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}
