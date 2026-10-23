function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, defaultPillIconSize } from './constants';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-pill-bg: var(--theme-content-bg);\n  --bds-pill-hover-bg: var(--theme-hover-bg);\n  --bds-pill-text: var(--theme-text-primary);\n  --bds-pill-label: var(--theme-text-primary);\n  --bds-pill-label-disabled: var(--theme-text-placeholder);\n  --bds-pill-label-readonly: var(--theme-text-secondary);\n  --bds-pill-icon: var(--theme-text-secondary);\n  --bds-pill-icon-hover: #0561a7;\n  --bds-pill-icon-disabled: var(--theme-text-placeholder);\n  --bds-pill-error-border: #da1e28;\n}\n\n[data-theme=light] {\n  --bds-pill-bg: transparent;\n  --bds-pill-hover-bg: #e0e0e0;\n  --bds-pill-text: inherit;\n  --bds-pill-label: var(--theme-text-primary);\n  --bds-pill-label-disabled: #c6c6c6;\n  --bds-pill-label-readonly: #525252;\n  --bds-pill-icon: #6f6f6f;\n  --bds-pill-icon-hover: #0561a7;\n  --bds-pill-icon-disabled: #c6c6c6;\n  --bds-pill-error-border: #da1e28;\n}\n\n[data-theme=dark] {\n  --bds-pill-bg: var(--theme-content-bg);\n  --bds-pill-hover-bg: #686979;\n  --bds-pill-text: var(--theme-text-primary);\n  --bds-pill-label: var(--theme-text-primary);\n  --bds-pill-label-disabled: #686979;\n  --bds-pill-label-readonly: #9b9ba6;\n  --bds-pill-icon: #9b9ba6;\n  --bds-pill-icon-hover: #1a94ff;\n  --bds-pill-icon-disabled: #686979;\n  --bds-pill-error-border: #da1e28;\n}\n\n.bds-pill-container {\n  width: fit-content;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  border-radius: 1rem;\n  border: 0.0625rem solid var(--theme-border);\n  box-sizing: border-box;\n  background-color: var(--bds-pill-bg);\n  color: var(--bds-pill-text);\n}\n.bds-pill-container:hover {\n  background: var(--bds-pill-hover-bg);\n}\n\n.bds-error-pill {\n  border: 0.125rem solid var(--bds-pill-error-border);\n}\n\n.bds-disabled-pill {\n  border: 0.0625rem solid var(--theme-border);\n}\n.bds-disabled-pill:hover {\n  background: var(--theme-content-bg);\n}\n\n.bds-read-only-pill {\n  border: 0.0625rem solid var(--theme-border);\n  justify-content: center;\n}\n.bds-read-only-pill:hover {\n  background: var(--theme-content-bg);\n}\n\n.bds-pill-label {\n  height: 1.1875rem;\n  margin: 0.3125rem 0.5rem 0.375rem 0.9375rem;\n  display: inline;\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  letter-spacing: 0.02rem;\n  color: var(--bds-pill-label);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 24rem;\n}\n\n.bds-pill-label-disabled {\n  color: var(--bds-pill-label-disabled);\n}\n\n.bds-pill-label-read-only {\n  margin-right: 0.9375rem;\n}\n\n.bds-pill-icon-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.bds-pill-dark-color,\n.bds-pill-light-color {\n  transition: filter 0.2s ease-in-out;\n}\n\n.bds-pill-dark-color:hover {\n  -webkit-filter: brightness(150%);\n  filter: brightness(150%);\n}\n\n.bds-pill-light-color:hover {\n  -webkit-filter: brightness(90%);\n  filter: brightness(90%);\n}\n\n.bds-pill-icon {\n  width: 1rem;\n  height: 1rem;\n  margin: 0.1875rem 0.4375rem 0.1875rem 0rem;\n  color: var(--bds-pill-icon);\n}\n.bds-pill-icon:hover {\n  color: var(--bds-pill-icon-hover);\n}\n\n.bds-pill-icon-disabled {\n  color: var(--bds-pill-icon-disabled);\n}\n.bds-pill-icon-disabled:hover {\n  color: var(--bds-pill-icon-disabled);\n}";
  const fileName = "pill_pill_5e4c62b0-df0b-41c3-821b-ad37d2449cde";
  const element = document.querySelector("style[data-sass-component='pill_pill_5e4c62b0-df0b-41c3-821b-ad37d2449cde']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import { FiX } from 'react-icons/fi';
import { isColorDark } from './utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Pill = _ref => {
  let {
    error = false,
    disabled = false,
    readOnly = false,
    label,
    onDelete,
    pillColor,
    noBorder = false
  } = _ref;
  const hasCustomColor = !!pillColor;
  const isDark = pillColor ? isColorDark(pillColor) : false;
  const useDarkText = pillColor ? !isDark : true;
  const customStyle = _objectSpread(_objectSpread({}, hasCustomColor ? {
    backgroundColor: pillColor,
    color: useDarkText ? '#000' : '#fff'
  } : {}), noBorder ? {
    border: 'none'
  } : {});
  const pillContainerClasses = {
    [classes.container]: true,
    [classes.errorPill]: error,
    [classes.readOnlyPill]: readOnly,
    [classes.disabledPill]: disabled,
    [classes.bgDarkColor]: hasCustomColor && isDark,
    [classes.bgLightColor]: hasCustomColor && !isDark
  };
  const pillLabelClasses = {
    [classes.label]: true,
    [classes.readOnlyPillLabel]: readOnly,
    [classes.disabledPillLabel]: disabled
  };
  const pillIconClasses = {
    [classes.icon]: true,
    [classes.disabledPillIcon]: disabled
  };
  const deleteIconClickHandler = event => {
    event.preventDefault();
    !disabled && (onDelete === null || onDelete === void 0 ? void 0 : onDelete(event));
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(pillContainerClasses),
    style: customStyle,
    children: [/*#__PURE__*/_jsx("div", {
      title: typeof label === 'string' ? label : undefined,
      className: classNames(pillLabelClasses),
      style: customStyle,
      children: label
    }), !readOnly ? /*#__PURE__*/_jsx("div", {
      "data-testid": "pill-close-icon",
      className: classes.pillIconContainer,
      onClick: deleteIconClickHandler,
      children: /*#__PURE__*/_jsx(FiX, {
        size: defaultPillIconSize,
        className: classNames(pillIconClasses),
        style: {
          color: customStyle.color
        }
      })
    }) : null]
  });
};
Pill.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onDelete: PropTypes.func,
  pillColor: PropTypes.string,
  noBorder: PropTypes.bool
};
export default Pill;