'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import BlurImage from '@/components/BlurImage/BlurImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faUsers,
  faLocationDot,
  faPencil,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faUsers,
    title: 'A Creative Community',
    desc: 'We are a friendly bunch of people who sketch, share and inspire each other.',
  },
  {
    icon: faLocationDot,
    title: 'Sketch On Location',
    desc: 'From street corners to sea views, we sketch the real places around us.',
  },
  {
    icon: faPencil,
    title: 'All are Welcome',
    desc: 'Whether you’re a beginner or a professional, everyone is welcome to sketch with us.',
  },
  {
    icon: faImage,
    title: 'Share & Inspire',
    desc: 'We share our sketches, stories and experiences to inspire our community.',
  },
];

// Rich pool of genuine USK Galle sketches and meetup moments
const ALL_HERO_IMAGES = [
  '/artworks-images/yasith-arangala/1.png',
  '/gallery-images/meet-up-04/1.png',
  '/gallery-images/meet-up-01/1.jpg',
  '/artworks-images/sumudu-udari/1.png',
  '/gallery-images/meet-up-04/8.png',
  '/gallery-images/meet-up-01/12.jpg',
  '/artworks-images/nimthaka-jayavihan/1.png',
  '/gallery-images/meet-up-04/3.png',
  '/gallery-images/meet-up-01/21.jpg',
  '/artworks-images/yasith-arangala/2.png',
  '/gallery-images/meet-up-04/17.png',
  '/gallery-images/meet-up-01/7.jpg',
  '/artworks-images/lakshana-samadhi/1.png',
  '/gallery-images/meet-up-04/21.png',
  '/gallery-images/meet-up-01/25.jpg',
  '/artworks-images/sachith-vithanage/1.png',
  '/gallery-images/meet-up-04/7.png',
  '/gallery-images/meet-up-01/34.jpg',
  '/artworks-images/yasith-arangala/3.png',
  '/gallery-images/meet-up-04/14.png',
  '/gallery-images/meet-up-01/16.jpg',
  '/gallery-images/meet-up-04/25.png',
  '/gallery-images/meet-up-01/27.jpg',
  '/gallery-images/meet-up-04/9.png',
];

// Initial deterministic slices for SSR / Hydration safety
const initialCol1 = ALL_HERO_IMAGES.slice(0, 8);
const initialCol2 = ALL_HERO_IMAGES.slice(8, 16);
const initialCol3 = ALL_HERO_IMAGES.slice(16, 24);

export default function Hero() {
  const [columns, setColumns] = useState({
    col1: initialCol1,
    col2: initialCol2,
    col3: initialCol3,
  });

  // Randomize images safely on client mount
  useEffect(() => {
    const shuffled = [...ALL_HERO_IMAGES].sort(() => Math.random() - 0.5);
    const count = Math.floor(shuffled.length / 3);
    setColumns({
      col1: shuffled.slice(0, count),
      col2: shuffled.slice(count, count * 2),
      col3: shuffled.slice(count * 2),
    });
  }, []);

  return (
    <>
      {/* ── Split hero ── */}
      <section className={styles.hero}>

        {/* Gallery Column (Desktop: Left, Mobile: Bottom) */}
        <div className={styles.imageCol} aria-label="Community sketches gallery">
          <div className={styles.topVignette} />
          <div className={styles.bottomVignette} />

          <div className={styles.marqueeStage}>
            {/* Column 1: Scrolls Up */}
            <div className={styles.marqueeColumn}>
              <div className={styles.marqueeTrackUp}>
                {columns.col1.concat(columns.col1).map((src, idx) => (
                  <div key={`c1-${idx}`} className={styles.sketchCard}>
                    <BlurImage
                      src={src}
                      alt="USK Galle sketch"
                      aspectRatio="1/1"
                      className={styles.blurWrap}
                      imgClassName={styles.sketchImg}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Scrolls Down */}
            <div className={styles.marqueeColumn}>
              <div className={styles.marqueeTrackDown}>
                {columns.col2.concat(columns.col2).map((src, idx) => (
                  <div key={`c2-${idx}`} className={styles.sketchCard}>
                    <BlurImage
                      src={src}
                      alt="USK Galle sketch"
                      aspectRatio="1/1"
                      className={styles.blurWrap}
                      imgClassName={styles.sketchImg}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Scrolls Up (Wide Screens) */}
            <div className={`${styles.marqueeColumn} ${styles.col3}`}>
              <div className={styles.marqueeTrackUpFast}>
                {columns.col3.concat(columns.col3).map((src, idx) => (
                  <div key={`c3-${idx}`} className={styles.sketchCard}>
                    <BlurImage
                      src={src}
                      alt="USK Galle sketch"
                      aspectRatio="1/1"
                      className={styles.blurWrap}
                      imgClassName={styles.sketchImg}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text Column (Desktop: Right, Mobile: Top) */}
        <div className={styles.textCol}>
          <h1 className={styles.headline}>
            <span className={styles.headlineBold}>We sketch<br />the world around us.</span>
            <span className={styles.headlineCursive}>One drawing at a time.</span>
          </h1>

          <p className={styles.body}>
            We are <b>Urban Sketchers Galle</b>, a community that meets up to explore and sketch interesting urban spaces around our city.
          </p>

          <div className={styles.ctas}>
            <a href="#events" className={styles.primaryBtn}>
              <FontAwesomeIcon icon={faCalendarDays} />
              Upcoming Events
            </a>
            <a href="#join" className={styles.secondaryBtn}>
              Join Our Community
            </a>
          </div>
        </div>

      </section>

      {/* ── Feature strip ── */}
      <section className={styles.featureStrip}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FontAwesomeIcon icon={f.icon} />
            </div>
            <div className={styles.featureText}>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}