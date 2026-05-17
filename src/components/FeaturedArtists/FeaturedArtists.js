import styles from './FeaturedArtists.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const artists = [
  {
    id: 1,
    name: 'Amara Perera',
    medium: 'Watercolour & Ink',
    location: 'Galle Fort',
    bio: 'Amara captures the weathered textures of colonial architecture with a loose, expressive watercolour style.',
    avatar: 'AP',
    color: '#c9a87c',
    sketches: 42,
    instagram: '#',
  },
  {
    id: 2,
    name: 'Roshan Silva',
    medium: 'Pen & Wash',
    location: 'Unawatuna',
    bio: 'Roshan\'s fine linework brings the fishing boats and coastal life of the southern shore to vivid detail.',
    avatar: 'RS',
    color: '#8a9e7c',
    sketches: 31,
    instagram: '#',
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    medium: 'Graphite & Colour Pencil',
    location: 'Hikkaduwa',
    bio: 'Dilini finds beauty in everyday moments — market stalls, tuk-tuks, temple steps — rendered with warmth.',
    avatar: 'DF',
    color: '#9c8ab0',
    sketches: 28,
    instagram: '#',
  },
  {
    id: 4,
    name: 'Dilini Fernando',
    medium: 'Graphite & Colour Pencil',
    location: 'Hikkaduwa',
    bio: 'Dilini finds beauty in everyday moments — market stalls, tuk-tuks, temple steps — rendered with warmth.',
    avatar: 'DF',
    color: '#9c8ab0',
    sketches: 28,
    instagram: '#',
  },
];

export default function FeaturedArtists() {
  return (
    <section className={styles.section} id="artists">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Our People</span>
          <h2 className={styles.title}>Featured Artists</h2>
          <p className={styles.subtitle}>
            Meet some of the sketchers who make USK Galle what it is. [This Section Is Under Construction]
          </p>
        </div>

        <div className={styles.grid}>
          {artists.map((artist) => (
            <article key={artist.id} className={styles.card}>
              {/* Avatar */}
              <div className={styles.avatar} style={{ backgroundColor: artist.color }}>
                {artist.avatar}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.nameRow}>
                  <div>
                    <h3 className={styles.name}>{artist.name}</h3>
                    <span className={styles.medium}>{artist.medium}</span>
                  </div>
                  <a href={artist.instagram} className={styles.igIcon} aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>

                <p className={styles.bio}>{artist.bio}</p>

                <div className={styles.footer}>
                  <span className={styles.location}>📍 {artist.location}</span>
                  <span className={styles.count}>{artist.sketches} sketches</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="#gallery" className={styles.viewAllBtn}>
            Meet All Artists <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>

      </div>
    </section>
  );
}
