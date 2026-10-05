import { events } from '../../../data/events';
import { blogPosts } from '../../../data/blog';
import PostBuilderClient from './PostBuilderClient';

export function generateStaticParams() {
  return [
    { template: 'split' },
    { template: 'blog' },
    { template: 'classic' },
    { template: 'overlay' },
    { template: 'minimal' },
    { template: 'story' },
  ];
}

export async function generateMetadata({ params }) {
  const { template } = await params;
  const name = template ? template.charAt(0).toUpperCase() + template.slice(1) : 'Post';
  return {
    title: `${name} Post Builder — Admin Studio | USK Galle`,
    description: `Customize and export ${name} post template for Instagram with live data autofill.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PostTemplatePage({ params }) {
  const { template } = await params;

  return (
    <PostBuilderClient
      initialTemplate={template || 'split'}
      events={events}
      blogPosts={blogPosts}
    />
  );
}
