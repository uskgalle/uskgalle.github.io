import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import styles from './postsHub.module.css';

export const metadata = {
  title: 'Instagram Post Templates — Admin Studio | USK Galle',
  description: 'Choose an Instagram post template to customize event details, generate QR codes, and export HD flyers.',
  robots: {
    index: false,
    follow: false,
  },
};

const TEMPLATES = [
  {
    slug: 'blog',
    title: 'Blog Article Hook & QR',
    desc: 'Stripped-down editorial template for blog articles. Features your blog cover, a scroll-stopping hook, and an instant-read QR code card.',
    tags: ['Blog Edition', '4:5 Feed', 'Article Hook'],
    ratio: '4:5 Feed',
    previewType: 'blog',
  },
  {
    slug: 'split',
    title: 'Modern Split Meetup Flyer',
    desc: 'Clean white two-column layout with tall portrait artwork, quick event detail cards, and dashed instant-access QR code card.',
    tags: ['New Blueprint', '4:5 Feed', 'Split Layout'],
    ratio: '4:5 Feed',
    previewType: 'split',
  },
  {
    slug: 'classic',
    title: 'Classic Meetup Flyer',
    desc: 'Balanced layout featuring framed hero artwork, 2x2 details grid, scannable QR card, and 4 theme color presets (Warm Paper, Terracotta, Charcoal, Ocean).',
    tags: ['Editorial', '4:5 Feed', 'Themed'],
    ratio: '4:5 Feed',
    previewType: 'classic',
  },
  {
    slug: 'overlay',
    title: 'Full-Bleed Image Overlay',
    desc: 'Artwork spans the full canvas with event headline and schedule details overlaid directly on top using dark gradient scrims.',
    tags: ['Image Overlay', '4:5 Feed', 'Text Over Image'],
    ratio: '4:5 Feed',
    previewType: 'overlay',
  },
  {
    slug: 'minimal',
    title: 'Minimalist Magazine Poster',
    desc: 'Bold headline typography, horizontal artwork strip, clean event info grid, and high contrast QR box.',
    tags: ['Minimal', '4:5 Feed', 'Bold Typography'],
    ratio: '4:5 Feed',
    previewType: 'minimal',
  },
  {
    slug: 'story',
    title: 'Instagram Story Flyer',
    desc: 'Full-height 9:16 vertical layout optimized specifically for Instagram Stories, Reels, and mobile phone screens.',
    tags: ['9:16 Story', 'Vertical Screen', 'Story / Reel'],
    ratio: '9:16 Story',
    previewType: 'story',
  },
];

