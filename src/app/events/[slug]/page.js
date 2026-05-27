import { events } from '../../data/events';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './recap.module.css';

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }) {
    const event = events.find((e) => e.slug === params.slug);
    return { title: `${event?.title} Recap` };
}

export default function RecapPage({ params }) {
    const event = events.find((e) => e.slug === params.slug);
    if (!event || !event.recap) return notFound();

    return (
        <main className={styles.page}>
            <div className={styles.back}>
                <Link href="/events">
                    <i className="fa-solid fa-arrow-left"></i> All Events
                </Link>
            </div>

            <header className={styles.header}>
                <div className={styles.dateBox}>
                    <span className={styles.day}>{event.date.day}</span>
                    <span className={styles.month}>{event.date.month}</span>
                </div>
                <div>
                    <p className={styles.type}>{event.type}</p>
                    <h1 className={styles.title}>{event.title}</h1>
                    <div className={styles.meta}>
                        <span><i className="fa-solid fa-location-dot"></i> {event.location}</span>
                        <span><i className="fa-regular fa-clock"></i> {event.time}</span>
                    </div>
                </div>
            </header>

            <div className={styles.divider} aria-hidden="true">
                <svg viewBox="0 0 900 20" fill="none">
                    <path d="M0 10 Q200 0, 450 10 Q700 20, 900 10" stroke="#8b6914" strokeWidth="1" strokeLinecap="round" />
                </svg>
            </div>

            <p className={styles.body}>{event.recap.body}</p>

            {event.recap.images.length > 0 && (
                <div className={styles.gallery}>
                    {event.recap.images.map((num) => (
                        <div className={styles.imgWrap} key={num}>
                            <img
                                src={`/gallery-images/${event.slug}/${num}.jpg`}
                                alt={`${event.title} – photo ${num}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}