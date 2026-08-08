import Link from 'next/link';
import styles from './FeaturedArtists.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { artists, getArtworksForArtist, getProfileImagePath } from '../../app/data/artists';

export default function FeaturedArtists() {
  return (
    <section className={styles.section} id="artists">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Our People</span>
          <h2 className={styles.title}>Featured Artists</h2>
          <p className={styles.subtitle}>
            Meet some of the sketchers who make USK Galle what it is.
          </p>
        </div>

        <div className={styles.grid}>
          {artists.map((artist) => {
            const artworks = getArtworksForArtist(artist.folder);
            const profileImage = getProfileImagePath(artist.folder);

            return (
              <article key={artist.slug} className={styles.card}>
                <Link href={`/artists/${artist.slug}`} style={{ textDecoration: 'none' }}>
                  <div className={styles.avatar} style={{ backgroundColor: artist.color }}>
                    <img
                      src={profileImage}
                      alt={artist.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.nameRow}>
                    <div>
                      <h3 className={styles.name}>
                        <Link href={`/artists/${artist.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {artist.name}
                        </Link>
                      </h3>
                      <span className={styles.medium}>{artist.medium}</span>
                    </div>
                    {artist.instagram && (
                      <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className={styles.igIcon} aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                  </div>

                  <p className={styles.bio}>{artist.bio}</p>

                  <div className={styles.footer}>
                    <span className={styles.location}>
                      <FontAwesomeIcon icon={faLocationDot} /> {artist.location}
                    </span>
                    <span className={styles.count}>{artworks.length} {artworks.length === 1 ? 'sketch' : 'sketches'}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.viewAll}>
          <Link href="/artists" className={styles.viewAllBtn}>
            Meet All Artists <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>

      </div>
    </section>
  );
}
