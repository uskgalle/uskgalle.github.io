import { events } from '../events';
import { getRecapGallery } from '../recap-gallery';

// Event facts stay in the event archive; each article adds its own editorial text.
export function meetupPost({ eventSlug, slug, title, excerpt, content, featured = false }) {
  const event = events.find(item => item.slug === eventSlug);
  const upcoming = event.upcoming;
  const gallery = getRecapGallery().meetups.find(item => item.slug === eventSlug);
  const galleryUrl = gallery ? `/gallery/${gallery.gallerySlug}` : '/gallery';
  const coverImage = upcoming ? event.image : `/blog-images/${slug}.webp`;
  const date = upcoming ? 'To be announced' : `${Number(event.date.day)} ${event.date.month} ${event.year}`;
  const archive = upcoming
    ? `<h3>Follow the next announcement</h3><p>The <a href="/events/${eventSlug}/register">Meet #6 information page</a> carries the current plans. Check it before travelling, and use the community WhatsApp link there for announcements.</p>`
    : `<div class="takeaways-box"><h4>Explore the record of this morning</h4><ul>
      <li>Visit the <a href="/events/${eventSlug}">${event.title} recap</a>.</li>
      <li>Browse the <a href="${galleryUrl}">photo gallery</a>.</li>
      <li>Explore the <a href="/artworks">sketch collection</a>.</li>
      <li>Meet the contributors in the <a href="/artists">artist directory</a>.</li>
    </ul></div>`;
  const body = `
    ${content}
    ${archive}
  `;
  return {
    slug, title, excerpt,
    category: upcoming ? 'Community' : 'Sketch Meets',
    tags: ['USK Galle', 'Galle', upcoming ? 'Upcoming' : event.title],
    author: 'System', authorSlug: 'system',
    date: 'October 15, 2026',
    readTime: `${Math.max(1, Math.ceil(body.replace(/<[^>]*>/g, ' ').split(/\s+/).length / 200))} min read`,
    coverImage,
    coverAlt: upcoming ? 'Illustration for the next USK Galle sketch meet' : `Cover illustration for ${event.title}`,
    coverCaption: upcoming ? 'The next meet is being planned. Date and venue are still to be announced.' : `${event.title} · ${date}`,
    coverColor: '#c9a87c', featured, eventSlug, content: body,
  };
}
