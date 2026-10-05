import { artists } from '../../data/artists';
import ArtistGeneratorClient from './ArtistGeneratorClient';

export const metadata = {
  title: 'Artist Generator — Admin Studio | USK Galle',
  description: 'Manage community artist profiles and generate code for artists.js',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminArtistsPage() {
  return <ArtistGeneratorClient initialArtists={artists} />;
}
