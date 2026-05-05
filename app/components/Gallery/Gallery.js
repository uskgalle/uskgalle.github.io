'use client';
import { useState } from 'react';
import styles from './Gallery.module.css';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Gallery() {
  const [active, setActive] = useState(null);

  const prev = () => setActive((a) => (a === 1 ? 10 : a - 1));
  const next = () => setActive((a) => (a === 10 ? 1 : a + 1));

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setActive(null);
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.inner}>
        <p className={styles.label}>From Past Events</p>
        <h2 className={styles.title}>
          Sketches &amp; moments<br /><em>captured</em>
        </h2>

        <div className={styles.grid}>
          {images.map((num) => (
            <div className={styles.item} key={num} onClick={() => setActive(num)}>
              <img
                src={`/gallery-images/${num}.jpg`}
                alt={`Urban Sketchers Galle – photo ${num}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active !== null && (
        <div
          className={styles.overlay}
          onClick={() => setActive(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          autoFocus
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setActive(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button className={styles.navBtn} onClick={prev}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <img
              src={`/gallery-images/${active}.jpg`}
              alt={`Urban Sketchers Galle – photo ${active}`}
              className={styles.modalImg}
            />
            <button className={`${styles.navBtn} ${styles.navRight}`} onClick={next}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className={styles.counter}>{active} / {images.length}</div>
          </div>
        </div>
      )}
    </section>
  );
}