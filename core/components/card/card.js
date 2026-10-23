function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.card-container {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  width: 8.125rem;\n  height: 8.125rem;\n  box-shadow: 0px 0px 0.3125rem rgba(5, 97, 167, 0.5019607843);\n  opacity: 1;\n  border-radius: 0.1875rem;\n  cursor: pointer;\n}\n.card-container:hover {\n  box-shadow: 0px 0px 0.625rem #004496;\n  opacity: 1;\n}\n\n.card-img-container {\n  width: 2.5rem;\n  height: 2.5rem;\n  margin: 1rem 2.8125rem 0.625rem;\n}\n\n.img-style {\n  width: 100%;\n  height: 100%;\n}\n\n.card-title-style {\n  width: 7.125rem;\n  margin: 0 0.5rem;\n  text-align: center;\n  color: var(--theme-text-primary);\n  letter-spacing: 0.02rem;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.75rem;\n}\n\n.container-disabled {\n  cursor: default;\n  box-shadow: 0px 0px 0.1875rem #c6c6c6;\n}\n.container-disabled:hover {\n  box-shadow: 0px 0px 0.1875rem #c6c6c6;\n}\n.container-disabled .card-title-style {\n  color: #c6c6c6;\n}\n\n[data-theme=dark] .card-container {\n  background-color: var(--theme-content-bg);\n  box-shadow: 0px 0px 0.3125rem rgba(255, 255, 255, 0.12);\n}\n[data-theme=dark] .card-container:hover {\n  box-shadow: 0px 0px 0.625rem rgba(255, 255, 255, 0.2);\n}\n[data-theme=dark] .card-title-style {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .container-disabled {\n  box-shadow: 0px 0px 0.1875rem rgba(255, 255, 255, 0.08);\n}\n[data-theme=dark] .container-disabled:hover {\n  box-shadow: 0px 0px 0.1875rem rgba(255, 255, 255, 0.08);\n}\n[data-theme=dark] .container-disabled .card-title-style {\n  color: #9b9ba6;\n}\n[data-theme=dark] .img-style {\n  color: #cdcdd2;\n}";
  const fileName = "card_card_03742618-1cf5-4563-8384-6fe9290d3c6c";
  const element = document.querySelector("style[data-sass-component='card_card_03742618-1cf5-4563-8384-6fe9290d3c6c']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import { classes, defaultTabIndex, imageRole } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Card = _ref => {
  let {
    title,
    image,
    clickHandler,
    disabled = false
  } = _ref;
  const cardClass = {
    [classes.container]: true,
    [classes.containerDisabled]: disabled
  };
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "card",
    className: classNames(_objectSpread({}, cardClass)),
    onClick: disabled ? null : clickHandler,
    tabIndex: defaultTabIndex,
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.imgContainer,
      children: typeof image === 'function' ? (/*#__PURE__*/React.createElement(image, {
        tabIndex: defaultTabIndex,
        role: imageRole,
        className: classes.imgStyle,
        'aria-label': title
      })) : /*#__PURE__*/_jsx("img", {
        tabIndex: defaultTabIndex,
        role: imageRole,
        className: classes.imgStyle,
        src: image,
        alt: title,
        "aria-label": title
      })
    }), /*#__PURE__*/_jsx("div", {
      className: classes.titleStyle,
      children: title
    })]
  });
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
  clickHandler: PropTypes.func.isRequired
};
export default Card;