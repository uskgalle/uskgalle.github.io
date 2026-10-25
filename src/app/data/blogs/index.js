import artistProfiles from './usk-galle-artist-profiles';
import bellTower from './sketching-bell-tower-national-maritime-museum-galle';
import churchStreet from './sketching-house-church-street-galle-fort';
import { examplePosts } from './example-artist-posts';
import history from './history-of-usk-galle';
import meetOne from './sketch-meet-01-first-galle-fort-gathering';
import meetTwo from './sketch-meet-02-returning-to-galle-fort';
import meetThree from './sketch-meet-03-galle-streets-and-black-fort';
import meetFour from './sketch-meet-04-lighthouse-and-clock-tower';
import meetFive from './sketch-meet-05-galle-fish-market';

/**
 * Registry of all blog posts.
 * To add a new blog post:
 * 1. Create a new file in this folder (e.g., `my-post.js`) using `template.js`.
 * 2. Import it here and add it to the `blogPosts` array below.
 */
export const blogPosts = [
  churchStreet,
  bellTower,
  meetFive,
  meetFour,
  meetThree,
  meetTwo,
  meetOne,
  artistProfiles,
  history,
];

export function getPostBySlug(slug) {
  return getAllPostsAndExamples().find((post) => post.slug === slug) || null;
}

// Include examples only for direct article routes and author profile pages.
export function getAllPostsAndExamples() {
  return [...blogPosts, ...examplePosts];
}

export function getAllPosts() {
  return blogPosts;
}

export function getPostsByCategory(category) {
  if (!category || category === 'All') return blogPosts;
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
