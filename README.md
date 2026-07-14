# Dopa Coffee & Cookies

A premium two-page coffee-house website built with Next.js, React, TypeScript, Tailwind CSS, Motion, GSAP ScrollTrigger, and Lucide icons.

## Included

- Cinematic home page with a scroll-scrubbed coffee bottle scene
- Responsive sticky navigation and animated mobile menu
- Editorial brand sections, journey timeline, featured drinks, testimonials, location, and footer
- Menu page with 25 local sample products
- Fully data-derived dependent filters
- URL query parameter synchronization and refresh persistence
- Responsive mobile filter drawer
- Reduced-motion support and keyboard-accessible controls
- Local placeholder assets with no external image dependency

## Run locally

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run lint
npm run build
npm run start
```

## Replace temporary content

- Main bottle image: update `assets.bottle` in `data/assets.ts`.
- Menu images: update the centralized paths in `data/assets.ts`.
- Menu products: edit `data/menu.ts`.
- Journey and testimonials: edit `data/journey.ts` and `data/testimonials.ts`.
- Google Maps embed: replace the iframe `src` in `components/LocationSection.tsx`.
- Address, phone, social handles, and hours: update `components/LocationSection.tsx` and `components/Footer.tsx`.

## Filtering behavior

The filter hierarchy is:

1. Main item type
2. Category
3. Temperature / serving style
4. Flavor
5. Milk type
6. Size
7. Dietary preference

Every option is generated from products that match the previous selections. Changing an earlier filter clears later selections automatically, preventing invalid filter combinations.
