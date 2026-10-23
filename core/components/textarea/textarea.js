function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from "react";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma: textArea - border-radius 8px, padding 12px horizontal 8px vertical, label 14px SemiBold, input 16px/20px, assistive 13px, character count 11px */\n:root {\n  --bds-textarea-bg: var(--theme-content-bg);\n  --bds-textarea-border: var(--theme-border);\n  --bds-textarea-border-hover: var(--theme-border-strong);\n  --bds-textarea-border-focus: var(--theme-text-primary);\n  --bds-textarea-border-error: #cf332b;\n  --bds-textarea-border-disabled: var(--theme-border);\n  --bds-textarea-label: var(--theme-text-primary);\n  --bds-textarea-label-disabled: var(--theme-text-secondary);\n  --bds-textarea-helper: var(--theme-text-secondary);\n  --bds-textarea-helper-disabled: var(--theme-text-secondary);\n  --bds-textarea-input-text: var(--theme-text-primary);\n  --bds-textarea-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-input-placeholder-focused: var(--theme-text-placeholder);\n  --bds-textarea-input-disabled: var(--theme-border);\n  --bds-textarea-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-error-msg: #cf332b;\n  --bds-textarea-character-count: var(--theme-text-placeholder);\n  --bds-textarea-scrollbar-track: rgba(4, 5, 32, 0.05);\n  --bds-textarea-scrollbar-thumb: var(--theme-border);\n}\n\n[data-theme=light] {\n  --bds-textarea-bg: var(--theme-content-bg);\n  --bds-textarea-border: rgba(4, 5, 32, 0.4);\n  --bds-textarea-border-hover: rgba(4, 5, 32, 0.4);\n  --bds-textarea-border-focus: #181143;\n  --bds-textarea-border-error: #cf332b;\n  --bds-textarea-border-disabled: rgba(4, 5, 32, 0.2);\n  --bds-textarea-label: var(--theme-text-primary);\n  --bds-textarea-label-disabled: #9b9ba6;\n  --bds-textarea-helper: var(--theme-text-secondary);\n  --bds-textarea-helper-disabled: #9b9ba6;\n  --bds-textarea-input-text: var(--theme-text-primary);\n  --bds-textarea-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-input-placeholder-focused: #cdcdd2;\n  --bds-textarea-input-disabled: #cdcdd2;\n  --bds-textarea-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-error-msg: #cf332b;\n  --bds-textarea-character-count: var(--theme-text-placeholder);\n  --bds-textarea-scrollbar-track: rgba(4, 5, 32, 0.05);\n  --bds-textarea-scrollbar-thumb: var(--theme-border);\n}\n\n[data-theme=dark] {\n  --bds-textarea-bg: var(--theme-content-bg);\n  --bds-textarea-border: var(--theme-border);\n  --bds-textarea-border-hover: var(--theme-border-strong);\n  --bds-textarea-border-focus: var(--theme-text-primary);\n  --bds-textarea-border-error: #e2615a;\n  --bds-textarea-border-disabled: var(--theme-border);\n  --bds-textarea-label: var(--theme-text-primary);\n  --bds-textarea-label-disabled: #9b9ba6;\n  --bds-textarea-helper: var(--theme-text-secondary);\n  --bds-textarea-helper-disabled: #9b9ba6;\n  --bds-textarea-input-text: var(--theme-text-primary);\n  --bds-textarea-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-input-placeholder-focused: #cdcdd2;\n  --bds-textarea-input-disabled: #9b9ba6;\n  --bds-textarea-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-error-msg: #e2615a;\n  --bds-textarea-character-count: var(--theme-text-placeholder);\n  --bds-textarea-scrollbar-track: rgba(255, 255, 255, 0.05);\n  --bds-textarea-scrollbar-thumb: var(--theme-border);\n}\n\n.bds-textarea-main-container {\n  font-family: \"OpenSansRegular\";\n}\n.bds-textarea-main-container .bds-textarea-label {\n  text-align: left;\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  padding-bottom: 0.5rem;\n  color: var(--bds-textarea-label);\n  font-weight: 600;\n  letter-spacing: 0.013125rem;\n}\n.bds-textarea-main-container .bds-textarea-label-disabled {\n  color: var(--bds-textarea-label-disabled);\n}\n.bds-textarea-main-container {\n  /* Figma: assistive text + character count in one row below the input; assistive left, count right */\n}\n.bds-textarea-main-container .bds-textarea-helper-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n  padding-top: 0.25rem;\n  min-height: 1.25rem;\n}\n.bds-textarea-main-container .bds-textarea-helper-text {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.25rem;\n  text-align: left;\n  font-size: 0.8125rem;\n  line-height: 1.125rem;\n  color: var(--bds-textarea-helper);\n}\n.bds-textarea-main-container .bds-textarea-helper-text-disabled {\n  color: var(--bds-textarea-helper-disabled);\n}\n.bds-textarea-main-container .bds-textarea-helper-icon {\n  flex-shrink: 0;\n  width: 1rem;\n  height: 1rem;\n  color: var(--bds-textarea-helper);\n}\n.bds-textarea-main-container .bds-textarea-container {\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  border-radius: 0.5rem;\n  border: 0.0625rem solid var(--bds-textarea-border);\n  background: var(--bds-textarea-bg);\n  padding: 0.5rem 0.75rem;\n  gap: 0.5rem;\n}\n.bds-textarea-main-container .bds-textarea-container-disabled {\n  border-color: var(--bds-textarea-border-disabled);\n}\n.bds-textarea-main-container .bds-textarea-container-error-border {\n  border-width: 0.0625rem;\n  border-color: var(--bds-textarea-border-error);\n}\n.bds-textarea-main-container .bds-textarea-box {\n  font-family: \"OpenSansRegular\";\n  font-weight: 400;\n  width: 100%;\n  min-height: 1.25rem;\n  padding: 0;\n  font-size: 1rem;\n  line-height: 1.25rem;\n  resize: none;\n  background: transparent;\n  vertical-align: middle;\n  outline: none;\n  border: none;\n  -o-text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n  overflow-y: auto;\n  color: var(--bds-textarea-input-text);\n}\n.bds-textarea-main-container .bds-textarea-box::placeholder {\n  color: var(--bds-textarea-input-placeholder);\n}\n.bds-textarea-main-container .bds-textarea-box-disabled {\n  color: var(--bds-textarea-input-disabled);\n}\n.bds-textarea-main-container .bds-textarea-box-disabled::placeholder {\n  color: var(--bds-textarea-input-disabled);\n}\n.bds-textarea-main-container .bds-textarea-box-read-only {\n  color: var(--bds-textarea-input-readonly);\n}\n.bds-textarea-main-container .bds-textarea-container-focus:hover:not(.bds-textarea-container-disabled):not(.bds-textarea-container-error-border) {\n  border-width: 0.125rem;\n  border-color: var(--bds-textarea-border-hover);\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-main-container .bds-textarea-container-focus:focus-within {\n  border-width: 0.125rem;\n  border-color: var(--bds-textarea-border-focus);\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-main-container .bds-textarea-container-focus:focus-within .bds-textarea-box::placeholder {\n  color: var(--bds-textarea-input-placeholder-focused);\n}\n.bds-textarea-main-container .bds-textarea-container-error-border:hover:not(.bds-textarea-container-disabled) {\n  border-width: 0.125rem;\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-main-container .bds-textarea-container-error-border:focus-within {\n  border-width: 0.125rem;\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-main-container .bds-error-msg-text {\n  text-align: left;\n  font-size: 0.8125rem;\n  color: var(--bds-textarea-error-msg);\n  min-height: 1.0625rem;\n}\n.bds-textarea-main-container .bds-naked {\n  border: 0;\n  outline: 0;\n  padding: 0.5rem 0;\n  background: transparent;\n}\n.bds-textarea-main-container {\n  /* Character count when it's the only item below textarea (no helper row) */\n}\n.bds-textarea-main-container .bds-textarea-char-count-only {\n  margin-top: 0.25rem;\n  padding-top: 0.25rem;\n  text-align: right;\n}\n.bds-textarea-main-container .bds-textarea-character-count-left-text {\n  display: inline-block;\n  font-size: 0.6875rem;\n  line-height: 1rem;\n  color: var(--bds-textarea-character-count, #686979);\n  text-align: right;\n  flex-shrink: 0;\n  margin-left: auto;\n  min-width: fit-content;\n  letter-spacing: 0.01875rem;\n}\n.bds-textarea-main-container {\n  /* Scrollbar - Figma: 4px width, radius 4px track, radius 12px thumb */\n}\n.bds-textarea-main-container .bds-textarea-box::-webkit-scrollbar-track {\n  border-radius: 0.25rem;\n  background: var(--bds-textarea-scrollbar-track);\n}\n.bds-textarea-main-container .bds-textarea-box::-webkit-scrollbar {\n  width: 0.25rem;\n}\n.bds-textarea-main-container .bds-textarea-box::-webkit-scrollbar-thumb {\n  border-radius: 0.75rem;\n  background: var(--bds-textarea-scrollbar-thumb);\n}";
  const fileName = "textarea_textarea_4929e328-b317-43fa-826f-0ea0bb0a9592";
  const element = document.querySelector("style[data-sass-component='textarea_textarea_4929e328-b317-43fa-826f-0ea0bb0a9592']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import PropTypes from "prop-types";
import classNames from "classnames";
import { dataTestIdForCharCount, variantNaked, defaultHeight, dataTestId, classes } from "./constants";
import InfoIcon from "../../assets/icons/info.svg?react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Textarea = _ref => {
  var _value$length;
  let {
    showCharLeftCount = false,
    maxLength,
    value,
    label,
    placeholder,
    error = false,
    helperText,
    variant,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    errorMsg,
    readOnly = false,
    width,
    height = defaultHeight,
    name
  } = _ref;
  const textareaLabelClass = {
    [classes.textareaLabel]: true,
    [classes.textareaLabelDisabled]: disabled
  };
  const textareaHelperTextClass = {
    [classes.textareaHelperText]: true,
    [classes.textareaHelperTextDisabled]: disabled
  };
  const textareaWrapper = {
    [classes.textareaContainer]: true,
    [classes.textareaContainerDisabled]: disabled,
    [classes.textareaContainerErrorBorder]: error,
    [classes.variantNaked]: variant === variantNaked,
    [classes.textareaContainerFocus]: !readOnly
  };
  const textareaClass = {
    [classes.textareaBox]: true,
    [classes.textareaBoxDisabled]: disabled,
    [classes.textareaBoxReadOnly]: readOnly,
    [classes.variantNaked]: variant === variantNaked
  };
  const currentLength = (_value$length = value === null || value === void 0 ? void 0 : value.length) !== null && _value$length !== void 0 ? _value$length : 0;
  const hasMaxLength = maxLength != null && parseInt(maxLength, 10) > 0;
  const showCharCount = hasMaxLength && showCharLeftCount;
  return /*#__PURE__*/_jsxs("div", {
    className: classes.container,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, textareaLabelClass)),
      children: label
    }), /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, textareaWrapper)),
      style: {
        width: width !== null && width !== void 0 ? width : undefined,
        height: variant === variantNaked ? "auto" : height
      },
      children: /*#__PURE__*/_jsx("textarea", _objectSpread({
        className: classNames(_objectSpread({}, textareaClass)),
        onBlur: onBlur,
        onFocus: onFocus,
        value: value,
        name: name,
        placeholder: placeholder,
        onChange: onChange,
        disabled: disabled,
        readOnly: readOnly,
        "data-testid": dataTestId
      }, hasMaxLength && {
        maxLength
      }))
    }), error && errorMsg && /*#__PURE__*/_jsx("div", {
      className: classes.errorMsgText,
      children: errorMsg
    }), helperText && /*#__PURE__*/_jsxs("div", {
      className: classes.helperRow,
      style: width ? {
        width
      } : undefined,
      children: [/*#__PURE__*/_jsxs("div", {
        className: classNames(_objectSpread({}, textareaHelperTextClass)),
        children: [/*#__PURE__*/_jsx(InfoIcon, {
          className: classes.helperIcon,
          "aria-hidden": true
        }), /*#__PURE__*/_jsx("span", {
          children: helperText
        })]
      }), showCharCount && /*#__PURE__*/_jsx("div", {
        "data-testid": dataTestIdForCharCount,
        className: classes.charLeftCount,
        children: "".concat(currentLength, "/").concat(maxLength)
      })]
    }), showCharCount && !helperText && /*#__PURE__*/_jsx("div", {
      className: classes.charCountOnly,
      style: width ? {
        width
      } : undefined,
      children: /*#__PURE__*/_jsx("span", {
        "data-testid": dataTestIdForCharCount,
        className: classes.charLeftCount,
        children: "".concat(currentLength, "/").concat(maxLength)
      })
    })]
  });
};
Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  showCharLeftCount: PropTypes.bool,
  maxLength: PropTypes.number,
  variant: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};
export default Textarea;