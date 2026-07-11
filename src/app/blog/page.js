import { events } from '../data/events';
import EventCard from '../../components/EventCard/EventCard';
import styles from './blog.module.css';

export const metadata = {
    title: 'Sketch Meets',
};

export default function BlogPage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>blog</span>
                <h2 className={styles.title}>blog</h2>
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