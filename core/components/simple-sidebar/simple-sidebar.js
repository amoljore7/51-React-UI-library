function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import { classes } from './constants';
import classNames from 'classnames';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.simple-sidebar-container {\n  font-family: \"OpenSansRegular\";\n  border-right: 0.125rem solid var(--theme-border);\n  position: relative;\n  width: 0.5rem;\n}\n.simple-sidebar-container .sidebar-toggle-arrow {\n  position: absolute;\n  right: -2rem;\n  top: 1rem;\n  cursor: pointer;\n  height: 1.5rem;\n  width: 1.5rem;\n  max-width: 1.5rem;\n}\n\n.simple-sidebar-container.active {\n  min-width: 20.5rem;\n}\n.simple-sidebar-container.active .sidebar-toggle-arrow {\n  right: 0.5rem;\n}\n\n[data-theme=dark] .simple-sidebar-container {\n  border-right-color: var(--theme-border);\n  background-color: transparent;\n}\n[data-theme=dark] .simple-sidebar-container .sidebar-toggle-arrow {\n  color: var(--theme-text-primary);\n}";
  const fileName = "sidebar_simple-sidebar_36cba942-e313-45e2-bd10-c65a39d558ad";
  const element = document.querySelector("style[data-sass-component='sidebar_simple-sidebar_36cba942-e313-45e2-bd10-c65a39d558ad']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const SimpleSidebar = _ref => {
  let {
    isOpen,
    onToggle,
    children,
    width,
    height
  } = _ref;
  const drawerClass = {
    [classes.container]: true,
    [classes.containerActive]: isOpen
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(_objectSpread({}, drawerClass)),
    style: _objectSpread({
      height
    }, isOpen ? {
      width
    } : {}),
    children: [isOpen ? /*#__PURE__*/_jsx(ChevronLeft, {
      "data-testid": "toggle",
      className: classes.arrow,
      onClick: onToggle,
      "aria-hidden": true,
      focusable: "false"
    }) : /*#__PURE__*/_jsx(ChevronRight, {
      "data-testid": "toggle",
      className: classes.arrow,
      onClick: onToggle,
      "aria-hidden": true,
      focusable: "false"
    }), isOpen && children]
  });
};
export default SimpleSidebar;