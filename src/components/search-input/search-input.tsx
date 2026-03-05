import { useRef, type FC } from 'react';
import styles from './search-input.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="search-field" className={styles.label}>
        Search articles
      </label>
      <input
        ref={inputRef}
        id="search-field"
        type="search"
        className={styles.input}
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search input"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
