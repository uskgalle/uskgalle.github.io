'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function BlogClient({ posts }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Galle History', 'Urban Sketching', 'Guides & Tips'];

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter((post) => post.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>Stories & Guides</span>
                <h1 className={styles.title}>USK Galle Blog</h1>
                <p className={styles.subtitle}>
                    Reflections on urban sketching, light and shadow, and the 400-year history of Galle Fort.
                </p>
            </div>

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
                            {cat} ({count})
                        </button>
                    );
                })}
            </div>

            {filteredPosts.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No articles found for this category.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredPosts.map((post) => {
                        const isSystemAuthor = !post.author || post.author === 'System' || !post.authorSlug;

                        return (
                            <article key={post.slug} className={styles.card}>
                                <span className={styles.cardCategory}>{post.category}</span>
                                <h2 className={styles.cardTitle}>
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                                <div className={styles.cardFooter}>
                                    <div className={styles.cardMeta}>
                                        {isSystemAuthor ? (
                                            <span>System</span>
                                        ) : (
                                            <Link href={`/artists/${post.authorSlug}`} className={styles.authorLink}>
                                                {post.author}
                                            </Link>
                                        )}
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <Link href={`/blog/${post.slug}`} className={styles.readLink}>
                                        Read <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
