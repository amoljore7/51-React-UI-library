function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Textfield from '../textfield/textfield';
import Button from '../button';
import ConfirmIcon from '../../assets/icons/confirm.svg?react';
import CancelIcon from '../../assets/icons/cancel.svg?react';
import { getInputContainerClass, getNakedVariantClass } from './utils';
import { rawTextClasses, confirmButtonName, cancelButtonName, escapeKey, inlineEditClasses } from './constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TextfieldInlineEdit = _ref => {
  let {
    value,
    disabled,
    width,
    height,
    onChange,
    placeholder,
    label,
    secondaryLabel,
    error = false,
    helperText,
    errorMsg,
    readOnly,
    onFocus,
    onBlur,
    testId
  } = _ref;
  const [newValue, setNewValue] = useState('');
  const buttonIconsRef = useRef(null);
  const isDirty = (newValue !== null && newValue !== void 0 ? newValue : '') !== (value !== null && value !== void 0 ? value : '');
  const showButtons = isDirty && !readOnly && !disabled;
  useEffect(() => {
    setNewValue(value);
  }, [value]);
  useEffect(() => {
    var _buttonIconsRef$curre;
    if (!isDirty) {
      return undefined;
    }
    const root = (_buttonIconsRef$curre = buttonIconsRef.current) === null || _buttonIconsRef$curre === void 0 ? void 0 : _buttonIconsRef$curre.closest(".".concat(rawTextClasses.container));
    if (!root) {
      return undefined;
    }
    const discardIfOutside = target => {
      if (target && !root.contains(target)) {
        setNewValue(value);
      }
    };
    const handleDocumentMouseDown = event => {
      discardIfOutside(event.target);
    };
    const handleFocusOut = event => {
      discardIfOutside(event.relatedTarget);
    };
    document.addEventListener('mousedown', handleDocumentMouseDown);
    root.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      root.removeEventListener('focusout', handleFocusOut);
    };
  }, [isDirty, value]);
  const resetInputValue = () => {
    setNewValue(value);
  };
  const handleInputChange = event => {
    setNewValue(event.target.value);
  };
  const handleInputBlur = event => {
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };
  const handleKeyUp = event => {
    if (event.key === escapeKey) {
      event.preventDefault();
      resetInputValue();
      event.target.blur();
    }
  };
  const handleConfirmAction = event => {
    event.stopPropagation();
    if (onChange instanceof Function) {
      onChange(newValue);
    }
  };
  const handleCancelAction = () => {
    resetInputValue();
  };
  const iconButtons = /*#__PURE__*/_jsxs("div", {
    ref: buttonIconsRef,
    className: classNames(inlineEditClasses.inlineEditButtons, {
      [inlineEditClasses.inlineEditButtonsVisible]: showButtons
    }),
    children: [/*#__PURE__*/_jsx(Button, {
      name: confirmButtonName,
      testId: testId ? "".concat(testId, "-confirm") : undefined,
      variant: "textOnly",
      size: "small",
      onClick: handleConfirmAction,
      children: /*#__PURE__*/_jsx(ConfirmIcon, {
        "aria-hidden": true,
        focusable: "false"
      })
    }), /*#__PURE__*/_jsx(Button, {
      name: cancelButtonName,
      testId: testId ? "".concat(testId, "-cancel") : undefined,
      variant: "textOnly",
      size: "small",
      onClick: handleCancelAction,
      children: /*#__PURE__*/_jsx(CancelIcon, {
        "aria-hidden": true,
        focusable: "false"
      })
    })]
  });
  const props = {
    type: 'text',
    value: newValue,
    placeholder,
    disabled,
    width,
    height,
    variant: 'naked',
    label,
    secondaryLabel,
    error,
    errorMsg,
    helperText,
    readOnly,
    icon: iconButtons,
    onChange: handleInputChange,
    onBlur: handleInputBlur,
    onKeyUp: handleKeyUp,
    onFocus,
    testId,
    styleClasses: _objectSpread(_objectSpread({}, rawTextClasses), {}, {
      variantNaked: getNakedVariantClass(newValue, placeholder, error),
      inputContainer: getInputContainerClass(readOnly)
    })
  };
  return /*#__PURE__*/_jsx(Textfield, _objectSpread({}, props));
};
TextfieldInlineEdit.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  secondaryLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  errorMsg: PropTypes.string,
  readonly: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  // Applied to the input; the confirm / cancel icon buttons derive
  // `<testId>-confirm` and `<testId>-cancel` from it.
  testId: PropTypes.string
};
export default TextfieldInlineEdit;