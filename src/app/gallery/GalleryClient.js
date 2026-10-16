'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import BlurImage from '../../components/BlurImage/BlurImage';
import styles from './gallery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 24;

export default function GalleryClient({ images, meetups, meetup = 'all' }) {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const galleryRef = useRef(null);
    const filtered = useMemo(() => meetup === 'all' ? images : images.filter(image => image.event === meetup), [images, meetup]);
    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    const start = (page - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);

    function changeMeetup(slug) {
        const event = meetups.find(item => item.slug === slug);
        router.push(event ? `/gallery/${event.gallerySlug}` : '/gallery', { scroll: false });
    }

    function changePage(next) {
        setActiveIndex(null);
        setPage(next);
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return <main className={styles.page}>
        <header className={styles.header}>
            <span className={styles.eyebrow}>Moments from our meetups</span>
            <h1 className={styles.title}>USK Galle Gallery</h1>
            <p className={styles.subtitle}>The people, places, and memories from our sketching sessions. Looking for sketches? <Link href="/artworks">Explore artworks</Link>.</p>
        </header>
        <div ref={galleryRef} className={styles.filters}>
            <div className={styles.eventFilter}>
                <label htmlFor="gallery-event" className={styles.filterLabel}>Browse by event</label>
                <select id="gallery-event" className={styles.eventSelect} value={meetup} onChange={event => changeMeetup(event.target.value)}>
                    <option value="all">All events</option>
                    {meetups.map(event => <option key={event.slug} value={event.slug}>{event.title}</option>)}
                </select>
            </div>
            <p className={styles.resultCount} role="status">{filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}{meetup === 'all' ? ' across all events' : ' in this event'}</p>
        </div>
        {!filtered.length ? <div className={styles.emptyState}>Recap photos will appear here after our meetups.</div> : <>
            <div className={styles.gallery}>{visible.map((photo, index) => <button type="button" key={photo.id} className={`${styles.imgWrap} ${styles.photoButton}`} onClick={() => setActiveIndex(start + index)} aria-label={`Open ${photo.title}`}>
                <BlurImage src={photo.src} alt={photo.title} loading="lazy" />
            </button>)}</div>
            {pages > 1 && <nav className={styles.pagination} aria-label="Gallery pages">
                <button disabled={page === 1} aria-label="Previous page" onClick={() => changePage(page - 1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                {Array.from({ length: pages }, (_, index) => index + 1).filter(number => number === 1 || number === pages || Math.abs(number - page) <= 1).map((number, index, numbers) => <span key={number} className={styles.pageItem}>
                    {index > 0 && number - numbers[index - 1] > 1 && <span className={styles.ellipsis}>…</span>}
                    <button aria-label={`Page ${number}`} aria-current={page === number ? 'page' : undefined} onClick={() => changePage(number)}>{number}</button>
                </span>)}
                <button disabled={page === pages} aria-label="Next page" onClick={() => changePage(page + 1)}><FontAwesomeIcon icon={faArrowRight} /></button>
            </nav>}
        </>}
        <ImageLightbox images={filtered} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNext={() => setActiveIndex(index => (index + 1) % filtered.length)} onPrev={() => setActiveIndex(index => (index - 1 + filtered.length) % filtered.length)} />
    </main>;
}
