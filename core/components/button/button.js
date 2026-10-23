function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
import PropTypes from 'prop-types';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-btn-primary-tint-bg: var(--theme-text-primary);\n  --bds-btn-primary-tint-bg-hover: color-mix(in srgb, var(--theme-text-primary) 85%, var(--theme-content-bg));\n  --bds-btn-primary-tint-bg-active: color-mix(in srgb, var(--theme-text-primary) 70%, var(--theme-content-bg));\n  --bds-btn-primary-tint-text: var(--theme-content-bg);\n  --bds-btn-primary-tint-border: var(--theme-text-primary);\n  --bds-btn-primary-tint-border-hover: color-mix(in srgb, var(--theme-text-primary) 85%, var(--theme-content-bg));\n  --bds-btn-primary-tint-border-active: color-mix(in srgb, var(--theme-text-primary) 70%, var(--theme-content-bg));\n  --bds-btn-secondary-tint-bg: transparent;\n  --bds-btn-secondary-tint-bg-hover: var(--theme-hover-bg);\n  --bds-btn-secondary-tint-bg-active: color-mix(in srgb, var(--theme-text-primary) 15%, var(--theme-content-bg));\n  --bds-btn-secondary-tint-text: var(--theme-text-primary);\n  --bds-btn-secondary-tint-border: var(--theme-text-primary);\n  --bds-btn-tertiary-tint-bg: transparent;\n  --bds-btn-tertiary-tint-bg-hover: var(--theme-hover-bg);\n  --bds-btn-tertiary-tint-bg-active: color-mix(in srgb, var(--theme-text-primary) 15%, var(--theme-content-bg));\n  --bds-btn-tertiary-tint-text: var(--theme-text-primary);\n  --bds-btn-tertiary-tint-border: transparent;\n  --bds-btn-primary-neutral-bg: rgba(4, 5, 32, 0.05);\n  --bds-btn-primary-neutral-bg-hover: rgba(4, 5, 32, 0.1);\n  --bds-btn-primary-neutral-bg-active: rgba(4, 5, 32, 0.2);\n  --bds-btn-primary-neutral-text: #686979;\n  --bds-btn-primary-neutral-border: rgba(4, 5, 32, 0.05);\n  --bds-btn-primary-neutral-border-hover: rgba(4, 5, 32, 0.1);\n  --bds-btn-primary-neutral-border-active: rgba(4, 5, 32, 0.2);\n  --bds-btn-secondary-neutral-bg: transparent;\n  --bds-btn-secondary-neutral-bg-hover: rgba(4, 5, 32, 0.05);\n  --bds-btn-secondary-neutral-bg-active: rgba(4, 5, 32, 0.1);\n  --bds-btn-secondary-neutral-text: var(--theme-text-primary);\n  --bds-btn-secondary-neutral-border: var(--theme-text-primary);\n  --bds-btn-tertiary-neutral-bg: transparent;\n  --bds-btn-tertiary-neutral-bg-hover: var(--theme-hover-bg);\n  --bds-btn-tertiary-neutral-bg-active: color-mix(in srgb, var(--theme-text-primary) 15%, var(--theme-content-bg));\n  --bds-btn-tertiary-neutral-text: var(--theme-text-primary);\n  --bds-btn-tertiary-neutral-border: transparent;\n  --bds-btn-primary-negative-bg: #cf332b;\n  --bds-btn-primary-negative-bg-hover: #e2615a;\n  --bds-btn-primary-negative-bg-active: #ac2720;\n  --bds-btn-primary-negative-text: #ffffff;\n  --bds-btn-primary-negative-border: #cf332b;\n  --bds-btn-secondary-negative-bg: transparent;\n  --bds-btn-secondary-negative-bg-hover: #fef7f6;\n  --bds-btn-secondary-negative-bg-active: #fbeeee;\n  --bds-btn-secondary-negative-text: #cf332b;\n  --bds-btn-secondary-negative-border: #cf332b;\n  --bds-btn-tertiary-negative-bg: transparent;\n  --bds-btn-tertiary-negative-bg-hover: #fef7f6;\n  --bds-btn-tertiary-negative-bg-active: #fbeeee;\n  --bds-btn-tertiary-negative-text: #cf332b;\n  --bds-btn-tertiary-negative-border: transparent;\n  --bds-btn-primary-positive-bg: #00803e;\n  --bds-btn-primary-positive-bg-hover: #00a34f;\n  --bds-btn-primary-positive-bg-active: #006832;\n  --bds-btn-primary-positive-text: #ffffff;\n  --bds-btn-primary-positive-border: #00803e;\n  --bds-btn-secondary-positive-bg: transparent;\n  --bds-btn-secondary-positive-bg-hover: #f0faf5;\n  --bds-btn-secondary-positive-bg-active: #e6f6ed;\n  --bds-btn-secondary-positive-text: #00803e;\n  --bds-btn-secondary-positive-border: #00803e;\n  --bds-btn-tertiary-positive-bg: transparent;\n  --bds-btn-tertiary-positive-bg-hover: #f0faf5;\n  --bds-btn-tertiary-positive-bg-active: #e6f6ed;\n  --bds-btn-tertiary-positive-text: #00803e;\n  --bds-btn-tertiary-positive-border: transparent;\n  --bds-btn-disabled-bg: color-mix(in srgb, var(--theme-text-primary) 20%, var(--theme-content-bg));\n  --bds-btn-disabled-text: var(--theme-content-bg);\n  --bds-btn-disabled-border: color-mix(in srgb, var(--theme-text-primary) 20%, var(--theme-content-bg));\n  --bds-btn-disabled-secondary-bg: #ffffff;\n  --bds-btn-disabled-secondary-border: #cdcdd2;\n  --bds-btn-disabled-secondary-text: #cdcdd2;\n  --bds-btn-secondary-neutral-border-hover: var(--theme-text-primary);\n  --bds-btn-secondary-neutral-border-active: var(--theme-text-primary);\n  --bds-btn-secondary-neutral-text-hover: var(--theme-text-primary);\n  --bds-btn-tertiary-neutral-text-hover: var(--theme-text-primary);\n}\n\n[data-theme=light] {\n  --bds-btn-primary-tint-bg: #181143;\n  --bds-btn-primary-tint-bg-hover: rgba(24, 17, 67, 0.8);\n  --bds-btn-primary-tint-bg-active: rgba(24, 17, 67, 0.6);\n  --bds-btn-primary-tint-text: #ffffff;\n  --bds-btn-primary-tint-border: #181143;\n  --bds-btn-primary-tint-border-hover: rgba(24, 17, 67, 0.8);\n  --bds-btn-primary-tint-border-active: rgba(24, 17, 67, 0.6);\n  --bds-btn-secondary-tint-bg-hover: rgba(24, 17, 67, 0.05);\n  --bds-btn-secondary-tint-bg-active: rgba(24, 17, 67, 0.1);\n  --bds-btn-secondary-tint-text: #181143;\n  --bds-btn-secondary-tint-border: #181143;\n  --bds-btn-secondary-neutral-border: #cdcdd2;\n  --bds-btn-secondary-neutral-border-hover: #9b9ba6;\n  --bds-btn-secondary-neutral-border-active: #686979;\n  --bds-btn-tertiary-tint-bg-hover: rgba(24, 17, 67, 0.05);\n  --bds-btn-tertiary-tint-bg-active: rgba(24, 17, 67, 0.1);\n  --bds-btn-tertiary-neutral-bg-hover: rgba(4, 5, 32, 0.05);\n  --bds-btn-tertiary-neutral-bg-active: rgba(4, 5, 32, 0.1);\n  --bds-btn-disabled-bg: #e6e6e9;\n  --bds-btn-disabled-text: #ffffff;\n  --bds-btn-disabled-border: #e6e6e9;\n}\n\n[data-theme=dark] {\n  --bds-btn-primary-tint-bg: #cdcdd2;\n  --bds-btn-primary-tint-bg-hover: #e6e6e9;\n  --bds-btn-primary-tint-bg-active: #9b9ba6;\n  --bds-btn-primary-tint-text: #040520;\n  --bds-btn-primary-tint-border: #9b9ba6;\n  --bds-btn-primary-tint-border-hover: #cdcdd2;\n  --bds-btn-primary-tint-border-active: #686979;\n  --bds-btn-secondary-tint-bg: transparent;\n  --bds-btn-secondary-tint-bg-hover: rgba(24, 17, 67, 0.2);\n  --bds-btn-secondary-tint-bg-active: rgba(24, 17, 67, 0.4);\n  --bds-btn-secondary-tint-text: rgba(255, 255, 255, 0.8);\n  --bds-btn-secondary-tint-border: rgba(255, 255, 255, 0.4);\n  --bds-btn-tertiary-tint-bg: transparent;\n  --bds-btn-tertiary-tint-bg-hover: rgba(24, 17, 67, 0.2);\n  --bds-btn-tertiary-tint-bg-active: rgba(24, 17, 67, 0.4);\n  --bds-btn-tertiary-tint-text: var(--theme-text-primary);\n  --bds-btn-tertiary-tint-border: transparent;\n  --bds-btn-primary-neutral-bg: #ffffff;\n  --bds-btn-primary-neutral-bg-hover: rgba(255, 255, 255, 0.8);\n  --bds-btn-primary-neutral-bg-active: rgba(255, 255, 255, 0.8);\n  --bds-btn-primary-neutral-text: #0a0b2e;\n  --bds-btn-primary-neutral-border: rgba(4, 5, 32, 0.05);\n  --bds-btn-primary-neutral-border-hover: rgba(4, 5, 32, 0.1);\n  --bds-btn-primary-neutral-border-active: rgba(4, 5, 32, 0.1);\n  --bds-btn-secondary-neutral-bg: transparent;\n  --bds-btn-secondary-neutral-bg-hover: rgba(255, 255, 255, 0.05);\n  --bds-btn-secondary-neutral-bg-active: rgba(255, 255, 255, 0.05);\n  --bds-btn-secondary-neutral-text: var(--theme-text-primary);\n  --bds-btn-secondary-neutral-border: rgba(255, 255, 255, 0.2);\n  --bds-btn-tertiary-neutral-bg: transparent;\n  --bds-btn-tertiary-neutral-bg-hover: rgba(255, 255, 255, 0.05);\n  --bds-btn-tertiary-neutral-bg-active: rgba(255, 255, 255, 0.05);\n  --bds-btn-tertiary-neutral-text: var(--theme-text-primary);\n  --bds-btn-tertiary-neutral-border: transparent;\n  --bds-btn-primary-negative-bg: #cf332b;\n  --bds-btn-primary-negative-bg-hover: #ac2720;\n  --bds-btn-primary-negative-bg-active: #6f0b06;\n  --bds-btn-primary-negative-text: #ffffff;\n  --bds-btn-primary-negative-border: #ac2720;\n  --bds-btn-secondary-negative-bg: transparent;\n  --bds-btn-secondary-negative-bg-hover: #fbeeee;\n  --bds-btn-secondary-negative-bg-active: #f6d2d0;\n  --bds-btn-secondary-negative-text: #efb2ae;\n  --bds-btn-secondary-negative-border: #eb8e89;\n  --bds-btn-tertiary-negative-bg: transparent;\n  --bds-btn-tertiary-negative-bg-hover: #fbeeee;\n  --bds-btn-tertiary-negative-bg-active: #f6d2d0;\n  --bds-btn-tertiary-negative-text: #efb2ae;\n  --bds-btn-tertiary-negative-border: transparent;\n  --bds-btn-primary-positive-bg: #00803e;\n  --bds-btn-primary-positive-bg-hover: #006832;\n  --bds-btn-primary-positive-bg-active: #004d25;\n  --bds-btn-primary-positive-text: #ffffff;\n  --bds-btn-primary-positive-border: #006832;\n  --bds-btn-secondary-positive-bg: transparent;\n  --bds-btn-secondary-positive-bg-hover: #e6f6ed;\n  --bds-btn-secondary-positive-bg-active: #cdefdd;\n  --bds-btn-secondary-positive-text: #8bdab1;\n  --bds-btn-secondary-positive-border: #49c585;\n  --bds-btn-tertiary-positive-bg: transparent;\n  --bds-btn-tertiary-positive-bg-hover: #e6f6ed;\n  --bds-btn-tertiary-positive-bg-active: #cdefdd;\n  --bds-btn-tertiary-positive-text: #8bdab1;\n  --bds-btn-tertiary-positive-border: transparent;\n  --bds-btn-disabled-bg: rgba(255, 255, 255, 0.02);\n  --bds-btn-disabled-text: rgba(255, 255, 255, 0.2);\n  --bds-btn-disabled-border: rgba(255, 255, 255, 0.1);\n  --bds-btn-disabled-secondary-bg: transparent;\n  --bds-btn-disabled-secondary-border: rgba(255, 255, 255, 0.1);\n  --bds-btn-disabled-secondary-text: rgba(255, 255, 255, 0.2);\n  --bds-btn-secondary-neutral-border-hover: rgba(255, 255, 255, 0.4);\n  --bds-btn-secondary-neutral-border-active: rgba(255, 255, 255, 0.6);\n  --bds-btn-secondary-neutral-text-hover: var(--theme-text-primary);\n  --bds-btn-tertiary-neutral-text-hover: var(--theme-text-primary);\n}\n\n.bds-btn {\n  font-family: \"OpenSansRegular\";\n  border-radius: 0.5rem;\n  border-width: 0.0625rem;\n  border-style: solid;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  position: relative;\n  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;\n  appearance: none;\n}\n.bds-btn--large {\n  font-size: 16px;\n  line-height: 20px;\n  letter-spacing: 0.15px; /* 0.94% of 16px */\n  font-weight: 600;\n  padding: 8px 12px;\n  gap: 6px;\n}\n.bds-btn--medium {\n  font-size: 14px;\n  line-height: 18px;\n  letter-spacing: 0.21px; /* 1.5% of 14px */\n  font-weight: 600;\n  padding: 6px 8px;\n  gap: 4px;\n}\n.bds-btn--small {\n  font-size: 13px;\n  line-height: 18px;\n  letter-spacing: 0.24px; /* 1.85% of 13px */\n  font-weight: 600;\n  padding: 2px 6px;\n  gap: 2px;\n}\n.bds-btn.bds-btn--iconOnly.bds-btn--large {\n  padding: 8px;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n}\n.bds-btn.bds-btn--iconOnly.bds-btn--medium {\n  padding: 6px;\n  min-width: 2rem;\n  min-height: 2rem;\n}\n.bds-btn.bds-btn--iconOnly.bds-btn--small {\n  padding: 2px;\n  min-width: 1.5rem;\n  min-height: 1.5rem;\n}\n.bds-btn__content {\n  display: inline-flex;\n  align-items: center;\n  gap: inherit;\n}\n.bds-btn__caret {\n  display: inline-flex;\n  align-items: center;\n}\n.bds-btn--badge::after {\n  content: \"\";\n  position: absolute;\n  top: -0.125rem;\n  right: -0.125rem;\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background: #005fb2;\n  border: 0.0625rem solid #ffffff;\n}\n.bds-btn--loading .bds-btn__content {\n  visibility: hidden;\n}\n.bds-btn--loading .bds-btn__spinner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.bds-btn__spinner-inner {\n  display: inline-block;\n  width: 1rem;\n  height: 1rem;\n  border: 0.125rem solid #cdcdd2;\n  border-top-color: currentColor;\n  border-radius: 50%;\n  animation: bds-btn-spin 0.8s linear infinite;\n}\n\n@keyframes bds-btn-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.bds-btn--primary.bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg);\n  color: var(--bds-btn-primary-tint-text);\n  border-color: var(--bds-btn-primary-tint-border);\n}\n.bds-btn--primary.bds-btn--tint:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-tint-bg-hover);\n  border-color: var(--bds-btn-primary-tint-border-hover);\n}\n.bds-btn--primary.bds-btn--tint:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-tint-bg-active);\n  border-color: var(--bds-btn-primary-tint-border-active);\n}\n\n.bds-btn--primary.bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg);\n  color: var(--bds-btn-primary-neutral-text);\n  border-color: var(--bds-btn-primary-neutral-border);\n}\n.bds-btn--primary.bds-btn--neutral:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-neutral-bg-hover);\n  border-color: var(--bds-btn-primary-neutral-border-hover);\n}\n.bds-btn--primary.bds-btn--neutral:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-neutral-bg-active);\n  border-color: var(--bds-btn-primary-neutral-border-active);\n}\n\n.bds-btn--primary.bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg);\n  color: var(--bds-btn-primary-negative-text);\n  border-color: var(--bds-btn-primary-negative-border);\n}\n.bds-btn--primary.bds-btn--negative:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-negative-bg-hover);\n  border-color: var(--bds-btn-primary-negative-bg-hover);\n}\n.bds-btn--primary.bds-btn--negative:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-negative-bg-active);\n  border-color: var(--bds-btn-primary-negative-bg-active);\n}\n\n.bds-btn--primary.bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg);\n  color: var(--bds-btn-primary-positive-text);\n  border-color: var(--bds-btn-primary-positive-border);\n}\n.bds-btn--primary.bds-btn--positive:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-positive-bg-hover);\n  border-color: var(--bds-btn-primary-positive-bg-hover);\n}\n.bds-btn--primary.bds-btn--positive:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-primary-positive-bg-active);\n  border-color: var(--bds-btn-primary-positive-bg-active);\n}\n\n.bds-btn--secondary.bds-btn--tint {\n  background-color: var(--bds-btn-secondary-tint-bg);\n  color: var(--bds-btn-secondary-tint-text);\n  border-color: var(--bds-btn-secondary-tint-border);\n}\n.bds-btn--secondary.bds-btn--tint:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-tint-bg-hover);\n  border-color: var(--bds-btn-primary-tint-border-hover);\n}\n.bds-btn--secondary.bds-btn--tint:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-tint-bg-active);\n  border-color: var(--bds-btn-primary-tint-border-active);\n}\n\n.bds-btn--secondary.bds-btn--neutral {\n  background-color: var(--bds-btn-secondary-neutral-bg);\n  color: var(--bds-btn-secondary-neutral-text);\n  border-color: var(--bds-btn-secondary-neutral-border);\n}\n.bds-btn--secondary.bds-btn--neutral:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-neutral-bg-hover);\n  border-color: var(--bds-btn-secondary-neutral-border-hover);\n  color: var(--bds-btn-secondary-neutral-text-hover);\n}\n.bds-btn--secondary.bds-btn--neutral:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-neutral-bg-active);\n  border-color: var(--bds-btn-secondary-neutral-border-active);\n  color: var(--bds-btn-secondary-neutral-text-hover);\n}\n\n.bds-btn--secondary.bds-btn--negative {\n  background-color: var(--bds-btn-secondary-negative-bg);\n  color: var(--bds-btn-secondary-negative-text);\n  border-color: var(--bds-btn-secondary-negative-border);\n}\n.bds-btn--secondary.bds-btn--negative:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-negative-bg-hover);\n  border-color: #e2615a;\n}\n.bds-btn--secondary.bds-btn--negative:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-negative-bg-active);\n  border-color: #eb8e89;\n}\n\n.bds-btn--secondary.bds-btn--positive {\n  background-color: var(--bds-btn-secondary-positive-bg);\n  color: var(--bds-btn-secondary-positive-text);\n  border-color: var(--bds-btn-secondary-positive-border);\n}\n.bds-btn--secondary.bds-btn--positive:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-positive-bg-hover);\n  border-color: #00a34f;\n}\n.bds-btn--secondary.bds-btn--positive:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-secondary-positive-bg-active);\n  border-color: #49c585;\n}\n\n.bds-btn--tertiary.bds-btn--tint {\n  background-color: var(--bds-btn-tertiary-tint-bg);\n  color: var(--bds-btn-tertiary-tint-text);\n  border-color: var(--bds-btn-tertiary-tint-border);\n}\n.bds-btn--tertiary.bds-btn--tint:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-tint-bg-hover);\n  border-color: var(--bds-btn-tertiary-tint-bg-hover);\n}\n.bds-btn--tertiary.bds-btn--tint:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-tint-bg-active);\n  border-color: var(--bds-btn-tertiary-tint-bg-active);\n}\n\n.bds-btn--tertiary.bds-btn--neutral {\n  background-color: var(--bds-btn-tertiary-neutral-bg);\n  color: var(--bds-btn-tertiary-neutral-text);\n  border-color: var(--bds-btn-tertiary-neutral-border);\n}\n.bds-btn--tertiary.bds-btn--neutral:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-neutral-bg-hover);\n  border-color: var(--bds-btn-tertiary-neutral-bg-hover);\n  color: var(--bds-btn-tertiary-neutral-text-hover);\n}\n.bds-btn--tertiary.bds-btn--neutral:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-neutral-bg-active);\n  border-color: var(--bds-btn-tertiary-neutral-bg-active);\n  color: var(--bds-btn-tertiary-neutral-text-hover);\n}\n\n.bds-btn--tertiary.bds-btn--negative {\n  background-color: var(--bds-btn-tertiary-negative-bg);\n  color: var(--bds-btn-tertiary-negative-text);\n  border-color: var(--bds-btn-tertiary-negative-border);\n}\n.bds-btn--tertiary.bds-btn--negative:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-negative-bg-hover);\n  border-color: var(--bds-btn-tertiary-negative-bg-hover);\n}\n.bds-btn--tertiary.bds-btn--negative:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-negative-bg-active);\n  border-color: var(--bds-btn-tertiary-negative-bg-active);\n}\n\n.bds-btn--tertiary.bds-btn--positive {\n  background-color: var(--bds-btn-tertiary-positive-bg);\n  color: var(--bds-btn-tertiary-positive-text);\n  border-color: var(--bds-btn-tertiary-positive-border);\n}\n.bds-btn--tertiary.bds-btn--positive:hover:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-positive-bg-hover);\n  border-color: var(--bds-btn-tertiary-positive-bg-hover);\n}\n.bds-btn--tertiary.bds-btn--positive:active:not(.bds-btn--disabled) {\n  background-color: var(--bds-btn-tertiary-positive-bg-active);\n  border-color: var(--bds-btn-tertiary-positive-bg-active);\n}\n\n.bds-btn--primary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg);\n  border-color: var(--bds-btn-primary-tint-border);\n}\n.bds-btn--primary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg);\n  border-color: var(--bds-btn-primary-neutral-border);\n}\n.bds-btn--primary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg);\n  border-color: var(--bds-btn-primary-negative-border);\n}\n.bds-btn--primary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg);\n  border-color: var(--bds-btn-primary-positive-border);\n}\n\n.bds-btn--primary.bds-btn--toggled:hover:not(.bds-btn--disabled).bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg-hover);\n  border-color: var(--bds-btn-primary-tint-border-hover);\n}\n.bds-btn--primary.bds-btn--toggled:hover:not(.bds-btn--disabled).bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg-hover);\n  border-color: var(--bds-btn-primary-neutral-border-hover);\n}\n.bds-btn--primary.bds-btn--toggled:hover:not(.bds-btn--disabled).bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg-hover);\n  border-color: var(--bds-btn-primary-negative-bg-hover);\n}\n.bds-btn--primary.bds-btn--toggled:hover:not(.bds-btn--disabled).bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg-hover);\n  border-color: var(--bds-btn-primary-positive-bg-hover);\n}\n\n.bds-btn--primary.bds-btn--toggled:active:not(.bds-btn--disabled).bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg-active);\n  border-color: var(--bds-btn-primary-tint-border-active);\n}\n.bds-btn--primary.bds-btn--toggled:active:not(.bds-btn--disabled).bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg-active);\n  border-color: var(--bds-btn-primary-neutral-border-active);\n}\n.bds-btn--primary.bds-btn--toggled:active:not(.bds-btn--disabled).bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg-active);\n  border-color: var(--bds-btn-primary-negative-bg-active);\n}\n.bds-btn--primary.bds-btn--toggled:active:not(.bds-btn--disabled).bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg-active);\n  border-color: var(--bds-btn-primary-positive-bg-active);\n}\n\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg);\n  color: var(--bds-btn-primary-tint-text);\n  border-color: var(--bds-btn-primary-tint-border);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg);\n  color: var(--bds-btn-primary-neutral-text);\n  border-color: var(--bds-btn-primary-neutral-border);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg);\n  color: var(--bds-btn-primary-negative-text);\n  border-color: var(--bds-btn-primary-negative-border);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg);\n  color: var(--bds-btn-primary-positive-text);\n  border-color: var(--bds-btn-primary-positive-border);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--tint {\n  background-color: var(--bds-btn-primary-tint-bg-hover);\n  border-color: var(--bds-btn-primary-tint-border-hover);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--neutral {\n  background-color: var(--bds-btn-primary-neutral-bg-hover);\n  border-color: var(--bds-btn-primary-neutral-border-hover);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--negative {\n  background-color: var(--bds-btn-primary-negative-bg-hover);\n  border-color: var(--bds-btn-primary-negative-bg-hover);\n}\n.bds-btn--secondary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--positive {\n  background-color: var(--bds-btn-primary-positive-bg-hover);\n  border-color: var(--bds-btn-primary-positive-bg-hover);\n}\n\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--tint {\n  background-color: var(--bds-btn-tertiary-tint-bg-active);\n  border-color: var(--bds-btn-tertiary-tint-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--neutral {\n  background-color: var(--bds-btn-tertiary-neutral-bg-active);\n  border-color: var(--bds-btn-tertiary-neutral-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--negative {\n  background-color: var(--bds-btn-tertiary-negative-bg-active);\n  border-color: var(--bds-btn-tertiary-negative-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled).bds-btn--positive {\n  background-color: var(--bds-btn-tertiary-positive-bg-active);\n  border-color: var(--bds-btn-tertiary-positive-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--tint {\n  background-color: var(--bds-btn-tertiary-tint-bg-active);\n  border-color: var(--bds-btn-tertiary-tint-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--neutral {\n  background-color: var(--bds-btn-tertiary-neutral-bg-active);\n  border-color: var(--bds-btn-tertiary-neutral-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--negative {\n  background-color: var(--bds-btn-tertiary-negative-bg-active);\n  border-color: var(--bds-btn-tertiary-negative-bg-active);\n}\n.bds-btn--tertiary.bds-btn--toggled:not(.bds-btn--disabled):hover.bds-btn--positive {\n  background-color: var(--bds-btn-tertiary-positive-bg-active);\n  border-color: var(--bds-btn-tertiary-positive-bg-active);\n}\n\n.bds-btn--primary.bds-btn--disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 1;\n  -webkit-text-fill-color: currentColor;\n  background-color: var(--bds-btn-disabled-bg);\n  border-color: var(--bds-btn-disabled-border);\n  color: var(--bds-btn-disabled-text);\n}\n.bds-btn--primary.bds-btn--disabled:hover {\n  background-color: var(--bds-btn-disabled-bg);\n  border-color: var(--bds-btn-disabled-border);\n}\n\n.bds-btn--secondary.bds-btn--disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 1;\n  -webkit-text-fill-color: currentColor;\n  background-color: var(--bds-btn-disabled-secondary-bg);\n  border-color: var(--bds-btn-disabled-secondary-border);\n  color: var(--bds-btn-disabled-secondary-text);\n}\n.bds-btn--secondary.bds-btn--disabled:hover {\n  background-color: var(--bds-btn-disabled-secondary-bg);\n  border-color: var(--bds-btn-disabled-secondary-border);\n}\n\n.bds-btn--tertiary.bds-btn--disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 1;\n  -webkit-text-fill-color: currentColor;\n  background-color: transparent;\n  border-color: transparent;\n  color: var(--bds-btn-disabled-secondary-text);\n}\n.bds-btn--tertiary.bds-btn--disabled:hover {\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.bds-btn__tooltip-anchor {\n  width: fit-content;\n}\n.bds-btn__tooltip-anchor--disabled {\n  cursor: not-allowed;\n}";
  const fileName = "button_button_0e076f2e-006a-47c4-b2d5-283220e0e218";
  const element = document.querySelector("style[data-sass-component='button_button_0e076f2e-006a-47c4-b2d5-283220e0e218']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import classNames from 'classnames';
import Tooltip from '../tooltip';
import { renderSvgGraphic } from '../../utils/renderSvgGraphic';
import { FaChevronDown } from 'react-icons/fa';
import { classes, largeProp, mediumProp, primaryProp, secondaryProp, smallProp, textOnlyProp, defaultSize, defaultVariant, defaultColor, colorTint, colorNeutral, colorNegative, colorPositive } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function renderIcon(icon, alt) {
  if (icon == null) return null;
  if (/*#__PURE__*/React.isValidElement(icon)) return icon;
  return renderSvgGraphic(icon, {
    alt: alt || 'icon',
    'aria-label': alt || 'icon',
    role: 'img'
  });
}
const ButtonWrapper = props => {
  const buttonComp = /*#__PURE__*/_jsx("button", _objectSpread(_objectSpread({
    "data-testid": props.testId,
    className: classNames(props.btnClass),
    onClick: props.onClick,
    disabled: props.disabled,
    type: props.type,
    "aria-pressed": props.toggled != null ? props.toggled : undefined,
    value: props.value,
    name: props.name
  }, props.extraProps), {}, {
    children: props.children
  }));
  if (!props.tooltipText) return buttonComp;

  // The tooltip listens for the hover on its child. A disabled button has pointer-events: none
  // and never gets it, so the wrapper div is the child. One tree for both states, so toggling
  // `disabled` doesn't remount the button; it stays `div > button`, which ButtonGroup selects.
  return /*#__PURE__*/_jsx(Tooltip, {
    title: props.tooltipText,
    position: props.tooltipPosition,
    children: /*#__PURE__*/_jsx("div", {
      className: classNames(classes.tooltipAnchor, {
        [classes.tooltipAnchorDisabled]: props.disabled
      }),
      children: buttonComp
    })
  });
};
const Button = _ref => {
  let {
    variant = defaultVariant,
    size = defaultSize,
    color = defaultColor,
    children,
    onClick,
    disabled = false,
    type,
    value,
    leftSVGIcon,
    rightSVGIcon,
    name,
    tooltipText,
    tooltipPosition = 'top',
    extraProps,
    dropdown = false,
    badge = false,
    loading = false,
    toggled = false,
    iconOnly,
    testId = 'button'
  } = _ref;
  const hasIcon = Boolean(leftSVGIcon || rightSVGIcon);
  const hasContent = children != null && children !== '';
  const isIconOnly = iconOnly === true || !hasContent && hasIcon;
  const colorClass = {
    [classes.buttonColorTint]: color === colorTint,
    [classes.buttonColorNeutral]: color === colorNeutral,
    [classes.buttonColorNegative]: color === colorNegative,
    [classes.buttonColorPositive]: color === colorPositive
  };
  const btnClass = classNames(classes.button, {
    [classes.buttonPrimary]: variant === primaryProp,
    [classes.buttonSecondary]: variant === secondaryProp,
    [classes.buttonTertiary]: variant === textOnlyProp,
    [classes.buttonSmall]: size === smallProp,
    [classes.buttonMedium]: size === mediumProp,
    [classes.buttonLarge]: size === largeProp,
    [classes.disabled]: disabled,
    [classes.iconOnly]: isIconOnly,
    [classes.dropdown]: dropdown,
    [classes.badge]: badge,
    [classes.loading]: loading,
    [classes.toggled]: toggled
  }, colorClass);
  const buttonProps = {
    btnClass,
    onClick,
    disabled,
    type,
    value,
    name,
    tooltipText,
    tooltipPosition,
    extraProps,
    toggled,
    testId
  };
  return /*#__PURE__*/_jsxs(ButtonWrapper, _objectSpread(_objectSpread({}, buttonProps), {}, {
    children: [/*#__PURE__*/_jsxs("span", {
      className: classes.content,
      children: [leftSVGIcon && !rightSVGIcon && renderIcon(leftSVGIcon, 'left Icon'), children, rightSVGIcon && renderIcon(rightSVGIcon, 'right Icon'), dropdown && /*#__PURE__*/_jsx("span", {
        className: classes.caret,
        "aria-hidden": true,
        children: /*#__PURE__*/_jsx(FaChevronDown, {
          size: 12
        })
      })]
    }), loading && /*#__PURE__*/_jsx("span", {
      className: classes.spinner,
      "aria-hidden": true,
      children: /*#__PURE__*/_jsx("span", {
        className: classes.spinnerInner
      })
    })]
  }));
};
Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.oneOf([colorTint, colorNeutral, colorNegative, colorPositive]),
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.any,
  leftSVGIcon: PropTypes.any,
  rightSVGIcon: PropTypes.any,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  tooltipPosition: PropTypes.string,
  extraProps: PropTypes.object,
  dropdown: PropTypes.bool,
  badge: PropTypes.bool,
  loading: PropTypes.bool,
  toggled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  testId: PropTypes.string
};
export default Button;