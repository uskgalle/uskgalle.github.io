import Link from 'next/link';
import { artists, getArtworksForArtist, getProfileImagePath } from '../data/artists';
import styles from './artists.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Artists - USK Galle',
    description: 'Discover the urban sketchers and artists of Galle, Sri Lanka.',
};

export default function ArtistsPage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>Our People</span>
                <h1 className={styles.title}>USK Galle Artists</h1>
                <p className={styles.subtitle}>
                    Meet the talented sketchers capturing the architecture, culture, and coastal life of Galle.
                </p>
            </div>

            <div className={styles.grid}>
                {artists.map((artist) => {
                    const artworks = getArtworksForArtist(artist.folder);
                    const profileImage = getProfileImagePath(artist.folder);

                    return (
                        <article key={artist.slug} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatar}>
                                    <img
                                        src={profileImage}
                                        alt={artist.name}
                                        className={styles.avatarImg}
                                    />
                                </div>
                                <div className={styles.artistMeta}>
                                    <h2 className={styles.name}>{artist.name}</h2>
                                    <span className={styles.medium}>{artist.medium}</span>
                                </div>
                            </div>

                            <p className={styles.bio}>{artist.bio}</p>

                            <div className={styles.cardFooter}>
                                <div className={styles.details}>
                                    <span className={styles.location}>📍 {artist.location}</span>
                                    <span className={styles.count}>{artworks.length} {artworks.length === 1 ? 'sketch' : 'sketches'}</span>
                                </div>

                                <Link href={`/artists/${artist.slug}`} className={styles.profileBtn}>
                                    Profile <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
}