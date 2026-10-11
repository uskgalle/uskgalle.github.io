import { events } from './events';
import { artworks } from './artworks';

const publishedOrder = new Map(artworks.map((art, index) => [art.id, index]));
const dates = new Map(events.map(event => [event.slug, Date.parse(`${event.date.day} ${event.date.month} ${event.year}`) || 0]));

export function newestArtworksFirst(items) {
  return [...items].sort((a, b) =>
    (dates.get(b.event) || 0) - (dates.get(a.event) || 0) ||
    (publishedOrder.get(b.id) ?? -1) - (publishedOrder.get(a.id) ?? -1));
}
