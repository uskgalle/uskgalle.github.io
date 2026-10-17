'use client';

import { useState } from 'react';
import BlurImage from '../../../components/BlurImage/BlurImage';
import ImageLightbox from '../../../components/ImageLightbox/ImageLightbox';
import styles from './event-galleries.module.css';

export default function EventGalleries({ photos, artworks }) {
  const [active, setActive] = useState(null);
  const images = [...photos, ...artworks];
  return <>
    {[{ title: 'Photos from the morning', items: photos, offset: 0 },
      { title: 'Sketches from the meet', items: artworks, offset: photos.length }].map(group => (
      group.items.length > 0 && <section className={styles.section} key={group.title} aria-label={group.title}>
        <h2 className={styles.heading}>{group.title} <span>({group.items.length})</span></h2>
        <div className={styles.gallery}>
          {group.items.map((image, index) => <button type="button" key={image.id} className={styles.imageButton}
            onClick={() => setActive(group.offset + index)} aria-label={`Open ${image.title || 'photo'} ${index + 1}`}>
            <BlurImage src={image.src} alt={image.title || `Event photo ${index + 1}`} loading="lazy" />
          </button>)}
        </div>
      </section>
    ))}
    <ImageLightbox images={images} activeIndex={active} onClose={() => setActive(null)}
      onNext={() => setActive(index => (index + 1) % images.length)}
      onPrev={() => setActive(index => (index - 1 + images.length) % images.length)} />
  </>;
}
