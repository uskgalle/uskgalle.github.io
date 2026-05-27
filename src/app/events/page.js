import { events } from '../data/events';
import EventCard from '../../components/EventCard/EventCard';
import styles from './events.module.css';

export const metadata = {
    title: 'Sketch Meets',
};

export default function EventsPage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>What's On</span>
                <h2 className={styles.title}>Sketch Meets</h2>
                <p className={styles.subtitle}>
                    We’ve held sketching gatherings that brought creative people together, and we’re excited for many more to come. Join us as we sketch the world together.
                </p>
            </div>

            <div className={styles.grid}>
                {events.map((event) => (
                    <EventCard key={event.slug} event={event} />
                ))}
            </div>
        </main>
    );
}