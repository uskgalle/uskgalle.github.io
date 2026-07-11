'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Artists', href: '/artists' },
  /* { label: 'About', href: '/about' }, */
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>

        {/* Logo — text only */}
        <a href="/" className={styles.logo}>
          {/*  <img src="icon.png" alt="" className='navImage' /> */} USK Galle
        </a>

        {/* Nav links — center */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href))
                    ? styles.navLinkActive
                    : ''
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — Join CTA */}
        <div className={styles.right}>
          <a href="#join" className={styles.joinBtn}>Join</a>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={menuOpen ? styles.mobileMenuOpen : styles.mobileMenu}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#join" className={styles.mobileJoinBtn} onClick={() => setMenuOpen(false)}>
          Join
        </a>
      </div>
    </nav>
  );
}