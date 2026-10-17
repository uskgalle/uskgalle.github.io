'use client';

import { useState, useEffect } from 'react';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import BlurImage from '../../components/BlurImage/BlurImage';
import styles from './artworks.module.css';
import galleryStyles from '../gallery/gallery.module.css';
import { newestArtworksFirst } from '../data/artwork-order';
import { useRouter } from 'next/navigation';
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

export default function ArtworksClient({ initialArtworks, meetups, selectedEvent = 'all' }) {
    const router = useRouter();
    const [artworks, setArtworks] = useState(initialArtworks);
    const [sortMode, setSortMode] = useState('random');
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const filteredArtworks = selectedEvent === 'all' ? artworks : artworks.filter(art => art.event === selectedEvent);

    // Randomize on initial client mount so every page visit is fresh & different
    useEffect(() => {
        setArtworks(shuffle(initialArtworks));
    }, [initialArtworks]);

    const handleSort = (mode) => {
        setLightboxIndex(null);
        setSortMode(mode);
        if (mode === 'random') {
            setArtworks(shuffle(initialArtworks));
        } else if (mode === 'latest') {
            const sorted = newestArtworksFirst(initialArtworks);
            setArtworks(sorted);
        } else if (mode === 'old') {
            const sorted = newestArtworksFirst(initialArtworks).reverse();
            setArtworks(sorted);
        }
    };

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>From the Sketchbooks</span>
                <h1 className={styles.title}>USK Galle Artworks</h1>
                <p className={styles.subtitle}>
                    A visual collection of urban sketches capturing the heritage and coastal life of Galle.
                </p>
            </div>

            <div className={styles.toolbar}>
            <div className={galleryStyles.eventFilter}>
                <label htmlFor="artworks-event" className={galleryStyles.filterLabel}>Browse by event</label>
                <select id="artworks-event" className={galleryStyles.eventSelect} value={selectedEvent}
                    onChange={event => {
                        const meetup = meetups.find(item => item.slug === event.target.value);
                        setLightboxIndex(null);
                        router.push(meetup ? `/artworks/${meetup.gallerySlug}` : '/artworks', { scroll: false });
                    }}>
                    <option value="all">All events</option>
                    {meetups.map(event => <option key={event.slug} value={event.slug}>{event.title}</option>)}
                </select>
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
            </div>

            {filteredArtworks.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No artworks found.</p>
                </div>
            ) : (
                <div className={styles.gallery}>
                    {filteredArtworks.map((art, index) => {
                        const placeholderAspects = ['4/3', '1/1', '3/4', '4/3', '16/11'];
                        return (
                            <div
                                key={`${art.id}-${index}`}
                                className={styles.imgWrap}
                                onClick={() => setLightboxIndex(index)}
                            >
                                <BlurImage
                                    src={art.src}
                                    alt={art.title || `Artwork ${index + 1}`}
                                    aspectRatio={placeholderAspects[index % placeholderAspects.length]}
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <ImageLightbox
                images={filteredArtworks}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredArtworks.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length)}
            />
        </main>
    );
}
