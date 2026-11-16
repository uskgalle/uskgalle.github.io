import fs from 'fs';
import path from 'path';
import { artworks, getArtworkMetadata } from './artworks';
import { getArtworkDescription } from './artwork-description';

export { artworks, getArtworkMetadata };

/**
 * Standard community sketchers displayed in the main /artists directory.
 */
export const artists = [
  {
    "bio": "Architecture student & artist, exploring watercolor with pen and ink.",
    "country": "LK",
    "id": "USKG1",
    "instagram": "https://instagram.com/yasitharangala",
    "name": "Yasith Arangala",
    "role": "",
    "slug": "yasith-arangala"
  },
  {
    "bio": "Interior Designer | Sketcher | Artist",
    "country": "LK",
    "id": "USKG2",
    "instagram": "https://instagram.com/_udarii_",
    "name": "Sumudu Udari",
    "role": "",
    "slug": "sumudu-udari"
  },
  {
    "bio": "I’m an architecture student at the University of Moratuwa, and I enjoy urban sketching in Galle.",
    "country": "LK",
    "id": "USKG3",
    "instagram": "https://instagram.com/nimthakajayavihan",
    "name": "Nimthaka Jayavihan",
    "role": "",
    "slug": "nimthaka-jayavihan"
  },
  {
    "bio": "I sketch what catches my eye, paint what I feel, and love discovering new perspectives through art.",
    "country": "LK",
    "id": "USKG4",
    "instagram": "https://instagram.com/_samadhiiii",
    "name": "Lakshana Samadhi",
    "role": "",
    "slug": "lakshana-samadhi"
  },
  {
    "bio": "As a traveling artist I enjoy sketching at different places. I’m interested in sketching architecture and landscape. I believe each city and place has something to offer, and sketching them can be a good way to understand what it is.",
    "country": "LK",
    "id": "USKG5",
    "instagram": "https://instagram.com/sachithvithanage",
    "name": "Sachith Vithanage",
    "role": "",
    "slug": "sachith-vithanage"
  },
  {
    "bio": "former maha.workroom | temporary super slow traveler | postcard painter  | stubborn experiencer | skill collector",
    "country": "IR",
    "id": "USKG6",
    "instagram": "https://instagram.com/shifis.way",
    "name": "Shifteh",
    "role": "",
    "slug": "shifteh"
  },
  {
    "bio": "Colouring outside the lines ofc",
    "country": "LK",
    "id": "USKG7",
    "instagram": "https://instagram.com/artis_tmaybe",
    "name": "Amodi Kodithuwakku",
    "role": "",
    "slug": "amodi-kodithuwakku"
  },
  {
    "bio": "Rediscovering my sketching abilities after some years! I am an active member of Urban Sketchers Colombo since 2024 and I love to dabble in pencil sketching, using light outlines and colour pencils to shade in my drawings... I have my own distinctive style where detail is subtle but vivid!",
    "country": "LK",
    "id": "USKG8",
    "instagram": "https://instagram.com/nelum_ventures",
    "name": "Nelum Buddhadasa",
    "role": "",
    "slug": "nelum-buddhadasa"
  },
  {
    "bio": "Artist dabbling in illustration and murals wanting to spend more time sketching.",
    "country": "IR",
    "id": "USKG9",
    "instagram": "https://instagram.com/Rwestarts",
    "name": "Rachel West",
    "role": "",
    "slug": "rachel-west"
  },
  {
    "bio": "Finely imperfect",
    "country": "LK",
    "id": "USKG10",
    "instagram": "https://instagram.com/__hibee___",
    "name": "Maheema Mahimani",
    "role": "",
    "slug": "maheema-mahimani"
  },
  {
    "bio": "Just started, so let’s see",
    "country": "LK",
    "id": "USKG11",
    "instagram": "https://instagram.com/rashmi_ww",
    "name": "Rashmi Wimalasiri",
    "role": "",
    "slug": "rashmi-wimalasiri"
  },
  {
    "bio": "Enjoy and busy with architectural journey",
    "country": "LK",
    "id": "USKG12",
    "instagram": "https://instagram.com/lakdinilisakya",
    "name": "Lakdini Lisakya",
    "role": "",
    "slug": "lakdini-lisakya"
  },
  {
    "bio": "Learning architecture, observing the world through lines | archi student in university of moratuwa",
    "country": "LK",
    "id": "USKG13",
    "instagram": "https://instagram.com/_kathya_rk_",
    "name": "Kathya Ruhansi",
    "role": "",
    "slug": "kathya-ruhansi"
  },
  {
    "bio": "Plant Lover | Agriculturist | Cooking & Baking | Artist",
    "country": "LK",
    "id": "USKG14",
    "instagram": "https://instagram.com/isuri_k_",
    "name": "Isuri Kumarasinghe",
    "role": "",
    "slug": "isuri-kumarasinghe"
  },
  {
    "bio": "Blender Artist | Architect Student | Sketcher",
    "country": "LK",
    "id": "USKG15",
    "instagram": "https://instagram.com/ravindu_ramawickrama",
    "name": "Ravindu Ramawickrama",
    "role": "",
    "slug": "ravindu-ramawickrama"
  },
  {
    "bio": "Nethmi Pabasara is a sketcher from Sri Lanka who shares her drawings with the Urban Sketchers Galle community.",
    "country": "LK",
    "id": "USKG16",
    "instagram": "https://instagram.com/Thepabee",
    "name": "Nethmi Pabasara",
    "role": "",
    "slug": "nethmi-pabasara"
  },
  {
    "bio": "Turning ideas into lines & emotions into art 🎨 Learning • Creating • Improving",
    "country": "LK",
    "id": "USKG17",
    "instagram": "https://instagram.com/vihasna_geesathmi",
    "name": "Vihasna Geesathmi",
    "role": "",
    "slug": "vihasna-geesathmi"
  },
  {
    "bio": "Rakshana Sharifudeen is a Sri Lankan urban sketcher, location artist, and active member of Urban Sketchers Colombo, best known for her striking vertical compositions of architectural heritage and streetscapes. Working fluidly across pencil, charcoal, ink, and watercolor wash, her on-site drawings capture the character and depth of historic urban landscapes.",
    "country": "LK",
    "id": "USKG18",
    "instagram": "https://instagram.com/rakshysdeen",
    "name": "Rakshana Sharifudeen",
    "role": "",
    "slug": "rakshana-sharifudeen"
  },
  {
    "bio": "Rashani Weerakoon is a Sri Lankan multidisciplinary artist, Designer, urban sketcher, illustrator, and active member of Urban Sketchers Colombo. she captures the character of places, architectural details, and the rhythms of everyday life through ink, and watercolour. Beyond urban sketching, her creative practice spans illustration, brand identity design, and costume design, reflecting a diverse artistic perspective shaped by her background in engineering and design. Through her work, Rashani explores the intersection of observation, storytelling, and visual expression, documenting the world around her.",
    "country": "LK",
    "id": "USKG19",
    "instagram": "https://instagram.com/the_illustratress",
    "name": "Rashani Weerakoon",
    "role": "",
    "slug": "rashani-weerakoon"
  },
  {
    "bio": "Astrid Kahane-Seefeld, also known as Astisketcher, is an urban sketcher who lives between Spain and Germany. She began sketching in 2018, first drawing buildings before turning her attention to people and everyday life. She led the People in the City workshop and a live sketching demonstration at Sketch Meet-Up #6.",
    "id": "USKG20",
    "name": "Astrid Kahane-Seefeld",
    "role": "Guest Workshop Instructor",
    "slug": "astrid-kahane-seefeld"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG21",
    "instagram": "https://instagram.com/tharinda97",
    "name": "Tharinda Kodikara",
    "slug": "tharinda-kodikara"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG22",
    "name": "Lakshan Sandakelum",
    "slug": "lakshan-sandakelum"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG23",
    "instagram": "https://instagram.com/diwya_ramawickrama",
    "name": "Diwya Ramawickrama",
    "slug": "diwya-ramawickrama"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG24",
    "name": "T.G.L. Lakruwani",
    "slug": "tgl-lakruwani"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG25",
    "instagram": "https://instagram.com/ktmawli98",
    "name": "Mawli De Silva",
    "slug": "mawli-de-silva"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG26",
    "instagram": "https://instagram.com/Perera.janaki",
    "name": "Janaki Perera",
    "slug": "janaki-perera"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG27",
    "instagram": "https://instagram.com/deshan33302",
    "name": "T. Deshan Mallawa Arachchi",
    "slug": "t-deshan-mallawa-arachchi"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG28",
    "name": "Lelwala Godakandage Theshara Sankalana",
    "slug": "lelwala-godakandage-theshara-sankalana"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG29",
    "instagram": "https://instagram.com/isuru.wee",
    "name": "Isuru Weeraddana",
    "slug": "isuru-weeraddana"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG30",
    "instagram": "https://instagram.com/Roxyartt",
    "name": "Roxane Toulouse",
    "slug": "roxane-toulouse"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG31",
    "instagram": "https://instagram.com/dahami_jay",
    "name": "Dahami Thathsarani Jayaneththi",
    "slug": "dahami-thathsarani-jayaneththi"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG32",
    "instagram": "https://instagram.com/dishara_liyanage",
    "name": "Dishara Liyanage",
    "slug": "dishara-liyanage"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG33",
    "instagram": "https://instagram.com/delly_2007",
    "name": "Delini Wijesekara",
    "slug": "delini-wijesekara"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG34",
    "instagram": "https://instagram.com/_janiiiie",
    "name": "Janith Kariyawasam",
    "slug": "janith-kariyawasam"
  },
  {
    "bio": "Took part in Sketch Meet-Up #6 in Galle Fort.",
    "id": "USKG35",
    "instagram": "https://instagram.com/sethumi_j_",
    "name": "Sethumi Jayarathna",
    "slug": "sethumi-jayarathna"
  }
];

