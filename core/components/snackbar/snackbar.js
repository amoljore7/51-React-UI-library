import React, { useState } from 'react';
import PropTypes from 'prop-types';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.snackbar-container {\n  font-family: \"OpenSansRegular\";\n}\n\n.snackbar {\n  box-sizing: border-box;\n  opacity: 1;\n  background-color: transparent;\n  border: 0.0625rem solid #e15c5c;\n  color: #e15c5c;\n  width: 100%;\n  display: flex;\n  padding: 1rem;\n  gap: 1rem;\n  align-items: center;\n}\n\n.snackbar-title {\n  display: inline-block;\n  font-size: 0.875rem;\n  font-weight: 700;\n}\n\n.details-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex: 1;\n}\n\n.snackbar-image-title {\n  display: flex;\n  align-self: flex-start;\n}\n\n.snackbar-close-icon {\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  align-self: flex-start;\n}\n\n.snackbar-image-title img,\n.snackbar-image-title svg {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.error-list-container {\n  overflow-y: auto;\n  word-wrap: break-word;\n  font-size: 0.875rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n[data-theme=dark] .snackbar {\n  background-color: rgba(4, 5, 32, 0.95);\n  border-color: #e2615a;\n  color: #ffffff;\n}\n[data-theme=dark] .snackbar-image-title svg {\n  color: #e2615a;\n}";
  const fileName = "snackbar_snackbar_bd8ac7c2-e156-4dbf-b756-943637ea9138";
  const element = document.querySelector("style[data-sass-component='snackbar_snackbar_bd8ac7c2-e156-4dbf-b756-943637ea9138']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import ErrorIcon from '../../assets/icons/formError.svg?react';
import CloseError from '../../assets/icons/close-error.svg?react';
import { imageRole, errorRole } from './constants';
import { classes } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Snackbar = _ref => {
  let {
    title,
    errorList,
    maxWidth = null,
    maxHeight = null,
    allowClosing = false,
    onClose
  } = _ref;
  const [isClosed, setIsClosed] = useState(false);
  const handleClose = e => {
    e.stopPropagation();
    setIsClosed(true);
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  if (isClosed) {
    return null;
  }
  return /*#__PURE__*/_jsx("div", {
    className: classes.snackbarContainer,
    "data-testid": classes.snackbarContainer,
    children: /*#__PURE__*/_jsxs("div", {
      className: classes.snackbar,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.imageTitle,
        children: /*#__PURE__*/_jsx(ErrorIcon, {
          role: imageRole,
          "aria-label": title
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: classes.detailsContainer,
        children: [title && /*#__PURE__*/_jsx("span", {
          className: classes.title,
          children: title
        }), /*#__PURE__*/_jsx("div", {
          className: classes.errorListContainer,
          style: {
            maxWidth,
            maxHeight
          },
          children: errorList && errorList.length ? errorList.map((element, index) => /*#__PURE__*/_jsx("div", {
            "data-testid": errorRole,
            children: element
          }, index)) : null
        })]
      }), allowClosing && /*#__PURE__*/_jsx("button", {
        type: "button",
        className: classes.closeIcon,
        onClick: handleClose,
        "aria-label": "Close",
        children: /*#__PURE__*/_jsx(CloseError, {
          "aria-hidden": true,
          focusable: "false"
        })
      })]
    })
  });
};
Snackbar.propTypes = {
  title: PropTypes.string,
  errorList: PropTypes.array,
  allowClosing: PropTypes.bool,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  onClose: PropTypes.func
};
export default Snackbar;