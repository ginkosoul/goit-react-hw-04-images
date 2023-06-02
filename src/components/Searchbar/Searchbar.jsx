import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Searchbar({ onSearch, disable }) {
  const iconSize = 16;
  const [search, setSearch] = useState('');
  const onInputChange = event => {
    setSearch({ query: event.target.value });
  };

  return (
    <header className="Searchbar">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSearch(search);
        }}
        className="SearchForm"
      >
        <button type="submit" disabled={disable} className="SearchForm-button">
          <BsSearch width={iconSize} height={iconSize} />
        </button>

        <input
          onChange={onInputChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  disable: PropTypes.bool,
};
