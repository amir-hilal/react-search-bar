import { useMemo, type FC } from 'react';
import type { Article } from '../../data/articles';
import { highlightText } from '../../utils/highlight-text';
import styles from './article-card.module.css';

interface ArticleCardProps {
  article: Article;
  tokens: string[];
}

const ArticleCard: FC<ArticleCardProps> = ({ article, tokens }) => {
  const titleNodes = useMemo(
    () => highlightText(article.title, tokens, styles.highlight),
    [article.title, tokens],
  );

  const excerptNodes = useMemo(
    () => highlightText(article.excerpt, tokens, styles.highlight),
    [article.excerpt, tokens],
  );

  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{titleNodes}</h2>
      <p className={styles.date}>{article.date}</p>
      <p className={styles.excerpt}>{excerptNodes}</p>
    </article>
  );
};

export default ArticleCard;
