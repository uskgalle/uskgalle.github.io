import { getAllArtistsAndProfiles } from '../../data/artists';
import SubmitBlogClient from './SubmitBlogClient';

export const metadata = { title: 'Submit a Blog - USK Galle' };

export default function SubmitBlogPage() {
  const artists = getAllArtistsAndProfiles().filter(artist => artist.id && artist.slug !== 'system')
    .map(({ id, name, slug }) => ({ id, name, slug }));
  return <SubmitBlogClient artists={artists} />;
}
