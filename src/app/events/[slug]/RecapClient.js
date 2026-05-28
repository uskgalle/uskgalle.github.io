"use client";

import Link from 'next/link';
import styles from './recap.module.css';
import ImageLightbox from '@/components/ImageLightbox/ImageLightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState, useCallback } from 'react';

export default function RecapClient({ event }) {
    const imageUrls = useMemo(() => {
        return event.recap.images.map(
            (num) => `/gallery-images/${event.slug}/${num}.jpg`
        );
    }, [event.recap.images, event.slug]);

    const [activeIndex, setActiveIndex] = useState(null);

    const nextImage = useCallback(() => {
        setActiveIndex((i) => (i + 1) % imageUrls.length);
    }, [imageUrls.length]);

    const prevImage = useCallback(() => {
        setActiveIndex((i) => (i - 1 + imageUrls.length) % imageUrls.length);
    }, [imageUrls.length]);

    const closeImage = useCallback(() => {
        setActiveIndex(null);
    }, []);

    return (
        <main className={styles.page}>
            <div className={styles.back}>
                <Link href="/events">
                    <FontAwesomeIcon icon={faArrowLeft} /> All Events
                </Link>
            </div>

            <header className={styles.header}>
                <div className={`${styles.dateBadge} ${event.upcoming ? styles.dateBadgeUpcoming : ''}`}>
                    <span className={styles.dateYear}>{event.year}</span>

                    <div className={styles.dateMain}>
                        <span className={styles.dateDay}>{event.date.day}</span>
                        <span className={styles.dateMonth}>{event.date.month}</span>
                    </div>
                </div>

                <div>
                    <p className={styles.type}>{event.type}</p>
                    <h1 className={styles.title}>{event.title}</h1>
                </div>
            </header>

            <div className={styles.meta}>
                <span>
                    <FontAwesomeIcon icon={faLocationDot} /> {event.location}
                </span>
                <span>
                    <FontAwesomeIcon icon={faClock} /> {event.time}
                </span>
            </div>

            <p className={styles.body}>{event.recap.body}</p>

            <div className={styles.gallery}>
                {event.recap.images.map((num, index) => (
                    <div
                        key={num}
                        className={styles.imgWrap}
                        onClick={() => setActiveIndex(index)}
                    >
                        <img src={imageUrls[index]} alt="" />
                    </div>
                ))}
            </div>

            <ImageLightbox
                images={imageUrls}
                activeIndex={activeIndex}
                onClose={closeImage}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </main>
    );
}