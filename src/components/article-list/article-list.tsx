import { type FC } from 'react';
import type { Article } from '../../data/articles';
import ArticleCard from '../article-card/article-card';
import styles from './article-list.module.css';

interface ArticleListProps {
  articles: Article[];
  tokens: string[];
  query: string;
}

const ArticleList: FC<ArticleListProps> = ({ articles, tokens, query }) => {
  if (articles.length === 0) {
    return (
      <p className={styles.empty}>
        {query.trim()
          ? `No posts matching "${query.trim()}". Try a different keyword.`
          : 'No posts available.'}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} tokens={tokens} />
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
