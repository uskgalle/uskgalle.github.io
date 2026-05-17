import styles from './RecentSketches.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const sketches = [
  { id: 1, artist: 'Amara Perera', location: 'Clock Tower, Galle Fort', medium: 'Watercolour', color: '#d4c5a9', aspect: 'tall' },
  { id: 2, artist: 'Roshan Silva', location: 'Unawatuna Beach', medium: 'Pen & Wash', color: '#b5c4b1', aspect: 'wide' },
  { id: 3, artist: 'Dilini Fernando', location: 'Galle Market', medium: 'Colour Pencil', color: '#c4b5c0', aspect: 'wide' },
  { id: 4, artist: 'Namal Fernando', location: 'Dutch Reformed Church', medium: 'Digital', color: '#b5bdc4', aspect: 'tall' },
  { id: 5, artist: 'Amara Perera', location: 'Rumassala Jungle Path', medium: 'Ink', color: '#c4c0a8', aspect: 'square' },
  { id: 6, artist: 'Roshan Silva', location: 'Galle Lighthouse', medium: 'Watercolour', color: '#c4a8a8', aspect: 'square' },
];

export default function RecentSketches() {
  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>From the Sketchbooks</span>
          <h2 className={styles.title}>Recent Sketches</h2>
          <p className={styles.subtitle}>
            A glimpse into what our members have been drawing across Galle and beyond. [This Section Is Under Construction]
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className={styles.grid}>
          {sketches.map((s) => (
            <div key={s.id} className={`${styles.sketchCard} ${styles[s.aspect]}`}>
              {/* Placeholder — replace with <Image> when you have real assets */}
              <div className={styles.sketchImg} style={{ backgroundColor: s.color }} />
              <div className={styles.overlay}>
                <p className={styles.overlayArtist}>{s.artist}</p>
                <p className={styles.overlayLocation}>{s.location}</p>
                <span className={styles.overlayMedium}>{s.medium}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="#gallery" className={styles.viewAllBtn}>
            View Full Gallery <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>

      </div>
    </section>
  );
}
