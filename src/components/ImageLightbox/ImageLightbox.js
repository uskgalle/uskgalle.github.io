'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './ImageLightbox.module.css';

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

        // Only register horizontal swipes (avoid scroll conflicts)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
            dx < 0 ? onNext() : onPrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    if (activeIndex === null) return null;

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

            {/* Prev — hidden on mobile (use swipe or bottom bar) */}
            <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous image"
            >
                ‹
            </button>

            {/* Image */}
            <img
                key={activeIndex}
                className={styles.img}
                src={images[activeIndex]}
                alt={`Image ${current} of ${total}`}
                onClick={(e) => e.stopPropagation()}
            />

            {/* Next — hidden on mobile */}
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