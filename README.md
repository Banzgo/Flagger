# Flagger

A simple mobile-first flag guessing game built with React + TypeScript + Vite.

## Game Rules

- Every game session has 10 rounds.
- Each round shows one country flag.
- You get 3 country options and must pick the correct one.
- Score increases by 1 for each correct answer.

## Data Source

- Country metadata and SVG flags are provided by [`country-atlas`](https://www.npmjs.com/package/country-atlas).
- The app normalizes required fields locally at runtime (name, flag, capital, continent, region).

## Scripts

- `pnpm install` - install dependencies
- `pnpm dev` - start development server
- `pnpm build` - type-check and build for production
- `pnpm preview` - preview production build
