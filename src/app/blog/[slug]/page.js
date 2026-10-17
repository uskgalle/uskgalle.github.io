import { blogPosts, getPostBySlug, getAllPostsAndExamples } from '../../data/blog';
import { getArtistBySlug, getProfileImagePath, getAllArtworks } from '../../data/artists';
import { getRecapGallery } from '../../data/recap-gallery';
import { notFound } from 'next/navigation';
import BlogArticleClient from './BlogArticleClient';

export async function generateStaticParams() {
    return getAllPostsAndExamples().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Article Not Found' };
    return {
        title: `${post.title} - USK Galle Blog`,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} - USK Galle Blog`,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
        },
    };
}

export default async function BlogArticlePage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    // Look up author info if artist slug is present
    const authorData = post.authorSlug ? getArtistBySlug(post.authorSlug) : null;
    const eventMedia = post.eventSlug ? {
        photos: getRecapGallery().images.filter(image => image.event === post.eventSlug),
        artworks: post.eventSlug === 'meet-up-05'
            ? getAllArtworks().filter(image => image.event === post.eventSlug)
            : [],
    } : null;

    // Related posts: prioritize same category, then other posts
    const otherPosts = (post.isExample ? getAllPostsAndExamples().filter((p) => p.isExample) : blogPosts)
        .filter((p) => p.slug !== slug);
    const sameCategory = otherPosts.filter(
        (p) => p.category.toLowerCase() === post.category.toLowerCase()
    );
    const differentCategory = otherPosts.filter(
        (p) => p.category.toLowerCase() !== post.category.toLowerCase()
    );

    const relatedPosts = [...sameCategory, ...differentCategory].slice(0, 3);

    return (
        <BlogArticleClient
            post={{ ...post, authorImage: getProfileImagePath(authorData || post.authorSlug || 'system') }}
            relatedPosts={relatedPosts}
            authorData={authorData}
            eventMedia={eventMedia}
        />
    );
}
