import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ".elevation-container {\n  width: 200px;\n  height: 200px;\n  border-radius: 8px;\n  padding-top: 12px;\n  padding-right: 10px;\n  padding-bottom: 12px;\n  padding-left: 10px;\n}\n.elevation-level-1 {\n  box-shadow: 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-2 {\n  box-shadow: 0px 2px 2px rgba(4, 5, 32, 0.1), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-3 {\n  box-shadow: 0px 3px 5px rgba(4, 5, 32, 0.1), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-4 {\n  box-shadow: 0px 1px 2px rgba(4, 5, 32, 0.1), 0px 4px 7px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-5 {\n  box-shadow: 0px 1px 4px rgba(4, 5, 32, 0.1), 0px 6px 9px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-6 {\n  box-shadow: 0px 1px 4px rgba(4, 5, 32, 0.1), 0px 8px 12px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-7 {\n  box-shadow: 0px 1px 4px rgba(4, 5, 32, 0.1), 0px 10px 16px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-8 {\n  box-shadow: 0px 2px 8px rgba(4, 5, 32, 0.1), 0px 16px 20px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n.elevation-level-9 {\n  box-shadow: 0px 6px 12px rgba(4, 5, 32, 0.1), 0px 24px 40px rgba(4, 5, 32, 0.2), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n\n[data-theme=dark] .elevation-container {\n  background-color: #0a0b2e;\n  color: #ffffff;\n}";
  const fileName = "index_index_1a855308-96d7-4e5e-b338-775fece613a3";
  const element = document.querySelector("style[data-sass-component='index_index_1a855308-96d7-4e5e-b338-775fece613a3']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Elevations = _ref => {
  let {
    level = 1
  } = _ref;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx("div", {
      className: "elevation-container elevation-level-".concat(level),
      children: /*#__PURE__*/_jsxs("div", {
        children: ["Elevations Level ", level, /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {}), "elevation-level-".concat(level)]
      })
    })
  });
};
export default Elevations;