import { events } from '../data/events';
import EventCard from '../../components/EventCard/EventCard';
import styles from './gallery.module.css';

export const metadata = {
    title: 'Gallery',
};

export default function GalleryPage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>gallery</span>
                <h2 className={styles.title}>gallery</h2>
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