import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../typography';
import { classes } from './constants';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-progress-bar-parent-container {\n  display: flex;\n  width: max-content;\n  align-items: center;\n}\n.bds-progress-bar-parent-container .bds-progress-bar-container {\n  display: flex;\n  align-items: center;\n}\n.bds-progress-bar-parent-container .bds-progress-bar-container .bds-progress-bar-leading {\n  display: flex;\n  height: inherit;\n  background-color: #24a148;\n}\n.bds-progress-bar-parent-container .bds-progress-bar-container .bds-progress-bar-trailing {\n  display: flex;\n  height: inherit;\n  background-color: #f4f4f4;\n}\n.bds-progress-bar-parent-container .bds-progress-bar-value {\n  display: flex;\n  margin-left: 0.5rem;\n}\n\n[data-theme=dark] .bds-progress-bar-parent-container {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-progress-bar-parent-container .bds-progress-bar-trailing {\n  background-color: var(--theme-border);\n}";
  const fileName = "ProgressBar_ProgressBar_f4d49fed-a907-4613-9ab8-d7b82d501bfb";
  const element = document.querySelector("style[data-sass-component='ProgressBar_ProgressBar_f4d49fed-a907-4613-9ab8-d7b82d501bfb']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const ProgressBar = _ref => {
  let {
    progressPercentage,
    displayValue,
    width,
    height
  } = _ref;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.parentContainer,
      children: [/*#__PURE__*/_jsxs("div", {
        className: classes.container,
        style: {
          width,
          height
        },
        children: [/*#__PURE__*/_jsx("div", {
          className: classes.leading,
          style: {
            width: "".concat(progressPercentage / 100 * width, "px")
          }
        }), /*#__PURE__*/_jsx("div", {
          className: classes.trailing,
          style: {
            width: "".concat((100 - progressPercentage) / 100 * width, "px")
          }
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: classes.value,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "label1",
          children: displayValue
        })
      })]
    })
  });
};
export default ProgressBar;
ProgressBar.propTypes = {
  progressPercentage: PropTypes.number,
  width: PropTypes.number,
  displayValue: PropTypes.string
};