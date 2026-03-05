# React Search Bar

A client-side article search page built with **React 19**, **TypeScript**, and **Vite**.
Features real-time filtering, phrase-based tokenised highlighting, debounced input, and a two-column layout — with no external UI libraries.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project structure

```
src/
├── app.tsx                         # Root component
├── main.tsx                        # Entry point (mounts App, imports global CSS)
├── styles/
│   └── global.css                  # CSS reset + base styles
├── data/
│   └── articles.ts                 # In-memory article data (12 items)
├── hooks/
│   └── use-debounced-value.ts      # Generic debounce hook
├── utils/
│   ├── string-utils.ts             # escapeRegExp / tokenizeQuery
│   └── highlight-text.ts           # highlightText → ReactNode[]
├── components/
│   ├── search-input/               # Controlled input + clear button
│   ├── article-list/               # Maps articles → ArticleCard + empty state
│   ├── article-card/               # Title / date / excerpt with highlights
│   └── aside-card/                 # Static profile sidebar
└── pages/
    └── search/
        └── search-page.tsx         # Page: wires state, debounce, filter
```

---

## Debounce approach

`useDebouncedValue<T>(value, delayMs)` in `src/hooks/use-debounced-value.ts`:

1. Holds a separate `debouncedValue` state initialised to `value`.
2. On every `value` change a `setTimeout` is scheduled for `delayMs` ms.
3. The `useEffect` cleanup calls `clearTimeout` — this cancels any in-flight timer when the value changes again **or** when the component unmounts, preventing stale state updates.
4. `search-page.tsx` keeps two pieces of state:
   - `query` — wired directly to the input (instant, keeps the field responsive).
   - `debouncedQuery = useDebouncedValue(query, 250)` — drives filtering and highlighting.

This means the UI only reruns expensive memoised computations after the user pauses typing for 250 ms.

---

## Highlight approach

`highlightText(text, tokens, highlightClass)` in `src/utils/highlight-text.ts`:

1. `tokenizeQuery(query)` splits the debounced query on whitespace, lowercases, deduplicates, and drops empty strings.
2. Each token is passed through `escapeRegExp` before being joined with `|` into a single alternation pattern.
3. `String.split` with a **capturing-group** regex `/(pattern)/gi` produces an array that interleaves non-matching and matching segments.
4. Each segment is tested against the token pattern: matches become `<mark className={highlightClass}>` elements; everything else stays a plain string.
5. **No `dangerouslySetInnerHTML`** — the result is `ReactNode[]`, safe to render directly.
6. Both `tokenizeQuery` and `highlightText` outputs are wrapped in `useMemo` inside `ArticleCard` so they only recompute when `article` or `tokens` change.

### Highlight style

```css
mark {
  background-color: #f3d34a; /* warm yellow */
  color: #111;
  padding: 0 2px;
  border-radius: 2px;
}
```

---

## Key decisions

| Decision | Rationale |
|---|---|
| Phrase filtering, token highlighting | Phrase match keeps results precise; token highlight shows *why* each word matched |
| CSS Modules | Scoped styles, zero runtime cost, no extra dependencies |
| `useMemo` on filtered list + highlight nodes | Avoids recomputing on unrelated renders |
| Accessible `<label>` (visually hidden) | Screen readers announce the search field without cluttering the visual UI |
| `aria-live="polite"` on count | Screen readers announce result count changes without interrupting the user |

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
