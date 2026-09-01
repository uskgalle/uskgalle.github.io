/**
 * Artwork metadata (title, description) for drawings.
 * Referenced by artist folder / slug and image filename.
 */
export const artworks = [
  // ── Yasith Arangala ──────────────────────────────
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

  // ── Nimthaka Jayavihan ─────────────────────────────────
  {
    id: 'nimthaka-jayavihan-1',
    artistSlug: 'nimthaka-jayavihan',
    filename: '1.png',
    title: 'Galle lighthouse ',
    description: 'I captured the lighthouse and the beautiful landscape using watercolors and markers to showcase the beauty of Galle.',
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
