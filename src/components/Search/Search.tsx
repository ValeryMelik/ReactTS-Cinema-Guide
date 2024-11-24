import './Search.scss';
import Icon from '../Icon/';
import Dropdown from '../Dropdown/';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

const Search: FC<SearchProps> = ({ placeholder = 'Поиск', className }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisappearing, setIsDisappearing] = useState<boolean>(false);

  const searchedMovie = searchParam.get('searchedMovie') || '';

  useEffect(() => {
    if (searchedMovie) {
      setIsVisible(true);
    }
  }, [searchedMovie]);

  useEffect(() => {
    if (isDisappearing) {
      const timer = setTimeout(() => {
        setIsDisappearing(false);
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDisappearing]);

  const handlesearchedMovie = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setSearchParam({ searchedMovie: value.toLowerCase() });
    setIsVisible(value.length > 0);
    setIsDisappearing(value.length === 0);
  };

  const iconClassName = `search__icon ${
    searchedMovie ? 'search__icon_active' : ''
  }`;

  const handleClearInput = (): void => {
    setSearchParam({ searchedMovie: '' });
    setIsDisappearing(true);
  };

  const clearButtonClassName = `search__clear ${
    isDisappearing ? 'search__clear_hidden' : 'search__clear_visible'
  }`;

  return (
    <div className={`search ${className ?? ''}`}>
      {searchedMovie && <Dropdown searchedMovie={searchedMovie} />}
      <Icon name='search' className={iconClassName} />
      <input
        type='text'
        value={searchedMovie}
        onChange={handlesearchedMovie}
        className='margin-reset search__input'
        placeholder={placeholder}
      />
      {(isVisible || isDisappearing) && (
        <button
          type='button'
          className={clearButtonClassName}
          onClick={handleClearInput}
        >
          <Icon name='closesmall' className='search__closesmall' />
        </button>
      )}
    </div>
  );
};

export default Search;
