import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';

const footerLinks = {
  Explore: [
    { label: 'Events',       href: '/events' },
    { label: 'Artists',      href: '/artists' },
    { label: 'Gallery',      href: '/gallery' },
    { label: 'Blog',         href: '/blog' },
  ],
  Community: [
    { label: 'About Us',     href: '/#about' },
    { label: 'Join Us',      href: '/#join' },
    { label: 'Sketch Meets', href: '/events' },
    /* { label: 'Manifesto',    href: '/' }, */
  ],
  /* Connect: [
    { label: 'Instagram',    href: 'https://www.instagram.com/urbansketchersgalle' },
    { label: 'Facebook',     href: 'https://www.facebook.com/share/1L8GtVnbzg' },
    { label: 'WhatsApp',     href: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l' },
    { label: 'Contact',      href: '#join' },
  ], */
};

const socials = [
  { icon: faInstagram, href: 'https://www.instagram.com/urbansketchersgalle', label: 'Instagram' },
  { icon: faFacebookF, href: 'https://www.facebook.com/share/1L8GtVnbzg', label: 'Facebook' },
  { icon: faWhatsapp,  href: 'https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l',     label: 'WhatsApp' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Top: brand + link columns */}
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <a href="/" className={styles.logoText}>USK Galle</a>
            <p className={styles.tagline}>
              Sketching the south,<br />one line at a time.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target='_blank' className={styles.socialIcon} aria-label={s.label}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className={styles.linkColumns}>
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className={styles.linkGroup}>
                <h4 className={styles.groupTitle}>{group}</h4>
                <ul className={styles.linkList}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.footerLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.hr} />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} Urban Sketchers Galle. All rights reserved.</p>
          <p className={styles.copy}>Part of the global <a href="https://urbansketchers.org" className={styles.globalLink}>Urban Sketchers</a> network.</p>
        </div>

      </div>
    </footer>
  );
}
