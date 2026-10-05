import { artists } from '../../data/artists';
import { artworks } from '../../data/artworks';
import { events } from '../../data/events';
import ArtworkGeneratorClient from './ArtworkGeneratorClient';

export const metadata = {
  title: 'Artwork Generator — Admin Studio | USK Galle',
  description: 'Catalog sketches and generate artwork metadata objects for artworks.js',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminArtworksPage() {
  return (
    <ArtworkGeneratorClient
      initialArtists={artists}
      initialArtworks={artworks}
      initialEvents={events}
    />
  );
}
