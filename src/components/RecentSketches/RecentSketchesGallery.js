import Link from 'next/link';
import BlurImage from '../BlurImage/BlurImage';
import styles from './RecentSketches.module.css';

export default function RecentSketchesGallery({ sketches }) {
  return (
    <div className={styles.gallery}>
      {sketches.map(sketch => (
        <Link key={sketch.id} href={`/artists/${sketch.artistSlug}`} className={styles.imgWrap} aria-label={`${sketch.title} by ${sketch.artistName} — view artist`}>
          <BlurImage src={sketch.src} alt={sketch.title} loading="lazy" className={styles.thumbnail} />
        </Link>
      ))}
    </div>
  );
}
