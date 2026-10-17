// Demonstration content: available on USKG0's profile, excluded from public feeds.
const defaults = {
  author: 'Example Artist',
  authorSlug: 'example-artist',
  category: 'Examples',
  tags: ['Example', 'Urban Sketching'],
  date: 'October 17, 2026',
  readTime: '2 min read',
  coverColor: '#dce9e8',
  coverCaption: 'Illustrative placeholder sketch for USKG0. This is demonstration content.',
  featured: false,
  isExample: true,
};

export const examplePosts = [
  {
    ...defaults,
    slug: 'example-artist-lighthouse-study',
    title: 'Example: A Lighthouse Study in Lines and Washes',
    excerpt: 'A sample sketch journal showing how a simple lighthouse illustration can become an artist story.',
    coverImage: '/artworks-images/USKG0/1.webp',
    coverAlt: 'Placeholder illustration of a coastal lighthouse',
    content: `
      <p class="lead">This is an example article by the fictional USKG0 artist. The illustration and story demonstrate how a sketch journal can appear on an artist profile.</p>
      <h3>Start with a simple shape</h3>
      <p>A lighthouse makes a useful subject for a small composition: one strong vertical shape, a low horizon, and plenty of open sky. In this demonstration, the outline carries the structure while soft areas of colour suggest the coast.</p>
      <h3>Leave room for the paper</h3>
      <p>The pale background keeps the scene light. A few darker marks around the lantern and doorway give the eye somewhere to pause, without filling every part of the page.</p>
      <h3>A note beside the sketch</h3>
      <p>An artist journal can include the medium, what caught the artist's attention, and what they would try next. This sample uses an illustrative placeholder; it does not document a real sketch meet or a real artist's experience.</p>
      <p>Explore the other sample sketches on the <a href="/artists/example-artist">USKG0 example profile</a>.</p>
    `,
  },
  {
    ...defaults,
    slug: 'example-artist-street-sketch-notes',
    title: 'Example: Finding a Story in a Quiet Street',
    excerpt: 'A second sample article exploring rooftops, windows, and the small details that give a street sketch character.',
    coverImage: '/artworks-images/USKG0/2.webp',
    coverAlt: 'Placeholder illustration of houses along a quiet street',
    content: `
      <p class="lead">This demonstration article accompanies the fictional USKG0 street illustration. It is sample content for previewing an artist's articles and gallery together.</p>
      <h3>Choose a small part of the scene</h3>
      <p>A pair of roofs and a few windows can suggest a whole street. Keeping the subject small makes space to explore the rhythm of the buildings and the direction of the path between them.</p>
      <h3>Build a gentle colour palette</h3>
      <p>Warm roof colours sit beside cooler ground tones in this placeholder illustration. The limited palette ties the shapes together, while the dark outlines keep doors and windows readable.</p>
      <h3>Turn an image into a journal entry</h3>
      <p>A short caption can explain a choice that the image alone cannot: why a viewpoint appealed, how a composition changed, or which detail deserves another study. Replace this sample text with a real artist's own observations when creating a genuine profile.</p>
      <p>Visit the <a href="/artists/example-artist">USKG0 example profile</a> to see the full demonstration gallery.</p>
    `,
  },
];
