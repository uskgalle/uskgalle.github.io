'use client';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.badge}>✦ Urban Sketchers Galle ✦</p>

      <div className={styles.number} aria-hidden="true">#03</div>

      <div className={styles.titleWrap}>
        <h1 className={styles.title}>
          Sketch<br />
          <span className={styles.titleAccent}>Meet-Up</span>
        </h1>
      </div>

      <p className={styles.tagline}>Meet · Sketch · Share</p>

      <div className={styles.dots} aria-hidden="true">
        <div className={styles.dot} />
        <div className={`${styles.dot} ${styles.dotRust}`} />
        <div className={`${styles.dot} ${styles.dotSage}`} />
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <i className="fa-regular fa-calendar"></i>
          Sunday, 10th May 2026
        </span>
        <span className={styles.metaItem}>
          <i className="fa-regular fa-clock"></i>
          8.30 AM – 12.30 PM
        </span>
        <span className={styles.metaItem}>
          <i className="fa-solid fa-location-dot"></i>
          ART'O'SAN Gallery, Galle Fort
        </span>
      </div>

      <div className={styles.cta}>
        <a
          href="https://forms.gle/crcocgf98cX25bGo6"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnRegister}
        >
          Register Now
        </a>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollArrow} />
      </div>
    </section>
  );
}
