# Dopa Coffee & Cookies

A two-page, illustrated coffee-house website built with Next.js, React, TypeScript, Tailwind CSS, Anime.js 4, and Lucide icons.

## Included

- Illustrated homepage with layered floating drinks, a moving banner, scroll reveals, and parallax artwork
- Fixed navigation and an animated mobile dialog with focus trapping and Escape support
- Featured drinks, the Dopa story, location, and oversized typographic footer
- Menu page with 35 real menu items and local product photography
- Fully data-derived dependent filters
- URL query parameter synchronization and refresh persistence
- Animated category selection, search, responsive product cards, expandable details, and pagination
- English/Arabic content with right-to-left layouts
- Reduced-motion support, a manual motion toggle, and keyboard-accessible controls
- Local illustrated WebP assets and existing menu photography

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
python3 -m http.server 3000 --directory out
```

## Replace temporary content

- Homepage content: edit `components/AnimeHome.tsx`.
- Illustration sources live in `public/images/story-drinks/`; the active artwork uses optimized WebP copies.
- Menu images: update the centralized paths in `data/assets.ts`.
- Menu products: edit `data/menu.ts`.
- Arabic menu translations: edit `data/menu-ar.ts`.
- Google Maps embed: replace the iframe `src` in `components/LocationSection.tsx`.
- Address and hours translations: edit `lib/i18n.tsx`; phone and social links live in `components/LocationSection.tsx` and `components/Footer.tsx`.

## Animation ownership

`lib/anime.ts` scopes homepage and menu animations to their component roots and reverts them on unmount. It also owns motion preferences. Mobile navigation and the menu category indicator clean up their own animations. Continuous artwork and banner animations pause outside the viewport. Native scrolling remains available throughout.

The project exports static files to `out/`, so use a static server for the production preview. Earlier Motion/GSAP components remain in the repository but are not mounted by the active pages.

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
