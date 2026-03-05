export interface Article {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: 'Getting Started with CSS Grid Layout',
    date: 'January 12, 2025',
    excerpt:
      'CSS Grid is a powerful two-dimensional layout system. With grid-template-columns and grid-template-rows you can define complex page structures without nested floats or positioning hacks.',
  },
  {
    id: 2,
    title: 'Mastering Flexbox for Modern UI',
    date: 'February 3, 2025',
    excerpt:
      "Flexbox excels at one-dimensional layouts. While grid handles full-page structure, flexbox aligns items within a component — for example, centering a grid card's inner content.",
  },
  {
    id: 3,
    title: 'Building Responsive Grid Systems',
    date: 'February 18, 2025',
    excerpt:
      'A well-designed grid system adapts to all screen sizes. Using CSS custom properties alongside grid-template-areas lets you rearrange your entire layout with a single media query.',
  },
  {
    id: 4,
    title: 'Advanced TypeScript Patterns in React',
    date: 'March 2, 2025',
    excerpt:
      "Generic components, discriminated unions, and conditional types help you build reusable, type-safe UI libraries. TypeScript's inference engine removes boilerplate while keeping contracts strict.",
  },
  {
    id: 5,
    title: 'CSS Subgrid: The Missing Piece',
    date: 'March 15, 2025',
    excerpt:
      'Subgrid allows nested grid containers to align themselves to the parent grid tracks. This finally solves the classic card-alignment problem you encounter in every design system.',
  },
  {
    id: 6,
    title: 'React Performance: Memoization Deep Dive',
    date: 'April 1, 2025',
    excerpt:
      'useMemo and useCallback prevent unnecessary re-renders. This article benchmarks real-world scenarios — including a searchable grid of 1 000 items — and shows when memoization pays off.',
  },
  {
    id: 7,
    title: 'Understanding the CSS Cascade',
    date: 'April 22, 2025',
    excerpt:
      'Specificity, inheritance, and origin together determine which rule wins. Mastering the cascade means fewer !important declarations and a more maintainable stylesheet.',
  },
  {
    id: 8,
    title: 'Custom Hooks: Patterns and Best Practices',
    date: 'May 7, 2025',
    excerpt:
      'Extracting logic into custom hooks keeps components clean. A debounced-value hook, for example, can be shared across a search-input, a grid filter, and any form field in your app.',
  },
  {
    id: 9,
    title: 'Grid vs. Flexbox: When to Use Which',
    date: 'May 30, 2025',
    excerpt:
      'Use grid for macro layout (page skeleton, dashboard panels) and flexbox for micro layout (button groups, nav links). Combining both gives you a robust toolkit for any interface.',
  },
  {
    id: 10,
    title: 'Vite for Lightning-Fast Development',
    date: 'June 14, 2025',
    excerpt:
      "Vite's ES-module dev server starts instantly regardless of project size. Features like HMR and automatic CSS module support make iterating on a design-system grid a joy.",
  },
  {
    id: 11,
    title: 'Accessibility in Component Libraries',
    date: 'July 3, 2025',
    excerpt:
      'Every interactive element needs a keyboard path. ARIA labels, focus management, and semantic HTML ensure your grid, modals, and custom inputs are usable by everyone.',
  },
  {
    id: 12,
    title: 'CSS Container Queries and the Future of Grid',
    date: 'July 28, 2025',
    excerpt:
      "Container queries let a grid card respond to its own container's width rather than the viewport. Combined with subgrid and cascade layers, they represent the next evolution of CSS layout.",
  },
];
