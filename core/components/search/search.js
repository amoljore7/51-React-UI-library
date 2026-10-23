import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, inputType, inputPlaceholder, searchRole, searchInputRole } from './constants';
import SearchIcon from '../../assets/icons/search.svg?react';
import CloseXIcon from '../../assets/icons/close-x.svg?react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma design tokens (Search component) */\n/* Dimensions from Figma */\n/* clears the 'X' from Internet Explorer */\ninput[type=search]::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\ninput[type=search]::-ms-reveal {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n/* clears the 'X' from Chrome */\ninput[type=search]::-webkit-search-decoration,\ninput[type=search]::-webkit-search-cancel-button,\ninput[type=search]::-webkit-search-results-button,\ninput[type=search]::-webkit-search-results-decoration {\n  display: none;\n}\n\n.container {\n  font-family: \"OpenSansRegular\";\n}\n\n/* Use constant border width and padding so hover/focus only change color (no layout shift) */\n.search-container {\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4375rem 0.6875rem;\n  border-radius: 0.5rem;\n  border: 0.125rem solid rgba(4, 5, 32, 0.4);\n  height: 2.5rem;\n  background: var(--theme-content-bg);\n  transition: border-color 0.15s ease;\n}\n\n.search-container:hover:not(.search-container-disabled):not(:focus-within) {\n  border-color: rgba(4, 5, 32, 0.4);\n}\n\n.search-container:focus-within {\n  border-color: #181143;\n}\n\n.search-container-disabled {\n  border: 0.125rem solid var(--theme-border);\n  background: #f4f4f4;\n}\n\n.search-container > input {\n  padding: 0;\n}\n\n.search-box {\n  font-family: \"OpenSansRegular\";\n  flex: 1 1 0;\n  min-width: 0;\n  font-size: 1rem;\n  line-height: 1.25rem;\n  height: 1.25rem;\n  background: transparent;\n  color: var(--theme-text-primary);\n  outline: none;\n  border: none;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n}\n\n.search-box::placeholder {\n  color: var(--theme-text-placeholder);\n  opacity: 1;\n}\n\n.search-container:focus-within .search-box::placeholder {\n  color: var(--theme-text-placeholder);\n}\n\n.search-box-disabled {\n  color: #c6c6c6;\n}\n\n.search-box-disabled::placeholder {\n  color: #c6c6c6;\n}\n\n.search-icon-box {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.search-icon-box svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.search-icon {\n  color: var(--theme-text-secondary);\n}\n\n.search-icon-disabled {\n  color: #c6c6c6;\n}\n\n.clear-icon {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  color: var(--theme-border-strong);\n  cursor: pointer;\n  border: none;\n  background: transparent;\n  padding: 0;\n}\n.clear-icon svg {\n  width: 0.75rem;\n  height: 0.75rem;\n  display: block;\n}\n\n.clear-icon:hover:not(.clear-icon-disabled) {\n  color: var(--theme-text-primary);\n}\n\n.clear-icon-disabled {\n  color: #c6c6c6;\n  cursor: default;\n}\n\n/* ---------------------------------------------------------------------------\n   Dark theme ([data-theme='dark'])\n   --------------------------------------------------------------------------- */\n[data-theme=dark] .container .search-container {\n  border-color: var(--theme-border);\n  background: var(--theme-content-bg);\n}\n[data-theme=dark] .container .search-container:hover:not(.search-container-disabled):not(:focus-within) {\n  border-color: var(--theme-border-strong);\n}\n[data-theme=dark] .container .search-container:focus-within {\n  border-color: var(--theme-text-primary);\n}\n[data-theme=dark] .container .search-container-disabled {\n  border-color: var(--theme-border);\n  background: var(--theme-content-bg);\n}\n[data-theme=dark] .container .search-box {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .container .search-box::placeholder {\n  color: #686979;\n}\n[data-theme=dark] .container .search-container:focus-within .search-box::placeholder {\n  color: #9b9ba6;\n}\n[data-theme=dark] .container .search-box-disabled,\n[data-theme=dark] .container .search-box-disabled::placeholder {\n  color: #9b9ba6;\n}\n[data-theme=dark] .container .search-icon {\n  color: var(--theme-text-secondary);\n}\n[data-theme=dark] .container .search-icon-disabled {\n  color: #9b9ba6;\n}\n[data-theme=dark] .container .clear-icon {\n  color: var(--theme-border);\n}\n[data-theme=dark] .container .clear-icon:hover:not(.clear-icon-disabled) {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .container .clear-icon-disabled {\n  color: #9b9ba6;\n}";
  const fileName = "search_search_33bfffc7-e155-47b3-8e06-bc7782de23e7";
  const element = document.querySelector("style[data-sass-component='search_search_33bfffc7-e155-47b3-8e06-bc7782de23e7']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const SearchInput = _ref => {
  let {
    value,
    onChange,
    disabled = false,
    width,
    height,
    placeholder = inputPlaceholder
  } = _ref;
  const searchMainClass = {
    [classes.searchContainer]: true,
    [classes.searchContainerDisabled]: disabled
  };
  const searchBoxClass = {
    [classes.searchBox]: true,
    [classes.searchBoxDisabled]: disabled
  };
  const searchIconClass = {
    [classes.searchIconBox]: true,
    [classes.searchIcon]: true,
    [classes.searchIconDisabled]: disabled
  };
  const clearIconClass = {
    [classes.clearIcon]: true,
    [classes.clearIconDisabled]: disabled
  };
  const inputRef = useRef(null);
  const handleOnClear = e => {
    var _inputRef$current;
    e.preventDefault();
    if (disabled) return;
    const syntheticEvent = {
      target: {
        value: ''
      }
    };
    onChange(syntheticEvent);
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
  };
  return /*#__PURE__*/_jsx("div", {
    className: classes.container,
    children: /*#__PURE__*/_jsxs("div", {
      role: searchRole,
      className: classNames(searchMainClass),
      style: {
        width: width ? "".concat(width) : undefined,
        height: height ? "".concat(height) : undefined
      },
      children: [/*#__PURE__*/_jsx("div", {
        className: classNames(searchIconClass),
        "aria-hidden": true,
        children: /*#__PURE__*/_jsx(SearchIcon, {})
      }), /*#__PURE__*/_jsx("input", {
        ref: inputRef,
        className: classNames(searchBoxClass),
        type: inputType,
        value: value,
        placeholder: placeholder,
        onChange: onChange,
        disabled: disabled,
        role: searchInputRole,
        "aria-label": placeholder
      }), value !== '' && /*#__PURE__*/_jsx("button", {
        type: "button",
        className: classNames(clearIconClass),
        onClick: handleOnClear,
        disabled: disabled,
        "aria-label": "Clear search",
        children: /*#__PURE__*/_jsx(CloseXIcon, {})
      })]
    })
  });
};
SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
};
export default SearchInput;