function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { classes, dataTestId, defaultHeight, messageSymbols, variantNaked } from "./constants";
import Tooltip from "../tooltip";
import InfoIcon from "../../assets/icons/info.svg?react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Aligned with textarea / Figma: border-radius 8px, padding 12px horizontal 8px vertical, label 14px SemiBold, input 16px/20px */\n:root {\n  --bds-textarea-lines-bg: var(--theme-content-bg);\n  --bds-textarea-lines-border: var(--theme-border);\n  --bds-textarea-lines-border-hover: var(--theme-border-strong);\n  --bds-textarea-lines-border-focus: var(--theme-text-primary);\n  --bds-textarea-lines-border-error: #cf332b;\n  --bds-textarea-lines-border-disabled: var(--theme-border);\n  --bds-textarea-lines-label: var(--theme-text-primary);\n  --bds-textarea-lines-label-disabled: var(--theme-text-secondary);\n  --bds-textarea-lines-helper: var(--theme-text-secondary);\n  --bds-textarea-lines-helper-disabled: var(--theme-text-secondary);\n  --bds-textarea-lines-input-text: var(--theme-text-primary);\n  --bds-textarea-lines-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-lines-input-disabled: var(--theme-border);\n  --bds-textarea-lines-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-lines-error-msg: #cf332b;\n  --bds-textarea-lines-line-number: var(--theme-text-secondary);\n  --bds-textarea-lines-scrollbar-track: rgba(4, 5, 32, 0.05);\n  --bds-textarea-lines-scrollbar-thumb: var(--theme-border);\n}\n\n[data-theme=light] {\n  --bds-textarea-lines-bg: var(--theme-content-bg);\n  --bds-textarea-lines-border: rgba(4, 5, 32, 0.4);\n  --bds-textarea-lines-border-hover: rgba(4, 5, 32, 0.4);\n  --bds-textarea-lines-border-focus: #181143;\n  --bds-textarea-lines-border-error: #cf332b;\n  --bds-textarea-lines-border-disabled: rgba(4, 5, 32, 0.2);\n  --bds-textarea-lines-label: var(--theme-text-primary);\n  --bds-textarea-lines-label-disabled: #9b9ba6;\n  --bds-textarea-lines-helper: var(--theme-text-secondary);\n  --bds-textarea-lines-helper-disabled: #9b9ba6;\n  --bds-textarea-lines-input-text: var(--theme-text-primary);\n  --bds-textarea-lines-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-lines-input-disabled: #cdcdd2;\n  --bds-textarea-lines-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-lines-error-msg: #cf332b;\n  --bds-textarea-lines-line-number: var(--theme-text-secondary);\n  --bds-textarea-lines-scrollbar-track: rgba(4, 5, 32, 0.05);\n  --bds-textarea-lines-scrollbar-thumb: var(--theme-border);\n}\n\n[data-theme=dark] {\n  --bds-textarea-lines-bg: var(--theme-content-bg);\n  --bds-textarea-lines-border: var(--theme-border);\n  --bds-textarea-lines-border-hover: var(--theme-border-strong);\n  --bds-textarea-lines-border-focus: var(--theme-text-primary);\n  --bds-textarea-lines-border-error: #e2615a;\n  --bds-textarea-lines-border-disabled: var(--theme-border);\n  --bds-textarea-lines-label: var(--theme-text-primary);\n  --bds-textarea-lines-label-disabled: #9b9ba6;\n  --bds-textarea-lines-helper: var(--theme-text-secondary);\n  --bds-textarea-lines-helper-disabled: #9b9ba6;\n  --bds-textarea-lines-input-text: var(--theme-text-primary);\n  --bds-textarea-lines-input-placeholder: var(--theme-text-placeholder);\n  --bds-textarea-lines-input-disabled: #9b9ba6;\n  --bds-textarea-lines-input-readonly: var(--theme-text-secondary);\n  --bds-textarea-lines-error-msg: #e2615a;\n  --bds-textarea-lines-line-number: var(--theme-text-secondary);\n  --bds-textarea-lines-scrollbar-track: rgba(255, 255, 255, 0.05);\n  --bds-textarea-lines-scrollbar-thumb: var(--theme-border);\n}\n\n.bds-textarea-line-main-container {\n  font-family: \"OpenSansRegular\";\n}\n.bds-textarea-line-main-container .bds-textarea-line-label {\n  text-align: left;\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  padding-bottom: 0.5rem;\n  color: var(--bds-textarea-lines-label);\n  font-weight: 600;\n  letter-spacing: 0.013125rem;\n}\n.bds-textarea-line-main-container .bds-textarea-line-label-disabled {\n  color: var(--bds-textarea-lines-label-disabled);\n}\n.bds-textarea-line-main-container {\n  /* Figma: assistive text below the input */\n}\n.bds-textarea-line-main-container .bds-textarea-line-helper-row {\n  margin-top: 0.25rem;\n  min-height: 1.125rem;\n}\n.bds-textarea-line-main-container .bds-textarea-line-helper-text {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.25rem;\n  text-align: left;\n  font-size: 0.8125rem;\n  line-height: 1.125rem;\n  color: var(--bds-textarea-lines-helper);\n}\n.bds-textarea-line-main-container .bds-textarea-line-helper-text-disabled {\n  color: var(--bds-textarea-lines-helper-disabled);\n}\n.bds-textarea-line-main-container .bds-textarea-line-helper-icon {\n  flex-shrink: 0;\n  width: 1rem;\n  height: 1rem;\n  color: var(--bds-textarea-lines-helper);\n}\n.bds-textarea-line-main-container .bds-textarea-line-container {\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  border-radius: 0.5rem;\n  border: 0.0625rem solid var(--bds-textarea-lines-border);\n  background: var(--bds-textarea-lines-bg);\n  padding: 0.5rem 0.75rem;\n  gap: 0.5rem;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-disabled {\n  border-color: var(--bds-textarea-lines-border-disabled);\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-error-border {\n  border-width: 0.0625rem;\n  border-color: var(--bds-textarea-lines-border-error);\n}\n.bds-textarea-line-main-container .bds-textarea-line-box {\n  box-sizing: border-box;\n  font-family: \"OpenSansRegular\";\n  font-weight: 400;\n  width: 100%;\n  font-size: 1rem;\n  line-height: 1.25rem;\n  resize: none;\n  background: transparent;\n  overflow-y: hidden;\n  overflow-x: auto;\n  color: var(--bds-textarea-lines-input-text);\n  min-height: 100%;\n  border: none;\n  outline: none;\n  padding: 0;\n}\n.bds-textarea-line-main-container .bds-textarea-line-box::placeholder {\n  color: var(--bds-textarea-lines-input-placeholder);\n}\n.bds-textarea-line-main-container .bds-textarea-line-box-disabled {\n  color: var(--bds-textarea-lines-input-disabled);\n}\n.bds-textarea-line-main-container .bds-textarea-line-box-disabled::placeholder {\n  color: var(--bds-textarea-lines-input-disabled);\n}\n.bds-textarea-line-main-container .bds-textarea-line-box-read-only {\n  color: var(--bds-textarea-lines-input-readonly);\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-focus:hover:not(.bds-textarea-line-container-disabled):not(.bds-textarea-line-container-error-border) {\n  border-width: 0.125rem;\n  border-color: var(--bds-textarea-lines-border-hover);\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-focus:focus-within {\n  border-width: 0.125rem;\n  border-color: var(--bds-textarea-lines-border-focus);\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-error-border:hover:not(.bds-textarea-line-container-disabled) {\n  border-width: 0.125rem;\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-line-main-container .bds-textarea-line-container-error-border:focus-within {\n  border-width: 0.125rem;\n  padding: 0.4375rem 0.6875rem;\n}\n.bds-textarea-line-main-container .bds-error-msg-text {\n  text-align: left;\n  font-size: 0.8125rem;\n  color: var(--bds-textarea-lines-error-msg);\n  min-height: 1.0625rem;\n}\n.bds-textarea-line-main-container .bds-naked {\n  border: 0;\n  outline: 0;\n  padding: 0;\n  background: transparent;\n}\n.bds-textarea-line-main-container ::-webkit-scrollbar-track {\n  border-radius: 0.25rem;\n  background: var(--bds-textarea-lines-scrollbar-track);\n}\n.bds-textarea-line-main-container ::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n.bds-textarea-line-main-container ::-webkit-scrollbar-thumb {\n  border-radius: 0.75rem;\n  background: var(--bds-textarea-lines-scrollbar-thumb);\n}\n\n.line-number {\n  box-sizing: border-box;\n  padding-right: 0.5rem;\n  margin-right: 0;\n  font-size: 0.8125rem;\n  line-height: 1.25rem;\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  color: var(--bds-textarea-lines-line-number);\n}\n.line-number div {\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  min-height: 1.25rem;\n  padding-top: 0;\n}\n.line-number div span {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 1.5rem;\n  min-width: 1.5rem;\n}\n.line-number div span.error {\n  font-size: 1.375rem;\n  line-height: 1.3125rem;\n  color: var(--bds-textarea-lines-error-msg);\n}\n.line-number div span.warning {\n  font-size: 1.125rem;\n  color: #dd8c04;\n}\n\n[data-theme=dark] .line-number .error {\n  color: var(--bds-textarea-lines-error-msg);\n}\n[data-theme=dark] .line-number .warning {\n  color: #fcb92d;\n}";
  const fileName = "lines_textarea-lines_0269552f-709b-4914-8759-51baba10e73b";
  const element = document.querySelector("style[data-sass-component='lines_textarea-lines_0269552f-709b-4914-8759-51baba10e73b']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const TextareaLines = _ref => {
  let {
    value = "",
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
    name,
    lineMessages
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
  const lineCount = (value === null || value === void 0 ? void 0 : value.split("\n").length) || 1;
  const [numberOfLines, setNumberOfLines] = useState(lineCount);
  const [lineMessageMap, setLineMessageMap] = useState({});
  const textAreaRef = useRef(null);
  useEffect(() => {
    setNumberOfLines((value === null || value === void 0 ? void 0 : value.split("\n").length) || 1);
  }, [value]);
  useEffect(() => {
    if (lineMessages !== null && lineMessages !== void 0 && lineMessages.length) {
      setLineMessageMap(Object.fromEntries(lineMessages.filter(Boolean).map(lineMessage => [lineMessage.line, {
        type: lineMessage.type,
        message: lineMessage.message
      }])));
    } else {
      setLineMessageMap({});
    }
  }, [lineMessages]);
  useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;
    const handleInput = () => {
      el.style.height = "auto";
      el.style.height = "".concat(el.scrollHeight + 8, "px");
    };
    el.addEventListener("input", handleInput);
    return () => el.removeEventListener("input", handleInput);
  }, []);
  const LineNumber = _ref2 => {
    var _lineMessageMap$lineN, _lineMessageMap$lineN2;
    let {
      lineNumber
    } = _ref2;
    const messageType = (_lineMessageMap$lineN = lineMessageMap[lineNumber]) === null || _lineMessageMap$lineN === void 0 ? void 0 : _lineMessageMap$lineN.type;
    const message = (_lineMessageMap$lineN2 = lineMessageMap[lineNumber]) === null || _lineMessageMap$lineN2 === void 0 ? void 0 : _lineMessageMap$lineN2.message;
    return message ? /*#__PURE__*/_jsx(Tooltip, {
      title: message || null,
      position: "bottom-right",
      children: /*#__PURE__*/_jsxs("div", {
        children: [messageType && /*#__PURE__*/_jsx("span", {
          className: messageType,
          children: messageSymbols[messageType]
        }), /*#__PURE__*/_jsx("span", {
          children: lineNumber
        })]
      })
    }) : /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("span", {}), /*#__PURE__*/_jsx("span", {
        children: lineNumber
      })]
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.container,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, textareaLabelClass)),
      children: label
    }), /*#__PURE__*/_jsxs("div", {
      style: {
        width: width !== null && width !== void 0 ? width : undefined,
        height: height !== null && height !== void 0 ? height : undefined
      },
      children: [/*#__PURE__*/_jsxs("div", {
        className: classNames(_objectSpread({}, textareaWrapper)),
        children: [/*#__PURE__*/_jsx("div", {
          className: "line-number",
          "data-testid": "line-number",
          children: Array.from({
            length: numberOfLines
          }, (_, i) => /*#__PURE__*/_jsx(LineNumber, {
            lineNumber: i + 1
          }, i))
        }), /*#__PURE__*/_jsx("textarea", {
          ref: textAreaRef,
          className: classNames(_objectSpread({}, textareaClass)),
          onBlur: onBlur,
          onFocus: onFocus,
          value: value,
          name: name,
          placeholder: placeholder,
          onChange: onChange,
          disabled: disabled,
          readOnly: readOnly,
          "data-testid": dataTestId,
          wrap: "off"
        })]
      }), error && errorMsg && /*#__PURE__*/_jsx("div", {
        className: classes.errorMsgText,
        children: errorMsg
      })]
    }), helperText && /*#__PURE__*/_jsx("div", {
      className: classes.helperRow,
      children: /*#__PURE__*/_jsxs("div", {
        className: classNames(_objectSpread({}, textareaHelperTextClass)),
        children: [/*#__PURE__*/_jsx(InfoIcon, {
          className: classes.helperIcon,
          "aria-hidden": true
        }), /*#__PURE__*/_jsx("span", {
          children: helperText
        })]
      })
    })]
  });
};
TextareaLines.propTypes = {
  value: PropTypes.string,
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
  variant: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  lineMessages: PropTypes.arrayOf(PropTypes.shape({
    line: PropTypes.number.isRequired,
    message: PropTypes.string,
    type: PropTypes.string
  }))
};
export default TextareaLines;