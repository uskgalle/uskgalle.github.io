import { events } from '../events';

// Event facts stay in the event archive; each article adds its own editorial text.
export function meetupPost({ eventSlug, slug, title, excerpt, content }) {
  const event = events.find(item => item.slug === eventSlug);
  const upcoming = event.upcoming;
  const extension = event.recap?.extension || 'jpg';
  const coverImage = upcoming ? event.image : `/gallery-images/${eventSlug}/1.${extension}`;
  const date = upcoming ? 'To be announced' : `${Number(event.date.day)} ${event.date.month} ${event.year}`;
  const archive = upcoming
    ? `<h3>Follow the next announcement</h3><p>The <a href="/events/${eventSlug}/register">Meet #6 information page</a> carries the current plans. Check it before travelling, and use the community WhatsApp link there for announcements.</p>`
    : `<h3>Explore the record of this morning</h3><p>Visit the <a href="/events/${eventSlug}">${event.title} recap</a> for the event details and its collection of ${event.recap.images.length} archive photographs. You can also browse the <a href="/gallery">community photo gallery</a> and discover the people behind the drawings in our <a href="/artists">artist directory</a>.</p>`;
  const body = `
    ${content}
    <div class="takeaways-box"><h4>${upcoming ? 'Current plans' : 'Meet details'}</h4><ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>${upcoming ? 'Location' : 'Meeting point'}:</strong> ${event.location}</li>
      <li><strong>Time:</strong> ${event.time}</li>
    </ul></div>
    ${archive}
    <p>For the wider story, read <a href="/blog/history-of-usk-galle">our history of USK Galle</a>. Follow <a href="https://www.instagram.com/urbansketchersgalle/" target="_blank" rel="noopener noreferrer">Urban Sketchers Galle on Instagram</a> for community updates.</p>
  `;
  return {
    slug, title, excerpt,
    category: upcoming ? 'Community' : 'Sketch Meets',
    tags: ['USK Galle', 'Galle', upcoming ? 'Upcoming' : event.title],
    author: 'System', authorSlug: 'system',
    date: 'October 15, 2026',
    readTime: `${Math.max(1, Math.ceil(body.replace(/<[^>]*>/g, ' ').split(/\s+/).length / 200))} min read`,
    coverImage,
    coverAlt: upcoming ? 'Illustration for the next USK Galle sketch meet' : `Archive photograph from ${event.title}`,
    coverCaption: upcoming ? 'The next meet is being planned. Date and venue are still to be announced.' : `${event.title} · ${date} · USK Galle event archive`,
    coverColor: '#c9a87c', featured: false, eventSlug, content: body,
  };
}
