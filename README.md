# Personal Webpage

A modern personal webpage built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ Next.js 14 with App Router
- 🔷 TypeScript with strict mode
- 🎨 Tailwind CSS for styling
- 📝 MDX support for content
- 🧹 ESLint + Prettier configured
- 📁 Clean folder structure

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public route group
│   │   ├── page.tsx       # Home page
│   │   ├── about/
│   │   ├── projects/
│   │   ├── narrative/
│   │   ├── blog/
│   │   └── contact/
│   ├── api/
│   │   └── track/         # Analytics endpoint
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Layout components
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   └── narrative/         # Narrative-specific components
├── content/
│   ├── narrative/         # Narrative MDX files
│   ├── blog/              # Blog MDX files
│   └── projects/          # Project MDX files
├── config/
│   ├── site.ts            # Site metadata
│   ├── navigation.ts      # Navigation config
│   └── sections.ts        # Section config
├── lib/
│   ├── analytics.ts       # Analytics utilities
│   ├── mdx.ts             # MDX utilities
│   ├── seo.ts             # SEO utilities
│   └── types.ts           # Shared types
└── styles/
    └── globals.css        # Global styles
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Configuration

### TypeScript

TypeScript is configured with strict mode enabled in `tsconfig.json`. The `@/` alias points to the `src/` directory.

### ESLint + Prettier

The project includes:
- Import sorting
- No unused variables enforcement
- Tailwind class sorting (via prettier-plugin-tailwindcss)

### Tailwind CSS

Tailwind is configured to scan all files in `src/**/*.{js,ts,jsx,tsx,mdx}`.

## Next Steps

1. Add components in `src/components/`
2. Create content in `src/content/`
3. Customize configuration in `src/config/`
4. Update site metadata in `src/config/site.ts`

## License

MIT
