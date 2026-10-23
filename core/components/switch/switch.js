import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { classes } from "./constants";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-switch-track-on: var(--theme-text-primary);\n  --bds-switch-track-on-hover: color-mix(in srgb, var(--theme-text-primary) 85%, var(--theme-content-bg));\n  --bds-switch-track-on-active: color-mix(in srgb, var(--theme-text-primary) 70%, var(--theme-content-bg));\n  --bds-switch-track-on-disabled: color-mix(in srgb, var(--theme-text-primary) 20%, var(--theme-content-bg));\n  --bds-switch-track-off: var(--theme-separator);\n  --bds-switch-track-off-hover: var(--theme-border);\n  --bds-switch-track-off-active: var(--theme-border-strong);\n  --bds-switch-track-disabled: var(--theme-hover-bg);\n  --bds-switch-knob-on: var(--theme-content-bg);\n  --bds-switch-knob-off: var(--theme-content-bg);\n  --bds-switch-knob-disabled: var(--theme-separator);\n  --bds-switch-focus-ring: var(--theme-text-primary);\n  --bds-switch-track-border: transparent;\n}\n\n[data-theme=light] {\n  --bds-switch-track-on: rgba(24, 17, 67, 0.8);\n  --bds-switch-track-on-hover: #181143;\n  --bds-switch-track-on-active: #181143;\n  --bds-switch-track-on-disabled: rgba(24, 17, 67, 0.5);\n  --bds-switch-track-off: #cdcdd2;\n  --bds-switch-track-off-hover: #9b9ba6;\n  --bds-switch-track-off-active: #9b9ba6;\n  --bds-switch-track-disabled: #e6e6e9;\n  --bds-switch-knob-on: #ffffff;\n  --bds-switch-knob-off: #ffffff;\n  --bds-switch-knob-disabled: #cdcdd2;\n  --bds-switch-focus-ring: rgba(24, 17, 67, 0.8);\n  --bds-switch-track-border: transparent;\n}\n\n[data-theme=dark] {\n  --bds-switch-track-on: #ffffff;\n  --bds-switch-track-on-hover: #e6e6e9;\n  --bds-switch-track-on-active: #cdcdd2;\n  --bds-switch-track-on-disabled: rgba(255, 255, 255, 0.4);\n  --bds-switch-track-off: #0a0b2e;\n  --bds-switch-track-off-hover: #686979;\n  --bds-switch-track-off-active: #9b9ba6;\n  --bds-switch-track-disabled: #0a0b2e;\n  --bds-switch-knob-on: #181143;\n  --bds-switch-knob-off: #ffffff;\n  --bds-switch-knob-disabled: #9b9ba6;\n  --bds-switch-focus-ring: #ffffff;\n  --bds-switch-track-border: #9b9ba6;\n}\n\n.bds-switch-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.bds-switch-container .bds-switch {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  cursor: pointer;\n  width: fit-content;\n}\n.bds-switch-container .bds-switch.disabled {\n  pointer-events: none;\n  cursor: default;\n}\n.bds-switch-container .bds-switch.disabled .bds-switch-track {\n  cursor: default;\n}\n.bds-switch-container .bds-switch-track {\n  position: relative;\n  flex-shrink: 0;\n  width: 2.5rem;\n  height: 1.25rem;\n  padding: 0;\n  border: none;\n  border: 1px solid var(--bds-switch-track-border);\n  border-radius: calc(1.25rem / 2);\n  cursor: pointer;\n  background-color: var(--bds-switch-track-off);\n  transition: background-color 0.2s ease;\n}\n.bds-switch-container .bds-switch-track:hover:not(:disabled) {\n  background-color: var(--bds-switch-track-off-hover);\n}\n.bds-switch-container .bds-switch-track:focus-visible {\n  outline: 2px solid var(--bds-switch-focus-ring);\n  outline-offset: 2px;\n}\n.bds-switch-container .bds-switch-track:active:not(:disabled) {\n  background-color: var(--bds-switch-track-off-active);\n}\n.bds-switch-container .bds-switch-knob {\n  position: absolute;\n  top: 50%;\n  left: 0.25rem;\n  width: 1rem;\n  height: 1rem;\n  border-radius: 50%;\n  background-color: var(--bds-switch-knob-off);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  transform: translateY(-50%);\n  transition: left 0.2s ease, background-color 0.2s ease;\n  pointer-events: none;\n}\n.bds-switch-container .bds-switch--checked .bds-switch-track {\n  background-color: var(--bds-switch-track-on);\n}\n.bds-switch-container .bds-switch--checked .bds-switch-track:hover:not(:disabled) {\n  background-color: var(--bds-switch-track-on-hover);\n}\n.bds-switch-container .bds-switch--checked .bds-switch-track:active:not(:disabled) {\n  background-color: var(--bds-switch-track-on-active);\n}\n.bds-switch-container .bds-switch--checked .bds-switch-knob {\n  left: calc(100% - 1rem - 0.25rem);\n  background-color: var(--bds-switch-knob-on);\n}\n.bds-switch-container .bds-switch.disabled .bds-switch-track {\n  background-color: var(--bds-switch-track-disabled);\n}\n.bds-switch-container .bds-switch.disabled.bds-switch--checked .bds-switch-track {\n  background-color: var(--bds-switch-track-on-disabled);\n}\n.bds-switch-container .bds-switch.disabled .bds-switch-knob {\n  background-color: var(--bds-switch-knob-disabled);\n}\n.bds-switch-container .bds-switch-error-message {\n  color: #da1e28;\n}";
  const fileName = "switch_switch_35487992-5815-40f2-b87f-e665be4653ab";
  const element = document.querySelector("style[data-sass-component='switch_switch_35487992-5815-40f2-b87f-e665be4653ab']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import Typography from "../typography";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Switch = _ref => {
  let {
    disabled,
    error,
    errorMessage,
    checked,
    label,
    onToggle,
    width,
    testId = classes.switch
  } = _ref;
  const switchClasses = {
    [classes.switch]: true,
    [classes.disabled]: disabled,
    [classes.checked]: checked
  };
  const handleClick = () => {
    if (disabled) return;
    onToggle === null || onToggle === void 0 || onToggle(checked);
  };
  const handleKeyDown = e => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle === null || onToggle === void 0 || onToggle(checked);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.switchContainer,
    children: [/*#__PURE__*/_jsxs("div", {
      "data-testid": testId,
      className: classNames(switchClasses),
      onClick: handleClick,
      children: [/*#__PURE__*/_jsx("button", {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-disabled": disabled,
        disabled: disabled,
        className: classes.track,
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? -1 : 0,
        children: /*#__PURE__*/_jsx("span", {
          className: classes.knob
        })
      }), label != null && label !== "" && /*#__PURE__*/_jsx(Typography, {
        variant: "label1",
        children: label
      })]
    }), error ? /*#__PURE__*/_jsx("div", {
      className: classes.switchErrorMessage,
      style: {
        width
      },
      children: /*#__PURE__*/_jsx(Typography, {
        variant: "label1",
        children: errorMessage
      })
    }) : null]
  });
};
Switch.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onToggle: PropTypes.func,
  width: PropTypes.number,
  testId: PropTypes.string
};
export default Switch;