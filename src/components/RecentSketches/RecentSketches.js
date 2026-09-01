import Link from 'next/link';
import styles from './RecentSketches.module.css';
import BlurImage from '../BlurImage/BlurImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getAllArtworks } from '../../app/data/artists';

export default function RecentSketches() {
  const allArtworks = getAllArtworks();
  const displaySketches = allArtworks.slice(0, 6);

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>From the Sketchbooks</span>
          <h2 className={styles.title}>Recent Sketches</h2>
          <p className={styles.subtitle}>
            A glimpse into what our members have been drawing across Galle and beyond.
          </p>
        </div>

        {/* Gallery of sketches using recap gallery style */}
        <div className={styles.gallery}>
          {displaySketches.map((s) => (
            <div key={s.id} className={styles.imgWrap}>
              <BlurImage src={s.src} alt={s.title} loading="lazy" />
              <div className={styles.overlay}>
                {s.title && <h3 className={styles.overlayTitle}>{s.title}</h3>}
                <p className={styles.overlayArtist}>by {s.artistName}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/gallery" className={styles.viewAllBtn}>
            View Full Gallery <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>

      </div>
    </section>
  );
}
