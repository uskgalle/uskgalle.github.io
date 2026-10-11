import { artists } from '../data/artists';
import RegisterClient from './RegisterClient';

export default function RegisterPage() {
  return <RegisterClient registeredArtists={artists.map(({ id, name, slug }) => ({ id, name, slug }))} />;
}
