function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultLength, listRole, tabIndex, keyPrefix, classes, target } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root,\n[data-theme=light] {\n  --bds-breadcrumb-link: var(--brand);\n  --bds-breadcrumb-current: var(--theme-text-primary);\n}\n\n[data-theme=dark] {\n  --bds-breadcrumb-link: var(--theme-text-primary);\n  --bds-breadcrumb-current: var(--theme-text-primary);\n}\n\n.bds-breadcrumb-container {\n  list-style-type: none;\n  text-align: left;\n  margin: 0;\n  padding: 0;\n}\n\n.bds-breadcrumb-item {\n  display: inline-block;\n  font-size: 0.875rem;\n  font-family: \"OpenSansRegular\";\n  letter-spacing: 0.028125rem;\n  font-weight: 400;\n  cursor: pointer;\n}\n\n.bds-breadcrumb-item,\n.bds-breadcrumb-item a,\n.bds-breadcrumb-item a:visited,\n.bds-breadcrumb-item a:focus,\n.bds-breadcrumb-item a:hover {\n  text-decoration: none;\n  color: var(--bds-breadcrumb-link);\n}\n\n.bds-breadcrumb-item a:hover,\n.bds-breadcrumb-item span:hover {\n  text-decoration: underline;\n}\n\n.bds-breadcrumb-item-separator,\n.bds-breadcrumb-item-last a,\n.bds-breadcrumb-item-last a:visited,\n.bds-breadcrumb-item-last a:focus,\n.bds-breadcrumb-item-last a:hover {\n  text-decoration: none;\n  color: var(--theme-text-secondary);\n}\n\n.bds-breadcrumb-item-separator {\n  margin: 0 1rem;\n}\n\n.bds-breadcrumb-item span:nth-child(2):hover {\n  text-decoration: none;\n}\n\n.bds-breadcrumb-overflow-item {\n  color: var(--bds-breadcrumb-link);\n}";
  const fileName = "breadcrumb_breadcrumb_f1f3c35c-80e9-4b97-86be-742fa795633f";
  const element = document.querySelector("style[data-sass-component='breadcrumb_breadcrumb_f1f3c35c-80e9-4b97-86be-742fa795633f']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const renderBreadcrumbCompressed = _ref => {
  let {
    history,
    routeToNameList,
    expansionHandlder
  } = _ref;
  const firstItem = routeToNameList[0];
  const lastItem = routeToNameList[routeToNameList.length - 1];
  return /*#__PURE__*/_jsxs("ul", {
    role: listRole,
    className: classes.container,
    children: [/*#__PURE__*/_jsx(BreadcrumbItem, {
      route: firstItem.route,
      name: firstItem.name,
      href: firstItem.href,
      history: history
    }, "".concat(keyPrefix, "0")), /*#__PURE__*/_jsx(BreadcrumbItem, {
      overflowItem: true,
      expansionHandlder: expansionHandlder
    }, "".concat(keyPrefix, "1")), /*#__PURE__*/_jsx(BreadcrumbItem, {
      route: lastItem.route,
      name: lastItem.name,
      href: lastItem.href,
      isLastItem: true,
      history: history
    }, "".concat(keyPrefix, "2"))]
  });
};
const renderBreadcrumbExpander = _ref2 => {
  let {
    history,
    routeToNameList
  } = _ref2;
  return /*#__PURE__*/_jsx("ul", {
    role: listRole,
    className: classes.container,
    children: routeToNameList && routeToNameList.map((element, index) => {
      const {
        route,
        name,
        href
      } = element;
      const isLastItem = index === routeToNameList.length - 1;
      const allProps = {
        route,
        name,
        isLastItem,
        href,
        history
      };
      return /*#__PURE__*/_jsx(BreadcrumbItem, _objectSpread({}, allProps), "".concat(keyPrefix).concat(index));
    })
  });
};
const Breadcrumb = _ref3 => {
  let {
    routeToNameList,
    history
  } = _ref3;
  const [isCompressed, setIsCompressed] = useState(routeToNameList.length > defaultLength);
  const expansionHandlder = () => {
    setIsCompressed(false);
  };
  return isCompressed ? renderBreadcrumbCompressed({
    routeToNameList,
    expansionHandlder,
    history
  }) : renderBreadcrumbExpander({
    routeToNameList,
    history
  });
};
const BreadcrumbItem = _ref4 => {
  let {
    history,
    href,
    route,
    name,
    isLastItem,
    expansionHandlder,
    overflowItem
  } = _ref4;
  const breadcrumbItemClasses = {
    [classes.item]: true,
    [classes.lastItem]: isLastItem
  };
  const clickHandler = event => {
    !href && event.preventDefault();
    !href && history && route && history.push(route);
  };
  return !overflowItem ? /*#__PURE__*/_jsxs("li", {
    className: classNames(breadcrumbItemClasses),
    tabIndex: tabIndex,
    children: [/*#__PURE__*/_jsx("a", {
      href: href,
      onClick: clickHandler,
      target: target,
      children: name
    }), !isLastItem && /*#__PURE__*/_jsx("span", {
      className: classes.separator,
      children: "/"
    })]
  }) : /*#__PURE__*/_jsxs("li", {
    className: classNames(breadcrumbItemClasses),
    onClick: () => expansionHandlder(),
    tabIndex: tabIndex,
    children: [/*#__PURE__*/_jsx("span", {
      children: "..."
    }), /*#__PURE__*/_jsx("span", {
      className: classes.separator,
      children: "/"
    })]
  });
};
Breadcrumb.propTypes = {
  routeToNameList: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired)
};
export default Breadcrumb;