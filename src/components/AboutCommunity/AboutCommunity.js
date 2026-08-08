import styles from './AboutCommunity.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faHandshake, faGlobe } from '@fortawesome/free-solid-svg-icons';

const values = [
  { icon: faPencil,    label: 'Draw on Location',   desc: 'We only sketch from life: no photos, no studios. Just us, the place, and the moment.' },
  { icon: faHandshake, label: 'Share Openly',        desc: 'Every sketch is shared with honesty. We celebrate progress, not perfection.' },
  { icon: faGlobe,     label: 'Part of a Global Movement', desc: 'USK Galle is one of hundreds of chapters worldwide, united by the Urban Sketchers manifesto.' },
];

export default function AboutCommunity() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>

        {/* Left — text */}
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>Who We Are</span>
          <h2 className={styles.title}>
            A community rooted<br />
            <em>in place and practice.</em>
          </h2>
          <p className={styles.body}>
            Urban Sketchers Galle started as a small group of artists sketching Galle Fort and continues to grow as a community of artists, students, teachers, and travellers who share a love for on-location drawing.
          </p>
          <p className={styles.body}>
            In 2026, we continue to meet at Galle Fort for regular sketching sessions. Everyone is welcome. Just bring a sketchbook and join in.
          </p>

          <div className={styles.values}>
            {values.map((v) => (
              <div key={v.label} className={styles.valueItem}>
                <div className={styles.valueIcon}>
                  <FontAwesomeIcon icon={v.icon} />
                </div>
                <div>
                  <h4 className={styles.valueLabel}>{v.label}</h4>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#join" className={styles.cta}>Join the Community</a>
        </div>

        {/* Right — visual block */}
        <div className={styles.visualCol}>
          <div className={styles.imgMain} />
          <div className={styles.statCard}>
            <span className={styles.statNum}>50+</span>
            <span className={styles.statLabel}>Sketchers<br />& counting</span>
          </div>
          <div className={styles.imgAccent} />
        </div>

      </div>
    </section>
  );
}
