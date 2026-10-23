import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import { FiX } from 'react-icons/fi';
import { alertColor, classes, errorColor, iconSize, dialogType, zIndex, defaultWidth, defaultHeight } from './constants';
import { mountPortalRootWithThemeSync } from '../../utils/resolve-portal-data-theme';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\nh2.typography-heading-04 {\n  margin: 0;\n}\n\np.typography-body-text {\n  margin: 0;\n}\n\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  border: 0.0625rem solid var(--theme-border-strong);\n  box-sizing: border-box;\n  opacity: 1;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  min-width: 29rem;\n  min-height: 17.375rem;\n  background-color: var(--theme-content-bg);\n  z-index: 40;\n}\n.dialog-container .popup-strap {\n  min-height: 0.5rem;\n  min-width: 28.875rem;\n}\n.dialog-container .heading-container {\n  display: flex;\n  justify-content: space-between;\n}\n.dialog-container .heading-container .title-container {\n  margin-left: 2rem;\n  margin-top: 2rem;\n  margin-bottom: 1rem;\n  color: var(--theme-text-primary);\n}\n.dialog-container .heading-container .icon-container {\n  margin-right: 2rem;\n  margin-top: 2.4375rem;\n  margin-bottom: 1.5rem;\n  height: 1.5rem;\n}\n.dialog-container .heading-container .icon-container svg {\n  color: var(--theme-text-primary);\n}\n.dialog-container .message-container {\n  display: flex;\n  margin: 0rem 2rem 2rem 2rem;\n  color: var(--theme-text-primary);\n  overflow-y: hidden;\n  flex-grow: 2;\n}\n.dialog-container .message-container:hover {\n  overflow-y: auto;\n}\n.dialog-container .message-container::-webkit-scrollbar {\n  width: 0.5rem;\n}\n.dialog-container .message-container::-webkit-scrollbar-track {\n  border-radius: 0.5rem;\n  margin-top: 0.125rem;\n}\n.dialog-container .message-container::-webkit-scrollbar-thumb {\n  border-radius: 0.5rem;\n  background-color: var(--theme-border);\n}\n.dialog-container .message-container::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}\n.dialog-container .button-container {\n  display: flex;\n  justify-content: flex-end;\n  margin-right: 2rem;\n  margin-bottom: 2rem;\n}\n.dialog-container .button-container .button-wrapper:last-child:not(:first-of-type) {\n  margin-left: 1rem;\n}\n.dialog-container .dialog-children-wrapper {\n  margin: 0 2rem 2rem 2rem;\n}\n\n.overlay-container {\n  position: fixed;\n  background-color: #161616;\n  opacity: 0.3;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 30;\n}\n\n[data-theme=dark] .dialog-container {\n  background-color: var(--theme-content-bg);\n  border-color: var(--theme-border-strong);\n}\n[data-theme=dark] .dialog-container .title-container,\n[data-theme=dark] .dialog-container .message-container {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .dialog-container .icon-container svg {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .dialog-container .message-container::-webkit-scrollbar-thumb {\n  background-color: var(--theme-border);\n}\n[data-theme=dark] .dialog-container .message-container::-webkit-scrollbar-thumb:hover {\n  background-color: var(--theme-border-strong);\n}\n[data-theme=dark] .overlay-container {\n  background-color: #040520;\n  opacity: 0.65;\n}";
  const fileName = "dialog_dialog_c63447f8-ce3e-475d-bb17-cf89c1ae04c9";
  const element = document.querySelector("style[data-sass-component='dialog_dialog_c63447f8-ce3e-475d-bb17-cf89c1ae04c9']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const DialogPopup = _ref => {
  let {
    type = dialogType.general,
    width = defaultWidth,
    height = defaultHeight,
    title,
    message,
    primaryButtonText,
    secondaryButtonText,
    onSubmit,
    onCancel,
    children,
    primaryButtonDisabled = false,
    themeSourceRef,
    primaryButtonTestId = 'dialog-primary-btn',
    secondaryButtonTestId = 'dialog-secondary-btn'
  } = _ref;
  const [dialogEl] = useState(document.createElement('div'));
  dialogEl.id = 'dialog-popup';
  dialogEl.style.position = 'fixed';
  dialogEl.style.zIndex = zIndex;
  useEffect(() => {
    return mountPortalRootWithThemeSync(dialogEl, themeSourceRef);
  }, [dialogEl, themeSourceRef]);
  const getStrapColor = () => {
    switch (type) {
      case dialogType.general:
        return window.getComputedStyle(document.body).getPropertyValue('--brand');
      case dialogType.alert:
        return alertColor;
      case dialogType.error:
        return errorColor;
    }
  };
  const getDialogStrap = () => {
    return /*#__PURE__*/_jsx("div", {
      role: "popup-strap",
      className: classes.popupStrap,
      style: {
        width: width - 2,
        backgroundColor: getStrapColor()
      }
    });
  };
  const getDialogHeader = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.headingContainer,
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.titleContainer,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "heading4",
          children: title
        })
      }), /*#__PURE__*/_jsx("div", {
        className: classes.iconContainer,
        children: /*#__PURE__*/_jsx(FiX, {
          size: iconSize,
          onClick: onCancel,
          style: {
            cursor: 'pointer'
          },
          "data-testid": "dialog-popup-close-icon"
        })
      })]
    });
  };
  const getDialogMessage = () => {
    return /*#__PURE__*/_jsx("div", {
      role: "message",
      className: classes.messageContainer,
      children: /*#__PURE__*/_jsx(Typography, {
        variant: "body",
        children: message
      })
    });
  };
  const getChildrenContainer = () => {
    return /*#__PURE__*/_jsx("div", {
      className: classes.dialogChildrenWrapper,
      children: children
    });
  };
  const getDialogButton = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: classes.buttonContainer,
      children: [secondaryButtonText && getActionButton('secondary', secondaryButtonText, onCancel, false, secondaryButtonTestId), primaryButtonText && getActionButton('primary', primaryButtonText, onSubmit, primaryButtonDisabled, primaryButtonTestId)]
    });
  };
  const getActionButton = (type, buttonText, clickHandler, primaryButtonDisabled, testId) => {
    return /*#__PURE__*/_jsx("div", {
      className: classes.buttonWrapper,
      children: /*#__PURE__*/_jsx(Button, {
        variant: type,
        size: "large",
        onClick: clickHandler,
        disabled: primaryButtonDisabled,
        testId: testId,
        children: buttonText
      })
    });
  };
  return /*#__PURE__*/createPortal(/*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.overlayContainer
    }), /*#__PURE__*/_jsxs("div", {
      role: "dialog-popup",
      className: classes.dialogContainer,
      style: {
        width: width,
        height: height
      },
      children: [getDialogStrap(), getDialogHeader(), message && getDialogMessage(), children && getChildrenContainer(), (primaryButtonText || secondaryButtonText) && getDialogButton()]
    })]
  }), dialogEl);
};
DialogPopup.propTypes = {
  type: PropTypes.oneOf([dialogType.general, dialogType.alert, dialogType.error]),
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  primaryButtonDisabled: PropTypes.bool,
  themeSourceRef: PropTypes.shape({
    current: PropTypes.any
  }),
  primaryButtonTestId: PropTypes.string,
  secondaryButtonTestId: PropTypes.string
};
export default DialogPopup;