import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <p className={styles.label}>About the Event</p>
        <h2 className={styles.title}>
          A morning inside<br />
          <em>the historic Fort</em>
        </h2>
        <p className={styles.body}>
          Join us for a relaxed and inspiring morning of sketching, walking, observing,
          and sharing together within the timeless streets of the Historic Galle Dutch Fort.
          Open to all — every age, every skill level, every medium.
        </p>

        <div className={styles.divider}>
          <svg viewBox="0 0 900 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 20 Q 80 8, 150 22 Q 220 36, 290 18 Q 360 4, 430 20 Q 500 36, 570 16 Q 640 2, 710 22 Q 780 38, 850 18 Q 880 12, 890 20"
              stroke="#8b6914"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className={styles.wavePath}
            />
          </svg>
        </div>

        <div className={styles.penDecor} aria-hidden="true">
          <svg width="120" height="40" viewBox="0 0 120 40">
            <line x1="10" y1="20" x2="100" y2="20" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M100 15 L112 20 L100 25 Z" fill="var(--ink)" />
            <circle cx="10" cy="20" r="3" fill="var(--sepia)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
