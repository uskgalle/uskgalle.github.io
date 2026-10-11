import { events } from './events';

export function getArtworkDescription(description, title, artistName, eventSlug) {
  if (description?.trim()) return { description };

  const details = {
    title: title.trim(),
    artistName: artistName || 'the artist',
    meetup: eventSlug ? events.find(event => event.slug === eventSlug)?.title || eventSlug
      .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : null,
  };
  return {
    description: `An illustration of ${details.title}, created by ${details.artistName}${details.meetup ? ` during the ${details.meetup}` : ''}. This artwork captures the artist’s unique perspective and experience from the sketching session.`,
    descriptionDetails: details,
  };
}
