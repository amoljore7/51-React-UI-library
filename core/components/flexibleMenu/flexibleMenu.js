import React from 'react';
import Button from '../button';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-flexible-menu {\n  width: 320px;\n  background: #f9f5ff;\n  display: flex;\n  max-height: 600px;\n  flex-direction: column;\n  border-radius: 12px;\n  box-shadow: 0px 2px 8px rgba(4, 5, 32, 0.1), 0px 16px 20px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.bds-flexible-menu-max-height {\n  height: 600px;\n}\n.bds-flexible-menu-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px;\n  background: var(--theme-content-bg);\n  font-family: \"OpenSansRegular\";\n  border-radius: 12px 12px 0 0;\n}\n.bds-flexible-menu-header span {\n  font-size: 20px;\n  line-height: 24px;\n  letter-spacing: 0.03px; /* 0.15% of 20px */\n  font-weight: 600;\n  color: var(--theme-text-primary);\n}\n.bds-flexible-menu-content {\n  flex: 1;\n  padding: 0px;\n  font-family: \"OpenSansRegular\";\n  overflow-x: auto;\n}\n.bds-flexible-menu-footer {\n  display: flex;\n  gap: 16px;\n  justify-content: flex-end;\n  padding: 16px;\n  background: var(--theme-content-bg);\n  border-radius: 0 0 12px 12px;\n}\n\n[data-theme=dark] .bds-flexible-menu {\n  background: var(--theme-content-bg);\n}\n[data-theme=dark] .bds-flexible-menu-header {\n  background: var(--theme-content-bg);\n}\n[data-theme=dark] .bds-flexible-menu-header span {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-flexible-menu-header svg {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-flexible-menu-footer {\n  background: var(--theme-content-bg);\n}";
  const fileName = "flexibleMenu_flexibleMenu_c15b4f6b-8694-4c15-95cb-519d24fdeedf";
  const element = document.querySelector("style[data-sass-component='flexibleMenu_flexibleMenu_c15b4f6b-8694-4c15-95cb-519d24fdeedf']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import CloseX from '../../assets/icons/close-x.svg?react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FlexibleMenu = _ref => {
  let {
    maxHeight = false,
    title,
    footer,
    onClose,
    children
  } = _ref;
  // Add a class for maxHeight if needed
  const menuClass = "bds-flexible-menu".concat(maxHeight ? ' bds-flexible-menu-max-height' : '');
  return /*#__PURE__*/_jsxs("div", {
    className: menuClass,
    children: [title && /*#__PURE__*/_jsxs("div", {
      className: "bds-flexible-menu-header",
      children: [/*#__PURE__*/_jsx("span", {
        children: title
      }), /*#__PURE__*/_jsx(Button, {
        variant: "secondary",
        size: "medium",
        "aria-label": "Close",
        onClick: onClose,
        children: /*#__PURE__*/_jsx(CloseX, {
          "aria-hidden": true,
          focusable: "false"
        })
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "bds-flexible-menu-content",
      children: children
    }), (footer === null || footer === void 0 ? void 0 : footer.text) && /*#__PURE__*/_jsx("div", {
      className: "bds-flexible-menu-footer",
      children: /*#__PURE__*/_jsx(Button, {
        variant: "secondary",
        onClick: footer === null || footer === void 0 ? void 0 : footer.onClick,
        children: footer.text
      })
    })]
  });
};
export default FlexibleMenu;