'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={styles.card}>

      {/* Dismiss */}
      <button
        className={styles.close}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      {/* Top row — label + dot */}
      <div className={styles.topRow}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>Next Sketch Meet</span>
      </div>

      {/* Event name */}
      <p className={styles.event}>
        Sketch Meet-Up #4
      </p>

      {/* Date */}
      <div className={styles.meta}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <span>Jun 07 · 8:30 AM</span>
      </div>

      {/* CTA */}
      <a href="#join" className={styles.cta}>
        Register Now
        <FontAwesomeIcon icon={faArrowRight} className={styles.ctaIcon} />
      </a>

    </div>
  );
}