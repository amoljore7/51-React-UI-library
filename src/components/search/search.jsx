import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  classes,
  inputType,
  inputPlaceholder,
  searchRole,
  searchInputRole,
} from './constants';
import SearchIcon from '../../assets/icons/search.svg?react';
import CloseXIcon from '../../assets/icons/close-x.svg?react';

import './search.scss';

const SearchInput = ({
  value,
  onChange,
  disabled = false,
  width,
  height,
  placeholder = inputPlaceholder,
}) => {
  const searchMainClass = {
    [classes.searchContainer]: true,
    [classes.searchContainerDisabled]: disabled,
  };
  const searchBoxClass = {
    [classes.searchBox]: true,
    [classes.searchBoxDisabled]: disabled,
  };
  const searchIconClass = {
    [classes.searchIconBox]: true,
    [classes.searchIcon]: true,
    [classes.searchIconDisabled]: disabled,
  };
  const clearIconClass = {
    [classes.clearIcon]: true,
    [classes.clearIconDisabled]: disabled,
  };

  const inputRef = useRef(null);

  const handleOnClear = (e) => {
    e.preventDefault();
    if (disabled) return;
    const syntheticEvent = { target: { value: '' } };
    onChange(syntheticEvent);
    inputRef.current?.focus();
  };

  return (
    <div className={classes.container}>
      <div
        role={searchRole}
        className={classNames(searchMainClass)}
        style={{ width: width ? `${width}` : undefined, height: height ? `${height}` : undefined, }}
      >
        <div className={classNames(searchIconClass)} aria-hidden>
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          className={classNames(searchBoxClass)}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          role={searchInputRole}
          aria-label={placeholder}
        />
        {value !== '' && (
          <button
            type="button"
            className={classNames(clearIconClass)}
            onClick={handleOnClear}
            disabled={disabled}
            aria-label="Clear search"
          >
            <CloseXIcon />
          </button>
        )}
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchInput;
