import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  classes,
  inputType,
  inputPlaceholder,
  searchIconSize,
  clearIconSize,
  searchRole,
  searchInputRole,
} from './constants';
import { FiX } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';

import './search.scss';

const SearchInput = ({
  value,
  onChange,
  disabled = false,
  width,
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
    [classes.searchIconBox]: true,
    [classes.clearIcon]: true,
    [classes.clearIconDisabled]: disabled,
  };

  const searchRef = useRef();

  const getSearchIcon = () => {
    return (
      <div className={classNames({ ...searchIconClass })}>
        <GoSearch size={searchIconSize} />
      </div>
    );
  };

  const getInputField = () => {
    return (
      <input
        ref={searchRef}
        className={classNames({ ...searchBoxClass })}
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        role={searchInputRole}
      />
    );
  };

  const handleOnClear = () => {
    searchRef.current.value = null;
    const e = new Event('change', { bubbles: true });
    searchRef.current.dispatchEvent(e);
  };

  const getClearIcon = () => {
    return (
      <div
        className={classNames({ ...clearIconClass })}
        style={{
          cursor: disabled ? 'default' : 'pointer',
        }}
        onClick={!disabled ? handleOnClear : null}
      >
        <FiX size={clearIconSize} />
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div
        role={searchRole}
        className={classNames({ ...searchMainClass })}
        style={{ width: `${width}` }}
      >
        {getSearchIcon()}
        {getInputField()}
        {value !== '' && getClearIcon()}
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchInput;
