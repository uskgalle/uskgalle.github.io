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
  },
  {
    id: 'yasith-arangala-2',
    artistSlug: 'yasith-arangala',
    filename: '2.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
  },
  {
    id: 'yasith-arangala-3',
    artistSlug: 'yasith-arangala',
    filename: '3.png',
    title: 'Symbols of Galle fort',
    description: 'Mix media (water color, ink, etc.)',
  },

  // ── Roshan Silva ─────────────────────────────────
  {
    id: 'roshan-silva-1',
    artistSlug: 'roshan-silva',
    filename: '1.webp',
    title: 'Fishermen at Unawatuna',
    description: 'Fine linework detailing the traditional wooden catamarans and fishing life along the southern coast.',
  },
  {
    id: 'roshan-silva-2',
    artistSlug: 'roshan-silva',
    filename: '2.webp',
    title: 'Morning Catch by the Reef',
    description: 'Expressive pen and wash capturing the motion of coastal tides and daily fishermen rituals.',
  },
  {
    id: 'roshan-silva-3',
    artistSlug: 'roshan-silva',
    filename: '3.webp',
    title: 'Coastal Palm Groves',
    description: 'A quiet study of palm-fringed shorelines and ocean breezes near Galle.',
  },

  // ── Dilini Fernando ──────────────────────────────
  {
    id: 'dilini-fernando-1',
    artistSlug: 'dilini-fernando',
    filename: '1.webp',
    title: 'Tuk-Tuk by the Market',
    description: 'Warm graphite and colored pencil sketch celebrating everyday island street scenes in Galle.',
  },
  {
    id: 'dilini-fernando-2',
    artistSlug: 'dilini-fernando',
    filename: '2.webp',
    title: 'Temple Steps in Afternoon Sun',
    description: 'Gentle colored pencil rendition of sunlit stone steps leading up to a serene local temple.',
  },
  {
    id: 'dilini-fernando-3',
    artistSlug: 'dilini-fernando',
    filename: '3.webp',
    title: 'Street Vendor at Dutch Market',
    description: 'A lively observational sketch capturing local trade and vibrant tropical produce.',
  },

  // ── Namal Karunaratne ────────────────────────────
  {
    id: 'namal-karunaratne-1',
    artistSlug: 'namal-karunaratne',
    filename: '1.webp',
    title: 'Fort Rampart Overlook',
    description: 'Digital watercolor blending precise lines with soft ocean colors overlooking the ramparts.',
  },
  {
    id: 'namal-karunaratne-2',
    artistSlug: 'namal-karunaratne',
    filename: '2.webp',
    title: 'Pedlar Street Architecture',
    description: 'Architectural study of colonial arches, carved wooden verandas, and historic street facades.',
  },
  {
    id: 'namal-karunaratne-3',
    artistSlug: 'namal-karunaratne',
    filename: '3.webp',
    title: 'Historic Church Spire',
    description: 'Heritage sketch capturing the dramatic silhouette of the Dutch Reformed Church within Galle Fort.',
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
