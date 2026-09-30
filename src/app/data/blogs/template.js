/**
 * BLOG POST TEMPLATE
 *
 * How to add a new blog:
 * 1. Duplicate this file and rename it (e.g. `my-awesome-post.js`).
 * 2. Update the slug, title, category, tags, cover image (16:9 landscape), and HTML content.
 * 3. In `src/app/data/blogs/index.js`, import your new file and add it to the `blogPosts` array.
 */

const post = {
  slug: 'my-blog-post-slug',
  title: 'Your Article Title Here',
  category: 'Urban Sketching', // 'Urban Sketching' | 'Galle History' | 'Guides & Tips' | or any custom category
  tags: ['Watercolor', 'Galle Fort', 'Techniques'],
  excerpt: 'A short 1-2 sentence preview for blog cards and search results.',
  author: 'Yasith Arangala', // 'Yasith Arangala' | 'Sumudu Udari' | 'Nimthaka Jayavihan' | 'Sachith Vithanage' | 'Lakshana Samadhi' | or custom
  authorSlug: 'yasith-arangala', // Matching artist slug (links to profile) or null for community
  date: 'October 15, 2025',
  readTime: '5 min read',
  coverImage: '/hero-images/1.jpg', // Place your 16:9 landscape image in /public/
  coverAlt: 'Description of the cover image',
  coverCaption: 'Optional caption or sketch credit displayed below the cover image',
  coverColor: '#c9a87c', // Fallback color
  featured: false, // Set to true to highlight as the lead story on the blog page
  content: `
    <p class="lead">Introductory paragraph that hooks the reader with comfortable reading typography.</p>

    <h3>Section Heading</h3>
    <p>Body paragraph goes here. You can write regular paragraphs freely.</p>

    <!-- Adding a single image with caption -->
    <figure class="article-figure">
      <img src="/hero-images/5.jpg" alt="Description of the sketch or photo" />
      <figcaption>Caption describing the artwork or location.</figcaption>
    </figure>

    <!-- Adding side-by-side images -->
    <div class="image-grid-2">
      <figure class="article-figure">
        <img src="/hero-images/7.jpg" alt="Initial sketch" />
        <figcaption>Step 1: Pencil thumbnail</figcaption>
      </figure>
      <figure class="article-figure">
        <img src="/hero-images/8.jpg" alt="Watercolor painting" />
        <figcaption>Step 2: Watercolor wash</figcaption>
      </figure>
    </div>

    <!-- Adding a field tip callout box -->
    <div class="tip-box">
      <div class="tip-icon">💡</div>
      <div>
        <h4>Sketcher's Field Note: Tip Title</h4>
        <p>Practical sketching or field advice goes here.</p>
      </div>
    </div>

    <!-- Adding a key takeaways box -->
    <div class="takeaways-box">
      <h4>Key Takeaways</h4>
      <ul>
        <li>First key takeaway or checklist item</li>
        <li>Second key takeaway or checklist item</li>
      </ul>
    </div>

    <blockquote>"Inspirational quote from an artist or about the location."</blockquote>
  `
};

export default post;
