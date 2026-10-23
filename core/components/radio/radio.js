function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, radioType, horizontal, vertical, keyPrefix, testId } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root,\n[data-theme] {\n  --bds-radio-border: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-radio-border-hover: color-mix(in srgb, var(--theme-text-primary) 62%, var(--theme-content-bg));\n  --bds-radio-disabled-border: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-radio-disabled-bg: color-mix(in srgb, var(--theme-text-primary) 6%, var(--theme-content-bg));\n  --bds-radio-disabled-fill: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-radio-fill: var(--theme-text-primary);\n  --bds-radio-fill-hover: color-mix(in srgb, var(--theme-text-primary) 85%, var(--theme-content-bg));\n  --bds-radio-dot: var(--theme-content-bg);\n  --bds-radio-hover-bg: var(--theme-hover-bg);\n  --bds-radio-disabled-dot: var(--theme-text-secondary);\n  --bds-radio-focus-ring: var(--theme-text-primary);\n}\n\n[data-theme=light] {\n  --bds-radio-fill: rgba(24, 17, 67, 0.8);\n  --bds-radio-fill-hover: #181143;\n  --bds-radio-dot: #ffffff;\n  --bds-radio-hover-bg: rgba(24, 17, 67, 0.05);\n  --bds-radio-disabled-dot: #0a0b2e;\n  --bds-radio-focus-ring: rgba(24, 17, 67, 0.8);\n}\n\n[data-theme=dark] {\n  --bds-radio-fill: rgba(24, 17, 67, 0.6);\n  --bds-radio-fill-hover: rgba(24, 17, 67, 0.4);\n  --bds-radio-dot: #ffffff;\n  --bds-radio-hover-bg: rgba(24, 17, 67, 0.1);\n  --bds-radio-disabled-dot: #cdcdd2;\n  --bds-radio-focus-ring: rgba(24, 17, 67, 0.8);\n}\n\n.bds-radio-group .main-label {\n  display: flex;\n  height: 1.1875rem;\n  font-size: 0.875rem;\n  letter-spacing: 0.02rem;\n  font-family: \"OpenSansRegular\";\n  color: var(--theme-text-primary);\n  text-align: left;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.bds-radio-group .horizontal-align {\n  display: flex;\n}\n.bds-radio-group .vertical-align {\n  flex-direction: column;\n}\n.bds-radio-group .radio-container {\n  display: flex;\n  align-items: center;\n  min-height: 1.25rem;\n  margin-right: 1.5rem;\n  margin-bottom: 0.5rem;\n  flex-shrink: 0;\n}\n.bds-radio-group .radio-container:last-child {\n  margin-right: 0;\n}\n.bds-radio-group .radio-container.radio-container-vertical {\n  margin-bottom: 0.5rem;\n  margin-right: 0rem;\n}\n.bds-radio-group .radio-container .label-container {\n  font-size: 0.875rem;\n  letter-spacing: 0.02rem;\n  font-family: \"OpenSansRegular\";\n  color: var(--theme-text-primary);\n  text-align: left;\n  margin: inherit;\n}\n.bds-radio-group .radio-container .disable-label {\n  color: var(--bds-radio-disabled-fill);\n}\n[data-theme=dark] .bds-radio-group .radio-container .disable-label {\n  color: #686979;\n}\n.bds-radio-group .radio-container .bds-radio-custom-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.bds-radio-custom-btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n  min-width: 24px;\n  min-height: 24px;\n  flex-shrink: 0;\n}\n\n.bds-radio-btn {\n  position: absolute;\n  inset: 0;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 1;\n}\n.bds-radio-btn:disabled {\n  cursor: default;\n}\n.bds-radio-btn:focus-visible {\n  outline: 2px solid var(--bds-radio-focus-ring);\n  outline-offset: 2px;\n}\n\n.bds-radio-visual {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  border: 2px solid var(--bds-radio-border);\n  border-radius: 50%;\n  box-sizing: border-box;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n  pointer-events: none;\n}\n\n.bds-radio-custom-btn:has(.bds-radio-btn:not(:disabled)):hover .bds-radio-visual::before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 24px;\n  height: 24px;\n  margin-left: -12px;\n  margin-top: -12px;\n  border-radius: 50%;\n  background-color: var(--bds-radio-hover-bg);\n  pointer-events: none;\n  z-index: -1;\n}\n\n.bds-radio-custom-btn:hover .bds-radio-btn:not(:checked):not(:disabled) + .bds-radio-visual {\n  border-color: var(--bds-radio-border-hover);\n}\n\n.bds-radio-btn:checked + .bds-radio-visual {\n  border-color: var(--bds-radio-fill);\n  background-color: var(--bds-radio-fill);\n}\n.bds-radio-btn:checked + .bds-radio-visual::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 8px;\n  height: 8px;\n  margin-left: -4px;\n  margin-top: -4px;\n  background-color: var(--bds-radio-dot);\n  border-radius: 50%;\n  box-sizing: border-box;\n}\n\n.bds-radio-custom-btn:hover .bds-radio-btn:checked:not(:disabled) + .bds-radio-visual {\n  border-color: var(--bds-radio-fill-hover);\n  background-color: var(--bds-radio-fill-hover);\n}\n\n.bds-radio-btn:disabled + .bds-radio-visual {\n  border-color: var(--bds-radio-disabled-border);\n  background-color: var(--bds-radio-disabled-bg);\n}\n\n.bds-radio-btn:checked:disabled + .bds-radio-visual {\n  border-color: var(--bds-radio-disabled-fill);\n  background-color: var(--bds-radio-disabled-fill);\n}\n.bds-radio-btn:checked:disabled + .bds-radio-visual::after {\n  background-color: var(--bds-radio-disabled-dot);\n}";
  const fileName = "radio_radio_9b2a53d2-5234-4af6-a5d0-8aa0097f00a5";
  const element = document.querySelector("style[data-sass-component='radio_radio_9b2a53d2-5234-4af6-a5d0-8aa0097f00a5']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const RadioGroup = _ref => {
  let {
    label,
    name,
    defaultValue = '',
    direction = horizontal,
    options,
    onChange
  } = _ref;
  const radioClass = {
    [classes.horizontalAlign]: true,
    [classes.verticalAlign]: direction === vertical
  };
  const radioItemClass = {
    [classes.radioContainer]: true,
    [classes.radioContainerVertical]: direction === vertical
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.bdsRadioGroup,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: classes.mainLabel,
      children: label
    }), /*#__PURE__*/_jsx("div", {
      "data-testid": testId,
      className: classNames(_objectSpread({}, radioClass)),
      children: options.map((_ref2, index) => {
        let {
          label,
          value,
          disabled
        } = _ref2;
        const allProps = {
          name,
          onChange: onChange,
          selected: defaultValue === value,
          label,
          value,
          disabled
        };
        return /*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, radioItemClass)),
          children: /*#__PURE__*/_jsx(RadioButton, _objectSpread({}, allProps))
        }, "".concat(keyPrefix).concat(index));
      })
    })]
  });
};
export const RadioButton = _ref3 => {
  let {
    name,
    label,
    value,
    disabled,
    selected,
    onChange
  } = _ref3;
  const radioLabelClass = {
    [classes.labelContainer]: true,
    [classes.disableLabel]: disabled
  };
  const handleChange = e => {
    var _e$stopPropagation, _e$persist;
    if (disabled) return;
    // Wrap the event to prevent preventDefault misuse
    const safeEvent = _objectSpread(_objectSpread({}, e), {}, {
      preventDefault: () => {
        console.warn('preventDefault() is disabled in RadioButton to avoid breaking selection behavior.');
      },
      stopPropagation: (_e$stopPropagation = e.stopPropagation) === null || _e$stopPropagation === void 0 ? void 0 : _e$stopPropagation.bind(e),
      persist: (_e$persist = e.persist) === null || _e$persist === void 0 ? void 0 : _e$persist.bind(e),
      target: _objectSpread(_objectSpread({}, e.target), {}, {
        value,
        name
      })
    });
    onChange === null || onChange === void 0 || onChange(safeEvent);
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.bdsRadioCustomBtn,
    children: [/*#__PURE__*/_jsx("input", {
      role: radioType,
      type: radioType,
      id: "".concat(name).concat(value),
      name: name,
      value: value,
      className: classes.radioBtnStyle,
      disabled: disabled,
      checked: selected,
      onChange: handleChange
    }), /*#__PURE__*/_jsx("div", {
      className: classes.radioVisual,
      "aria-hidden": "true"
    }), label && /*#__PURE__*/_jsx("label", {
      htmlFor: "".concat(name).concat(value),
      className: classNames(_objectSpread({}, radioLabelClass)),
      children: label
    })]
  });
};
RadioGroup.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  direction: PropTypes.oneOf([horizontal, vertical]),
  onChange: PropTypes.func.isRequired
};
export default RadioGroup;