/**
 * Special profiles (Admins, Developers, System AI agent).
 * These are not listed on the general /artists directory grid, but have their
 * own dedicated profile pages at /artists/[slug] and can be linked as authors or leads.
 */
export const specialProfiles = [
  {
    "bio": "This is a fictional artist profile for examples and demonstrations. The sketches below are illustrative placeholders, not submissions by a community member. Use this page to explore how an artist bio and sketch gallery look on USK Galle.",
    "country": "LK",
    "id": "USKG0",
    "isSpecial": true,
    "name": "Example Artist",
    "website": "https://uskgalle.github.io/",
    "whatsapp": "https://chat.whatsapp.com/IlMO9dqYLKR8i6qhXcnU6l",
    "facebook": "https://www.facebook.com/share/1L8GtVnbzg",
    "instagram": "https://www.instagram.com/urbansketchersgalle",
    "role": "Example Profile",
    "slug": "example-artist"
  },
  {
    "bio": "AI agent thinking about art, Galle Fort history, and culture. Writing blogs and field guides to inspire artists, preserve heritage, and document the living pulse of USK Galle.",
    "id": "USK-SYS",
    "isSpecial": true,
    "name": "System",
    "role": "AI Agent & Archival Storyteller",
    "slug": "system"
  },
  {
    "bio": "Admin of USK Galle, handling and organizing community sketch meets and events. Professional artist exploring the historic architecture and vibrant streets of Sri Lanka.",
    "country": "LK",
    "id": "USK-ADM",
    "isSpecial": true,
    "name": "Sandeepa Vithanage",
    "instagram": "https://www.instagram.com/sandeepa_vithanage/",
    "website": "https://linktr.ee/artosan",
    "role": "Admin & Event Lead",
    "slug": "sandeepa-vithanage"
  },
  {
    "bio": "Handling the technical sides, website development, and digital maintenance for USK Galle. Hobbyist artist passionate about open culture, creative technology, and building digital archives.",
    "country": "LK",
    "id": "USK-DEV",
    "isSpecial": true,
    "name": "Kasun Miuranga",
    "instagram": "https://www.instagram.com/kasun.miu/",
    "website": "https://kasunmiu.github.io/",
    "role": "Developer & Admin",
    "slug": "kasun-miuranga"
  }
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

      const title = meta?.title || `Sketch #${filename.replace(/\.[^/.]+$/, '')}`;
      return {
        id: meta?.id || `${targetDir.name}-${index + 1}`,
        filename,
        src: `/artworks-images/${targetDir.name}/${filename}`,
        title,
        ...getArtworkDescription(meta?.description, title, artist?.name, meta?.event),
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
