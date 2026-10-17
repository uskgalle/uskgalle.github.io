import { blogPosts } from '../data/blog';
import BlogClient from './BlogClient';
import { getProfileImagePath } from '../data/artists';

export const metadata = {
    title: 'Blog - USK Galle',
    description: 'Articles on urban sketching, watercolor techniques, and Galle Fort architectural history.',
};

export default function BlogPage() {
    const posts = blogPosts.map(post => ({
        ...post,
        authorImage: getProfileImagePath(post.authorSlug || 'system'),
    }));
    return <BlogClient posts={posts} />;
}
