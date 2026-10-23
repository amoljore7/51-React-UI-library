function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Preview from './components/Preview';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-file-viewer-preview-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 7.5rem;\n  height: fit-content;\n  margin: 1rem;\n  margin-left: 0;\n  box-sizing: border-box;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-image-container {\n  width: 7.5rem;\n  overflow: scroll;\n  object-fit: cover;\n  cursor: pointer;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-non-image-files {\n  margin: auto;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-file-name {\n  margin-top: 1rem;\n  cursor: pointer;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-file-name > span {\n  width: 8.4375rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-align: center;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-file-name > span:hover {\n  color: var(--brand);\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-download {\n  margin-top: 0.5rem;\n}\n.bds-file-viewer-preview-container .bds-file-viewer-preview-download:hover {\n  color: var(--brand);\n  cursor: pointer;\n}\n\n.bds-file-viewer-full-screen-container {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 5000;\n  background-color: #393939;\n  opacity: 0.96;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel {\n  display: flex;\n  width: 100%;\n  height: 7.5vh;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  box-sizing: border-box;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);\n  justify-content: space-between;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--file-name {\n  display: flex;\n  align-items: center;\n  color: white;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--file-name .bds-file-viewer-full-screen-top-panel--file-name-text {\n  display: flex;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--file-name .bds-file-viewer-full-screen-top-panel--file-name-type-size {\n  display: flex;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--file-name .bds-file-viewer-full-screen-top-panel--file-name-size {\n  display: flex;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--buttons {\n  display: flex;\n  width: max-content;\n  align-items: center;\n  justify-content: center;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-top-panel .bds-file-viewer-full-screen-top-panel--buttons .bds-file-viewer-full-screen-top-panel-close-file {\n  margin-left: 2rem;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-image {\n  display: flex;\n  width: 100vw;\n  height: 85vh;\n  overflow: scroll;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-image > img {\n  margin: auto;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-bottom-panel {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);\n  height: 7.5vh;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-bottom-panel .bds-file-viewer-full-screen-bottom-panel--zoom {\n  display: flex;\n  align-items: center;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-bottom-panel .bds-file-viewer-full-screen-bottom-panel--zoom .bds-file-viewer-full-screen-bottom-panel--zoom-in {\n  display: flex;\n  margin-right: 2rem;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-bottom-panel .bds-file-viewer-full-screen-bottom-panel--zoom .bds-file-viewer-full-screen-bottom-panel--zoom-out {\n  display: flex;\n  margin: auto;\n}\n.bds-file-viewer-full-screen-container .bds-file-viewer-full-screen-bottom-panel .bds-file-viewer-full-screen-bottom-panel--zoom .bds-file-viewer-full-screen-bottom-panel-zoom-percentage {\n  display: flex;\n  align-items: center;\n  color: white;\n  margin-left: 2rem;\n}\n\n[data-theme=dark] .bds-file-viewer-preview-container {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-file-viewer-preview-container .bds-file-viewer-preview-file-name span:hover {\n  color: #1a94ff;\n}\n[data-theme=dark] .bds-file-viewer-preview-container svg {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-file-viewer-full-screen-container {\n  background-color: #040520;\n}\n[data-theme=dark] .bds-file-viewer-full-screen-container svg {\n  color: var(--theme-text-primary);\n}";
  const fileName = "FileViewer_FileViewer_a6f44264-9998-4f94-97d1-230d4976377f";
  const element = document.querySelector("style[data-sass-component='FileViewer_FileViewer_a6f44264-9998-4f94-97d1-230d4976377f']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import FullScreen from './components/FullScreen';
import { jsx as _jsx } from "react/jsx-runtime";
const FileViewer = _ref => {
  let {
    file
  } = _ref;
  const [isOpen, setIsOpen] = useState(false);
  const props = {
    file,
    setIsOpen
  };
  return isOpen ? /*#__PURE__*/_jsx(FullScreen, _objectSpread({}, props)) : /*#__PURE__*/_jsx(Preview, _objectSpread({}, props));
};
FileViewer.propTypes = {
  file: PropTypes.object
};
export default FileViewer;