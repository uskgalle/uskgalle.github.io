import { getAllArtistsAndProfiles, getProfileImagePath } from '../../data/artists';
import EditClient from './EditClient';

export const metadata = { title: 'Edit Artist Details - USK Galle', robots: { index: false } };

export default function EditPage() {
  const artists = getAllArtistsAndProfiles().filter(artist => artist.id).map(artist => ({
    ...artist, profileImage: getProfileImagePath(artist),
  }));
  return <EditClient artists={artists} />;
}
