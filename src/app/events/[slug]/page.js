import { events } from '../../data/events';
import { notFound, redirect } from 'next/navigation';
import RecapClient from './RecapClient';

export async function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    if (!event) return {};

    return {
        title: `${event.title} Recap | Urban Sketchers Galle`,
    };
}

export default async function EventPage({ params }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);

    if (!event) return notFound();

    // Upcoming events redirect directly to their register page
    if (event.upcoming || !event.recap) {
        redirect(`/events/${event.slug}/register`);
    }

    return <RecapClient event={event} />;
}
