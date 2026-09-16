/**
 * Artwork metadata (title, description) for drawings.
 * Referenced by artist folder / slug and image filename.
 */
export const artworks = [
  // ── Yasith Arangala USKG1 ──────────────────────────────
  {
    id: 'yasith-arangala-1',
    artistSlug: 'yasith-arangala',
    filename: '1.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04'
  },
  {
    id: 'yasith-arangala-2',
    artistSlug: 'yasith-arangala',
    filename: '2.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04'
  },
  {
    id: 'yasith-arangala-3',
    artistSlug: 'yasith-arangala',
    filename: '3.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04'
  },

  // ── Sumudu Udari USKG2 ─────────────────────────────────
  {
    id: 'sumudu-udari-1',
    artistSlug: 'sumudu-udari',
    filename: '1.png',
    title: 'Galle Fort Lighthouse with blue sky',
    description: 'The Galle Fort Lighthouse is a historic symbol of Galle, built in 1939. I sketched its simple white design standing beautifully against the blue sky. Medium used : Watercolors & pen',
    event: 'meet-up-04'
  },

  // ── Nimthaka Jayavihan USKG3 ─────────────────────────────────
  {
    id: 'nimthaka-jayavihan-1',
    artistSlug: 'nimthaka-jayavihan',
    filename: '1.png',
    title: 'Galle lighthouse ',
    description: 'I captured the lighthouse and the beautiful landscape using watercolors and markers to showcase the beauty of Galle.',
    event: 'meet-up-04'
  },
  {
    id: 'nimthaka-jayavihan-2',
    artistSlug: 'nimthaka-jayavihan',
    filename: '2.png',
    title: 'Galle fort clock tower',
    description: 'Seen from a distance, the Galle Fort Clock Tower rises as a distinctive landmark within the historic fort. The sketch focuses on its relationship with the surrounding buildings, open space, and everyday human activity, capturing the atmosphere and character of the place through quick sketching and watercolour.',
    event: 'meet-up-04'
  },
  {
    id: 'nimthaka-jayavihan-3',
    artistSlug: 'nimthaka-jayavihan',
    filename: '3.png',
    title: 'Galle fort light-house',
    description: 'The iconic Galle Fort Lighthouse is captured from a ground-level perspective, highlighting its beauty, architectural details, surrounding atmosphere, and human activities. A quick sketch with watercolour is used to capture the character and vibrancy of the place.',
    event: 'meet-up-04'
  },
  // ── Lakshana Samadhi USKG4 ─────────────────────────────────
  {
    id: 'lakshana-samadhi-1',
    artistSlug: 'lakshana-samadhi',
    filename: '1.png',
    title: 'Galle light house',
    description: 'Pencil & water colours',
    event: 'meet-up-04'
  },

  // ── Sachith Vithanage USKG5 ─────────────────────────────────
  {
    id: 'sachith-vithanage-1',
    artistSlug: 'sachith-vithanage',
    filename: '1.png',
    title: 'Galle Fort lighthouse',
    description: '',
    event: 'meet-up-04'
  },



];

export function getArtworkMetadata(artistSlug, filename) {
  return (
    artworks.find(
      (art) =>
        (art.artistSlug === artistSlug || art.folder === artistSlug) &&
        art.filename === filename
    ) || null
  );
}
