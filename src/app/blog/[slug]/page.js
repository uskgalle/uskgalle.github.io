import { blogPosts, getPostBySlug } from '../../data/blog';
import { notFound } from 'next/navigation';
import BlogArticleClient from './BlogArticleClient';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Article Not Found' };
    return {
        title: `${post.title} - USK Galle Blog`,
        description: post.excerpt,
    };
}

export default async function BlogArticlePage({ params }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    return <BlogArticleClient post={post} />;
}
