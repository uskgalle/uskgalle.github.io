'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function BlogArticleClient({ post }) {
    const [copied, setCopied] = useState(false);

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
                // Cancelled
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

    const isSystemAuthor = !post.author || post.author === 'System' || !post.authorSlug;

    return (
        <main className={styles.main}>
            <Link href="/blog" className={styles.backLink}>
                <FontAwesomeIcon icon={faArrowLeft} /> All Articles
            </Link>

            <article>
                <header className={styles.articleHeader}>
                    <span className={styles.categoryTag}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>

                    <div className={styles.metaRow}>
                        <span>
                            By{' '}
                            {isSystemAuthor ? (
                                <strong>System</strong>
                            ) : (
                                <Link href={`/artists/${post.authorSlug}`} className={styles.authorLink}>
                                    {post.author}
                                </Link>
                            )}
                        </span>
                        <span className={styles.dot}>·</span>
                        <span>{post.date}</span>
                        <span className={styles.dot}>·</span>
                        <span>{post.readTime}</span>

                        <button onClick={handleShare} className={styles.shareBtn}>
                            <FontAwesomeIcon icon={faShareNodes} /> Share
                        </button>
                    </div>
                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {!isSystemAuthor && (
                    <div className={styles.authorBox}>
                        <div className={styles.authorInfo}>
                            <span className={styles.writtenBy}>Article Author</span>
                            <h3 className={styles.authorName}>{post.author}</h3>
                        </div>

                        <Link href={`/artists/${post.authorSlug}`} className={styles.viewProfileBtn}>
                            Artist Profile <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                )}
            </article>

            {copied && <div className={styles.toast}>Link copied to clipboard!</div>}
        </main>
    );
}
