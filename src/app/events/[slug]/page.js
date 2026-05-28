import { events } from '../../data/events';
import { notFound } from 'next/navigation';
import RecapClient from './RecapClient';

export async function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    return {
        title: `${event?.title} Recap`,
    };
}

export default async function RecapPage({ params }) {
    const { slug } = await params;

    const event = events.find((e) => e.slug === slug);

    if (!event || !event.recap) return notFound();

    return <RecapClient event={event} />;
}

