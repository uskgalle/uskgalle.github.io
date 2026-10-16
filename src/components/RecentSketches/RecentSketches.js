import Link from 'next/link';
import styles from './RecentSketches.module.css';
import RecentSketchesGallery from './RecentSketchesGallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getAllArtworks } from '../../app/data/artists';
import { newestArtworksFirst } from '../../app/data/artwork-order';

export default function RecentSketches() {
  const allArtworks = getAllArtworks();
  const displaySketches = newestArtworksFirst(allArtworks).slice(0, 12);

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

        <RecentSketchesGallery sketches={displaySketches} />

        <div className={styles.viewAll}>
          <Link href="/artworks" className={styles.viewAllBtn}>
            View All Artworks <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>

      </div>
    </section>
  );
}
