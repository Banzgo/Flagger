# Flagger

A mobile-first flag guessing game built with React, TypeScript, Vite, and Tailwind CSS.

## Current Gameplay

- Big `FLAGGER` header, one flag, and 3 answer options.
- Infinite round loop (no fixed game length).
- Automatic advance to the next flag after each selection.
- Correct answer is briefly highlighted with visual feedback.
- Streak tracking at the bottom (`Current Streak` and `Best Streak`).

## Data Source

- Country metadata and SVG flags are provided by [`country-atlas`](https://www.npmjs.com/package/country-atlas).
- The app normalizes required fields locally at runtime and converts SVG markup to image-safe data URLs.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- pnpm

## Scripts

- `pnpm install` - install dependencies
- `pnpm dev` - start development server
- `pnpm build` - type-check and build for production
- `pnpm preview` - preview production build

## Notes

- Vite 8 requires Node `20.19+` or `22.12+`.
