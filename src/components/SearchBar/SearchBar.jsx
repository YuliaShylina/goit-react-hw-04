import css from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ handleSearch }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();
    handleSearch(query);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.searchContainer}>
          <div className={css.inputWrapper}>
            <button className={css.iconButton} type="submit">
              <FaSearch className={css.icon} />
            </button>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              name="search"
              autoFocus
              placeholder="Search images and photos"
            />
          </div>
          <button className={css.button} type="submit">
            Search
          </button>
        </div>
      </form>
    </header>
  );
}
