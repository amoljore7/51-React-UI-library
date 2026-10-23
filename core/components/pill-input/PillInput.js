function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultContainerWidth, enterKeyValue, backspaceKeyValue, classes } from './constants';
import Pill from '../pill';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-pill-input-wrapper {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.375rem;\n  min-height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.125rem solid var(--bds-textfield-border);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  background-color: var(--bds-textfield-bg);\n  font-family: \"OpenSansRegular\";\n  transition: border-color 0.15s ease;\n}\n.bds-pill-input-wrapper:not(.bds-pill-input-container-disabled):hover:not(:focus-within) {\n  border-color: var(--bds-textfield-border-hover);\n}\n.bds-pill-input-wrapper:focus-within {\n  border-color: var(--bds-textfield-border-focus);\n}\n.bds-pill-input-wrapper .bds-pill-text-input {\n  border: none;\n  outline: none;\n  flex: 1;\n  min-width: 5rem;\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  background: transparent;\n  color: var(--bds-textfield-input-text);\n}\n.bds-pill-input-wrapper .bds-pill-text-input::placeholder {\n  color: var(--bds-textfield-input-placeholder);\n}\n.bds-pill-input-wrapper .bds-pill-text-input:disabled {\n  background-color: transparent;\n  color: var(--bds-textfield-input-disabled);\n}\n.bds-pill-input-wrapper .bds-pill-text-input:disabled::placeholder {\n  color: var(--bds-textfield-input-disabled);\n}\n\n.bds-pill-input-container-error-border {\n  border: 0.125rem solid var(--bds-textfield-border-error) !important;\n}\n\n.bds-pill-input-container-disabled {\n  border: 0.125rem solid var(--bds-textfield-border-disabled);\n  cursor: default;\n}\n\n.bds-pill-input-error-msg-text {\n  font-size: 0.8125rem;\n  color: var(--bds-textfield-error-msg);\n  height: 1.0625rem;\n}";
  const fileName = "PillInput_pillInput_014422e2-c6fb-49b2-b150-cc74c889b88c";
  const element = document.querySelector("style[data-sass-component='PillInput_pillInput_014422e2-c6fb-49b2-b150-cc74c889b88c']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const PillInput = _ref => {
  let {
    width = defaultContainerWidth,
    pillListData = [],
    handleUpdatePillList,
    handleDeletePill,
    error = false,
    errorMsg,
    isValid,
    setError,
    disabled = false,
    placeholder = ''
  } = _ref;
  const pillInputContainer = {
    [classes.pillInputContainer]: true,
    [classes.inputContainerErrorBorder]: error,
    [classes.inputContainerDisabled]: disabled
  };
  const [pillValue, setPillValue] = useState('');

  // To handle the data on key enter
  const handleKeyDown = e => {
    // To add newly added data into pill component
    if (e.keyCode === enterKeyValue && e.target.value.trim()) {
      onBlur(e);
    }
    // Remove the last pill on Backspace
    if (e.keyCode === backspaceKeyValue && !e.target.value && pillListData.length > 0) {
      handleDeletePill(pillListData[pillListData.length - 1]);
    }
  };
  const onBlur = e => {
    const trimmedValue = e.target.value.trim();
    if (isValid && !isValid(trimmedValue)) return;
    trimmedValue && handleUpdatePillList(trimmedValue);
    setPillValue('');
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      className: classNames(_objectSpread({}, pillInputContainer)),
      style: {
        width: width
      },
      children: [pillListData === null || pillListData === void 0 ? void 0 : pillListData.map((pill, index) => {
        return /*#__PURE__*/_jsx(Pill, {
          disabled: disabled,
          onDelete: () => handleDeletePill(pill),
          label: pill
        }, "pill-input-data-".concat(index));
      }), /*#__PURE__*/_jsx("input", {
        "data-testid": "pill-list-input",
        className: classes.textInput,
        placeholder: placeholder,
        value: pillValue,
        type: "text",
        onChange: e => {
          setPillValue(e.target.value);
          setError && setError(false);
        },
        onBlur: onBlur,
        onKeyDown: handleKeyDown,
        disabled: disabled
      })]
    }), error && /*#__PURE__*/_jsx("div", {
      className: classes.errorMsgText,
      children: errorMsg
    })]
  });
};
PillInput.propTypes = {
  width: PropTypes.number,
  pillListData: PropTypes.any,
  handleUpdatePillList: PropTypes.func,
  handleDeletePill: PropTypes.func
};
export default PillInput;