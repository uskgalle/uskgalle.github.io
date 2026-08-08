'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageLightbox from '../../../components/ImageLightbox/ImageLightbox';
import styles from './ArtistClient.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function ArtistClient({ artist, artworks, profileImage }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: `${artist.name} - USK Galle Artist`,
            text: `Check out ${artist.name}'s sketches on USK Galle!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or share failed
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    const imageSources = artworks.map((art) => art.src);

    return (
        <main className={styles.main}>
            <Link href="/artists" className={styles.backLink}>
                <FontAwesomeIcon icon={faArrowLeft} /> All Artists
            </Link>

            <header className={styles.profileHeader}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={profileImage}
                        alt={artist.name}
                        className={styles.avatarImg}
                    />
                </div>

                <div className={styles.profileDetails}>
                    <span className={styles.eyebrow}>USK Galle Artist</span>
                    <h1 className={styles.name}>{artist.name}</h1>

                    <div className={styles.tags}>
                        {artist.medium && <span className={styles.tag}>🎨 {artist.medium}</span>}
                        {artist.location && <span className={styles.tag}>📍 {artist.location}</span>}
                    </div>

                    <p className={styles.bio}>{artist.bio}</p>

                    <div className={styles.actions}>
                        <button onClick={handleShare} className={styles.btnPrimary}>
                            <FontAwesomeIcon icon={faShareNodes} /> Share Profile
                        </button>

                        {artist.instagram && (
                            <a
                                href={artist.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnSecondary}
                            >
                                <FontAwesomeIcon icon={faInstagram} /> Instagram
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {copied && <div className={styles.toast}>Link copied to clipboard!</div>}

            <section>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Artworks by {artist.name}</h2>
                    <span className={styles.countBadge}>{artworks.length} {artworks.length === 1 ? 'sketch' : 'sketches'}</span>
                </div>

                {artworks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No artworks uploaded yet for this artist.</p>
                    </div>
                ) : (
                    <div className={styles.gallery}>
                        {artworks.map((art, index) => (
                            <div
                                key={art.id}
                                className={styles.imgWrap}
                                onClick={() => setLightboxIndex(index)}
                            >
                                <img
                                    src={art.src}
                                    alt={art.title}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <ImageLightbox
                images={imageSources}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % imageSources.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + imageSources.length) % imageSources.length)}
            />
        </main>
    );
}
