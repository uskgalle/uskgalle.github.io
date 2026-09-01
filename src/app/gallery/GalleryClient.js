'use client';

import { useState, useEffect } from 'react';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import BlurImage from '../../components/BlurImage/BlurImage';
import styles from './gallery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faClock, faHistory } from '@fortawesome/free-solid-svg-icons';

// Helper for shuffling arrays
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function GalleryClient({ initialArtworks }) {
    const [artworks, setArtworks] = useState(initialArtworks);
    const [sortMode, setSortMode] = useState('random');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Randomize on initial client mount so every page visit is fresh & different
    useEffect(() => {
        setArtworks(shuffle(initialArtworks));
    }, [initialArtworks]);

    const handleSort = (mode) => {
        setSortMode(mode);
        if (mode === 'random') {
            setArtworks(shuffle(initialArtworks));
        } else if (mode === 'latest') {
            const sorted = [...initialArtworks].sort((a, b) => {
                const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
                const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
                return numB - numA;
            });
            setArtworks(sorted);
        } else if (mode === 'old') {
            const sorted = [...initialArtworks].sort((a, b) => {
                const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
                const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
                return numA - numB;
            });
            setArtworks(sorted);
        }
    };

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>From the Sketchbooks</span>
                <h1 className={styles.title}>USK Galle Gallery</h1>
                <p className={styles.subtitle}>
                    A visual collection of urban sketches capturing the heritage and coastal life of Galle.
                </p>
            </div>

            <div className={styles.sortBar}>
                <span className={styles.sortLabel}>Sort by:</span>
                <button
                    className={`${styles.sortBtn} ${sortMode === 'random' ? styles.activeSort : ''}`}
                    onClick={() => handleSort('random')}
                >
                    <FontAwesomeIcon icon={faShuffle} /> Random
                </button>
                <button
                    className={`${styles.sortBtn} ${sortMode === 'latest' ? styles.activeSort : ''}`}
                    onClick={() => handleSort('latest')}
                >
                    <FontAwesomeIcon icon={faClock} /> Latest
                </button>
                <button
                    className={`${styles.sortBtn} ${sortMode === 'old' ? styles.activeSort : ''}`}
                    onClick={() => handleSort('old')}
                >
                    <FontAwesomeIcon icon={faHistory} /> Old
                </button>
            </div>

            {artworks.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No artworks found.</p>
                </div>
            ) : (
                <div className={styles.gallery}>
                    {artworks.map((art, index) => (
                        <div
                            key={`${art.id}-${index}`}
                            className={styles.imgWrap}
                            onClick={() => setLightboxIndex(index)}
                        >
                            <BlurImage
                                src={art.src}
                                alt={art.title || `Artwork ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}

            <ImageLightbox
                images={artworks}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % artworks.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + artworks.length) % artworks.length)}
            />
        </main>
    );
}
