import { artists, getArtistById } from '../../data/artists';
import { events } from '../../data/events';
import SubmitArtworkClient from './SubmitArtworkClient';

export const metadata = { title: 'Submit Artwork - USK Galle' };

export default function SubmitArtworkPage() {
  const registeredArtists = [...artists, getArtistById('USKG0')].filter(artist => artist?.id).map(({ id, name, slug }) => ({ id, name, slug }));
  const sketchMeets = events.filter(event => Number.isInteger(event.number)).map(({ number, title }) => ({ number, title }));
  return <SubmitArtworkClient artists={registeredArtists} sketchMeets={sketchMeets} />;
}
