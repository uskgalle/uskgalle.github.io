import fs from 'fs';
import path from 'path';
import { artworks, getArtworkMetadata } from './artworks';

export { artworks, getArtworkMetadata };

export const artists = [
  {
    id: 1,
    name: 'Yasith Arangala',
    slug: 'yasith-arangala',
    folder: 'yasith-arangala',
    bio: 'Architecture student & artist, exploring watercolor with pen and ink.',
    instagram: 'https://instagram.com/test',
  },
  {
    id: 2,
    name: 'Roshan Silva',
    slug: 'roshan-silva',
    folder: 'roshan-silva',
    bio: 'Roshan\'s fine linework brings the fishing boats and coastal life of the southern shore to vivid detail.',
    instagram: 'https://instagram.com/test',
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    slug: 'dilini-fernando',
    folder: 'dilini-fernando',
    bio: 'Dilini finds beauty in everyday moments: market stalls, tuk-tuks, temple steps, rendered with warmth.',
    instagram: 'https://instagram.com/test',
  },
  {
    id: 4,
    name: 'Namal Karunaratne',
    slug: 'namal-karunaratne',
    folder: 'namal-karunaratne',
    bio: 'Namal blends traditional line drawings with digital watercolors to depict historic Galle landmarks.',
    instagram: 'https://instagram.com/test',
  },
];

export function getArtistBySlug(slug) {
  return artists.find((artist) => artist.slug === slug) || null;
}

export function getArtistById(id) {
  return artists.find((artist) => artist.id === id || artist.id === Number(id)) || null;
}

export function getProfileImagePath(folder) {
  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const imgPath = path.join(process.cwd(), 'public', 'artists-images', `${folder}.${ext}`);
    if (fs.existsSync(imgPath)) {
      return `/artists-images/${folder}.${ext}`;
    }
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

    return imageFiles.map((filename, index) => {
      const meta = getArtworkMetadata(folder, filename);

      return {
        id: meta?.id || `${folder}-${index + 1}`,
        filename,
        src: `/artworks-images/${folder}/${filename}`,
        title: meta?.title || `Sketch #${filename.replace(/\.[^/.]+$/, '')}`,
        description: meta?.description || '',
      };
    });
  } catch (err) {
    console.error(`Error reading artworks for ${folder}:`, err);
    return [];
  }
}

export function getAllArtworks() {
  let allArtworks = [];

  for (const artist of artists) {
    const artistArtworks = getArtworksForArtist(artist.folder);
    const mapped = artistArtworks.map((art) => ({
      ...art,
      artistId: artist.id,
      artistName: artist.name,
      artistSlug: artist.slug,
      artistFolder: artist.folder,
    }));
    allArtworks = allArtworks.concat(mapped);
  }

  return allArtworks;
}
