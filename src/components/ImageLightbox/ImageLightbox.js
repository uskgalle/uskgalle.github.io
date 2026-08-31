'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './ImageLightbox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function ImageLightbox({ images, activeIndex, onClose, onNext, onPrev }) {
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);

    const handleKey = useCallback((e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        if (activeIndex === null) return;
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [activeIndex, handleKey]);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
            dx < 0 ? onNext() : onPrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (activeIndex === null || !images || images.length === 0) return null;

    const currentItem = images[activeIndex];
    const currentSrc = typeof currentItem === 'string' ? currentItem : currentItem.src;
    const artistName = typeof currentItem === 'object' ? currentItem.artistName : null;
    const artistSlug = typeof currentItem === 'object' ? currentItem.artistSlug : null;
    const artistMedium = typeof currentItem === 'object' ? (currentItem.artistMedium || currentItem.medium) : null;
    const artistLocation = typeof currentItem === 'object' ? (currentItem.artistLocation || currentItem.location) : null;
    const title = typeof currentItem === 'object' ? currentItem.title : null;
    const description = typeof currentItem === 'object' ? currentItem.description : null;

    const current = activeIndex + 1;
    const total = images.length;

    return (
        <div
            className={styles.modal}
            onClick={onClose}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Top bar */}
            <div className={styles.topBar} onClick={(e) => e.stopPropagation()}>
                <span className={styles.counter}>{current} / {total}</span>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    ✕
                </button>
            </div>

            {/* Prev button */}
            <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous image"
            >
                ‹
            </button>

            {/* Image & Caption Container */}
            <div className={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
                <img
                    key={activeIndex}
                    className={styles.img}
                    src={currentSrc}
                    alt={title || `Image ${current} of ${total}`}
                />

                {(title || description || artistName || artistMedium || artistLocation) && (
                    <div className={styles.captionOverlay}>
                        {title && <h3 className={styles.captionTitle}>{title}</h3>}
                        {description && <p className={styles.captionDescription}>{description}</p>}
                        {artistName && (
                            <div className={styles.captionArtist}>
                                <span className={styles.byLabel}>By </span>
                                {artistSlug ? (
                                    <Link href={`/artists/${artistSlug}`} className={styles.artistLink} onClick={onClose}>
                                        {artistName}
                                    </Link>
                                ) : (
                                    <span>{artistName}</span>
                                )}
                            </div>
                        )}
                        {(artistMedium || artistLocation) && (
                            <div className={styles.captionMeta}>
                                {artistMedium && (
                                    <span className={styles.metaBadge}>
                                        <FontAwesomeIcon icon={faPalette} /> {artistMedium}
                                    </span>
                                )}
                                {artistLocation && (
                                    <span className={styles.metaBadge}>
                                        <FontAwesomeIcon icon={faLocationDot} /> {artistLocation}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Next button */}
            <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next image"
            >
                ›
            </button>

            {/* Mobile bottom bar */}
            <div className={styles.bottomBar} onClick={(e) => e.stopPropagation()}>
                <button className={styles.bottomBtn} onClick={onPrev} aria-label="Previous image">
                    ‹
                </button>
                <span className={styles.dots}>
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                        />
                    ))}
                </span>
                <button className={styles.bottomBtn} onClick={onNext} aria-label="Next image">
                    ›
                </button>
            </div>
        </div>
    );
}