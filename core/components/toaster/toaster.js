import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, positionToClass, defaultPosition, defaultMaxVisible, positions } from './constants';
import { subscribeToasts } from './toast-service';
import ToastItem from './toast-item';
import { jsx as _jsx } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-toast-bg: var(--theme-content-bg);\n  --bds-toast-border: var(--theme-border);\n  --bds-toast-text: var(--theme-text-primary);\n  --bds-toast-text-muted: var(--theme-text-secondary);\n}\n\n[data-theme=light] {\n  --bds-toast-bg: #ffffff;\n  --bds-toast-border: var(--theme-border);\n  --bds-toast-text: #161616;\n  --bds-toast-text-muted: #393939;\n}\n\n.bds-toaster {\n  position: fixed;\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  pointer-events: none;\n  width: 30rem;\n  max-width: calc(100vw - 1rem * 2);\n}\n.bds-toaster--top-center {\n  top: 1rem;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.bds-toaster--top-right {\n  top: 1rem;\n  right: 1rem;\n}\n.bds-toaster--top-left {\n  top: 1rem;\n  left: 1rem;\n}\n.bds-toaster--bottom-center {\n  bottom: 1rem;\n  left: 50%;\n  transform: translateX(-50%);\n  flex-direction: column-reverse;\n}\n.bds-toaster--bottom-right {\n  bottom: 1rem;\n  right: 1rem;\n  flex-direction: column-reverse;\n}\n.bds-toaster--bottom-left {\n  bottom: 1rem;\n  left: 1rem;\n  flex-direction: column-reverse;\n}\n\n@keyframes bds-toast-enter {\n  from {\n    opacity: 0;\n    transform: translateY(-0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.bds-toast {\n  pointer-events: all;\n  display: flex;\n  align-items: flex-start;\n  background-color: var(--bds-toast-bg);\n  border: 1px solid var(--bds-toast-border);\n  border-radius: 0.25rem;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: var(--bds-toast-text);\n  min-width: 17.5rem;\n  max-width: 100%;\n  box-sizing: border-box;\n  animation: bds-toast-enter 200ms ease-out;\n  box-shadow: 0px 2px 2px rgba(4, 5, 32, 0.1), 0px 1px 1px rgba(4, 5, 32, 0.2);\n}\n@media (prefers-reduced-motion: reduce) {\n  .bds-toast {\n    animation: none;\n  }\n}\n.bds-toast__accent {\n  align-self: stretch;\n  width: 0.25rem;\n  flex-shrink: 0;\n  border-radius: 0.25rem 0 0 0.25rem;\n}\n.bds-toast__content {\n  flex: 1;\n  min-width: 0;\n  padding: 0.75rem 1rem;\n}\n.bds-toast__head-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.bds-toast__title {\n  flex: 1;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 500;\n  text-align: left;\n  align-self: center;\n}\n.bds-toast__description {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  margin-top: 0.25rem;\n  padding-left: calc(1.125rem + 0.5rem);\n  padding-right: calc(1rem + 0.5rem);\n  text-align: left;\n  color: var(--bds-toast-text-muted);\n}\n.bds-toast__buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.bds-toast__icon {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  width: 1.125rem;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.bds-toast__close {\n  flex-shrink: 0;\n  cursor: pointer;\n  font-size: 1rem;\n  color: var(--bds-toast-text-muted);\n  display: flex;\n  align-items: center;\n  background: none;\n  border: none;\n  padding: 0;\n}\n.bds-toast__close svg {\n  width: 1rem;\n  height: 1rem;\n}\n.bds-toast__close:hover {\n  color: var(--bds-toast-text);\n}\n.bds-toast__close:focus-visible {\n  outline: 2px solid var(--bds-toast-text);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n.bds-toast--success {\n  border-color: #24a148;\n}\n.bds-toast--success .bds-toast__accent {\n  background-color: #24a148;\n}\n.bds-toast--success .bds-toast__icon {\n  color: #24a148;\n}\n.bds-toast--error {\n  border-color: #da1e28;\n}\n.bds-toast--error .bds-toast__accent {\n  background-color: #da1e28;\n}\n.bds-toast--error .bds-toast__icon {\n  color: #da1e28;\n}\n.bds-toast--warning {\n  border-color: #f1c21b;\n}\n.bds-toast--warning .bds-toast__accent {\n  background-color: #f1c21b;\n}\n.bds-toast--warning .bds-toast__icon {\n  color: #f1c21b;\n}\n.bds-toast--info {\n  border-color: #007be6;\n}\n.bds-toast--info .bds-toast__accent {\n  background-color: #007be6;\n}\n.bds-toast--info .bds-toast__icon {\n  color: #007be6;\n}\n\n[data-theme=dark] {\n  --bds-toast-bg: #0a0b2e;\n  --bds-toast-border: var(--theme-border);\n  --bds-toast-text: #ffffff;\n  --bds-toast-text-muted: #cdcdd2;\n}\n[data-theme=dark] .bds-toast {\n  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15);\n}";
  const fileName = "toaster_toaster_48ee7f44-d859-4023-b684-dae4d5357564";
  const element = document.querySelector("style[data-sass-component='toaster_toaster_48ee7f44-d859-4023-b684-dae4d5357564']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const Toaster = _ref => {
  let {
    position = defaultPosition,
    maxVisible = defaultMaxVisible,
    portalTarget
  } = _ref;
  // Current list of active toasts
  const [toasts, setToasts] = useState([]);

  // Subscribe to toast-service on mount; unsubscribes automatically on unmount
  useEffect(() => subscribeToasts(setToasts), []);

  // Enforce the cap — take only the most-recently added N toasts
  const visible = toasts.slice(-maxVisible);
  return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/_jsx("div", {
    className: classNames(classes.container, positionToClass[position]),
    children: visible.map(t => /*#__PURE__*/_jsx(ToastItem, {
      id: t.id,
      title: t.title,
      description: t.description,
      type: t.type,
      closable: t.closable,
      primaryButton: t.primaryButton,
      secondaryButton: t.secondaryButton
    }, t.id))
  }), portalTarget !== null && portalTarget !== void 0 ? portalTarget : document.body);
};
Toaster.propTypes = {
  position: PropTypes.oneOf(positions),
  maxVisible: PropTypes.number,
  portalTarget: PropTypes.instanceOf(Element)
};
export default Toaster;