export default function PostHubPage() {
  return (
    <div className={styles.hubWrapper}>
      {/* Header */}
      <header className={styles.hubHeader}>
        <div className={styles.brandBadge}>
          <FontAwesomeIcon icon={faShareNodes} />
          <span>Publishing &amp; Social Studio</span>
        </div>
        <h1 className={styles.hubTitle}>Instagram Post Templates</h1>
        <p className={styles.hubSubtitle}>
          Select a template below to launch the interactive builder. Features live autofill directly from your
          events and blog posts, custom image uploads, instant QR code rendering, and ultra-HD PNG image export.
        </p>
      </header>

      {/* Templates Grid */}
      <div className={styles.galleryGrid}>
        {TEMPLATES.map((tmpl) => (
          <Link
            key={tmpl.slug}
            href={`/admin/posts/${tmpl.slug}`}
            className={styles.templateCard}
          >
            {/* Visual Canvas Mockup */}
            <div className={styles.previewBox}>
              {tmpl.previewType === 'blog' && (
                <div className={styles.miniCanvas}>
                  <div
                    className={styles.miniBlogCover}
                    style={{ backgroundImage: `url('/blog-images/usk-galle-artist-profiles.webp')` }}
                  />
                  <div style={{ fontSize: '7px', fontWeight: 700, color: '#2a201a', lineHeight: 1.1, marginBottom: '3px' }}>
                    Introducing Artist Profiles
                  </div>
                  <div style={{ fontSize: '5px', color: '#6b5a47', borderLeft: '1.5px solid #b8854a', paddingLeft: '3px', marginBottom: '4px' }}>
                    A digital home for every artist...
                  </div>
                  <div className={styles.miniBottomDashed}>
                    <span style={{ fontSize: '4.5px', fontWeight: 800, color: '#2a201a' }}>USK GALLE</span>
                    <span style={{ fontSize: '4px', color: '#b8854a', fontWeight: 700 }}>Read more &rarr;</span>
                    <div className={styles.miniQrBox} />
                  </div>
                </div>
              )}

              {tmpl.previewType === 'split' && (
                <div className={styles.miniCanvas} style={{ background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '5.5px', fontWeight: 800, color: '#0f172a' }}>USK GALLE</span>
                    <span style={{ fontSize: '5px', fontWeight: 800, color: '#b85d1b', background: '#faebe2', padding: '1px 4px', borderRadius: '4px' }}>
                      UPCOMING
                    </span>
                  </div>
                  <div className={styles.miniSplitBody}>
                    <div
                      className={styles.miniSplitLeft}
                      style={{ backgroundImage: `url('/doodles/meetup-sketch.jpg')` }}
                    />
                    <div>
                      <div className={styles.miniCardRow} />
                      <div className={styles.miniCardRow} />
                      <div className={styles.miniCardRow} />
                    </div>
                  </div>
                  <div className={styles.miniBottomDashed}>
                    <span style={{ fontSize: '4.5px', color: '#64748b' }}>REGISTER VIA QR</span>
                    <div className={styles.miniQrBox} />
                  </div>
                </div>
              )}

              {tmpl.previewType === 'classic' && (
                <div className={styles.miniCanvas} style={{ background: '#f5f0e6' }}>
                  <div style={{ fontSize: '5.5px', fontWeight: 800, color: '#1f2421', marginBottom: '5px' }}>
                    URBAN SKETCHERS GALLE
                  </div>
                  <div
                    className={styles.miniClassicImg}
                    style={{ backgroundImage: `url('/doodles/hero.jpg')` }}
                  />
                  <div style={{ fontSize: '7px', fontWeight: 800, color: '#1f2421', marginBottom: '4px' }}>
                    Sketch Meet-Up #4
                  </div>
                  <div className={styles.miniClassicGrid}>
                    <div className={styles.miniClassicBox} />
                    <div className={styles.miniClassicBox} />
                  </div>
                </div>
              )}

              {tmpl.previewType === 'overlay' && (
                <div className={`${styles.miniCanvas} ${styles.miniOverlayStyle}`}>
                  <div
                    className={styles.miniOverlayBg}
                    style={{ backgroundImage: `url('/doodles/hero.jpg')` }}
                  />
                  <div className={styles.miniOverlayScrim} />
                  <div className={styles.miniOverlayContent}>
                    <div style={{ fontSize: '5.5px', fontWeight: 800, letterSpacing: '0.5px' }}>URBAN SKETCHERS</div>
                    <div style={{ fontSize: '8px', fontWeight: 800 }}>Text Over Image</div>
                    <div style={{ fontSize: '5px', opacity: 0.8 }}>Galle Fort Ramparts</div>
                  </div>
                </div>
              )}

              {tmpl.previewType === 'minimal' && (
                <div className={styles.miniCanvas} style={{ background: '#ffffff' }}>
                  <div style={{ fontSize: '8px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>
                    SKETCH MEET #5
                  </div>
                  <div
                    style={{
                      height: '50px',
                      backgroundImage: `url('/doodles/hero.jpg')`,
                      backgroundSize: 'cover',
                      borderRadius: '3px',
                      marginBottom: '6px',
                    }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                    <div style={{ background: '#f1f5f9', height: '14px', borderRadius: '2px' }} />
                    <div style={{ background: '#f1f5f9', height: '14px', borderRadius: '2px' }} />
                  </div>
                </div>
              )}

              {tmpl.previewType === 'story' && (
                <div className={`${styles.miniCanvas} ${styles.miniStoryStyle}`}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url('/doodles/hero.jpg')`,
                      backgroundSize: 'cover',
                      opacity: 0.75,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%)',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
                    <span style={{ fontSize: '4px', background: '#e76f51', color: '#fff', padding: '1px 3px', borderRadius: '2px' }}>
                      9:16 STORY
                    </span>
                    <div style={{ fontSize: '7px', fontWeight: 800, marginTop: '2px' }}>Instagram Story</div>
                  </div>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className={styles.cardBody}>
              <div className={styles.cardTags}>
                {tmpl.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`${styles.tag} ${i === 0 ? styles.tagFeatured : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className={styles.cardTitle}>{tmpl.title}</h2>
              <p className={styles.cardDesc}>{tmpl.desc}</p>

              <div className={styles.cardBtn}>
                <span>Customize Template</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
