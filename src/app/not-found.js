import Link from 'next/link';
import styles from './not-found.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faHouse,
    faCalendarDays,
    faImages,
    faUsers,
    faNewspaper,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: '404 - Page Not Found | Urban Sketchers Galle',
};

export default function NotFound() {
    return (
        <main className={styles.container}>
            {/* Visual 404 Illustration Badge */}
            <div className={styles.illustration}>
                <span className={styles.number}>404</span>
                <div className={styles.badgeWrap}>
                    <FontAwesomeIcon icon={faCompass} className={styles.badgeIcon} />
                    <span className={styles.badgeText}>Lost Off The Map</span>
                </div>
            </div>

            {/* Title & Description */}
            <h1 className={styles.title}>Sketch Page Not Found</h1>
            <p className={styles.subtitle}>
                Looks like this page wandered off around the quiet alleyways of Galle Fort.
                The page you are looking for doesn't exist or has been moved.
            </p>

            {/* Primary Action Button */}
            <Link href="/" className={styles.homeBtn}>
                <FontAwesomeIcon icon={faHouse} /> Back to Home <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            {/* Quick Navigation Links */}
            <div className={styles.quickNav}>
                <h2 className={styles.quickTitle}>Explore Urban Sketchers Galle</h2>
                <div className={styles.linksGrid}>
                    <Link href="/events" className={styles.navCard}>
                        <FontAwesomeIcon icon={faCalendarDays} className={styles.navCardIcon} />
                        <span>Sketch Meets</span>
                    </Link>
                    <Link href="/gallery" className={styles.navCard}>
                        <FontAwesomeIcon icon={faImages} className={styles.navCardIcon} />
                        <span>Sketch Gallery</span>
                    </Link>
                    <Link href="/artists" className={styles.navCard}>
                        <FontAwesomeIcon icon={faUsers} className={styles.navCardIcon} />
                        <span>Our Artists</span>
                    </Link>
                    <Link href="/blog" className={styles.navCard}>
                        <FontAwesomeIcon icon={faNewspaper} className={styles.navCardIcon} />
                        <span>Community Stories</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
