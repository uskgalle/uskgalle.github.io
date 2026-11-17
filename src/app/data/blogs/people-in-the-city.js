import { meetupPost } from './meetup-post';

export default meetupPost({
  featured: true,
  eventSlug: 'meet-up-06',
  slug: 'people-in-the-city',
  title: 'People in the City with Astisketcher',
  excerpt: 'Sketch Meet-Up #6 began with Astrid Kahane-Seefeld’s mini workshop on drawing people, then moved outdoors for a guided sketching session in Galle Fort.',
  publishedDate: 'November 16, 2026',
  coverAlt: 'Sketch Meet-Up #6 participants holding up their sketches inside ART’O’SAN Gallery',
  coverCaption: 'Sketch Meet-Up #6 at ART’O’SAN Gallery, Galle Fort.',
  photoGroups: [
    { title: 'At the workshop', files: ['1.webp', '80.webp', '85.webp', '90.webp', '88.webp', '94.webp', '97.webp', '101.webp', '102.webp', '106.webp'] },
    { title: 'Sketching outdoors', files: ['2.webp', '3.webp', '4.webp', '75.webp', '77.webp'] },
  ],
  content: `
    <p class="lead">On 15 November 2026, we began Sketch Meet-Up #6 at ART’O’SAN Gallery in Galle Fort with <em>People in the City</em>, a mini workshop on drawing human figures in urban sketches. <a href="/artists/astrid-kahane-seefeld">Astrid Kahane-Seefeld</a>, who sketches as Astisketcher, led the session.</p>
    <h3>Sketching people on location</h3>
    <p>Astrid lives between Spain and Germany and began urban sketching in 2018. She first drew buildings, then found herself drawn to the people around them. At the gallery, she drew a live example with us, sharing tips as she worked through the sketch and showing how a few lines can suggest movement. We loved watching the sketch take shape and seeing how her tips worked in practice. Thank you, Astrid, for such an insightful session and for sharing your approach with us.</p>
    <h3>From the gallery to the street</h3>
    <p>After the workshop, we moved to the outdoor sketching spot for a guided session. It was a chance to try the morning’s techniques with people moving through the scene around us.</p>
  `,
});
