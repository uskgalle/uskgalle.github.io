import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faImage,
  faShareNodes,
  faArrowRight,
  faBookOpen,
  faCalendarDay,
  faFolderTree,
} from '@fortawesome/free-solid-svg-icons';
import { artists } from '../data/artists';
import { artworks } from '../data/artworks';
import { events } from '../data/events';
import { blogPosts } from '../data/blog';
import styles from './dashboard.module.css';

export default function AdminDashboardPage() {
  const totalArtists = artists?.length || 0;
  const totalArtworks = artworks?.length || 0;
  const totalEvents = events?.length || 0;
  const totalBlogs = blogPosts?.length || 0;

  return (
    <div className={styles.dashboardWrapper}>
      {/* Hero Welcome */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span>USK Galle Internal Admin Studio</span>
        </div>
        <h1 className={styles.heroTitle}>Publishing &amp; Content Workstation</h1>
        <p className={styles.heroSubtitle}>
          Central hub for generating artist profiles, cataloging artwork metadata, and crafting high-resolution
          Instagram flyers &amp; stories — integrated directly with the project&apos;s data layer.
        </p>
      </section>

      {/* Metrics Row */}
      <section className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: 'rgba(200, 109, 59, 0.15)', color: '#c86d3b' }}>
            <FontAwesomeIcon icon={faPalette} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{totalArtists}</span>
            <span className={styles.metricLabel}>Community Artists</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <FontAwesomeIcon icon={faImage} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{totalArtworks}</span>
            <span className={styles.metricLabel}>Artworks Indexed</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{totalEvents}</span>
            <span className={styles.metricLabel}>Meetups &amp; Events</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{totalBlogs}</span>
            <span className={styles.metricLabel}>Articles Published</span>
          </div>
        </div>
      </section>

      {/* Workstation Tools */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faFolderTree} style={{ color: '#c86d3b', fontSize: '1.1rem' }} />
            Content Generators
          </h2>
        </div>

        <div className={styles.toolsGrid}>
          {/* Tool 1: Artist Generator */}
          <Link href="/admin/artists" className={styles.toolCard}>
            <div className={styles.toolHeader}>
              <div className={styles.toolIconBox}>
                <FontAwesomeIcon icon={faPalette} />
              </div>
              <span className={styles.toolBadge}>Roster Tool</span>
            </div>
            <h3 className={styles.toolTitle}>Artist Profile Generator</h3>
            <p className={styles.toolDesc}>
              Register new community sketchers or edit existing profiles. Auto-calculates next USKG ID, formats
              Instagram handles, verifies asset paths, and outputs copyable code snippets for <code>artists.js</code>.
            </p>
            <ul className={styles.toolFeatures}>
              <li>Auto-increments next ID (e.g. USKG{totalArtists + 1})</li>
              <li>Live profile card preview with avatar initials</li>
              <li>Terminal directory creation helper</li>
            </ul>
            <div className={styles.toolActionBtn}>
              <span>Open Artist Studio</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>

          {/* Tool 2: Artwork Generator */}
          <Link href="/admin/artworks" className={styles.toolCard}>
            <div className={styles.toolHeader}>
              <div className={styles.toolIconBox} style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                <FontAwesomeIcon icon={faImage} />
              </div>
              <span className={styles.toolBadge}>Gallery Tool</span>
            </div>
            <h3 className={styles.toolTitle}>Artwork Metadata Generator</h3>
            <p className={styles.toolDesc}>
              Catalog new sketches by selecting from existing artists and meetups. Calculates next artwork index,
              provides title &amp; medium presets, and produces formatted objects for <code>artworks.js</code>.
            </p>
            <ul className={styles.toolFeatures}>
              <li>Searchable artist combobox with sketch count</li>
              <li>Auto-detects next artwork number per artist</li>
              <li>Drop-in image preview &amp; code exporter</li>
            </ul>
            <div className={styles.toolActionBtn}>
              <span>Open Artwork Studio</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>

          {/* Tool 3: Instagram Post Templates */}
          <Link href="/admin/posts" className={styles.toolCard}>
            <div className={styles.toolHeader}>
              <div className={styles.toolIconBox} style={{ color: '#e76f51', background: 'rgba(231, 111, 81, 0.12)', borderColor: 'rgba(231, 111, 81, 0.25)' }}>
                <FontAwesomeIcon icon={faShareNodes} />
              </div>
              <span className={styles.toolBadge}>Flyer &amp; Story Hub</span>
            </div>
            <h3 className={styles.toolTitle}>Instagram Post Templates</h3>
            <p className={styles.toolDesc}>
              Generate production-ready 4:5 feed flyers and 9:16 vertical stories with live QR codes. Features 1-click
              autofill directly from your live events and blog posts.
            </p>
            <ul className={styles.toolFeatures}>
              <li>6 designer templates (Split, Classic, Overlay, Minimal, Story, Blog)</li>
              <li>Autofill event details, dates, and registration QR codes</li>
              <li>Export HD PNG images ready for Instagram</li>
            </ul>
            <div className={styles.toolActionBtn}>
              <span>Open Post Hub</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Links to Templates */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faShareNodes} style={{ color: '#e76f51', fontSize: '1.1rem' }} />
            Instagram Post Templates (Direct Launch)
          </h2>
          <Link href="/admin/posts" style={{ color: '#c86d3b', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            View Hub Gallery &rarr;
          </Link>
        </div>

        <div className={styles.templatesGrid}>
          <Link href="/admin/posts/blog" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>Blog Edition</span>
            <span className={styles.templateName}>Article Hook &amp; QR</span>
            <span className={styles.templateRatio}>4:5 Portrait Feed</span>
          </Link>

          <Link href="/admin/posts/split" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>New Blueprint</span>
            <span className={styles.templateName}>Modern Split Meetup</span>
            <span className={styles.templateRatio}>4:5 Portrait Feed</span>
          </Link>

          <Link href="/admin/posts/classic" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>Editorial</span>
            <span className={styles.templateName}>Classic Meetup Flyer</span>
            <span className={styles.templateRatio}>4:5 Portrait Feed</span>
          </Link>

          <Link href="/admin/posts/overlay" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>Full-Bleed</span>
            <span className={styles.templateName}>Image Scrim Overlay</span>
            <span className={styles.templateRatio}>4:5 Portrait Feed</span>
          </Link>

          <Link href="/admin/posts/minimal" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>Minimal</span>
            <span className={styles.templateName}>Magazine Poster</span>
            <span className={styles.templateRatio}>4:5 Portrait Feed</span>
          </Link>

          <Link href="/admin/posts/story" className={styles.templateMiniCard}>
            <span className={styles.templateTag}>Story / Reel</span>
            <span className={styles.templateName}>Instagram Story Flyer</span>
            <span className={styles.templateRatio}>9:16 Vertical Screen</span>
          </Link>
        </div>
      </section>

      {/* Data Files Cheatsheet */}
      <section className={styles.dataSheetCard}>
        <h3 className={styles.dataSheetTitle}>Project Data Integration Architecture</h3>
        <p className={styles.dataSheetDesc}>
          All generators read directly from and target these exact project files:
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.pathsTable}>
            <thead>
              <tr>
                <th>Data Entity</th>
                <th>Target Data File</th>
                <th>Static Assets Location</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Artists</strong></td>
                <td><code className={styles.codePath}>src/app/data/artists.js</code></td>
                <td><code className={styles.codePath}>public/artists-images/[USKG#].png</code></td>
                <td>Community sketcher roster and profile details</td>
              </tr>
              <tr>
                <td><strong>Artworks</strong></td>
                <td><code className={styles.codePath}>src/app/data/artworks.js</code></td>
                <td><code className={styles.codePath}>public/artworks-images/[USKG#]/[N].png</code></td>
                <td>Sketch titles, media descriptions, and event tags</td>
              </tr>
              <tr>
                <td><strong>Events</strong></td>
                <td><code className={styles.codePath}>src/app/data/events.js</code></td>
                <td><code className={styles.codePath}>public/doodles/</code></td>
                <td>Meetup details, registration links, schedules</td>
              </tr>
              <tr>
                <td><strong>Blogs</strong></td>
                <td><code className={styles.codePath}>src/app/data/blogs/index.js</code></td>
                <td><code className={styles.codePath}>public/blog-images/</code></td>
                <td>Educational articles, field guides, and historical notes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
