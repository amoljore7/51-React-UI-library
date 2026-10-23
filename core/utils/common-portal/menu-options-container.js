function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { classes, optionRole, defaultTabIndex } from "./constants";
import classNames from "classnames";
import PropTypes from "prop-types";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma x-menuFilter-option: padding 8px, gap 8px, option radius 4px; list border 8px radius */\n:root {\n  --bds-menu-options-bg: var(--theme-content-bg);\n  --bds-menu-options-border: var(--theme-border);\n  --bds-menu-option-hover-bg: var(--theme-hover-bg);\n  --bds-menu-option-selected-bg: var(--theme-hover-bg);\n  --bds-menu-option-label: var(--theme-text-primary);\n  --bds-menu-option-sublabel: var(--theme-text-secondary);\n  --bds-menu-option-label-disabled: var(--theme-text-placeholder);\n  --bds-menu-option-icon: var(--theme-text-primary);\n  --bds-menu-option-icon-disabled: var(--theme-text-placeholder);\n  --bds-menu-option-category-bg: var(--theme-hover-bg);\n  --bds-menu-option-category-text: var(--theme-text-primary);\n  --bds-menu-option-highlight-bg: #181143;\n  --bds-menu-option-highlight-text: #ffffff;\n}\n\n[data-theme=light] {\n  --bds-menu-options-bg: var(--theme-content-bg);\n  --bds-menu-options-border: #181143;\n  --bds-menu-option-hover-bg: #f2f2f4;\n  --bds-menu-option-selected-bg: rgba(24, 17, 67, 0.1);\n  --bds-menu-option-label: var(--theme-text-primary);\n  --bds-menu-option-sublabel: #686979;\n  --bds-menu-option-label-disabled: #9b9ba6;\n  --bds-menu-option-icon: #040520;\n  --bds-menu-option-icon-disabled: #9b9ba6;\n  --bds-menu-option-category-bg: #f2f2f4;\n  --bds-menu-option-category-text: #040520;\n  --bds-menu-option-highlight-bg: #181143;\n  --bds-menu-option-highlight-text: #ffffff;\n}\n\n[data-theme=dark] {\n  --bds-menu-options-bg: var(--theme-content-bg);\n  --bds-menu-options-border: #ffffff;\n  --bds-menu-option-hover-bg: #686979;\n  --bds-menu-option-selected-bg: rgba(24, 17, 67, 0.2);\n  --bds-menu-option-label: var(--theme-text-primary);\n  --bds-menu-option-sublabel: #9b9ba6;\n  --bds-menu-option-label-disabled: #686979;\n  --bds-menu-option-icon: var(--theme-text-primary);\n  --bds-menu-option-icon-disabled: #686979;\n  --bds-menu-option-category-bg: #686979;\n  --bds-menu-option-category-text: var(--theme-text-primary);\n  --bds-menu-option-highlight-bg: #ffffff;\n  --bds-menu-option-highlight-text: #040520;\n}\n\n.bds-menu-options-portal {\n  background-color: var(--bds-menu-options-bg);\n  color: var(--bds-menu-option-label);\n  border-radius: 0.5rem;\n}\n\n.category {\n  padding: 0.5rem 1rem;\n  font-family: \"OpenSansRegular\";\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: 0.013125rem;\n  color: var(--bds-menu-option-category-text);\n  background-color: var(--bds-menu-option-category-bg);\n  cursor: default;\n}\n\n.options-container {\n  max-height: 20rem;\n  border: 0.0625rem solid var(--bds-menu-options-border);\n  border-radius: 0.5rem;\n  padding: 0.25rem 0;\n  box-sizing: border-box;\n  overflow: auto;\n  background-color: var(--bds-menu-options-bg);\n}\n\n.option {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  box-sizing: border-box;\n  cursor: pointer;\n  border-radius: 0.25rem;\n  margin: 0 0.25rem;\n}\n.option:hover {\n  background-color: var(--bds-menu-option-hover-bg);\n}\n.option.grouped {\n  padding-left: 2rem;\n}\n\n.selected-option {\n  background-color: var(--bds-menu-option-selected-bg);\n}\n\n.highlight-option {\n  background-color: var(--bds-menu-option-highlight-bg);\n}\n\n.option-with-label-sublabel {\n  height: 3.5rem;\n}\n\n.option-with-label {\n  height: 2.5rem;\n}\n\n.option-icon {\n  display: flex;\n  align-items: center;\n  margin-right: 1rem;\n  flex-shrink: 0;\n  color: var(--bds-menu-option-icon);\n}\n\n.option-icon-large {\n  width: 2.5rem;\n  height: 2.5rem;\n}\n\n.option-icon-small {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.option-label {\n  display: block;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.013125rem;\n  color: var(--bds-menu-option-label);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.disabled-option {\n  cursor: not-allowed;\n}\n.disabled-option .option-icon {\n  color: var(--bds-menu-option-icon-disabled);\n}\n.disabled-option .option-sublabel {\n  color: var(--bds-menu-option-label-disabled);\n}\n.disabled-option:hover, .disabled-option.selected-option:hover {\n  background-color: transparent;\n}\n\n.disabled-option-label {\n  color: var(--bds-menu-option-label-disabled);\n}\n\n.highlight-option-label {\n  color: var(--bds-menu-option-highlight-text);\n}\n\n.option-label-with-sublabel {\n  margin-bottom: 0.25rem;\n}\n\n.option-label-alone {\n  margin-top: 0.625rem;\n  margin-bottom: 0.6875rem;\n}\n\n.option-sublabel {\n  display: flex;\n  align-items: center;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.75rem;\n  line-height: 1.0625rem;\n  letter-spacing: 0.015rem;\n  color: var(--bds-menu-option-sublabel);\n}\n\n.option-label-sublabel-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  flex: 1;\n}\n\n.separator {\n  margin: 0.25rem 0;\n}";
  const fileName = "container_menu-options-container_b239a1c0-b391-4b4f-9642-fbe92951c06b";
  const element = document.querySelector("style[data-sass-component='container_menu-options-container_b239a1c0-b391-4b4f-9642-fbe92951c06b']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import { renderSvgGraphic } from "../renderSvgGraphic";
import { mountPortalRootWithThemeSync } from "../resolve-portal-data-theme";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MenuOptions = _ref => {
  let {
    options,
    onChange,
    getOptionIcon,
    getOptionLabel,
    getOptionSublabel,
    width,
    containerDimension,
    value,
    portalContainerId,
    disablePortal = false,
    groupPropertyName,
    themeSourceRef
  } = _ref;
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(0);
  const [optionsContainerWidth, setOptionsContainerWidth] = useState(0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const [optionsEl] = useState(() => {
    const el = document.createElement("div");
    el.id = portalContainerId;
    el.className = "bds-menu-options-portal";
    el.style.zIndex = 3000;
    return el;
  });
  let bottomWidth, rightWidth, left, top;
  if (!disablePortal) {
    optionsEl.style.position = "absolute";
    optionsEl.style.top = 0;
    optionsEl.style.left = 0;
    if (containerDimension) {
      bottomWidth = "".concat(vh - containerDimension.bottom);
      rightWidth = "".concat(vw - containerDimension.left);
      left = "".concat(rightWidth) < optionsContainerWidth ? containerDimension.right - optionsContainerWidth : containerDimension.left;
      top = "".concat(bottomWidth) < optionsContainerHeight ? containerDimension.top - optionsContainerHeight : containerDimension.bottom;
    }
    optionsEl.style.transform = containerDimension && "translate3d(".concat(left + window.pageXOffset, "px,").concat(top + window.pageYOffset, "px,0)");
  }
  useEffect(() => {
    if (!disablePortal) {
      const unmountPortalRoot = mountPortalRootWithThemeSync(optionsEl, themeSourceRef);
      const optionsElHeight = optionsEl.getBoundingClientRect().height;
      const optionsElWidth = optionsEl.getBoundingClientRect().width;
      setOptionsContainerHeight(optionsElHeight);
      setOptionsContainerWidth(optionsElWidth);
      return unmountPortalRoot;
    }
  }, [optionsEl, options, disablePortal, themeSourceRef]);
  const optionsListProps = {
    options,
    getOptionLabel,
    getOptionSublabel,
    getOptionIcon,
    value,
    onChange,
    width,
    disablePortal,
    groupPropertyName
  };
  return disablePortal ? /*#__PURE__*/_jsx("div", {
    style: {
      position: "relative"
    },
    children: /*#__PURE__*/_jsx(OptionsList, _objectSpread({}, optionsListProps))
  }) : (/*#__PURE__*/createPortal(/*#__PURE__*/_jsx(OptionsList, _objectSpread({}, optionsListProps)), optionsEl));
};
const OptionsList = _ref2 => {
  let {
    options,
    getOptionLabel,
    getOptionSublabel,
    getOptionIcon,
    value,
    onChange,
    width,
    disablePortal,
    groupPropertyName
  } = _ref2;
  const isOptionSelected = item => {
    let isOptionSelected = false;
    for (let i in value) {
      if (value[i] === item) {
        isOptionSelected = true;
        break;
      }
    }
    return isOptionSelected;
  };
  const isOptionDisabled = item => {
    return Boolean(item.isDisabled);
  };
  const labelClasses = {
    [classes.optionLabel]: true,
    [classes.optionLabelWithSublabel]: Boolean(getOptionLabel) && Boolean(getOptionSublabel),
    [classes.optionLabelAlone]: Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && !Boolean(getOptionIcon)
  };
  const optionClasses = {
    [classes.option]: true,
    [classes.optionWithLabelSublabel]: Boolean(getOptionLabel) && Boolean(getOptionSublabel) && !Boolean(getOptionIcon),
    [classes.optionWithLabel]: Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && !Boolean(getOptionIcon),
    [classes.grouped]: !!groupPropertyName
  };
  const optionIconClasses = {
    [classes.optionIcon]: true,
    [classes.optionIconLarge]: Boolean(getOptionIcon) && Boolean(getOptionLabel) && Boolean(getOptionSublabel),
    [classes.optionIconSmall]: Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && Boolean(getOptionIcon)
  };
  const optionContainerClasses = {
    [classes.optionsContainer]: true
  };
  const optionsByCategories = useMemo(() => {
    if (!groupPropertyName) {
      return {
        _default: options
      };
    }
    let result = [];
    options.forEach(option => {
      if (!result[option[groupPropertyName]]) {
        result[option[groupPropertyName]] = [option];
      } else {
        result[option[groupPropertyName]].push(option);
      }
    });
    return result;
  }, [options]);
  if (!Object.entries(optionsByCategories).length) {
    return null;
  }
  return /*#__PURE__*/_jsx("div", {
    className: classNames(_objectSpread({}, optionContainerClasses)),
    style: _objectSpread({
      width: width
    }, disablePortal ? {
      backgroundColor: "var(--bds-menu-options-bg)",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 30000
    } : {}),
    children: Object.entries(optionsByCategories).map(_ref3 => {
      let [category, options] = _ref3;
      return /*#__PURE__*/_jsxs("div", {
        children: [category && category !== "_default" && /*#__PURE__*/_jsx("div", {
          className: classes.category,
          children: category
        }), options && Boolean(options.length) && options.map((item, index) => {
          return Boolean(item.separator) ? /*#__PURE__*/_jsx("hr", {
            role: optionRole,
            className: classes.separator
          }, "separator-".concat(index)) : /*#__PURE__*/_jsxs("div", {
            tabIndex: defaultTabIndex,
            role: optionRole,
            title: getOptionLabel(item),
            className: classNames(_objectSpread(_objectSpread({}, optionClasses), {}, {
              [classes.selectedOption]: isOptionSelected(item),
              [classes.highlightOption]: item.highlight,
              [classes.disabledOption]: isOptionDisabled(item)
            })),
            onMouseDown: event => event.preventDefault(),
            onClick: event => !isOptionDisabled(item) && onChange(event, item),
            children: [getOptionIcon && /*#__PURE__*/_jsx("div", {
              className: classNames(_objectSpread({}, optionIconClasses)),
              children: renderSvgGraphic(getOptionIcon(item), {
                alt: getOptionLabel(item),
                "aria-label": getOptionLabel(item),
                role: "img"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: classes.optionLabelSublabelContainer,
              children: [/*#__PURE__*/_jsx("div", {
                className: classNames(_objectSpread(_objectSpread({}, labelClasses), {}, {
                  [classes.disabledOptionLabel]: isOptionDisabled(item),
                  [classes.highlightOptionLabel]: item.highlight
                })),
                children: getOptionLabel(item)
              }), getOptionSublabel && getOptionSublabel(item) && /*#__PURE__*/_jsx("div", {
                className: classes.optionSublabel,
                children: getOptionSublabel(item)
              })]
            })]
          }, "filter-option-".concat(index));
        })]
      }, category);
    })
  });
};
MenuOptions.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSublabel: PropTypes.func,
  width: PropTypes.string,
  containerDimension: PropTypes.object.isRequired,
  value: PropTypes.array,
  portalContainerId: PropTypes.string.isRequired,
  disablePortal: PropTypes.bool,
  groupPropertyName: PropTypes.string,
  themeSourceRef: PropTypes.shape({
    current: PropTypes.any
  })
};
export default MenuOptions;