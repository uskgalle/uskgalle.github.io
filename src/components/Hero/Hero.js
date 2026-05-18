import styles from './Hero.module.css';
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

export default function Hero() {
  return (
    <>
      {/* ── Split hero ── */}
      <section className={styles.hero}>

        {/* Left — text content */}
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

        {/* Right — image */}
        <div className={styles.imageCol} aria-hidden="true">
          {/*
            Replace the gradient with your real image:
            In Hero.module.css → .imagePlaceholder → background-image: url('/images/galle-hero.jpg')
          */}
          <div className={styles.imagePlaceholder} />
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