import React, { Children, useState } from 'react';
import Typography from '../typography';
import { classes } from './constants';
import ChevronUp from '../../assets/icons/chevron-up.svg?react';
import ChevronDown from '../../assets/icons/chevron-down.svg?react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.accordion-container .header-with-underline {\n  padding-bottom: 0.5rem;\n  cursor: pointer;\n  display: flex;\n  user-select: none;\n  border-bottom: 1px solid var(--theme-border);\n}\n.accordion-container .header-without-underline {\n  padding-bottom: 0.5rem;\n  cursor: pointer;\n  display: flex;\n  user-select: none;\n}\n.accordion-container .header svg {\n  display: inline;\n  margin-right: 0.3125rem;\n  vertical-align: middle;\n  color: var(--theme-text-primary);\n}\n.accordion-container .header .margin-top-32 {\n  margin-top: 2rem;\n}\n.accordion-container .header .margin-top-8 {\n  margin-top: 0.5rem;\n}\n.accordion-container .content {\n  overflow: hidden;\n}\n.accordion-container .content-expanded {\n  transition: 0.2s ease-out;\n}\n.accordion-container .content-expanded-with-padding {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.accordion-container .content-closed {\n  padding: 0;\n  visibility: hidden;\n  transition: 0.2s ease-in;\n  height: 0;\n}\n\n[data-theme=dark] .accordion-container .header-with-underline {\n  border-bottom-color: var(--theme-border);\n}\n[data-theme=dark] .accordion-container .header svg {\n  color: var(--theme-text-primary);\n}";
  const fileName = "accordion_accordion_c4823cc6-f628-46ef-a3f5-1066fc660d07";
  const element = document.querySelector("style[data-sass-component='accordion_accordion_c4823cc6-f628-46ef-a3f5-1066fc660d07']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Accordion = _ref => {
  let {
    expanded = false,
    title,
    hideUnderline = false,
    removeChildrenPadding = false,
    children
  } = _ref;
  const [isExpanded, setIsExpanded] = useState(expanded);
  return /*#__PURE__*/_jsxs("div", {
    className: classes.container,
    children: [/*#__PURE__*/_jsxs("div", {
      "data-testid": "accordion-header",
      className: hideUnderline ? classes.headerWithoutUnderline : classes.headerWithUnderline,
      onClick: () => setIsExpanded(!isExpanded),
      children: [isExpanded ? /*#__PURE__*/_jsx(ChevronUp, {
        "aria-hidden": true,
        focusable: "false"
      }) : /*#__PURE__*/_jsx(ChevronDown, {
        "aria-hidden": true,
        focusable: "false"
      }), /*#__PURE__*/_jsx(Typography, {
        variant: "pageSectionHeader",
        children: title
      })]
    }), /*#__PURE__*/_jsx("div", {
      "data-testid": "accordion-content",
      className: "".concat(classes.content, " ").concat(isExpanded ? removeChildrenPadding ? classes.contentExpanded : classes.contentExpandedWithPadding : classes.contentClosed),
      children: children
    })]
  });
};
export default Accordion;