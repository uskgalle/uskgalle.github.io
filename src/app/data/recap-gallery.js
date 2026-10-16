import { events } from './events';

export function getRecapGallery() {
  const recaps = events.filter(event => event.recap?.images?.length).sort((a, b) =>
    (Date.parse(`${b.date.day} ${b.date.month} ${b.year}`) || 0) -
    (Date.parse(`${a.date.day} ${a.date.month} ${a.year}`) || 0));
  const meetups = recaps.map(event => ({
    slug: event.slug,
    gallerySlug: event.number > 0
      ? `sketch-meet-up-${event.number}`
      : event.slug.replace(/-(\d+)$/, (_, number) => `-${Number(number)}`),
    title: event.title,
    count: event.recap.images.length,
  }));
  const images = recaps.flatMap(event => {
    const extension = event.recap.extension || event.recap.imageExtension || 'jpg';
    return event.recap.images.map((item, index) => ({
      id: `${event.slug}-${index}`,
      src: typeof item === 'string' && item.startsWith('/') ? item
        : `/gallery-images/${event.slug}/${item}${typeof item === 'string' && item.includes('.') ? '' : `.${extension}`}`,
      title: event.title,
      event: event.slug,
    }));
  });
  return { images, meetups };
}
