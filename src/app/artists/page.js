import { events } from '../data/events';
import EventCard from '../../components/EventCard/EventCard';
import styles from './artists.module.css';

export const metadata = {
    title: 'Artists',
};

export default function ArtistsPage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>artists</span>
                <h2 className={styles.title}>artists</h2>
                <p className={styles.subtitle}>
                    [Content Under Construction]
                </p>
            </div>

            <div className={styles.body}>
                <p className={styles.subtitle}>
                    [Content Under Construction]
                </p>
            </div>
        </main>
    );
}