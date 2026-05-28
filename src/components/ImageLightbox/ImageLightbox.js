'use client';

import { useEffect } from 'react';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({
    images,
    activeIndex,
    onClose,
    onNext,
    onPrev
}) {
    if (activeIndex === null) return null;
    
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onNext, onPrev]);

    return (
        <div className={styles.modal} onClick={onClose}>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>

            <button
                className={styles.prevBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
            >
                ‹
            </button>

            <img
                className={styles.img}
                src={images[activeIndex]}
                alt=""
                onClick={(e) => e.stopPropagation()}
            />

            <button
                className={styles.nextBtn}
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
            >
                ›
            </button>
        </div>
    );
}