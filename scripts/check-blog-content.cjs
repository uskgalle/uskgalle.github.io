const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const swc = require('next/dist/build/swc');
const original = require.extensions['.js'];
const sourceRoot = path.resolve('src') + path.sep;
require.extensions['.js'] = (module, filename) => {
  if (!filename.startsWith(sourceRoot)) return original(module, filename);
  const output = swc.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, jsc: { parser: { syntax: 'ecmascript', jsx: true }, target: 'es2020' }, module: { type: 'commonjs' },
  });
  module._compile(output.code, filename);
};
const { blogPosts } = require('../src/app/data/blogs/index.js');
const { events } = require('../src/app/data/events.js');
const { getArtistBySlug, getProfileImagePath } = require('../src/app/data/artists.js');
const additions = blogPosts.filter(post => post.authorSlug === 'system');
assert.equal(additions.length, 8);
assert.equal(new Set(blogPosts.map(post => post.slug)).size, blogPosts.length);
assert.equal(blogPosts.filter(post => post.featured).length, 1);
for (const post of additions) {
  assert.equal(post.author, 'System');
  assert.equal(post.date, 'October 15, 2026');
  assert.ok(fs.existsSync(path.join('public', post.coverImage)), post.coverImage);
  assert.ok(post.content.length > 1000, post.slug);
  if (post.eventSlug) {
    assert.ok(events.some(event => event.slug === post.eventSlug));
    assert.ok(post.content.includes(`/events/${post.eventSlug}`));
  }
  for (const [, href] of post.content.matchAll(/href="(\/[^"?#]*)[^"]*"/g)) {
    if (href.startsWith('/blog/')) assert.ok(blogPosts.some(item => href === `/blog/${item.slug}`), href);
    else if (href.startsWith('/artists/')) assert.ok(getArtistBySlug(href.slice('/artists/'.length)), href);
    else if (href.startsWith('/events/')) assert.ok(events.some(item => href === `/events/${item.slug}` || href === `/events/${item.slug}/register`), href);
    else assert.ok(['/events', '/gallery', '/artists', '/artworks'].includes(href), href);
  }
}
for (const slug of ['kasun-miuranga', 'sandeepa-vithanage']) {
  assert.equal(getProfileImagePath(slug), '/artists-images/no_profile.png');
}
assert.ok(fs.existsSync('public/artists-images/no_profile.png'));
console.log(`Checked ${additions.length} new System articles: unique slugs, event coverage, internal links, cover images, author fallback.`);
