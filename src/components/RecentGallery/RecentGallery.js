import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BlurImage from '../BlurImage/BlurImage';
import { getRecapGallery } from '../../app/data/recap-gallery';
import styles from '../RecentSketches/RecentSketches.module.css';

export default function RecentGallery() {
  const { images, meetups } = getRecapGallery();
  const latestMeet = meetups[0];
  if (!latestMeet) return null;

  const eventPhotos = images.filter(image => image.event === latestMeet.slug);
  const count = Math.min(12, eventPhotos.length);
  const photos = Array.from({ length: count }, (_, index) =>
    eventPhotos[Math.floor(index * eventPhotos.length / count)]);
  const galleryUrl = `/gallery/${latestMeet.gallerySlug}`;

  return (
    <section className={styles.section} id="recent-gallery" aria-labelledby="recent-gallery-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Beyond the Sketchbooks</span>
          <h2 className={styles.title} id="recent-gallery-title">Latest Meet</h2>
          <p className={styles.subtitle}>
            A few moments of drawing, discovering and sharing together at {latestMeet.title}.
          </p>
        </div>
        <div className={styles.gallery}>
          {photos.map((photo, index) => (
            <Link key={photo.id} href={galleryUrl} className={styles.imgWrap}
              aria-label={`${latestMeet.title}, photo ${index + 1} — view gallery`}>
              <BlurImage src={photo.src} alt={`Community moment from ${latestMeet.title}, photo ${index + 1}`}
                loading="lazy" className={styles.thumbnail} />
            </Link>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link href="/gallery" className={styles.viewAllBtn}>
            Explore the Gallery <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
}
