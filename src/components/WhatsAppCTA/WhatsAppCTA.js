import styles from './WhatsAppCTA.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const socials = [
  {
    platform: 'ig',
    icon: faInstagram,
    name: 'Instagram',
    handle: '@urbansketchersgalle',
    desc: 'Sketches, meet recaps & behind the scenes.',
    href: 'https://www.instagram.com/urbansketchersgalle',
  },
  {
    platform: 'fb',
    icon: faFacebookF,
    name: 'Facebook',
    handle: 'Urban Sketchers Galle',
    desc: 'Events, announcements & community posts.',
    href: 'https://www.facebook.com/share/1L8GtVnbzg',
  },
  {
    platform: 'wa',
    icon: faWhatsapp,
    name: 'WhatsApp',
    handle: 'Community Group',
    desc: 'Join the group for sketch meet updates.',
    href: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l',
  },
];

export default function WhatsAppCTA() {
  return (
    <section className={styles.section} id="join">
      <div className={styles.container}>

        <span className={styles.eyebrow}>Stay Connected</span>
        <h2 className={styles.title}>
          Follow along &<br />
          <em>join the conversation.</em>
        </h2>
        <p className={styles.body}>
          Keep up with sketch meets, member work, and community stories
          across our social channels.
        </p>

        <div className={styles.socials}>
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.iconWrap} data-platform={s.platform}>
                <FontAwesomeIcon icon={s.icon} />
              </div>
              <h3 className={styles.cardName}>{s.name}</h3>
              <span className={styles.cardHandle}>{s.handle}</span>
              <p className={styles.cardDesc}>{s.desc}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}