import { blogPosts } from '../data/blog';
import BlogClient from './BlogClient';

export const metadata = {
    title: 'Blog - USK Galle',
    description: 'Articles on urban sketching, watercolor techniques, and Galle Fort architectural history.',
};

export default function BlogPage() {
    return <BlogClient posts={blogPosts} />;
}