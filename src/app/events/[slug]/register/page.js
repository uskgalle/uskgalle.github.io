import { events } from '../../../data/events';
import { notFound } from 'next/navigation';
import RegisterClient from './RegisterClient';

export async function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);
    if (!event) return {};

    const pageTitle = `Register: ${event.title} | Urban Sketchers Galle`;
    const pageDesc = `Join Urban Sketchers Galle for ${event.title} on ${event.date.day} ${event.date.month} ${event.year} at ${event.location}. Register now to reserve your spot!`;
    const pageUrl = `https://urbansketchersgalle.github.io/events/${event.slug}/register`;

    return {
        title: pageTitle,
        description: pageDesc,
        openGraph: {
            title: pageTitle,
            description: pageDesc,
            url: pageUrl,
            siteName: 'Urban Sketchers Galle',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDesc,
        },
    };
}

export default async function RegisterPage({ params }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);

    if (!event) return notFound();

    return <RegisterClient event={event} />;
}
