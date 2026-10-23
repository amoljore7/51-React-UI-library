function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { classes, listRole } from './constants';
import classNames from 'classnames';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.drawer {\n  font-family: \"OpenSansRegular\";\n  background-color: var(--theme-content-bg);\n  width: 19rem;\n  border-right: 0.125rem solid var(--theme-border);\n  position: relative;\n  top: 0;\n  left: -100%;\n  transition: 850ms;\n  z-index: 9999;\n}\n\n.drawer.active {\n  left: 0;\n  transition: 350ms;\n}\n\n.drawer-items {\n  width: 100%;\n  height: calc(100vh - 4.375rem);\n  overflow-y: hidden;\n}\n\n.drawer-items:hover {\n  overflow-y: auto;\n}\n\n.nav-list {\n  display: flex;\n  justify-content: start;\n  align-items: center;\n  list-style: none;\n  font-size: 0.875rem;\n  height: 1.5rem;\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n  color: var(--theme-text-primary);\n}\n\n.nav-list:hover {\n  background-color: #e0e0e0;\n  cursor: pointer;\n}\n\n.nav-list-focus {\n  display: flex;\n  justify-content: start;\n  align-items: center;\n  list-style: none;\n  font-size: 0.875rem;\n  height: 1.5rem;\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n  background-color: #0561a7;\n  cursor: pointer;\n  color: #ffffff;\n}\n\n.group-header {\n  text-decoration: none;\n  color: var(--theme-text-primary);\n  font-size: 0.875rem;\n  display: flex;\n  align-items: center;\n  padding-left: 2rem;\n  height: 3rem;\n}\n\n.menu-title {\n  text-decoration: none;\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n  color: var(--theme-text-primary);\n  font-size: 1.25rem;\n  display: flex;\n  align-items: center;\n  padding-left: 2rem;\n  border-bottom: 0.1875rem solid var(--theme-border);\n}\n\n.nav-list-items {\n  display: flex;\n  padding-left: 2rem;\n}\n\n.nav-icon {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.drawer-items::-webkit-scrollbar-track {\n  border-radius: 0.3125rem;\n}\n\n.drawer-items::-webkit-scrollbar {\n  width: 0.625rem;\n}\n\n.drawer-items::-webkit-scrollbar-thumb {\n  border-radius: 0.3125rem;\n  background-color: var(--theme-border);\n}\n\n[data-theme=dark] .drawer {\n  background-color: var(--theme-content-bg);\n  border-right-color: var(--theme-border);\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .drawer-items::-webkit-scrollbar-thumb {\n  background-color: var(--theme-border);\n}\n[data-theme=dark] .nav-icon {\n  color: var(--theme-text-primary);\n}";
  const fileName = "sidebar_sidebar_148873ed-facc-4373-865c-b56fd315a868";
  const element = document.querySelector("style[data-sass-component='sidebar_sidebar_148873ed-facc-4373-865c-b56fd315a868']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Sidebar = _ref => {
  let {
    sidebarData,
    open,
    menuTitle,
    history,
    onClose
  } = _ref;
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(-1);
  const drawerClass = {
    [classes.drawer]: true,
    [classes.drawerActive]: open
  };
  const clickHandler = (route, itemIndex, groupIndex) => {
    history && route && history.push(route);
    setCurrentGroupIndex(groupIndex);
    setCurrentItemIndex(itemIndex);
  };
  return /*#__PURE__*/_jsxs("nav", {
    className: classNames(_objectSpread({}, drawerClass)),
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.menuTitle,
      children: /*#__PURE__*/_jsx("span", {
        children: menuTitle
      })
    }), /*#__PURE__*/_jsx("ul", {
      role: listRole,
      className: classes.drawerItems,
      children: sidebarData && sidebarData.map((element, groupIndex) => {
        const menuGroupProps = {
          element,
          groupIndex,
          currentGroupIndex,
          currentItemIndex,
          clickHandler,
          onClose,
          key: "menu-group-".concat(groupIndex)
        };
        return /*#__PURE__*/_jsx(MenuGroup, _objectSpread({}, menuGroupProps));
      })
    })]
  });
};
const MenuGroup = _ref2 => {
  let {
    element,
    groupIndex,
    currentItemIndex,
    currentGroupIndex,
    clickHandler,
    onClose
  } = _ref2;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.groupHeader,
      children: element.GroupHeader
    }, "".concat(groupIndex, "-")), element.items && element.items.map((item, itemIndex) => {
      const wasClicked = currentItemIndex === itemIndex && currentGroupIndex === groupIndex;
      return /*#__PURE__*/_jsx(MenuItem, {
        groupIndex: groupIndex,
        itemIndex: itemIndex,
        wasClicked: wasClicked,
        route: item.route,
        icon: item.icon,
        title: item.title,
        clickHandler: clickHandler,
        onClose: onClose
      }, "group-menu-item-".concat(itemIndex, "-").concat(groupIndex));
    })]
  });
};
const MenuItem = _ref3 => {
  let {
    route,
    title,
    icon,
    clickHandler,
    onClose,
    itemIndex,
    wasClicked,
    groupIndex
  } = _ref3;
  const navListClass = {
    [classes.navList]: !wasClicked,
    [classes.navListFocus]: wasClicked
  };
  return /*#__PURE__*/_jsx("li", {
    className: classNames(_objectSpread({}, navListClass)),
    onClick: event => {
      event.preventDefault();
      clickHandler(route, itemIndex, groupIndex);
      onClose && onClose();
    },
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.navListItems,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.navIcon,
        children: icon
      }), /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx("span", {
          children: title
        })
      })]
    })
  });
};
Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  sidebarData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func
};
export default Sidebar;