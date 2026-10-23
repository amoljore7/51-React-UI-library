import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { checkboxType, classes } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root,\n[data-theme] {\n  --bds-checkbox-border: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-checkbox-border-hover: color-mix(in srgb, var(--theme-text-primary) 62%, var(--theme-content-bg));\n  --bds-checkbox-disabled-border: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-checkbox-disabled-bg: color-mix(in srgb, var(--theme-text-primary) 6%, var(--theme-content-bg));\n  --bds-checkbox-disabled-fill: color-mix(in srgb, var(--theme-text-primary) 37%, var(--theme-content-bg));\n  --bds-checkbox-fill: var(--theme-text-primary);\n  --bds-checkbox-fill-hover: color-mix(in srgb, var(--theme-text-primary) 85%, var(--theme-content-bg));\n  --bds-checkbox-check: var(--theme-content-bg);\n  --bds-checkbox-hover-bg: var(--theme-hover-bg);\n  --bds-checkbox-disabled-check: var(--theme-text-secondary);\n  --bds-checkbox-focus-ring: var(--theme-text-primary);\n}\n\n[data-theme=light] {\n  --bds-checkbox-fill: rgba(24, 17, 67, 0.8);\n  --bds-checkbox-fill-hover: #181143;\n  --bds-checkbox-check: #ffffff;\n  --bds-checkbox-hover-bg: rgba(24, 17, 67, 0.05);\n  --bds-checkbox-disabled-check: #0a0b2e;\n  --bds-checkbox-focus-ring: rgba(24, 17, 67, 0.8);\n}\n\n[data-theme=dark] {\n  --bds-checkbox-fill: rgba(24, 17, 67, 0.6);\n  --bds-checkbox-fill-hover: rgba(24, 17, 67, 0.4);\n  --bds-checkbox-check: #ffffff;\n  --bds-checkbox-hover-bg: rgba(24, 17, 67, 0.1);\n  --bds-checkbox-disabled-check: #cdcdd2;\n  --bds-checkbox-focus-ring: rgba(24, 17, 67, 0.8);\n}\n\n.bds-checkbox-container {\n  display: flex;\n  align-items: center;\n  min-height: 24px;\n  min-width: 24px;\n  flex-shrink: 0;\n  gap: 0;\n}\n\n.bds-checkbox-icon-container {\n  position: relative;\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.bds-checkbox-icon-container > input[type=checkbox] {\n  position: absolute;\n  inset: 0;\n  margin: 0;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n}\n.bds-checkbox-icon-container > input[type=checkbox]:disabled {\n  cursor: default;\n}\n.bds-checkbox-icon-container > input[type=checkbox]:focus-visible {\n  outline: 2px solid var(--bds-checkbox-focus-ring);\n  outline-offset: 2px;\n}\n.bds-checkbox-icon-container.bds-checkbox-icon-container-hover::before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 24px;\n  height: 24px;\n  margin-left: -12px;\n  margin-top: -12px;\n  border-radius: 4px;\n  background-color: var(--bds-checkbox-hover-bg);\n  pointer-events: none;\n}\n\n.bds-checkbox-icon {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  border: 2px solid var(--bds-checkbox-border);\n  border-radius: 4px;\n  box-sizing: border-box;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n}\n.bds-checkbox-icon.bds-checkbox-icon-checked {\n  border-color: var(--bds-checkbox-border);\n  background-color: var(--bds-checkbox-fill);\n}\n.bds-checkbox-icon.bds-checkbox-icon-checked::after {\n  content: \"\";\n  position: absolute;\n  left: 5px;\n  top: 1px;\n  width: 3px;\n  height: 7px;\n  border: solid var(--bds-checkbox-check);\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n  box-sizing: content-box;\n}\n.bds-checkbox-icon.bds-checkbox-icon-indeterminate {\n  border-color: var(--bds-checkbox-border);\n  background-color: var(--bds-checkbox-fill);\n}\n.bds-checkbox-icon.bds-checkbox-icon-indeterminate::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 10px;\n  height: 2px;\n  margin-left: -5px;\n  margin-top: -1px;\n  background-color: var(--bds-checkbox-check);\n  border: none;\n}\n.bds-checkbox-icon-container-hover .bds-checkbox-icon:not(.bds-checkbox-icon-checked):not(.bds-checkbox-icon-indeterminate):not(.bds-checkbox-icon-disabled):not(.bds-checkbox-icon-readonly) {\n  border-color: var(--bds-checkbox-border-hover);\n}\n.bds-checkbox-icon-container-hover .bds-checkbox-icon.bds-checkbox-icon-checked:not(.bds-checkbox-icon-disabled) {\n  border-color: var(--bds-checkbox-border-hover);\n  background-color: var(--bds-checkbox-fill-hover);\n}\n.bds-checkbox-icon-container-hover .bds-checkbox-icon.bds-checkbox-icon-indeterminate:not(.bds-checkbox-icon-disabled) {\n  border-color: var(--bds-checkbox-border-hover);\n  background-color: var(--bds-checkbox-fill-hover);\n}\n.bds-checkbox-icon.bds-checkbox-icon-disabled {\n  border-color: var(--bds-checkbox-disabled-border);\n  background-color: var(--bds-checkbox-disabled-bg);\n}\n.bds-checkbox-icon.bds-checkbox-icon-disabled.bds-checkbox-icon-checked {\n  border-color: var(--bds-checkbox-disabled-fill);\n  background-color: var(--bds-checkbox-disabled-fill);\n}\n.bds-checkbox-icon.bds-checkbox-icon-disabled.bds-checkbox-icon-checked::after {\n  border-color: var(--bds-checkbox-disabled-check);\n  background-color: transparent;\n}\n.bds-checkbox-icon.bds-checkbox-icon-disabled.bds-checkbox-icon-indeterminate {\n  border-color: var(--bds-checkbox-disabled-fill);\n  background-color: var(--bds-checkbox-disabled-fill);\n}\n.bds-checkbox-icon.bds-checkbox-icon-disabled.bds-checkbox-icon-indeterminate::after {\n  background-color: var(--bds-checkbox-disabled-check);\n  border: none;\n}\n.bds-checkbox-icon.bds-checkbox-icon-readonly {\n  border-color: var(--bds-checkbox-border);\n  background-color: transparent;\n}\n\n.bds-label-container {\n  min-height: 20px;\n  font-size: 14px;\n  letter-spacing: 0.32px;\n  color: var(--theme-text-primary);\n  font-family: \"OpenSansRegular\";\n  text-align: left;\n  vertical-align: middle;\n  margin-left: 8px;\n  cursor: pointer;\n  margin-bottom: 0;\n}";
  const fileName = "checkbox_checkbox_d8675dd6-ec96-4e49-8140-4cf12adad1cd";
  const element = document.querySelector("style[data-sass-component='checkbox_checkbox_d8675dd6-ec96-4e49-8140-4cf12adad1cd']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Checkbox = _ref => {
  let {
    name,
    label,
    checked,
    disabled,
    readOnly,
    onChange,
    indeterminate,
    testId = name
  } = _ref;
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const isDisabled = disabled || readOnly;
  const showHover = hover && !isDisabled;
  const iconContainerClasses = {
    [classes.iconContainer]: true,
    [classes.iconContainerHover]: showHover
  };
  const iconClasses = {
    [classes.checkboxIcon]: true,
    [classes.checkboxIconChecked]: checked && !indeterminate,
    [classes.checkboxIconIndeterminate]: indeterminate,
    [classes.checkboxIconDisabled]: disabled,
    [classes.checkboxIconReadonly]: readOnly && !disabled
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.checkboxContainer,
    children: [/*#__PURE__*/_jsxs("div", {
      className: classNames(iconContainerClasses),
      onMouseEnter: () => !isDisabled && setHover(true),
      onMouseLeave: () => setHover(false),
      children: [/*#__PURE__*/_jsx("input", {
        type: checkboxType,
        role: checkboxType,
        id: name,
        name: name,
        value: name,
        disabled: isDisabled,
        checked: checked,
        onChange: onChange,
        ref: inputRef,
        "data-testid": testId
      }), /*#__PURE__*/_jsx("div", {
        className: classNames(iconClasses),
        "aria-hidden": "true"
      })]
    }), label != null && /*#__PURE__*/_jsx("label", {
      htmlFor: name,
      className: classes.labelContainer,
      children: label
    })]
  });
};
Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
  testId: PropTypes.string
};
export default Checkbox;