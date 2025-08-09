This is a [Next.js](https://nextjs.org) App Router project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses JavaScript (no TypeScript), Tailwind CSS, and ESLint.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the landing page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

## Project Structure

- `src/app/` — App Router routes and layout
  - `layout.js` — root layout
  - `page.js` — landing page (index)
- `src/components/cta/` — CTA UI using a CSS Module
  - `cta.js` — CTA button component (JavaScript)
  - `cta.module.css` — neon/dopamine styles for CTA
- `public/` — static assets
- `globals.css` — Tailwind base styles

## Design Notes

- Dark + neon palette with contrast-driven attention flow
- Pattern interrupt micro-animations on the CTA
- Clear, irresistible CTA copy: “Start free”

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
