import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes, { string } from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import { FiX } from 'react-icons/fi';
import { classes, iconSize, buttonWrapperPrefix, modalPopupRole, modalPopupId, enterCode, crossIconRole } from './constants';
import { mountPortalRootWithThemeSync } from '../../utils/resolve-portal-data-theme';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  border: 0.0625rem solid var(--theme-border-strong);\n  box-sizing: border-box;\n  opacity: 1;\n  position: fixed;\n  top: 0;\n  right: 0;\n  height: 100%;\n  min-width: 29rem;\n  background-color: var(--theme-content-bg);\n  z-index: 30;\n}\n.modal-container .modal-strap {\n  min-height: 0.5rem;\n  min-width: 28.875rem;\n  background-color: var(--brand);\n}\n.modal-container .heading-container {\n  display: flex;\n  justify-content: space-between;\n}\n.modal-container .heading-container .title-container {\n  margin-left: 2rem;\n  margin-top: 2rem;\n  margin-bottom: 1.5rem;\n  color: var(--theme-text-primary);\n}\n.modal-container .heading-container .icon-container {\n  margin-right: 2rem;\n  margin-top: 2.4375rem;\n  margin-bottom: 1.5rem;\n  height: 1.5rem;\n}\n.modal-container .heading-container .icon-container .icon {\n  cursor: pointer;\n  color: var(--theme-text-primary);\n}\n.modal-container .buttons-container {\n  display: flex;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  margin-left: 2rem;\n  margin-right: 2rem;\n  gap: 0.0625rem;\n}\n.modal-container .buttons-container .button-wrapper {\n  margin-right: 1rem;\n  margin-bottom: 1rem;\n}\n.modal-container .content-separator {\n  width: 100%;\n  margin: 0;\n  border: none;\n  border-top: 1px solid color-mix(in srgb, var(--theme-text-primary) 25%, var(--theme-content-bg));\n}\n.modal-container .modal-children-container {\n  overflow: auto;\n  height: 100%;\n}\n.modal-container .modal-children-container .modal-children {\n  margin: 2rem;\n}\n\n.modal-overlay-container {\n  position: fixed;\n  background-color: #161616;\n  opacity: 0.3;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 20;\n}\n\n[data-theme=dark] .modal-container {\n  background-color: var(--theme-content-bg);\n  border-color: var(--theme-border-strong);\n}\n[data-theme=dark] .modal-container .title-container {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .modal-container .icon-container .icon {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .modal-overlay-container {\n  background-color: #040520;\n  opacity: 0.65;\n}";
  const fileName = "popup_modal-popup_7922fe65-2ce9-4212-8867-57c95009be87";
  const element = document.querySelector("style[data-sass-component='popup_modal-popup_7922fe65-2ce9-4212-8867-57c95009be87']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const ModalPopup = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    width,
    title,
    buttons,
    onCancel,
    children,
    classNamePrefix,
    themeSourceRef
  } = _ref;
  const [modalEl] = useState(document.createElement('div'));
  modalEl.id = modalPopupId;
  modalEl.style.zIndex = 100;
  if (classNamePrefix) {
    modalEl.className = "".concat(classNamePrefix, "-").concat(modalPopupId);
  }
  useEffect(() => {
    return mountPortalRootWithThemeSync(modalEl, themeSourceRef);
  }, [modalEl, themeSourceRef]);
  const getClassNames = elementClassName => {
    let finalClassName = elementClassName;
    if (classNamePrefix) {
      finalClassName += " ".concat(classNamePrefix, "-").concat(elementClassName);
    }
    return finalClassName;
  };
  const getModalStrap = () => {
    return /*#__PURE__*/_jsx("div", {
      className: getClassNames(classes.modalStrap),
      style: {
        width: width - 2
      }
    });
  };
  const crossIconKeyDownHandler = event => {
    if (event.code === enterCode) {
      onCancel();
    }
  };
  const getModalHeader = () => {
    return /*#__PURE__*/_jsxs("div", {
      className: getClassNames(classes.headingContainer),
      children: [/*#__PURE__*/_jsx("div", {
        className: getClassNames(classes.titleContainer),
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "heading4",
          children: title
        })
      }), /*#__PURE__*/_jsx("div", {
        className: getClassNames(classes.iconContainer),
        children: /*#__PURE__*/_jsx(FiX, {
          tabIndex: 0,
          size: iconSize,
          onClick: onCancel,
          onKeyDown: crossIconKeyDownHandler,
          className: getClassNames(classes.icon),
          role: crossIconRole,
          "data-testid": "modal-popup-close-icon"
        })
      })]
    });
  };
  const getActionButtons = () => {
    return buttons && /*#__PURE__*/_jsx("div", {
      className: getClassNames(classes.buttonsContainer),
      children: buttons.map((item, index) => {
        return /*#__PURE__*/_jsx("div", {
          className: getClassNames(classes.buttonWrapper),
          children: /*#__PURE__*/_jsx(Button, {
            variant: item.variant,
            size: item.size,
            onClick: item.onClick,
            disabled: item === null || item === void 0 ? void 0 : item.disabled,
            leftSVGIcon: item === null || item === void 0 ? void 0 : item.leftSVGIcon,
            rightSVGIcon: item === null || item === void 0 ? void 0 : item.rightSVGIcon,
            testId: item === null || item === void 0 ? void 0 : item.testId,
            children: item.text
          })
        }, "".concat(buttonWrapperPrefix).concat(index));
      })
    });
  };
  return /*#__PURE__*/createPortal(/*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: getClassNames(classes.overlayContainer)
    }), /*#__PURE__*/_jsxs("div", {
      role: modalPopupRole,
      className: getClassNames(classes.modalContainer),
      style: {
        width: width
      },
      children: [getModalStrap(), getModalHeader(), getActionButtons(), /*#__PURE__*/_jsx("hr", {
        className: getClassNames(classes.contentSeparator)
      }), /*#__PURE__*/_jsx("div", {
        className: getClassNames(classes.modalChildrenContainer),
        ref: ref,
        children: /*#__PURE__*/_jsx("div", {
          className: getClassNames(classes.modalChildren),
          children: children
        })
      })]
    })]
  }), modalEl);
});
ModalPopup.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    testId: PropTypes.string
  })),
  onCancel: PropTypes.func.isRequired,
  classNamePrefix: PropTypes.string,
  themeSourceRef: PropTypes.shape({
    current: PropTypes.any
  })
};
export default ModalPopup;