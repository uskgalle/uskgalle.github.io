'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faPalette,
  faImage,
  faShareNodes,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import styles from './admin.module.css';

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();

  const isExactAdmin = pathname === '/admin';
  const isArtists = pathname.startsWith('/admin/artists');
  const isArtworks = pathname.startsWith('/admin/artworks');
  const isPosts = pathname.startsWith('/admin/posts');

  return (
    <div className={styles.adminRoot}>
      {/* Top Header */}
      <header className={styles.topNav}>
        <div className={styles.topNavInner}>
          {/* Brand */}
          <Link href="/admin" className={styles.brandGroup}>
            <div className={styles.brandBadge}>
              <span className={styles.statusDot}></span>
              Admin Studio
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>USK Galle</span>
              <span className={styles.brandTag}>Content & Publishing Studio</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className={styles.navTabs}>
            <Link
              href="/admin"
              className={`${styles.tabLink} ${isExactAdmin ? styles.tabLinkActive : ''}`}
            >
              <FontAwesomeIcon icon={faLayerGroup} style={{ fontSize: '0.85rem' }} />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/artists"
              className={`${styles.tabLink} ${isArtists ? styles.tabLinkActive : ''}`}
            >
              <FontAwesomeIcon icon={faPalette} style={{ fontSize: '0.85rem' }} />
              <span>Artists</span>
            </Link>

            <Link
              href="/admin/artworks"
              className={`${styles.tabLink} ${isArtworks ? styles.tabLinkActive : ''}`}
            >
              <FontAwesomeIcon icon={faImage} style={{ fontSize: '0.85rem' }} />
              <span>Artworks</span>
            </Link>

            <Link
              href="/admin/posts"
              className={`${styles.tabLink} ${isPosts ? styles.tabLinkActive : ''}`}
            >
              <FontAwesomeIcon icon={faShareNodes} style={{ fontSize: '0.85rem' }} />
              <span>Post Templates</span>
            </Link>
          </nav>

          {/* Right Action: Return to Website */}
          <Link href="/" target="_blank" className={styles.exitSiteBtn} title="Open live website in new tab">
            <span>Live Site</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ fontSize: '0.75rem' }} />
          </Link>
        </div>
      </header>

      {/* Main View Area */}
      <main className={styles.adminContainer}>
        {children}
      </main>
    </div>
  );
}
