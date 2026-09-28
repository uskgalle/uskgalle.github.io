# Hero Section Images Guide

This folder contains curated, lightweight images displayed in the animated rolling gallery columns on the homepage Hero section.

---

## Recommended Image Specifications

| Property | Recommendation | Why? |
| :--- | :--- | :--- |
| **Aspect Ratio** | **1:1 (Square)** | The cards on the hero carousel are fixed to `aspect-ratio: 1 / 1`. Supplying a 1:1 image lets you control the exact crop without automatic CSS cropping chopping off key details or signatures. |
| **Dimensions** | **400 × 400 px** to **500 × 500 px** | Cards render on screen between 180px–350px wide. 400–500px provides ultra-crisp resolution for high-DPI (Retina) screens without wasting bandwidth. |
| **File Format** | **WebP** or **JPEG (.jpg)** | WebP offers superior compression with no visible loss in quality. JPEG (at 80–85% quality) is also great. Avoid large uncompressed PNGs. |
| **File Size** | **30 KB – 80 KB** per image | With 24 images scrolling simultaneously, keeping each file under 80 KB ensures the entire hero section loads in under 1 second and scrolls at a smooth 60 FPS. |
| **Quantity** | **24 images** (`1.jpg` – `24.jpg`) | The hero gallery distributes images evenly across 3 marquee columns (8 per column). |

---

## How to Replace / Add Images

1. Crop your favorite sketches or meetup photos to a **1:1 square** (e.g. 500×500 px).
2. Compress and save as `1.jpg`, `2.jpg`, `3.jpg`, ... up to `24.jpg` (or `.webp`).
3. Replace the files in this folder (`public/hero-images/`).
4. If you change file extensions (e.g., to `.webp`) or add more images, update the list in [`src/components/Hero/Hero.js`](../../src/components/Hero/Hero.js).
