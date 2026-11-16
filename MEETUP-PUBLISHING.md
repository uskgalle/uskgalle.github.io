# Sketch Meet-Up publishing checklist

## 1. Close the finished meet-up

- In [events.js](src/app/data/events.js), set the finished event’s `upcoming` to `false` and `registerLink` to `null`. Keep the actual date, time, and meeting venue.
- Fill in `recap.body` with a short account in the order things happened. For a workshop, credit the presenter, mention the live demo or techniques shared, and describe where the group went next.

## 2. Prepare the photo gallery

- Export the selected photos as WebP, up to **1,600 px on the longest side**, and name them `1.webp`, `2.webp`, and so on in `public/gallery-images/meet-up-NN/`. Put the strongest group photo first if it will also be the blog cover.
- In the event’s recap, set `extension` to `'webp'` and make sure `images` lists exactly the numbered files you exported, in display order. Use the first photo for the event’s `image` if it suits the recap. The event data powers **View Recap**, the full gallery, and the homepage’s Latest Meet photos.

## 3. Publish the blog recap

- Copy the [#6 workshop article](src/app/data/blogs/people-in-the-city.js) as a starting point. Update the slug, event slug, publication date, title, and copy. Add the new entry to [blogs/index.js](src/app/data/blogs/index.js).
- Copy your chosen cover to `public/blog-images/<blog-slug>.webp`. Update the cover caption and alt text. Use `photoGroups` to show a short selection in the blog, grouped by session when useful. The article includes a link to the full event gallery.
- Set the event’s `recap.blogSlug` to the new article slug to add **Continue reading on the blog**. Set `featured: true` on the new article and clear it from the previous featured post.

## 4. List the next meet-up

- Add the next event at the top of [events.js](src/app/data/events.js) with `upcoming: true` and `recap: null`. If details are pending, mark the date, time, and venue **TBA** and use **Join WhatsApp Group** for updates. Use `showOnHomepage: false` if the listing should appear only in Events.

## 5. Check and publish

- Run `npm run dev` and check the Events page, the finished recap, its blog link, the featured article, and the full gallery. Open a photo in each blog group and confirm the upcoming event shows the right details and button.
- If Windows says it cannot find `next`, open Command Prompt in the project folder and run `npm ci --offline=false && npm run dev` on one line.
- Stop the dev server before running `npm run build`. When the changes reach `main`, check that the [GitHub Pages deployment](.github/workflows/nextjs.yml) succeeds and open the published recap and blog once.
