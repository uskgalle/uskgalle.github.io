"use client";

import Link from 'next/link';
import styles from './recap.module.css';
import ImageLightbox from '@/components/ImageLightbox/ImageLightbox';
import BlurImage from '@/components/BlurImage/BlurImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState, useCallback } from 'react';

export default function RecapClient({ event }) {
    const imageUrls = useMemo(() => {
        if (!event.recap?.images) return [];
        const ext = event.recap.extension || event.recap.imageExtension || 'jpg';
        return event.recap.images.map((item) => {
            if (typeof item === 'string') {
                if (item.startsWith('/')) return item;
                if (item.includes('.')) return `/gallery-images/${event.slug}/${item}`;
            }
            return `/gallery-images/${event.slug}/${item}.${ext}`;
        });
    }, [event.recap, event.slug]);

    const [activeIndex, setActiveIndex] = useState(null);

    const nextImage = useCallback(() => {
        if (!imageUrls.length) return;
        setActiveIndex((i) => (i + 1) % imageUrls.length);
    }, [imageUrls.length]);

    const prevImage = useCallback(() => {
        if (!imageUrls.length) return;
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

            <p className={styles.body}>{event.recap?.body || event.description}</p>

            {event.recap ? (
                <>
                    <div className={styles.gallery}>
                        {event.recap.images.map((num, index) => {
                            const placeholderAspects = ['4/3', '1/1', '3/4', '4/3', '16/11'];
                            return (
                                <div
                                    key={num}
                                    className={styles.imgWrap}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <BlurImage
                                        src={imageUrls[index]}
                                        alt={`${event.title} sketch ${index + 1}`}
                                        aspectRatio={placeholderAspects[index % placeholderAspects.length]}
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <ImageLightbox
                        images={imageUrls}
                        activeIndex={activeIndex}
                        onClose={closeImage}
                        onNext={nextImage}
                        onPrev={prevImage}
                    />
                </>
            ) : (
                <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <Link
                        href={`/events/${event.slug}/register`}
                        className={styles.registerBtn}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 2rem',
                            backgroundColor: 'var(--accent, #e67e22)',
                            color: '#fff',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Register for this Event
                    </Link>
                </div>
            )}
        </main>
    );
}