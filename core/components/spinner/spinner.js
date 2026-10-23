function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { spinnerSize, classes } from './constants';
import Typography from '../typography';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-loader-overlay {\n  position: fixed;\n  z-index: 6000;\n  top: 0;\n  left: 0;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--theme-content-bg);\n  opacity: 0.8;\n}\n\n.bds-loader-overlay-on-container {\n  position: absolute;\n}\n\n.bds-loader-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  width: fit-content;\n}\n.bds-loader-container p {\n  margin-top: 0.5rem;\n}\n\n.bds-loader {\n  border: 0.3125rem solid var(--theme-border-subtle);\n  border-radius: 50%;\n  border-top: 0.3125rem solid var(--brand);\n  -webkit-animation: spin 1s linear infinite; /* Safari */\n  animation: spin 1s linear infinite;\n}\n\n.bds-loader-small {\n  width: 0.625rem;\n  height: 0.625rem;\n  border-width: 0.1875rem;\n  border-top-width: 0.1875rem;\n}\n\n.bds-loader-medium {\n  width: 2.875rem;\n  height: 2.875rem;\n}\n\n.bds-loader-large {\n  width: 7.875rem;\n  height: 7.875rem;\n}\n\n/* Safari */\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n[data-theme=dark] .bds-loader-overlay {\n  background-color: rgba(4, 5, 32, 0.92);\n}\n[data-theme=dark] .bds-loader {\n  border-color: var(--theme-border-subtle);\n  border-top-color: var(--brand);\n}\n[data-theme=dark] .bds-loader-container {\n  color: var(--theme-text-primary);\n}";
  const fileName = "spinner_spinner_69da5301-357d-4dc5-9f9f-2d6894897028";
  const element = document.querySelector("style[data-sass-component='spinner_spinner_69da5301-357d-4dc5-9f9f-2d6894897028']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Loader = _ref => {
  let {
    size,
    message
  } = _ref;
  const loaderClasses = {
    [classes.loader]: true,
    [classes.smallLoader]: size === spinnerSize.small,
    [classes.mediumLoader]: size === spinnerSize.medium,
    [classes.largeLoader]: size === spinnerSize.large
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.loaderContainer,
    children: [/*#__PURE__*/_jsx("div", {
      "data-testid": classes.loader,
      className: classNames(loaderClasses)
    }), message && /*#__PURE__*/_jsx(Typography, {
      variant: "body",
      children: message
    })]
  });
};
const LoaderWithOverlay = _ref2 => {
  let {
    size,
    message,
    overlayOnContainer
  } = _ref2;
  const overlayClasses = {
    [classes.loaderOverlay]: true,
    [classes.loaderOverlayOnContainer]: overlayOnContainer
  };
  return /*#__PURE__*/_jsx("div", {
    "data-testid": classes.loaderOverlay,
    className: classNames(_objectSpread({}, overlayClasses)),
    children: /*#__PURE__*/_jsx(Loader, {
      size: size,
      message: message
    })
  });
};
const Spinner = _ref3 => {
  let {
    size = spinnerSize.large,
    overlay,
    message,
    overlayOnContainer
  } = _ref3;
  return !overlay && !overlayOnContainer ? /*#__PURE__*/_jsx(Loader, {
    size: size,
    message: message
  }) : /*#__PURE__*/_jsx(LoaderWithOverlay, {
    size: size,
    message: message,
    overlayOnContainer: overlayOnContainer
  });
};
Spinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf([spinnerSize.small, spinnerSize.medium, spinnerSize.large]),
  overlay: PropTypes.bool,
  overlayOnContainer: PropTypes.bool
};
export default Spinner;