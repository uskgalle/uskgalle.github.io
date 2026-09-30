'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './article.module.css';
import BlurImage from '../../../components/BlurImage/BlurImage';
import ImageLightbox from '../../../components/ImageLightbox/ImageLightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowLeft, 
    faShareNodes, 
    faArrowRight, 
    faClock, 
    faCalendarDays,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function getAuthorAvatar(authorSlug) {
    const known = ['yasith-arangala', 'sumudu-udari', 'sachith-vithanage', 'lakshana-samadhi'];
    if (authorSlug && known.includes(authorSlug)) {
        return `/artists-images/${authorSlug}.png`;
    }
    return '/artists-images/no_profile.png';
}

export default function BlogArticleClient({ post, relatedPosts = [], authorData = null }) {
    const [copied, setCopied] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const contentRef = useRef(null);

    // Reading progress tracker
    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const progress = (scrollTop / docHeight) * 100;
                setReadProgress(Math.min(100, Math.max(0, progress)));
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    // Extract all images in article for interactive Lightbox zoom
    useEffect(() => {
        const imagesList = [];

        // 1. Cover image
        if (post.coverImage) {
            imagesList.push({
                src: post.coverImage,
                title: post.title,
                description: post.coverCaption || post.excerpt,
                artistName: post.author,
                artistSlug: post.authorSlug,
            });
        }

        // 2. Images inside HTML content
        if (contentRef.current) {
            const contentImgs = contentRef.current.querySelectorAll('img');
            contentImgs.forEach((img) => {
                const figcaption = img.closest('figure')?.querySelector('figcaption')?.textContent;
                imagesList.push({
                    src: img.getAttribute('src'),
                    title: img.getAttribute('alt') || post.title,
                    description: figcaption || '',
                    artistName: post.author,
                    artistSlug: post.authorSlug,
                });
            });
        }

        setGalleryImages(imagesList);
    }, [post]);

    // Handle clicking images inside article to open Lightbox
    const handleContentClick = (e) => {
        const target = e.target;
        if (target && target.tagName === 'IMG') {
            const src = target.getAttribute('src');
            const foundIndex = galleryImages.findIndex((item) => item.src === src);
            if (foundIndex !== -1) {
                setLightboxIndex(foundIndex);
            }
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled share
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isSystemAuthor = !post.author || post.author === 'System' || !post.authorSlug;

    return (
        <main className={styles.main}>
            {/* Reading progress indicator bar */}
            <div
                className={styles.progressBar}
                style={{ width: `${readProgress}%` }}
                aria-hidden="true"
            />

            {/* Breadcrumb & Navigation */}
            <div className={styles.topNavRow}>
                <Link href="/blog" className={styles.backLink}>
                    <FontAwesomeIcon icon={faArrowLeft} /> All Articles
                </Link>

                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span className={styles.crumbSep}>/</span>
                    <Link href="/blog">Blog</Link>
                    <span className={styles.crumbSep}>/</span>
                    <span className={styles.crumbCurrent}>{post.category}</span>
                </nav>
            </div>

            <article className={styles.article}>
                {/* Header */}
                <header className={styles.articleHeader}>
                    <div className={styles.categoryPillRow}>
                        <span className={styles.categoryTag}>{post.category}</span>
                        <span className={styles.headerTime}>
                            <FontAwesomeIcon icon={faClock} /> {post.readTime}
                        </span>
                        <span className={styles.headerDate}>
                            <FontAwesomeIcon icon={faCalendarDays} /> {post.date}
                        </span>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>

                    <p className={styles.leadExcerpt}>{post.excerpt}</p>

                    <div className={styles.metaRow}>
                        <div className={styles.authorMeta}>
                            <img
                                src={getAuthorAvatar(post.authorSlug)}
                                alt={post.author}
                                className={styles.authorAvatar}
                            />
                            <div>
                                <span className={styles.byLabel}>Story by</span>
                                {isSystemAuthor ? (
                                    <span className={styles.authorName}>USK Galle Community</span>
                                ) : (
                                    <Link href={`/artists/${post.authorSlug}`} className={styles.authorLink}>
                                        {post.author}
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className={styles.headerActions}>
                            <button
                                onClick={handleShare}
                                className={styles.shareBtn}
                                aria-label="Share this article"
                            >
                                <FontAwesomeIcon icon={faShareNodes} /> Share Article
                            </button>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {post.coverImage && (
                    <figure className={styles.coverFigure}>
                        <div
                            className={styles.coverWrap}
                            onClick={() => setLightboxIndex(0)}
                        >
                            <BlurImage
                                src={post.coverImage}
                                alt={post.coverAlt || post.title}
                                className={styles.coverImage}
                            />
                        </div>
                        {post.coverCaption && (
                            <figcaption className={styles.coverCaption}>
                                📷 {post.coverCaption}
                            </figcaption>
                        )}
                    </figure>
                )}

                {/* Article Body Content */}
                <div
                    ref={contentRef}
                    onClick={handleContentClick}
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className={styles.articleTags}>
                        <span className={styles.tagsHeading}>Related Topics:</span>
                        <div className={styles.tagsList}>
                            {post.tags.map((tag) => (
                                <span key={tag} className={styles.tagItem}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Author Box */}
                <div className={styles.authorBox}>
                    <img
                        src={getAuthorAvatar(post.authorSlug)}
                        alt={post.author}
                        className={styles.authorBoxAvatar}
                    />

                    <div className={styles.authorBoxContent}>
                        <span className={styles.writtenBy}>About the Author</span>
                        <h3 className={styles.authorBoxName}>
                            {isSystemAuthor ? 'USK Galle Editorial' : post.author}
                        </h3>
                        <p className={styles.authorBoxBio}>
                            {authorData?.bio
                                ? authorData.bio
                                : isSystemAuthor
                                ? 'Stories, architectural notes, and field guides compiled by the urban sketching community in Galle Fort, Sri Lanka.'
                                : 'Urban sketcher, artist, and frequent contributor to USK Galle community sketch walks.'}
                        </p>

                        <div className={styles.authorLinksRow}>
                            {!isSystemAuthor && post.authorSlug && (
                                <Link href={`/artists/${post.authorSlug}`} className={styles.viewProfileBtn}>
                                    View Artist Portfolio <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            )}

                            {authorData?.instagram && (
                                <a
                                    href={authorData.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.authorInstagramLink}
                                >
                                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Articles Section */}
                {relatedPosts.length > 0 && (
                    <section className={styles.relatedSection} aria-label="Related articles">
                        <div className={styles.relatedHeader}>
                            <h2 className={styles.relatedTitle}>Continue Reading</h2>
                            <Link href="/blog" className={styles.allStoriesLink}>
                                View all articles <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>

                        <div className={styles.relatedGrid}>
                            {relatedPosts.map((related) => (
                                <article key={related.slug} className={styles.relatedCard}>
                                    <Link href={`/blog/${related.slug}`} className={styles.relatedThumbLink}>
                                        <div className={styles.relatedThumbWrap}>
                                            <BlurImage
                                                src={related.coverImage || '/hero-images/1.jpg'}
                                                alt={related.coverAlt || related.title}
                                                className={styles.relatedThumb}
                                            />
                                            <span className={styles.relatedCategory}>{related.category}</span>
                                        </div>
                                    </Link>

                                    <div className={styles.relatedBody}>
                                        <span className={styles.relatedTime}>
                                            <FontAwesomeIcon icon={faClock} /> {related.readTime}
                                        </span>
                                        <h3 className={styles.relatedCardTitle}>
                                            <Link href={`/blog/${related.slug}`}>
                                                {related.title}
                                            </Link>
                                        </h3>
                                        <p className={styles.relatedExcerpt}>{related.excerpt}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer Navigation Buttons */}
                <div className={styles.bottomNav}>
                    <Link href="/blog" className={styles.backToBlogBtn}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to all articles
                    </Link>

                    <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Back to top">
                        <FontAwesomeIcon icon={faChevronUp} /> Back to top
                    </button>
                </div>
            </article>

            {/* Interactive Lightbox modal */}
            {galleryImages.length > 0 && lightboxIndex !== null && (
                <ImageLightbox
                    images={galleryImages}
                    activeIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
                    onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                />
            )}

            {/* Toast Confirmation */}
            {copied && <div className={styles.toast}>Article link copied to clipboard!</div>}
        </main>
    );
}
