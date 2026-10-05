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
    bio: 'Architecture student & artist, exploring watercolor with pen and ink.',
    instagram: 'https://instagram.com/yasitharangala',
  },
  {
    id: 'USKG2',
    name: 'Sumudu Udari',
    slug: 'sumudu-udari',
    bio: 'Interior Designer | Sketcher | Artist',
    instagram: 'https://instagram.com/_udarii_',
  },
  {
    id: 'USKG3',
    name: 'Nimthaka Jayavihan',
    slug: 'nimthaka-jayavihan',
    bio: 'I’m an architecture student at the University of Moratuwa, and I enjoy urban sketching in Galle.',
    instagram: 'https://instagram.com/nimthakajayavihan',
  },
  {
    id: 'USKG4',
    name: 'Lakshana Samadhi',
    slug: 'lakshana-samadhi',
    bio: 'I sketch what catches my eye, paint what I feel, and love discovering new perspectives through art.',
    instagram: 'https://instagram.com/_samadhiiii',
  },
  {
    id: 'USKG5',
    name: 'Sachith Vithanage',
    slug: 'sachith-vithanage',
    bio: 'As a traveling artist I enjoy sketching at different places. I’m interested in sketching architecture and landscape. I believe each city and place has something to offer, and sketching them can be a good way to understand what it is.',
    instagram: 'https://instagram.com/sachithvithanage',
  },
  {
    id: 'USKG6',
    name: 'Shifteh',
    slug: 'shifteh',
    bio: 'former maha.workroom | temporary super slow traveler | postcard painter  | stubborn experiencer | skill collector',
    instagram: 'https://instagram.com/shifis.way',
  },
  {
    id: 'USKG7',
    name: 'Amodi Kodithuwakku',
    slug: 'amodi-kodithuwakku',
    bio: 'Colouring outside the lines ofc',
    instagram: 'https://instagram.com/artis_tmaybe',
  },
  {
    id: 'USKG8',
    name: 'Nelum Buddhadasa',
    slug: 'nelum-buddhadasa',
    bio: 'Rediscovering my sketching abilities after some years!',
    instagram: 'https://instagram.com/nelum_ventures',
  },
  {
    id: 'USKG9',
    name: 'Rachel West',
    slug: 'rachel-west',
    bio: 'Artist dabbling in illustration and murals wanting to spend more time sketching.',
    instagram: 'https://instagram.com/Rwestarts',
  },
  {
    id: 'USKG10',
    name: 'Maheema Mahimani',
    slug: 'maheema-mahimani',
    bio: 'Finely imperfect',
    instagram: 'https://instagram.com/__hibee___',
  },
  {
    id: 'USKG11',
    name: 'Rashmi Wimalasiri',
    slug: 'rashmi-wimalasiri',
    bio: 'Just started, so let’s see',
    instagram: 'https://instagram.com/rashmi_ww',
  },
  {
    id: 'USKG12',
    name: 'Lakdini Lisakya',
    slug: 'lakdini-lisakya',
    bio: 'Enjoy and busy with architectural journey',
    instagram: 'https://instagram.com/lakdinilisakya',
  },
  {
    id: 'USKG13',
    name: 'Kathya Ruhansi',
    slug: 'kathya-ruhansi',
    bio: 'Learning architecture, observing the world through lines | archi student in university of moratuwa',
    instagram: 'https://instagram.com/_kathya_rk_',
  },
  {
    id: 'USKG14',
    name: 'Isuri Kumarasinghe',
    slug: 'isuri-kumarasinghe',
    bio: 'Plant Lover | Agriculturist | Cooking & Baking | Artist',
    instagram: 'https://instagram.com/isuri_k_',
  },
  {
    id: 'USKG15',
    name: 'Ravindu Ramawickrama',
    slug: 'ravindu-ramawickrama',
    bio: 'Blender Artist | Architect Student | Sketcher',
    instagram: 'https://instagram.com/ravindu_ramawickrama',
  },
  {
    id: 'USKG16',
    name: 'Nethmi Pabasara',
    slug: 'nethmi-pabasara',
    bio: 'Sketcher',
    instagram: 'https://instagram.com/Thepabee',
  },
  {
    id: 'USKG17',
    name: 'Vihasna Geesathmi',
    slug: 'vihasna-geesathmi',
    bio: 'Turning ideas into lines & emotions into art 🎨 Learning • Creating • Improving',
    instagram: 'https://instagram.com/vihasna_geesathmi',
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
    role: 'AI Agent & Archival Storyteller',
    bio: 'AI agent thinking about art, Galle Fort history, and culture. Writing blogs and field guides to inspire artists, preserve heritage, and document the living pulse of USK Galle.',
    isSpecial: true,
  },
  {
    id: 'USK-ADM',
    name: 'Sandeepa Vithanage',
    slug: 'sandeepa-vithanage',
    role: 'Admin & Event Lead',
    bio: 'Admin of USK Galle, handling and organizing community sketch meets and events. Professional artist exploring the historic architecture and vibrant streets of Sri Lanka.',
    isSpecial: true,
  },
  {
    id: 'USK-DEV',
    name: 'Kasun Miuranga',
    slug: 'kasun-miuranga',
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

export function getProfileImagePath(input) {
  if (!input) return '/artists-images/no_profile.png';

  let artist = null;
  const candidates = [];

  if (typeof input === 'object' && input !== null) {
    artist = input;
  } else if (typeof input === 'string') {
    const str = input.trim();
    if (str.toLowerCase() === 'system') return '/icon.png';
    artist = getArtistById(str) || getArtistBySlug(str);
    if (!artist) {
      candidates.push(str);
    }
  }

  if (artist) {
    if (artist.slug?.toLowerCase() === 'system' || artist.id?.toLowerCase() === 'system') {
      return '/icon.png';
    }
    // Check ID first (e.g. USKG1.png), then slug (e.g. yasith-arangala.png), then legacy folder
    if (artist.id) candidates.push(artist.id);
    if (artist.slug) candidates.push(artist.slug);
    if (artist.folder && artist.folder !== artist.slug) candidates.push(artist.folder);
  }

  const extensions = ['png', 'webp', 'jpg', 'jpeg'];

  for (const name of candidates) {
    for (const ext of extensions) {
      const imgPath = path.join(process.cwd(), 'public', 'artists-images', `${name}.${ext}`);
      if (fs.existsSync(imgPath)) {
        return `/artists-images/${name}.${ext}`;
      }
    }
  }
  return '/artists-images/no_profile.png';
}

export function getArtworksForArtist(input) {
  if (!input) return [];

  let artist = null;
  let primaryFolder = null;
  let secondaryFolder = null;

  if (typeof input === 'object' && input !== null) {
    artist = input;
    primaryFolder = input.id;
    secondaryFolder = input.slug || input.folder;
  } else if (typeof input === 'string') {
    artist = getArtistById(input) || getArtistBySlug(input);
    if (artist) {
      primaryFolder = artist.id;
      secondaryFolder = artist.slug || artist.folder;
    } else {
      primaryFolder = input;
    }
  }

  let targetDir = null;
  // Prioritize artist ID folder (e.g. USKG1), fallback to slug (e.g. yasith-arangala)
  const candidates = [primaryFolder, secondaryFolder].filter(Boolean);

  for (const name of candidates) {
    const dirPath = path.join(process.cwd(), 'public', 'artworks-images', name);
    if (fs.existsSync(dirPath)) {
      targetDir = { path: dirPath, name };
      break;
    }
  }

  if (!targetDir) {
    return [];
  }

  try {
    const files = fs.readdirSync(targetDir.path);
    const imageFiles = files
      .filter((file) => /\.(webp|jpg|jpeg|png)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

    return imageFiles.map((filename, index) => {
      const meta =
        getArtworkMetadata(targetDir.name, filename) ||
        (artist?.id ? getArtworkMetadata(artist.id, filename) : null) ||
        (artist?.slug ? getArtworkMetadata(artist.slug, filename) : null);

      return {
        id: meta?.id || `${targetDir.name}-${index + 1}`,
        filename,
        src: `/artworks-images/${targetDir.name}/${filename}`,
        title: meta?.title || `Sketch #${filename.replace(/\.[^/.]+$/, '')}`,
        description: meta?.description || '',
        event: meta?.event || null,
      };
    });
  } catch (err) {
    console.error(`Error reading artworks for ${targetDir.name}:`, err);
    return [];
  }
}

export function getAllArtworks() {
  let allArtworks = [];

  for (const artist of artists) {
    const artistArtworks = getArtworksForArtist(artist);
    const mapped = artistArtworks.map((art) => ({
      ...art,
      artistId: artist.id,
      artistName: artist.name,
      artistSlug: artist.slug,
      artistFolder: artist.id,
    }));
    allArtworks = allArtworks.concat(mapped);
  }

  return allArtworks;
}
