import styles from './SketchMeet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const meets = [
  {
    id: 1,
    date: { day: '07', month: 'Jun' },
    title: 'Sketch Meet-Up #4',
    location: "ART'O'SAN Gallery, Galle Fort",
    time: '8.30 AM – 12.30 PM',
    tag: 'Outdoor',
    desc: 'Meet fellow sketchers, explore Galle Fort, and capture everyday moments through drawing in this friendly community sketch session.',
    upcoming: true,
    href: '#join',
  },
  {
    id: 2,
    date: { day: '10', month: 'May' },
    title: 'Sketch Meet-Up #3',
    location: "ART'O'SAN Gallery, Galle Fort",
    time: '8.30 AM – 12.30 PM',
    tag: 'Outdoor',
    desc: 'A friendly sketch meet filled with conversation, creativity, and on-location drawing around the beautiful streets of Galle.',
    upcoming: false,
    href: '#',
  },
  {
    id: 3,
    date: { day: '08', month: 'March' },
    title: 'Sketch Meet-Up #2',
    location: "ART'O'SAN Gallery, Galle Fort",
    time: '8.30 AM – 12.30 PM',
    tag: 'Outdoor',
    desc: 'An outdoor sketch meetup filled with creativity, conversation, and shared inspiration among local artists and sketch enthusiasts.',
    upcoming: false,
    href: '#',
  },
];

// Sort: upcoming first
const sorted = [...meets].sort((a, b) => (b.upcoming ? 1 : 0) - (a.upcoming ? 1 : 0));

export default function SketchMeet() {
  return (
    <section className={styles.section} id="events">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>What's On</span>
          <h2 className={styles.title}>Sketch Meets</h2>
          <p className={styles.subtitle}>
            From past gatherings to upcoming sketch meets, join the Urban Sketchers Galle community and sketch the world together.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {sorted.map((meet) => (
            <article
              key={meet.id}
              className={`${styles.card} ${meet.upcoming ? styles.cardUpcoming : ''}`}
            >
              {/* Upcoming badge */}
              {meet.upcoming && (
                <div className={styles.upcomingBadge}>
                  <span className={styles.upcomingDot} />
                  Upcoming
                </div>
              )}

              {/* Date badge */}
              <div className={`${styles.dateBadge} ${meet.upcoming ? styles.dateBadgeUpcoming : ''}`}>
                <span className={styles.dateDay}>{meet.date.day}</span>
                <span className={styles.dateMonth}>{meet.date.month}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.tag}>{meet.tag}</span>
                <h3 className={styles.cardTitle}>{meet.title}</h3>
                <p className={styles.cardDesc}>{meet.desc}</p>

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

                <a href={meet.href} className={`${styles.cardLink} ${meet.upcoming ? styles.cardLinkUpcoming : ''}`}>
                  {meet.upcoming ? 'Register' : 'View Recap'}
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <a href="#events" className={styles.allEventsBtn}>
            <FontAwesomeIcon icon={faCalendarDays} />
            View All Events
          </a>
        </div>

      </div>
    </section>
  );
}