# Design Task

A production-minded implementation of the supplied iDiamond/MyJewel Figma assessment. Both Figma frames are reproduced 1:1: the 1440px "Design Test" frame on desktop and the 375px "Design Test (mobile)" frame on small screens. Every image, icon, and the vector logo in `public/assets` is the original asset exported from the Figma file through the Figma MCP server.

## Design fidelity

- Every position, size, font size, line height, letter spacing, and color comes from the Figma node values.
- The layout is a fixed 1440px canvas (desktop) or 375px canvas (mobile); other viewport widths scale the canvas proportionally with CSS `zoom`, so proportions stay identical to the design at any width.
- Payment logos are desaturated with CSS `filter: grayscale(1)` to reproduce Figma's saturation blend layer, which browsers cannot render inside an SVG image.
- The mobile footer uses the mobile frame's link set; its two typos ("Visti", "Reparirs") were corrected to "Visit" and "Repairs".

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `src/app` — App Router pages, layout, and server API routes
- `src/components/layout` — shared header and footer
- `src/components/sections` — one component per Figma page section
- `src/components/forms` — interactive feature components
- `src/components/ui` — small reusable UI primitives
- `src/lib/api` — server-only data access and cache policy
- `src/lib/validation` — schemas shared by client and server
- `src/store` — Zustand client UI state
- `src/types` — domain types

## Assessment requirements

### Newsletter

The form validates with the same Zod schema in the browser and in `POST /api/newsletter`. The server route logs a simulated notification addressed to `process.env.EMAIL_ADDRESS`; the address is never exposed to the browser.

### Testimonial API and caching

The suggested public endpoint is JSONPlaceholder:

`GET https://jsonplaceholder.typicode.com/comments?_limit=4`

`getTestimonials()` calls it on the server with Next.js Data Cache revalidation:

```ts
fetch(url, { next: { revalidate: 3600, tags: ["testimonials"] } })
```

This serves the cached response for up to one hour. A local fallback keeps the page resilient if the public demo API is unavailable.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
