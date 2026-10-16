'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageLightbox from '../../../components/ImageLightbox/ImageLightbox';
import BlurImage from '../../../components/BlurImage/BlurImage';
import styles from './ArtistClient.module.css';
import StoryMaker from '../../../components/StoryMaker/StoryMaker';
import CountryBadge from '../../../components/CountryBadge/CountryBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faShareNodes, 
    faArrowLeft, 
    faClock, 
    faArrowRight, 
    faBookOpen, 
    faPalette,
    faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function ArtistClient({ artist, artworks = [], profileImage, articles = [] }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [copied, setCopied] = useState(false);
    const [storyOpen, setStoryOpen] = useState(false);
    const [makerFormat, setMakerFormat] = useState('story');
    const [bioExpanded, setBioExpanded] = useState(false);
    const bio = artist.bio || '';
    const longBio = bio.length > 220;
    const shortBio = longBio ? bio.slice(0, 220).replace(/\s+\S*$/, '').trimEnd() : bio;

    const handleShare = async () => {
        const shareData = {
            title: `${artist.name} - USK Galle`,
            text: `Check out ${artist.name}'s profile on USK Galle!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or share failed
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    return (
        <main className={styles.main}>
            <Link href="/artists" className={styles.backLink}>
                <FontAwesomeIcon icon={faArrowLeft} /> All Artists
            </Link>

            <header className={styles.profileHeader}>
                        <details className={styles.settings}>
                            <summary className={styles.settingsToggle} aria-label="Artist tools" title="Artist tools"><FontAwesomeIcon icon={faScrewdriverWrench} /></summary>
                            <div className={styles.settingsOptions}>
                                <button type="button" onClick={event => { setMakerFormat('story'); setStoryOpen(true); event.currentTarget.closest('details').open = false; }}>Make Story</button>
                                <button type="button" onClick={event => { setMakerFormat('post'); setStoryOpen(true); event.currentTarget.closest('details').open = false; }}>Make Post</button>
                                {artist.id && <Link href={`/artists/edit?id=${encodeURIComponent(artist.id)}`}>Edit Details</Link>}
                                {artist.id && !artist.isSpecial && <Link href={`/artworks/submit?id=${encodeURIComponent(artist.id)}`}>Submit Artwork</Link>}
                            </div>
                        </details>
                <div className={styles.avatarWrapper}>
                    <img
                        src={profileImage || '/artists-images/no_profile.png'}
                        alt={artist.name}
                        className={styles.avatarImg}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/artists-images/no_profile.png';
                        }}
                    />
                </div>

                <div className={styles.profileDetails}>
                    <div className={styles.eyebrowRow}>
                        <span className={styles.eyebrow}>
                            {artist.role || 'USK Galle Artist'}
                        </span>
                        {artist.id && <><span className={styles.artistId}>{artist.id}</span><CountryBadge country={artist.country} bare /></>}
                    </div>
                    <h1 className={styles.name}>{artist.name}</h1>

                    <p className={styles.bio}>
                        <span id="artist-bio">{longBio && !bioExpanded ? `${shortBio}…` : bio}</span>
                        {longBio && <> <button type="button" className={styles.bioToggle} aria-expanded={bioExpanded} aria-controls="artist-bio" onClick={() => setBioExpanded(expanded => !expanded)}>{bioExpanded ? 'See less' : 'See more'}</button></>}
                    </p>

                    <div className={styles.actions}>
                        <button onClick={handleShare} className={styles.btnPrimary}>
                            <FontAwesomeIcon icon={faShareNodes} /> Share Profile
                        </button>



                        {artist.instagram && (
                            <a
                                href={artist.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnSecondary}
                            >
                                <FontAwesomeIcon icon={faInstagram} /> Instagram
                            </a>
                        )}

                        {articles.length > 0 && (
                            <a href="#articles" className={styles.btnSecondary}>
                                <FontAwesomeIcon icon={faBookOpen} /> {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {copied && <div className={styles.toast}>Link copied to clipboard!</div>}
            {storyOpen && <StoryMaker format={makerFormat} artist={artist} artworks={artworks} profileImage={profileImage} onClose={() => setStoryOpen(false)} />}

            {/* Artworks Gallery (if any) */}
            {(artworks.length > 0 || !artist.isSpecial) && (
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faPalette} /> Artworks by {artist.name}
                        </h2>
                        <span className={styles.countBadge}>
                            {artworks.length} {artworks.length === 1 ? 'sketch' : 'sketches'}
                        </span>
                    </div>

                    {artworks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>No artworks uploaded yet for this artist.</p>
                        </div>
                    ) : (
                        <div
                            className={`${styles.gallery} ${
                                artworks.length === 1
                                    ? styles.gallerySingle
                                    : artworks.length === 2
                                    ? styles.galleryDouble
                                    : ''
                            }`}
                        >
                            {artworks.map((art, index) => (
                                <div
                                    key={art.id}
                                    className={styles.imgWrap}
                                    onClick={() => setLightboxIndex(index)}
                                >
                                    <BlurImage
                                        src={art.src}
                                        alt={art.title}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Articles by this Author (especially for System & contributors) */}
            {articles.length > 0 && (
                <section id="articles" className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faBookOpen} /> Articles & Stories by {artist.name}
                        </h2>
                        <span className={styles.countBadge}>
                            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                        </span>
                    </div>

                    <div className={styles.articlesGrid}>
                        {articles.map((post) => (
                            <article key={post.slug} className={styles.articleCard}>
                                <Link href={`/blog/${post.slug}`} className={styles.articleThumbLink}>
                                    <div className={styles.articleThumbWrap}>
                                        <BlurImage
                                            src={post.coverImage || '/hero-images/1.jpg'}
                                            alt={post.coverAlt || post.title}
                                            className={styles.articleThumb}
                                        />
                                        <span className={styles.articleCategory}>{post.category}</span>
                                    </div>
                                </Link>

                                <div className={styles.articleBody}>
                                    <span className={styles.articleTime}>
                                        <FontAwesomeIcon icon={faClock} /> {post.readTime}
                                    </span>
                                    <h3 className={styles.articleCardTitle}>
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className={styles.articleExcerpt}>{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className={styles.articleReadBtn}>
                                        Read Story <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            <ImageLightbox
                images={artworks}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev + 1) % artworks.length)}
                onPrev={() => setLightboxIndex((prev) => (prev - 1 + artworks.length) % artworks.length)}
            />
        </main>
    );
}
