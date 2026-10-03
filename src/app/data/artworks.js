/**
 * Artwork metadata (title, description) for sketches.
 * Each item is identified by id (${artistId}-${number}), e.g. 'USKG1-1'.
 * Supports .png, .webp, .jpg, and .jpeg files.
 */
export const artworks = [
  {
    id: 'USKG1-1',
    filename: '1.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04',
  },
  {
    id: 'USKG1-2',
    filename: '2.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04',
  },
  {
    id: 'USKG1-3',
    filename: '3.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
    event: 'meet-up-04',
  },
  {
    id: 'USKG2-1',
    filename: '1.png',
    title: 'Galle Fort Lighthouse with blue sky',
    description: 'The Galle Fort Lighthouse is a historic symbol of Galle, built in 1939. I sketched its simple white design standing beautifully against the blue sky. Medium used : Watercolors & pen',
    event: 'meet-up-04',
  },
  {
    id: 'USKG3-1',
    filename: '1.png',
    title: 'Galle lighthouse ',
    description: 'I captured the lighthouse and the beautiful landscape using watercolors and markers to showcase the beauty of Galle.',
    event: 'meet-up-04',
  },
  {
    id: 'USKG3-2',
    filename: '2.png',
    title: 'Galle fort clock tower',
    description: 'Seen from a distance, the Galle Fort Clock Tower rises as a distinctive landmark within the historic fort. The sketch focuses on its relationship with the surrounding buildings, open space, and everyday human activity, capturing the atmosphere and character of the place through quick sketching and watercolour.',
    event: 'meet-up-04',
  },
  {
    id: 'USKG3-3',
    filename: '3.png',
    title: 'Galle fort light-house',
    description: 'The iconic Galle Fort Lighthouse is captured from a ground-level perspective, highlighting its beauty, architectural details, surrounding atmosphere, and human activities. A quick sketch with watercolour is used to capture the character and vibrancy of the place.',
    event: 'meet-up-04',
  },
  {
    id: 'USKG4-1',
    filename: '1.png',
    title: 'Galle light house',
    description: 'Pencil & water colours',
    event: 'meet-up-04',
  },
  {
    id: 'USKG5-1',
    filename: '1.png',
    title: 'Galle Fort lighthouse',
    description: '',
    event: 'meet-up-04',
  },

  //---------- Meetup 5


  {
    id: 'USKG10-1',
    filename: '1.webp',
    title: 'Sketch #1',
    description: '',
    event: 'meet-up-05',
  },
];

/**
 * Find artwork metadata by artist ID (e.g. 'USKG1') and filename (e.g. '1.png' or '1.webp').
 */
export function getArtworkMetadata(identifier, filename) {
  if (!identifier || !filename) return null;

  const fileBase = String(filename).replace(/\.[^/.]+$/, '').trim(); // e.g. '1'
  const idLower = String(identifier).trim().toLowerCase(); // e.g. 'uskg1'
  const targetId = `${idLower}-${fileBase.toLowerCase()}`; // e.g. 'uskg1-1'

  return (
    artworks.find((art) => {
      if (!art || !art.id) return false;
      const artIdLower = String(art.id).trim().toLowerCase();

      // 1. Direct ID match (e.g. 'uskg1-1')
      if (artIdLower === targetId) return true;

      // 2. Direct filename match under this artist ID prefix (handles .webp vs .png)
      if (artIdLower.startsWith(`${idLower}-`)) {
        const artFileBase = String(art.filename || '').replace(/\.[^/.]+$/, '').trim();
        if (artFileBase && artFileBase.toLowerCase() === fileBase.toLowerCase()) {
          return true;
        }
        if (art.filename && art.filename.toLowerCase() === String(filename).toLowerCase()) {
          return true;
        }
      }

      // 3. Fallback: direct ID equality
      if (artIdLower === idLower) return true;

      return false;
    }) || null
  );
}
