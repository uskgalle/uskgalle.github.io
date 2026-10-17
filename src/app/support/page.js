import Link from 'next/link';
import { getArtistBySlug, getProfileImagePath } from '../data/artists';
import { events } from '../data/events';
import styles from './support.module.css';

export const metadata = {
  title: 'Support - USK Galle',
  description: 'Contact Sandeepa for sketch meet questions or Kasun for help with your USK Galle account, submissions and website.',
};

export default function SupportPage() {
  const eventContact = events.find(event => event.contact?.name === 'Sandeepa')?.contact;
  const contacts = [
    {
      slug: 'sandeepa-vithanage',
      category: 'Sketch meets & events',
      description: 'Ask about upcoming sketch meets, meeting points, event registration and joining a session.',
      links: [
        { label: 'Instagram: @sandeepa_vithanage', href: getArtistBySlug('sandeepa-vithanage').instagram },
        { label: `WhatsApp: ${eventContact.phone}`, href: `https://wa.me/${eventContact.phone.replace(/\D/g, '')}` },
      ],
    },
    {
      slug: 'kasun-miuranga',
      category: 'Accounts & website support',
      description: 'Get help creating an account, updating your profile, submitting artwork, writing a blog or using the website.',
      links: [
        { label: 'kasunmiu@gmail.com', href: 'mailto:kasunmiu@gmail.com' },
        { label: 'WhatsApp: +94 76 495 8373', href: 'https://wa.me/94764958373' },
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>We’re here to help</span>
        <h1 className={styles.title}>Support</h1>
        <p>Questions about a sketch meet or a little help with the website? Get in touch with the right person below.</p>
      </header>
      <div className={styles.contacts}>
        {contacts.map(contact => {
          const artist = getArtistBySlug(contact.slug);
          return (
            <section className={styles.card} key={contact.slug}>
              <span className={styles.eyebrow}>{contact.category}</span>
              <Link href={`/artists/${artist.slug}`} className={styles.profile}>
                <img src={getProfileImagePath(artist)} alt={artist.name} width="80" height="80" />
                <div><h2>{artist.name}</h2><span>{artist.role}</span></div>
              </Link>
              <p className={styles.description}>{contact.description}</p>
              <div className={styles.links}>
                {contact.links.map(link => (
                  <a key={link.href} href={link.href}
                    {...(link.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {link.label}
                  </a>
                ))}
              </div>
              <Link href={`/artists/${artist.slug}`} className={styles.viewProfile}>View profile →</Link>
            </section>
          );
        })}
      </div>
    </main>
  );
}
