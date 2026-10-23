function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import PropTypes from 'prop-types';
import { classes, defaultTabIndex, defaultTabsWidth, defaultTopPadding, tabKeyPrefix } from './constants';
import classNames from 'classnames';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-vertical-tabs-ul-list {\n  display: flex;\n  flex-direction: column;\n  list-style: none;\n  box-sizing: border-box;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n  border-right: 0.125rem solid var(--theme-separator);\n}\n.bds-vertical-tabs-ul-list:hover {\n  overflow-y: auto;\n}\n\n.bds-vertical-li {\n  display: flex;\n  cursor: pointer;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  padding-left: 1.5rem;\n  padding-right: 1rem;\n}\n.bds-vertical-li:hover {\n  background-color: var(--theme-hover-bg);\n}\n\n.bds-selected-vertical-li {\n  padding-left: 1.375rem;\n  background-color: var(--theme-hover-bg);\n  border-left: 0.125rem solid var(--theme-text-primary);\n}\n\n.bds-vertical-li-with-icon {\n  display: flex;\n  cursor: pointer;\n}\n.bds-vertical-li-with-icon:hover {\n  background-color: var(--theme-hover-bg);\n}\n.bds-vertical-li-with-icon {\n  padding-top: 0.9375rem;\n  padding-bottom: 0.9375rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.bds-selected-vertical-li-with-icon {\n  padding-left: 0.875rem;\n  background-color: #d0e2ff;\n  border-left: 0.125rem solid var(--brand);\n}\n\n.bds-vertical-tab-container {\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.bds-vertical-tab-title {\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--theme-text-primary);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.bds-selected-vertical-tab-title {\n  color: var(--theme-text-primary);\n}\n\n.bds-vertical-tab-icon-container {\n  display: flex;\n  align-items: center;\n  padding-right: 0.5rem;\n  justify-content: center;\n  color: var(--theme-border-strong);\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar {\n  width: 0.5rem;\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar-track {\n  border-radius: 0.5rem;\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar-thumb {\n  border-radius: 0.5rem;\n  background-color: var(--theme-border);\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar-track-piece:start {\n  background: transparent;\n}\n\n.bds-vertical-tabs-ul-list::-webkit-scrollbar-track-piece:end {\n  background: transparent;\n}\n\n[data-theme=dark] .bds-vertical-tabs-ul-list {\n  border-right-color: var(--theme-separator);\n}\n[data-theme=dark] .bds-vertical-li:hover,\n[data-theme=dark] .bds-vertical-li-with-icon:hover {\n  background-color: rgba(0, 95, 178, 0.25);\n}\n[data-theme=dark] .bds-selected-vertical-li,\n[data-theme=dark] .bds-selected-vertical-li-with-icon {\n  background-color: rgba(0, 95, 178, 0.25);\n}\n[data-theme=dark] .bds-vertical-tab-title {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-selected-vertical-tab-title {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-vertical-tab-icon-container {\n  color: var(--theme-border-strong);\n}\n[data-theme=dark] .bds-vertical-tabs-ul-list::-webkit-scrollbar-thumb {\n  background-color: var(--theme-border);\n}\n[data-theme=dark] .bds-vertical-tabs-ul-list::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}";
  const fileName = "verticaltabs_verticaltabs_a2fd0302-7143-4b92-b029-3f658f693384";
  const element = document.querySelector("style[data-sass-component='verticaltabs_verticaltabs_a2fd0302-7143-4b92-b029-3f658f693384']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const VerticalTabs = _ref => {
  let {
    value,
    handleChange,
    items,
    width = defaultTabsWidth,
    topPadding = defaultTopPadding
  } = _ref;
  const tabClickHandler = index => {
    handleChange(index);
  };
  const ulClasses = {
    [classes.verticalTabsUlList]: true
  };
  return /*#__PURE__*/_jsx("ul", {
    style: {
      width: width,
      paddingTop: topPadding
    },
    className: classNames(_objectSpread({}, ulClasses)),
    tabIndex: defaultTabIndex,
    children: items && items.length && items.map((element, index) => {
      const isSelected = index === value ? true : false;
      return /*#__PURE__*/_jsx(Tab, {
        itemIndex: index,
        isSelected: isSelected,
        title: element.title,
        icon: element.icon,
        tabClickHandler: tabClickHandler
      }, "".concat(tabKeyPrefix).concat(index));
    })
  });
};
const Tab = _ref2 => {
  let {
    title,
    isSelected,
    tabClickHandler,
    itemIndex,
    icon
  } = _ref2;
  const liClasses = {
    [classes.verticalLi]: true && !Boolean(icon),
    [classes.selectedVerticalLi]: isSelected && !Boolean(icon),
    [classes.verticalLiWithIcon]: Boolean(icon),
    [classes.selectedVerticalLiWithIcon]: Boolean(icon) && isSelected
  };
  const tabTitleClasses = {
    [classes.verticalTabTitle]: true,
    [classes.selectedVerticalTabTitle]: isSelected
  };
  return /*#__PURE__*/_jsx("li", {
    tabIndex: defaultTabIndex,
    className: classNames(_objectSpread({}, liClasses)),
    onClick: () => tabClickHandler(itemIndex),
    title: title,
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.verticalTabContainer,
      children: [icon && /*#__PURE__*/_jsx("div", {
        className: classes.verticalTabIconContainer,
        children: icon
      }), title && /*#__PURE__*/_jsx("div", {
        className: classNames(_objectSpread({}, tabTitleClasses)),
        children: title
      })]
    })
  });
};
VerticalTabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  width: PropTypes.string,
  topPadding: PropTypes.string
};
export default VerticalTabs;