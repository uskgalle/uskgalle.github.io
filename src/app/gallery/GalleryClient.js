'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import styles from './gallery.module.css';

export default function GalleryClient({ artists, initialArtworks }) {
    const [selectedArtistFolder, setSelectedArtistFolder] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredArtworks = selectedArtistFolder === 'all'
        ? initialArtworks
        : initialArtworks.filter((art) => art.artistFolder === selectedArtistFolder);

    const lightboxImages = filteredArtworks.map((art) => art.src);

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>From the Sketchbooks</span>
                <h1 className={styles.title}>USK Galle Gallery</h1>
                <p className={styles.subtitle}>
                    Browse sketches and artworks created by Urban Sketchers Galle across the southern coast.
                </p>
            </div>

            <div className={styles.filterBar}>
                <button
                    className={`${styles.filterBtn} ${selectedArtistFolder === 'all' ? styles.activeFilter : ''}`}
                    onClick={() => setSelectedArtistFolder('all')}
                >
                    All Artists ({initialArtworks.length})
                </button>
                {artists.map((artist) => {
                    const count = initialArtworks.filter((art) => art.artistFolder === artist.folder).length;
                    return (
                        <button
                            key={artist.folder}
                            className={`${styles.filterBtn} ${selectedArtistFolder === artist.folder ? styles.activeFilter : ''}`}
                            onClick={() => setSelectedArtistFolder(artist.folder)}
                        >
                            {artist.name} ({count})
                        </button>
                    );
                })}
            </div>

            {filteredArtworks.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No artworks found for this artist.</p>
                </div>
            ) : (
                <div className={styles.gallery}>
                    {filteredArtworks.map((art, index) => (
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
                            <div className={styles.caption}>
                                <h3 className={styles.artTitle}>{art.title}</h3>
                                <Link
                                    href={`/artists/${art.artistSlug}`}
                                    className={styles.artistLink}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    By {art.artistName}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ImageLightbox
                images={lightboxImages}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
            />
        </main>
    );
}
