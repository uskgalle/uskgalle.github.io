import echoesOfBatavia from './echoes-of-batavia-galle-fort-history';
import urbanSketching101 from './urban-sketching-101-galle-fort';
import rampartsHistory from './galle-fort-ramparts-history';
import artistProfiles from './usk-galle-artist-profiles';
import essentialKit from './essential-urban-sketching-kit';
import dutchChurch from './dutch-reformed-church-architecture';

/**
 * Registry of all blog posts.
 * To add a new blog post:
 * 1. Create a new file in this folder (e.g., `my-post.js`) using `template.js`.
 * 2. Import it here and add it to the `blogPosts` array below.
 */
export const blogPosts = [
  echoesOfBatavia,
  artistProfiles,
  urbanSketching101,
  rampartsHistory,
  essentialKit,
  dutchChurch,
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getAllPosts() {
  return blogPosts;
}

export function getPostsByCategory(category) {
  if (!category || category === 'All') return blogPosts;
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
