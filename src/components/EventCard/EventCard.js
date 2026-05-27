import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './EventCard.module.css';

export default function EventCard({ event }) {
    return (
        <article className={`${styles.card} ${event.upcoming ? styles.cardUpcoming : ''}`}>

            {event.upcoming && (
                <div className={styles.upcomingBadge}>
                    <span className={styles.upcomingDot} />
                    Upcoming
                </div>
            )}

            <div className={`${styles.dateBadge} ${event.upcoming ? styles.dateBadgeUpcoming : ''}`}>
                <span className={styles.dateYear}>{event.year}</span>

                <div className={styles.dateMain}>
                    <span className={styles.dateDay}>{event.date.day}</span>
                    <span className={styles.dateMonth}>{event.date.month}</span>
                </div>
            </div>

            <div className={styles.cardBody}>
                <span className={styles.tag}>{event.type}</span>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDesc}>{event.description}</p>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {event.location}
                    </span>
                    <span className={styles.metaItem}>
                        <FontAwesomeIcon icon={faClock} />
                        {event.time}
                    </span>
                </div>

                <div className={styles.action}>
                    {event.upcoming ? (

                        <a href={event.registerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.cardLink} ${styles.cardLinkUpcoming}`}
                        >
                            Register <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    ) : (
                        <Link href={`/events/${event.slug}`} className={styles.cardLink}>
                            View Recap <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}