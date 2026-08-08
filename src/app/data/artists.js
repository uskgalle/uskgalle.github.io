import fs from 'fs';
import path from 'path';

export const artists = [
  {
    name: 'Amara Perera',
    folder: 'amara-perera',
    slug: 'amara-perera',
    medium: 'Watercolour & Ink',
    location: 'Galle Fort',
    bio: 'Amara captures the weathered textures of colonial architecture with a loose, expressive watercolour style.',
    instagram: 'https://instagram.com/amaraperera',
    color: '#c9a87c',
  },
  {
    name: 'Roshan Silva',
    folder: 'roshan-silva',
    slug: 'roshan-silva',
    medium: 'Pen & Wash',
    location: 'Unawatuna',
    bio: 'Roshan\'s fine linework brings the fishing boats and coastal life of the southern shore to vivid detail.',
    instagram: 'https://instagram.com/roshansilva',
    color: '#8a9e7c',
  },
  {
    name: 'Dilini Fernando',
    folder: 'dilini-fernando',
    slug: 'dilini-fernando',
    medium: 'Graphite & Colour Pencil',
    location: 'Hikkaduwa',
    bio: 'Dilini finds beauty in everyday moments — market stalls, tuk-tuks, temple steps — rendered with warmth.',
    instagram: 'https://instagram.com/dilinifernando',
    color: '#9c8ab0',
  },
  {
    name: 'Namal Karunaratne',
    folder: 'namal-karunaratne',
    slug: 'namal-karunaratne',
    medium: 'Digital & Ink',
    location: 'Galle Fort',
    bio: 'Namal blends traditional line drawings with digital watercolors to depict historic Galle landmarks.',
    instagram: 'https://instagram.com/namalkarunaratne',
    color: '#7ca8c9',
  },
];

export function getArtistBySlug(slug) {
  return artists.find((artist) => artist.slug === slug) || null;
}

export function getProfileImagePath(folder) {
  const customPath = path.join(process.cwd(), 'public', 'artists-images', `${folder}.webp`);
  if (fs.existsSync(customPath)) {
    return `/artists-images/${folder}.webp`;
  }
  return `/artists-images/${folder}.png`;
}

export function getArtworksForArtist(folder) {
  const dirPath = path.join(process.cwd(), 'public', 'artworks-images', folder);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  try {
    const files = fs.readdirSync(dirPath);
    const imageFiles = files
      .filter((file) => /\.(webp|jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

    return imageFiles.map((filename, index) => ({
      id: `${folder}-${index + 1}`,
      filename,
      src: `/artworks-images/${folder}/${filename}`,
      title: `Sketch #${filename.replace(/\.[^/.]+$/, '')}`,
    }));
  } catch (err) {
    console.error(`Error reading artworks for ${folder}:`, err);
    return [];
  }
}

export function getAllArtworks() {
  let allArtworks = [];

  for (const artist of artists) {
    const artworks = getArtworksForArtist(artist.folder);
    const mapped = artworks.map((art) => ({
      ...art,
      artistName: artist.name,
      artistSlug: artist.slug,
      artistFolder: artist.folder,
      artistLocation: artist.location,
      artistMedium: artist.medium,
    }));
    allArtworks = allArtworks.concat(mapped);
  }

  return allArtworks;
}
