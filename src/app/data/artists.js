import fs from 'fs';
import path from 'path';
import { artworks, getArtworkMetadata } from './artworks';

export { artworks, getArtworkMetadata };

/**
 * Standard community sketchers displayed in the main /artists directory.
 */
export const artists = [
  {
    id: 'USKG1',
    name: 'Yasith Arangala',
    slug: 'yasith-arangala',
    folder: 'yasith-arangala',
    bio: 'Architecture student & artist, exploring watercolor with pen and ink.',
    instagram: 'https://instagram.com/yasitharangala',
  },
  {
    id: 'USKG2',
    name: 'Sumudu Udari',
    slug: 'sumudu-udari',
    folder: 'sumudu-udari',
    bio: 'Interior Designer | Sketcher | Artist',
    instagram: 'https://instagram.com/_udarii_',
  },
  {
    id: 'USKG3',
    name: 'Nimthaka Jayavihan',
    slug: 'nimthaka-jayavihan',
    folder: 'nimthaka-jayavihan',
    bio: 'I’m an architecture student at the University of Moratuwa, and I enjoy urban sketching in Galle.',
    instagram: 'https://instagram.com/nimthakajayavihan',
  },
  {
    id: 'USKG4',
    name: 'Lakshana Samadhi',
    slug: 'lakshana-samadhi',
    folder: 'lakshana-samadhi',
    bio: 'I sketch what catches my eye, paint what I feel, and love discovering new perspectives through art.',
    instagram: 'https://instagram.com/_samadhiiii',
  },
  {
    id: 'USKG5',
    name: 'Sachith Vithanage',
    slug: 'sachith-vithanage',
    folder: 'sachith-vithanage',
    bio: 'As a traveling artist I enjoy sketching at different places. I’m interested in sketching architecture and landscape. I believe each city and place has something to offer, and sketching them can be a good way to understand what it is.',
    instagram: 'https://instagram.com/sachithvithanage',
  },
];

/**
 * Special profiles (Admins, Developers, System AI agent).
 * These are not listed on the general /artists directory grid, but have their
 * own dedicated profile pages at /artists/[slug] and can be linked as authors or leads.
 */
export const specialProfiles = [
  {
    id: 'USK-SYS',
    name: 'System',
    slug: 'system',
    folder: 'system',
    role: 'AI Agent & Archival Storyteller',
    bio: 'AI agent thinking about art, Galle Fort history, and culture. Writing blogs and field guides to inspire artists, preserve heritage, and document the living pulse of USK Galle.',
    isSpecial: true,
  },
  {
    id: 'USK-ADM',
    name: 'Sandeepa Vithanage',
    slug: 'sandeepa-vithanage',
    folder: 'sandeepa-vithanage',
    role: 'Admin & Event Lead',
    bio: 'Admin of USK Galle, handling and organizing community sketch meets and events. Professional artist exploring the historic architecture and vibrant streets of Sri Lanka.',
    isSpecial: true,
  },
  {
    id: 'USK-DEV',
    name: 'Kasun Miuranga',
    slug: 'kasun-miuranga',
    folder: 'kasun-miuranga',
    role: 'Technical Lead & Web Developer',
    bio: 'Handling the technical sides, website development, and digital maintenance for USK Galle. Hobbyist artist passionate about open culture, creative technology, and building digital archives.',
    isSpecial: true,
  },
];

export function getArtistBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase();
  return (
    artists.find((artist) => artist.slug.toLowerCase() === normalized) ||
    specialProfiles.find((profile) => profile.slug.toLowerCase() === normalized) ||
    null
  );
}

export function getArtistById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase();
  return (
    artists.find((artist) => String(artist.id).toLowerCase() === normalized) ||
    specialProfiles.find((profile) => String(profile.id).toLowerCase() === normalized) ||
    null
  );
}

export function getAllArtistsAndProfiles() {
  return [...artists, ...specialProfiles];
}

export function getProfileImagePath(folder) {
  if (!folder) return '/artists-images/no_profile.png';
  if (folder.toLowerCase() === 'system') return '/icon.png';

  for (const ext of ['webp', 'png', 'jpg', 'jpeg']) {
    const imgPath = path.join(process.cwd(), 'public', 'artists-images', `${folder}.${ext}`);
    if (fs.existsSync(imgPath)) {
      return `/artists-images/${folder}.${ext}`;
    }
  }
  return '/artists-images/no_profile.png';
}

export function getArtworksForArtist(folder) {
  if (!folder) return [];
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
        event: meta?.event || null,
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
