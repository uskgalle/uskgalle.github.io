'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import BlurImage from '../BlurImage/BlurImage';
import styles from './RecentSketches.module.css';

export default function RecentSketchesGallery({ sketches }) {
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const cards = Array.from(gallery.children);
    let frame;

    // One-pixel grid rows let the browser pack natural-height images into
    // the first available column, rather than balancing separate CSS columns.
    function arrange() {
      const gap = parseFloat(getComputedStyle(gallery).getPropertyValue('--sketch-gap'));
      cards.forEach(card => {
        card.style.gridRowEnd = `span ${Math.ceil(card.getBoundingClientRect().height + gap)}`;
      });
    }

    gallery.dataset.masonry = 'true';
    arrange();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(arrange);
    });
    // Repack when an image loads or responsive columns change card widths.
    cards.forEach(card => observer.observe(card));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      delete gallery.dataset.masonry;
    };
  }, [sketches]);

  return (
    <div ref={galleryRef} className={styles.gallery}>
      {sketches.map(sketch => (
        <Link key={sketch.id} href={`/artists/${sketch.artistSlug}`} className={styles.imgWrap} aria-label={`${sketch.title} by ${sketch.artistName} — view artist`}>
          <BlurImage src={sketch.src} alt={sketch.title} loading="lazy" className={styles.thumbnail} />
        </Link>
      ))}
    </div>
  );
}
