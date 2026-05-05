'use client';
import { useEffect, useRef } from 'react';
import styles from './Programme.module.css';

const parts = [
  {
    number: '1',
    title: 'Start & Sketch',
    items: [
      'Mini sketching session at ART\'O\'SAN Gallery',
      'Warm-up exercises with simple, practical sketching techniques',
      'Continuing key learnings from Sketch Meet-Up #01 & #02',
    ],
  },
  {
    number: '2',
    title: 'Walk & Capture',
    items: [
      'Urban Sketch Walk through Galle Fort',
      'Visit 2–3 selected locations within the Fort',
      'Observe, explore, and sketch directly from life',
    ],
  },
  {
    number: '3',
    title: 'Urban Sketching Book Review',
    optional: true,
    time: '1:30 PM – 3:30 PM',
    items: [
      'Review and discuss selected Urban Sketchers publications',
      'Explore key ideas, sketching approaches, and city observation',
      'Short discussions and light guided exercises',
    ],
  },
];

export default function Programme() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add(styles.visible)),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.programme}>
      <div className={styles.inner}>
        <p className={styles.label}>Programme for the Day</p>
        <h2 className={styles.title}>
          How the day<br /><em>unfolds</em>
        </h2>

        <div className={styles.parts}>
          {parts.map((part, i) => (
            <div
              key={part.number}
              className={styles.card}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className={styles.partNumber}>{part.number}</div>
              <div className={styles.content}>
                {part.optional && (
                  <span className={styles.badge}>Optional · Separate Registration</span>
                )}
                <h3 className={styles.partTitle}>{part.title}</h3>
                {part.time && (
                  <p className={styles.partTime}>
                    <i className="fa-regular fa-clock"></i> {part.time}
                  </p>
                )}
                <ul className={styles.items}>
                  {part.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
