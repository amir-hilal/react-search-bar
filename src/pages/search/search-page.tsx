import { useMemo, useState, type FC } from 'react';
import ArticleList from '../../components/article-list/article-list';
import AsideCard from '../../components/aside-card/aside-card';
import SearchInput from '../../components/search-input/search-input';
import { articles } from '../../data/articles';
import { useDebouncedValue } from '../../hooks/use-debounced-value';
import { tokenizeQuery } from '../../utils/string-utils';
import styles from './search-page.module.css';

const DEBOUNCE_MS = 250;

const SearchPage: FC = () => {
  // Immediate state — drives the controlled input
  const [query, setQuery] = useState('');

  // Debounced value — drives filtering + highlighting
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);

  // Tokenise the debounced query for highlight matching
  const tokens: string[] = useMemo(
    () => tokenizeQuery(debouncedQuery),
    [debouncedQuery],
  );

  // Filter articles: phrase match (case-insensitive) in title OR excerpt
  const filteredArticles = useMemo(() => {
    const phrase = debouncedQuery.trim().toLowerCase();
    if (!phrase) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(phrase) ||
        a.excerpt.toLowerCase().includes(phrase),
    );
  }, [debouncedQuery]);

  const postCount = filteredArticles.length;
  const countLabel =
    postCount === 1 ? '1 post was found.' : `${postCount} posts were found.`;

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* ── Left column ── */}
        <main className={styles.main}>
          <h1 className={styles.heading}>Search</h1>

          <div className={styles.inputWrapper}>
            <SearchInput value={query} onChange={setQuery} />
          </div>

          <p className={styles.count} aria-live="polite" aria-atomic="true">
            {countLabel}
          </p>

          <div className={styles.results}>
            <ArticleList
              articles={filteredArticles}
              tokens={tokens}
              query={debouncedQuery}
            />
          </div>
        </main>

        {/* ── Right column ── */}
        <AsideCard />
      </div>
    </div>
  );
};

export default SearchPage;
