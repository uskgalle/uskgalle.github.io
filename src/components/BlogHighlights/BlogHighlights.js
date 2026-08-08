import Link from 'next/link';
import styles from './BlogHighlights.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { blogPosts } from '../../app/data/blog';

export default function BlogHighlights() {
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>From the Blog</span>
          <h2 className={styles.title}>Stories & Sketches</h2>
          <p className={styles.subtitle}>
            Tips, reflections, and historical insights from our urban sketching community.
          </p>
        </div>

        <div className={styles.grid}>
          {displayPosts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <div className={styles.thumb} style={{ backgroundColor: post.coverColor || '#c9a87c' }} />

              <div className={styles.cardBody}>
                <span className={styles.tag}>{post.category}</span>
                <h3 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.meta}>
                  <span className={styles.author}>{post.author}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllBtn}>
            Visit the Blog <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>

      </div>
    </section>
  );
}
