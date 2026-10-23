function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import PropTypes from 'prop-types';
import { classes, selected, variantFixedProp, variantAutoProp, tabTestId, defaultTabIndex, iconStart, iconEnd, iconTop } from './constants';
import classNames from 'classnames';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-horizontal-tabs-ul-list {\n  display: flex;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  overflow: auto;\n}\n\n.bds-variant-auto::after {\n  content: \"\";\n  width: 100%;\n  border-bottom: 0.125rem solid var(--theme-separator);\n}\n\n.bds-horizontal-tabs-li-list {\n  display: flex;\n  justify-content: center;\n  white-space: nowrap;\n  cursor: pointer;\n  border-bottom: 0.125rem solid var(--theme-separator);\n}\n\n.bds-horizontal-tabs-li-list.bds-selected .bds-horizontal-tab-container {\n  margin-bottom: 0.875rem;\n}\n.bds-horizontal-tabs-li-list.bds-selected .bds-horizontal-tab-title {\n  color: var(--theme-text-primary);\n}\n.bds-horizontal-tabs-li-list.bds-selected {\n  border-bottom: 0.25rem solid var(--theme-text-primary);\n}\n\n.bds-variant-fixed {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.bds-horizontal-tab-container {\n  font-family: \"OpenSansRegular\";\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  align-items: center;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  margin-right: 2rem;\n  margin-left: 2rem;\n}\n\n.bds-horizontal-tab-title {\n  font-family: \"OpenSansRegular\";\n  display: flex;\n  vertical-align: middle;\n  cursor: pointer;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--theme-text-primary);\n  margin-right: 0.25rem;\n  margin-left: 0.25rem;\n}\n\n.bds-horizontal-tab-icon-box {\n  display: flex;\n  vertical-align: middle;\n  cursor: pointer;\n  align-items: center;\n  margin-right: 0.25rem;\n  margin-left: 0.25rem;\n  justify-content: center;\n  color: var(--theme-text-primary);\n}\n\n.bds-horizontal-tabs-ul-list::-webkit-scrollbar {\n  height: 0.5rem;\n}\n\n.bds-horizontal-tabs-ul-list::-webkit-scrollbar-track {\n  border-radius: 0.5rem;\n}\n\n.bds-horizontal-tabs-ul-list::-webkit-scrollbar-thumb {\n  border-radius: 0.5rem;\n  background-color: var(--theme-border);\n}\n\n.bds-horizontal-tabs-ul-list::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}\n\n/* ---------------------------------------------------------------------------\n   Dark theme ([data-theme='dark'])\n   --------------------------------------------------------------------------- */\n[data-theme=dark] .bds-variant-auto::after {\n  border-bottom-color: var(--theme-separator);\n}\n[data-theme=dark] .bds-horizontal-tabs-li-list {\n  border-bottom-color: var(--theme-separator);\n}\n[data-theme=dark] .bds-horizontal-tab-title {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-horizontal-tab-icon-box {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-horizontal-tabs-ul-list::-webkit-scrollbar-thumb {\n  background-color: var(--theme-border);\n}\n[data-theme=dark] .bds-horizontal-tabs-ul-list::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}";
  const fileName = "tabs_tabs_32a98121-7fa1-4c65-b149-61ef5df84bc2";
  const element = document.querySelector("style[data-sass-component='tabs_tabs_32a98121-7fa1-4c65-b149-61ef5df84bc2']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Tabs = _ref => {
  let {
    value,
    handleChange,
    items,
    variant
  } = _ref;
  const ulClass = {
    [classes.horizontalTabsUlList]: true,
    [classes.variantAuto]: variant === variantAutoProp
  };
  return /*#__PURE__*/_jsx("ul", {
    className: classNames(_objectSpread({}, ulClass)),
    "data-testid": tabTestId,
    children: items && items.length && items.map((element, index) => {
      const selectedTab = index === value ? selected : null;
      return /*#__PURE__*/_jsx(Tab, {
        index: index,
        selectedTab: selectedTab,
        title: element.title,
        icon: element.icon,
        iconPosition: element.iconPosition,
        handleChange: handleChange,
        variant: variant
      }, "tab-item-".concat(index));
    })
  });
};
const Tab = _ref2 => {
  let {
    title,
    selectedTab,
    handleChange,
    index,
    icon,
    iconPosition,
    variant
  } = _ref2;
  const listClass = {
    [classes.horizontalTabsLiList]: true,
    [classes.selected]: selectedTab,
    [classes.variantFixed]: variant === variantFixedProp
  };
  const getIcon = icon => {
    return /*#__PURE__*/_jsx("div", {
      className: classes.horizontalTabIconBox,
      children: icon
    });
  };
  return /*#__PURE__*/_jsx("li", {
    className: classNames(_objectSpread({}, listClass)),
    tabIndex: defaultTabIndex,
    onClick: () => handleChange(index),
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.horizontalTabContainer,
      children: [iconStart === iconPosition && icon && getIcon(icon), /*#__PURE__*/_jsxs("div", {
        children: [iconTop === iconPosition && icon && getIcon(icon), title && /*#__PURE__*/_jsx("div", {
          className: classes.horizontalTabTitle,
          children: title
        })]
      }), iconEnd === iconPosition && icon && getIcon(icon)]
    })
  }, "list-item-".concat(index));
};
Tabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  variant: PropTypes.string
};
export default Tabs;