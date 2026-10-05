/**
 * Artwork metadata (title, description) for sketches.
 * Each item is identified by id (${artistId}-${number}), e.g. 'USKG1-1'.
 * Supports .png, .webp, .jpg, and .jpeg files.
 */
export const artworks = [
  // USKG1 — Yasith Arangala
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

  // USKG2 — Sumudu Udari
  {
    id: 'USKG2-1',
    filename: '1.png',
    title: 'Galle Fort Lighthouse with blue sky',
    description: 'The Galle Fort Lighthouse is a historic symbol of Galle, built in 1939. I sketched its simple white design standing beautifully against the blue sky. Medium used : Watercolors & pen',
    event: 'meet-up-04',
  },

  // USKG3 — Nimthaka Jayavihan
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

  // USKG4 — Lakshana Samadhi
  {
    id: 'USKG4-1',
    filename: '1.png',
    title: 'Galle light house',
    description: 'Pencil & water colours',
    event: 'meet-up-04',
  },

  // USKG5 — Sachith Vithanage
  {
    id: 'USKG5-1',
    filename: '1.png',
    title: 'Galle Fort lighthouse',
    description: '',
    event: 'meet-up-04',
  },

  // USKG6 — Shifteh
  {
    id: 'USKG6-1',
    filename: '1.png',
    title: 'Galle Fort Lighthouse',
    description: '',
    event: 'meet-up-04',
  },
  {
    id: 'USKG6-2',
    filename: '2.png',
    title: 'Galle Fort Clock Tower',
    description: '',
    event: 'meet-up-04',
  },

  // USKG7 — Amodi Kodithuwakku

  // USKG8 — Nelum Buddhadasa
  {
    id: 'USKG8-1',
    filename: '1.webp',
    title: 'Galle Fish Market',
    description: '',
    event: 'meet-up-05',
  },
  {
    id: 'USKG8-2',
    filename: '2.webp',
    title: 'Temple in Galle Fort',
    description: 'A Distant View of the Rooftops and Temple in Galle Fort',
    event: '',
  },
  {
    id: 'USKG8-3',
    filename: '3.webp',
    title: 'Buildings',
    description: 'Buildings near the Dutch Hospital Galle',
    event: '',
  },
  {
    id: 'USKG8-4',
    filename: '4.webp',
    title: 'House on Church Street',
    description: 'A House on Church Street',
    event: '',
  },
  {
    id: 'USKG8-5',
    filename: '5.webp',
    title: 'Black Fort',
    description: 'A Walk Through Black Fort',
    event: '',
  },
  {
    id: 'USKG8-6',
    filename: '6.webp',
    title: 'Church Rooftop',
    description: 'A Distant View of the Church Rooftop from the Galle Fort Promenade',
    event: '',
  },
  {
    id: 'USKG8-7',
    filename: '7.webp',
    title: 'Bell Tower',
    description: 'The Bell Tower near the Maritime Museum',
    event: '',
  },
  {
    id: 'USKG8-8',
    filename: '8.webp',
    title: 'Galle Fort Lighthouse',
    description: 'The Iconic Lighthouse Galle Fort',
    event: '',
  },

  // USKG9 — Rachel West

  // USKG10 — Maheema Mahimani
  {
    id: 'USKG10-1',
    filename: '1.webp',
    title: 'Sketch #1',
    description: '',
    event: 'meet-up-05',
  },

  // USKG11 — Rashmi Wimalasiri
  // USKG12 — Lakdini Lisakya
  // USKG13 — Kathya Ruhansi
  // USKG14 — Isuri Kumarasinghe
  // USKG15 — Ravindu Ramawickrama
  // USKG16 — Nethmi Pabasara

  // USKG17 — Vihasna Geesathmi
  {
    id: 'USKG17-1',
    filename: '1.webp',
    title: 'Galle Fish Market',
    description: 'A little piece of Galle, captured in lines and colours. 🎨🌊',
    event: 'meet-up-05',
  },
  {
    id: 'USKG17-2',
    filename: '2.webp',
    title: 'Galle Fish Market',
    description: 'A little piece of Galle, captured in lines and colours. 🎨🌊',
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
