import { type FC } from 'react';
import styles from './aside-card.module.css';

const AsideCard: FC = () => {
  return (
    <aside className={styles.card}>
      <h3 className={styles.name}>Alex Rivera</h3>
      <p className={styles.role}>Front-End Engineer</p>
      <p className={styles.bio}>
        Writing about CSS, React, and the modern web platform. Passionate about
        accessible, performant UIs.
      </p>

      <hr className={styles.divider} />

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Posts</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>4.2k</span>
          <span className={styles.statLabel}>Readers</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>2025</span>
          <span className={styles.statLabel}>Since</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Topics</span>
        </div>
      </div>

      <div className={styles.tags}>
        {['CSS', 'React', 'TypeScript', 'Vite', 'A11y', 'Grid'].map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default AsideCard;
