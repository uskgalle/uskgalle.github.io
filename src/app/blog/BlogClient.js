'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import BlurImage from '../../components/BlurImage/BlurImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faArrowRight, 
    faClock, 
    faCalendarDays, 
    faMagnifyingGlass, 
    faXmark,
    faBookOpen,
    faFeatherPointed
} from '@fortawesome/free-solid-svg-icons';

function getAuthorAvatar(authorSlug) {
    const known = ['yasith-arangala', 'sumudu-udari', 'sachith-vithanage', 'lakshana-samadhi'];
    if (authorSlug && known.includes(authorSlug)) {
        return `/artists-images/${authorSlug}.png`;
    }
    return '/artists-images/no_profile.png';
}

export default function BlogClient({ posts }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Galle History', 'Urban Sketching', 'Guides & Tips'];

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesCategory =
                selectedCategory === 'All' ||
                post.category.toLowerCase() === selectedCategory.toLowerCase();

            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;

            const q = searchQuery.toLowerCase().trim();
            const inTitle = post.title?.toLowerCase().includes(q);
            const inExcerpt = post.excerpt?.toLowerCase().includes(q);
            const inAuthor = post.author?.toLowerCase().includes(q);
            const inTags = post.tags?.some((t) => t.toLowerCase().includes(q));

            return inTitle || inExcerpt || inAuthor || inTags;
        });
    }, [posts, selectedCategory, searchQuery]);

    // When on "All" and no search query, highlight the designated featured post (or first post)
    const featuredPost = useMemo(() => {
        if (selectedCategory !== 'All' || searchQuery.trim()) return null;
        return posts.find((p) => p.featured) || posts[0] || null;
    }, [posts, selectedCategory, searchQuery]);

    // Remaining posts to show in regular grid
    const regularPosts = useMemo(() => {
        if (featuredPost) {
            return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
        }
        return filteredPosts;
    }, [filteredPosts, featuredPost]);

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleResetAll = () => {
        setSearchQuery('');
        setSelectedCategory('All');
    };

    return (
        <main className={styles.page}>
            {/* Page Header */}
            <header className={styles.header}>
                <span className={styles.eyebrow}>USK Galle Journal</span>
                <h1 className={styles.title}>Stories from the Sketchbook</h1>
                <p className={styles.subtitle}>
                    Field notes, watercolor techniques, architectural history, and memories captured one sketch at a time across Galle Fort.
                </p>

                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchBox}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search articles, techniques, locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                            aria-label="Search articles"
                        />
                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className={styles.clearBtn}
                                aria-label="Clear search"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Category Filter Tabs */}
            <div className={styles.filterBar}>
                {categories.map((cat) => {
                    const count = cat === 'All'
                        ? posts.length
                        : posts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
                    return (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat} <span className={styles.categoryCount}>({count})</span>
                        </button>
                    );
                })}
            </div>

            {/* Featured Post Hero Card (shown when on "All" without search filter) */}
            {featuredPost && (
                <section className={styles.featuredSection} aria-label="Featured Story">
                    <article className={styles.featuredCard}>
                        <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredImageLink}>
                            <div className={styles.featuredImageWrap}>
                                <BlurImage
                                    src={featuredPost.coverImage || '/hero-images/1.jpg'}
                                    alt={featuredPost.coverAlt || featuredPost.title}
                                    className={styles.featuredImage}
                                />
                                <span className={styles.featuredRibbon}>Featured Story</span>
                            </div>
                        </Link>

                        <div className={styles.featuredContent}>
                            <div className={styles.featuredMetaTop}>
                                <span className={styles.categoryTag}>{featuredPost.category}</span>
                                <span className={styles.metaItem}>
                                    <FontAwesomeIcon icon={faClock} /> {featuredPost.readTime}
                                </span>
                                <span className={styles.metaItem}>
                                    <FontAwesomeIcon icon={faCalendarDays} /> {featuredPost.date}
                                </span>
                            </div>

                            <h2 className={styles.featuredTitle}>
                                <Link href={`/blog/${featuredPost.slug}`}>
                                    {featuredPost.title}
                                </Link>
                            </h2>

                            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                            {featuredPost.tags && (
                                <div className={styles.tagsRow}>
                                    {featuredPost.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className={styles.tagPill}>#{tag}</span>
                                    ))}
                                </div>
                            )}

                            <div className={styles.featuredFooter}>
                                <div className={styles.authorGroup}>
                                    <img
                                        src={getAuthorAvatar(featuredPost.authorSlug)}
                                        alt={featuredPost.author}
                                        className={styles.authorAvatar}
                                    />
                                    <div>
                                        <span className={styles.byLabel}>Written by</span>
                                        {featuredPost.authorSlug ? (
                                            <Link href={`/artists/${featuredPost.authorSlug}`} className={styles.authorNameLink}>
                                                {featuredPost.author}
                                            </Link>
                                        ) : (
                                            <span className={styles.authorName}>{featuredPost.author}</span>
                                        )}
                                    </div>
                                </div>

                                <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredReadBtn}>
                                    Read Story <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                            </div>
                        </div>
                    </article>
                </section>
            )}

            {/* Regular Post Grid */}
            {filteredPosts.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <FontAwesomeIcon icon={faBookOpen} />
                    </div>
                    <h3>No articles match your search</h3>
                    <p>Try searching for different keywords or reset your filters.</p>
                    <button onClick={handleResetAll} className={styles.resetBtn}>
                        Reset all filters
                    </button>
                </div>
            ) : (
                <>
                    {featuredPost && regularPosts.length > 0 && (
                        <div className={styles.sectionDivider}>
                            <h2 className={styles.sectionHeading}>More Stories & Guides</h2>
                            <span className={styles.postCounter}>
                                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                            </span>
                        </div>
                    )}

                    <div className={styles.grid}>
                        {regularPosts.map((post) => {
                            const isSystemAuthor = !post.author || post.author === 'System' || !post.authorSlug;

                            return (
                                <article key={post.slug} className={styles.card}>
                                    <Link href={`/blog/${post.slug}`} className={styles.cardThumbLink}>
                                        <div className={styles.cardThumbWrap}>
                                            <BlurImage
                                                src={post.coverImage || '/hero-images/1.jpg'}
                                                alt={post.coverAlt || post.title}
                                                className={styles.cardThumb}
                                            />
                                            <span className={styles.cardCategoryOverlay}>{post.category}</span>
                                        </div>
                                    </Link>

                                    <div className={styles.cardBody}>
                                        <div className={styles.cardMetaTop}>
                                            <span className={styles.cardTime}>
                                                <FontAwesomeIcon icon={faClock} /> {post.readTime}
                                            </span>
                                            <span className={styles.dot}>·</span>
                                            <span className={styles.cardDate}>{post.date}</span>
                                        </div>

                                        <h2 className={styles.cardTitle}>
                                            <Link href={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className={styles.cardExcerpt}>{post.excerpt}</p>

                                        {post.tags && (
                                            <div className={styles.cardTags}>
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className={styles.miniTag}>#{tag}</span>
                                                ))}
                                            </div>
                                        )}

                                        <div className={styles.cardFooter}>
                                            <div className={styles.cardAuthorWrap}>
                                                <img
                                                    src={getAuthorAvatar(post.authorSlug)}
                                                    alt={post.author}
                                                    className={styles.miniAvatar}
                                                />
                                                {isSystemAuthor ? (
                                                    <span className={styles.authorSystem}>USK Galle</span>
                                                ) : (
                                                    <Link href={`/artists/${post.authorSlug}`} className={styles.authorLink}>
                                                        {post.author}
                                                    </Link>
                                                )}
                                            </div>

                                            <Link href={`/blog/${post.slug}`} className={styles.readLink}>
                                                Read <FontAwesomeIcon icon={faArrowRight} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </>
            )}
        </main>
    );
}
