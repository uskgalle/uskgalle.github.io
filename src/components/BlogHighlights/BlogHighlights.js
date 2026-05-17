import styles from './BlogHighlights.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const posts = [
  {
    id: 1,
    tag: 'Sketch Tips',
    title: 'How to Sketch in Bright Sunlight Without Losing Your Shadows',
    excerpt: 'Harsh tropical light is both a gift and a challenge. Here\'s how we handle noon sketching at the fort without blowing out the contrast.',
    author: 'Amara Perera',
    date: 'May 3, 2025',
    readTime: '5 min read',
    color: '#d4c5a9',
  },
  {
    id: 2,
    tag: 'Meet Recap',
    title: 'Sketching the Fishermen of Unawatuna — May Sketch Meet',
    excerpt: 'Thirty sketchers, one beach, and a hundred fishing boats. Here\'s a look at what we drew during our coastal morning session.',
    author: 'Roshan Silva',
    date: 'May 18, 2025',
    readTime: '4 min read',
    color: '#b5c4b1',
  },
  {
    id: 3,
    tag: 'Story',
    title: 'Why I Draw the Same Corner of Galle Fort Every Week',
    excerpt: 'There\'s a small gate near the Dutch church that Dilini has drawn 23 times. She explains why returning to the same spot keeps teaching her something new.',
    author: 'Dilini Fernando',
    date: 'Apr 29, 2025',
    readTime: '6 min read',
    color: '#c4b5c0',
  },
];

export default function BlogHighlights() {
  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.eyebrow}>From the Blog</span>
          <h2 className={styles.title}>Stories & Sketches</h2>
          <p className={styles.subtitle}>
            Tips, recaps, and reflections from our sketching community. [This Section Is Under Construction]
          </p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              {/* Thumbnail placeholder */}
              <div className={styles.thumb} style={{ backgroundColor: post.color }} />

              <div className={styles.cardBody}>
                <span className={styles.tag}>{post.tag}</span>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.meta}>
                  <span className={styles.author}>{post.author}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>

                <a href="#blog" className={styles.readMore}>
                  Read More <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="#blog" className={styles.viewAllBtn}>
            Visit the Blog <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>

      </div>
    </section>
  );
}
