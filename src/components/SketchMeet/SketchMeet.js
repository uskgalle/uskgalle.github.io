import styles from './SketchMeet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faLocationDot,
  faClock,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { events } from '../../app/data/events';

// Upcoming first, then limit to 3
const sorted = [...events]
  .sort((a, b) => Number(b.upcoming) - Number(a.upcoming))
  .slice(0, 3);

export default function SketchMeet() {
  return (
    <section className={styles.section} id="events">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>What's On</span>

          <h2 className={styles.title}>Sketch Meets</h2>

          <p className={styles.subtitle}>
            We’ve held sketching gatherings that brought creative people together,
            and we’re excited for many more to come. Join us as we sketch the
            world together.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {sorted.map((meet) => (
            <article
              key={meet.slug}
              className={`${styles.card} ${meet.upcoming ? styles.cardUpcoming : ''
                }`}
            >
              {/* Upcoming badge */}
              {meet.upcoming && (
                <div className={styles.upcomingBadge}>
                  <span className={styles.upcomingDot} />
                  Upcoming
                </div>
              )}

              {/* Date badge */}
              <div
                className={`${styles.dateBadge} ${meet.upcoming ? styles.dateBadgeUpcoming : ''
                  }`}
              >
                <span className={styles.dateDay}>{meet.date.day}</span>
                <span className={styles.dateMonth}>{meet.date.month}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.tag}>{meet.type}</span>

                <h3 className={styles.cardTitle}>{meet.title}</h3>

                <p className={styles.cardDesc}>{meet.description}</p>

                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {meet.location}
                  </span>

                  <span className={styles.metaItem}>
                    <FontAwesomeIcon icon={faClock} />
                    {meet.time}
                  </span>
                </div>

                <a
                  href={
                    meet.upcoming
                      ? meet.registerLink
                      : `/events/${meet.slug}`
                  }
                  className={`${styles.cardLink} ${meet.upcoming ? styles.cardLinkUpcoming : ''
                    }`}
                >
                  {meet.upcoming ? 'Register' : 'View Recap'}

                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <a href="/events" className={styles.allEventsBtn}>
            <FontAwesomeIcon icon={faCalendarDays} />
            View All Events
          </a>
        </div>

      </div>
    </section>
  );
}