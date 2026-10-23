function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React from 'react';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma: Label 14px SemiBold, Input 16px/20px, Assistive 13px, Character count 11px */\n/* Figma tokens: border-rest rgba(4,5,32,0.4), border-focused #181143, border-disabled rgba(4,5,32,0.2), onbkg-text-notfilled #9b9ba6, onbkg-text-notfilled-focused #cdcdd2, onbkg-disabled #cdcdd2 */\n:root {\n  --bds-textfield-bg: var(--theme-content-bg);\n  --bds-textfield-border: var(--theme-border);\n  --bds-textfield-border-hover: var(--theme-border-strong);\n  --bds-textfield-border-focus: var(--theme-text-primary);\n  --bds-textfield-border-error: #cf332b;\n  --bds-textfield-border-disabled: var(--theme-border);\n  --bds-textfield-label: var(--theme-text-primary);\n  --bds-textfield-label-disabled: var(--theme-text-secondary);\n  --bds-textfield-secondary-label: var(--theme-text-secondary);\n  --bds-textfield-helper: var(--theme-text-secondary);\n  --bds-textfield-helper-disabled: var(--theme-text-secondary);\n  --bds-textfield-input-text: var(--theme-text-primary);\n  --bds-textfield-input-placeholder: var(--theme-text-placeholder);\n  --bds-textfield-input-placeholder-focused: var(--theme-text-placeholder);\n  --bds-textfield-input-disabled: var(--theme-border);\n  --bds-textfield-input-readonly: var(--theme-text-secondary);\n  --bds-textfield-error-msg: #cf332b;\n  --bds-textfield-character-count: var(--theme-text-placeholder);\n  --bds-textfield-inline-edit-hover-bg: var(--theme-hover-bg);\n}\n\n[data-theme=light] {\n  --bds-textfield-bg: var(--theme-content-bg);\n  --bds-textfield-border: rgba(4, 5, 32, 0.4);\n  --bds-textfield-border-hover: rgba(4, 5, 32, 0.4);\n  --bds-textfield-border-focus: #181143;\n  --bds-textfield-border-error: #cf332b;\n  --bds-textfield-border-disabled: rgba(4, 5, 32, 0.2);\n  --bds-textfield-label: var(--theme-text-primary);\n  --bds-textfield-label-disabled: #9b9ba6;\n  --bds-textfield-secondary-label: var(--theme-text-secondary);\n  --bds-textfield-helper: var(--theme-text-secondary);\n  --bds-textfield-helper-disabled: #9b9ba6;\n  --bds-textfield-input-text: var(--theme-text-primary);\n  --bds-textfield-input-placeholder: var(--theme-text-placeholder);\n  --bds-textfield-input-placeholder-focused: #cdcdd2;\n  --bds-textfield-input-disabled: #cdcdd2;\n  --bds-textfield-input-readonly: var(--theme-text-secondary);\n  --bds-textfield-error-msg: #cf332b;\n  --bds-textfield-character-count: var(--theme-text-placeholder);\n  --bds-textfield-inline-edit-hover-bg: var(--theme-hover-bg);\n}\n\n[data-theme=dark] {\n  --bds-textfield-bg: var(--theme-content-bg);\n  --bds-textfield-border: var(--theme-border);\n  --bds-textfield-border-hover: var(--theme-border-strong);\n  --bds-textfield-border-focus: var(--theme-text-primary);\n  --bds-textfield-border-error: #e2615a;\n  --bds-textfield-border-disabled: var(--theme-border);\n  --bds-textfield-label: var(--theme-text-primary);\n  --bds-textfield-label-disabled: #9b9ba6;\n  --bds-textfield-secondary-label: var(--theme-text-secondary);\n  --bds-textfield-helper: var(--theme-text-secondary);\n  --bds-textfield-helper-disabled: #9b9ba6;\n  --bds-textfield-input-text: var(--theme-text-primary);\n  --bds-textfield-input-placeholder: var(--theme-text-placeholder);\n  --bds-textfield-input-placeholder-focused: #9b9ba6;\n  --bds-textfield-input-disabled: #9b9ba6;\n  --bds-textfield-input-readonly: var(--theme-text-secondary);\n  --bds-textfield-error-msg: #e2615a;\n  --bds-textfield-character-count: var(--theme-text-placeholder);\n  --bds-textfield-inline-edit-hover-bg: var(--theme-hover-bg);\n}\n\n.bds-textfield-container {\n  font-family: \"OpenSansRegular\";\n  background-color: var(--bds-textfield-bg);\n}\n.bds-textfield-container .bds-textfield-input-assistive-wrapper {\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n}\n.bds-textfield-container .bds-label {\n  text-align: left;\n  font-size: 0.875rem;\n  line-height: 1.125rem;\n  padding-bottom: 0.5rem;\n  color: var(--bds-textfield-label);\n  font-weight: 600;\n  letter-spacing: 0.013125rem;\n}\n.bds-textfield-container .bds-label-disabled {\n  color: var(--bds-textfield-label-disabled);\n}\n.bds-textfield-container .bds-secondary-label {\n  color: var(--bds-textfield-secondary-label);\n}\n.bds-textfield-container .bds-helper-text {\n  text-align: left;\n  color: var(--bds-textfield-helper);\n  font-size: 0.8125rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.015rem;\n}\n.bds-textfield-container .bds-textfield-assistive-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 100%;\n  padding-top: 0.25rem;\n  min-height: 1.125rem;\n}\n.bds-textfield-container .bds-textfield-assistive-row-left {\n  flex: 1 1 0;\n  min-width: 0;\n  overflow: hidden;\n}\n.bds-textfield-container .bds-textfield-assistive-text-block {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem;\n  min-width: 0;\n  overflow: hidden;\n}\n.bds-textfield-container .bds-textfield-assistive-text-block .bds-helper-text,\n.bds-textfield-container .bds-textfield-assistive-text-block .bds-helper-text-disabled {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.bds-textfield-container .bds-textfield-assistive-text-icon {\n  width: 1rem;\n  height: 1rem;\n  flex-shrink: 0;\n  color: var(--bds-textfield-helper);\n}\n.bds-textfield-container .bds-textfield-assistive-text-block.bds-helper-text-disabled .bds-textfield-assistive-text-icon {\n  color: var(--bds-textfield-helper-disabled);\n}\n.bds-textfield-container .bds-textfield-character-count {\n  display: inline-block;\n  flex-shrink: 0;\n  font-family: \"OpenSansRegular\";\n  font-size: 0.6875rem;\n  line-height: 1rem;\n  letter-spacing: 0.01875rem;\n  color: var(--bds-textfield-character-count);\n  min-width: fit-content;\n}\n.bds-textfield-container .bds-helper-text-disabled {\n  color: var(--bds-textfield-helper-disabled);\n}\n.bds-textfield-container .bds-input-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.125rem solid var(--bds-textfield-border);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  background-color: var(--bds-textfield-bg);\n  font-family: \"OpenSansRegular\";\n  transition: border-color 0.15s ease;\n}\n.bds-textfield-container .bds-input-container:not(.bds-input-container-disabled):hover:not(:focus-within) {\n  border-color: var(--bds-textfield-border-hover);\n}\n.bds-textfield-container .bds-inline-edit-input-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.125rem solid var(--bds-textfield-border);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  background-color: var(--bds-textfield-bg);\n  font-family: \"OpenSansRegular\";\n  transition: border-color 0.15s ease;\n  padding: 0.4375rem 0.9375rem 0.4375rem 0;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons {\n  display: none;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons > button {\n  padding: 0;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons > button:first-child {\n  padding-right: 0.2rem;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons > button:hover, .bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons > button:focus {\n  background-color: transparent;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons > button > img {\n  height: 1.1875rem;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons .bds-input-box-read-only {\n  display: none !important;\n}\n.bds-textfield-container .bds-inline-edit-input-container .bds-inline-edit-input-box-buttons--visible {\n  display: flex;\n}\n.bds-textfield-container .bds-inline-edit-input-container:hover {\n  background-color: var(--bds-textfield-inline-edit-hover-bg);\n}\n.bds-textfield-container .bds-inline-edit-input-container:hover:focus-within {\n  background-color: var(--bds-textfield-bg);\n}\n.bds-textfield-container .bds-inline-edit-input-container-read-only {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.125rem solid var(--bds-textfield-border);\n  border-radius: 0.5rem;\n  box-sizing: border-box;\n  background-color: var(--bds-textfield-bg);\n  font-family: \"OpenSansRegular\";\n  transition: border-color 0.15s ease;\n  padding: 0.4375rem 0.9375rem 0.4375rem 0;\n}\n.bds-textfield-container .bds-inline-edit-input-container-read-only .bds-inline-edit-input-box-buttons {\n  display: none;\n}\n.bds-textfield-container .bds-inline-edit-input-container-read-only:hover {\n  background-color: unset;\n}\n.bds-textfield-container .bds-input-container-disabled {\n  border: 0.125rem solid var(--bds-textfield-border-disabled);\n  cursor: default;\n}\n.bds-textfield-container .bds-inline.bds-input-container-disabled {\n  border: 0;\n  border-bottom: 0.125rem solid var(--bds-textfield-border-disabled);\n}\n.bds-textfield-container .bds-inline-edit-input-container-disabled:hover {\n  background-color: unset;\n}\n.bds-textfield-container .bds-input-container-error-border {\n  border: 0.125rem solid var(--bds-textfield-border-error);\n}\n.bds-textfield-container .bds-input-container-focus:focus-within {\n  border-color: var(--bds-textfield-border-focus);\n}\n.bds-textfield-container .bds-input-container > input {\n  padding: 0;\n}\n.bds-textfield-container .bds-input-container.bds-input-with-icon {\n  padding: 0.5rem inherit;\n}\n.bds-textfield-container .bds-input-box {\n  font-family: \"OpenSansRegular\";\n  width: 100%;\n  font-size: 1rem;\n  background: transparent;\n  vertical-align: middle;\n  line-height: 1.25rem;\n  height: 1.5rem;\n  color: var(--bds-textfield-input-text);\n  outline: none;\n  border: none;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  -ms-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n}\n.bds-textfield-container .bds-input-box::placeholder {\n  color: var(--bds-textfield-input-placeholder);\n}\n.bds-textfield-container .bds-input-container-focus:focus-within .bds-input-box::placeholder {\n  color: var(--bds-textfield-input-placeholder-focused);\n}\n.bds-textfield-container .bds-input-box-disabled {\n  color: var(--bds-textfield-input-disabled);\n}\n.bds-textfield-container .bds-input-box-disabled::placeholder {\n  color: var(--bds-textfield-input-disabled);\n}\n.bds-textfield-container .bds-input-box-read-only {\n  color: var(--bds-textfield-input-readonly);\n}\n.bds-textfield-container .bds-icon-box-right {\n  display: flex;\n  vertical-align: middle;\n  height: 1.5rem;\n  cursor: pointer;\n  align-items: center;\n  width: 1.5rem;\n  margin-left: 1rem;\n}\n.bds-textfield-container .bds-icon-box-left {\n  display: flex;\n  vertical-align: middle;\n  height: 1.5rem;\n  cursor: pointer;\n  align-items: center;\n  width: 1.5rem;\n  margin-right: 0.5rem;\n}\n.bds-textfield-container .bds-inline-edit-icon-box {\n  display: flex;\n  vertical-align: middle;\n  height: 1.5rem;\n  cursor: pointer;\n  align-items: center;\n  width: 2.125rem;\n  margin-left: 0.5rem;\n}\n.bds-textfield-container .bds-icon-box-left svg,\n.bds-textfield-container .bds-icon-box-right svg,\n.bds-textfield-container .bds-inline-edit-icon-box svg {\n  color: var(--bds-textfield-input-text);\n}\n.bds-textfield-container .bds-error-msg-text {\n  text-align: left;\n  font-size: 0.8125rem;\n  color: var(--bds-textfield-error-msg);\n  height: 1.0625rem;\n}\n.bds-textfield-container .bds-inline {\n  border: 0;\n  outline: 0;\n  border-radius: initial;\n  border-bottom: 0.0625rem solid var(--bds-textfield-border);\n}\n.bds-textfield-container .bds-input-container.bds-inline:hover {\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 0.0625rem solid var(--bds-textfield-border-hover);\n}\n.bds-textfield-container .bds-input-container-focus.bds-inline:focus-within {\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 0.125rem solid var(--bds-textfield-border-focus);\n  padding-top: 0.5rem;\n  padding-left: 0.8125rem;\n  padding-bottom: 0.5625rem;\n}\n.bds-textfield-container .bds-input-container-focus.bds-input-with-icon.bds-inline:focus-within {\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  border-bottom: 0.125rem solid var(--bds-textfield-border-focus);\n  padding: 0.375rem 0.8125rem 0.5rem;\n}\n.bds-textfield-container .bds-naked {\n  border: 0;\n  outline: 0;\n  padding: 0;\n}\n.bds-textfield-container .bds-input-container.bds-naked:hover {\n  border: 0;\n}\n.bds-textfield-container .bds-input-container-focus.bds-naked:focus-within {\n  border: 0;\n}\n.bds-textfield-container .bds-inline-edit-naked-empty {\n  border: 0.0625rem solid var(--bds-textfield-border);\n}\n.bds-textfield-container .bds-inline-edit-naked-error {\n  border: 0.0625rem solid var(--bds-textfield-border-error);\n}\n.bds-textfield-container .bds-input-container-focus.bds-input-with-icon.bds-naked:focus-within {\n  border: 0;\n}";
  const fileName = "textfield_textfield_bf97c0be-5d40-4000-8856-124efcd19eae";
  const element = document.querySelector("style[data-sass-component='textfield_textfield_bf97c0be-5d40-4000-8856-124efcd19eae']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, variantNaked, variantInline, inputTestId, defaultType, autoCompleteOff, iconPositionLeft, iconPositionRight } from './constants';
import InfoIcon from '../../assets/icons/info.svg?react';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const Textfield = _ref => {
  let {
    type = defaultType,
    value = '',
    label,
    secondaryLabel,
    placeholder,
    error = false,
    helperText,
    variant,
    onChange,
    onBlur,
    onFocus,
    onIconClick,
    disabled = false,
    icon,
    errorMsg,
    width,
    readOnly = false,
    name,
    height,
    styleClasses = classes,
    onKeyUp,
    iconPosition = iconPositionRight,
    autoComplete = autoCompleteOff,
    maxLength,
    testId = inputTestId
  } = _ref;
  const valueLength = typeof value === 'string' ? value.length : String(value).length;
  const showCharacterCount = maxLength != null && maxLength > 0;
  const hasAssistiveRow = helperText || showCharacterCount;
  const labelClass = {
    [styleClasses.label]: true,
    [styleClasses.labelDisabled]: disabled
  };
  const secondaryLabelClass = {
    [styleClasses.secondaryLabel]: true
  };
  const helperTextClass = {
    [styleClasses.helperText]: true,
    [styleClasses.helperTextDisabled]: disabled
  };
  const inputClass = {
    [styleClasses.inputContainer]: true,
    [styleClasses.inputContainerErrorBorder]: error,
    [styleClasses.variantInline]: variant === variantInline,
    [styleClasses.variantNaked]: variant === variantNaked,
    [styleClasses.inputContainerFocus]: !readOnly,
    [styleClasses.inputWithIcon]: !!icon,
    [styleClasses.inputContainerDisabled]: disabled
  };
  const inputBox = {
    [styleClasses.inputBox]: true,
    [styleClasses.inputBoxDisabled]: disabled,
    [styleClasses.inputBoxReadOnly]: readOnly
  };
  return /*#__PURE__*/_jsxs("div", {
    className: styleClasses.container,
    children: [label && /*#__PURE__*/_jsxs("div", {
      className: classNames(_objectSpread({}, labelClass)),
      children: [label, secondaryLabel && /*#__PURE__*/_jsxs("span", {
        className: classNames(_objectSpread({}, secondaryLabelClass)),
        children: [" ", secondaryLabel]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: styleClasses.inputAndAssistiveWrapper,
      style: {
        width: width || undefined
      },
      children: [/*#__PURE__*/_jsxs("div", {
        className: classNames(_objectSpread({}, inputClass)),
        style: {
          width: width,
          height: height
        },
        children: [icon && iconPosition === iconPositionLeft && /*#__PURE__*/_jsx("div", {
          "data-testid": "icon-textfield",
          className: styleClasses.iconBoxLeft,
          onClick: onIconClick,
          children: icon
        }), /*#__PURE__*/_jsx("input", {
          className: classNames(_objectSpread({}, inputBox)),
          onBlur: onBlur,
          onFocus: onFocus,
          readOnly: readOnly,
          name: name,
          type: type,
          value: value,
          placeholder: placeholder,
          onChange: onChange,
          disabled: disabled,
          "data-testid": testId,
          autoComplete: autoComplete,
          onKeyUp: onKeyUp,
          maxLength: maxLength
        }), icon && iconPosition === iconPositionRight && /*#__PURE__*/_jsx("div", {
          "data-testid": "icon-textfield",
          className: styleClasses.iconBoxRight,
          onClick: onIconClick,
          children: icon
        })]
      }), hasAssistiveRow && /*#__PURE__*/_jsxs("div", {
        className: styleClasses.assistiveRow,
        children: [/*#__PURE__*/_jsx("div", {
          className: styleClasses.assistiveRowLeft,
          children: helperText && /*#__PURE__*/_jsxs("div", {
            className: classNames(styleClasses.assistiveTextBlock, {
              [styleClasses.helperTextDisabled]: disabled
            }),
            children: [/*#__PURE__*/_jsx(InfoIcon, {
              className: styleClasses.assistiveTextIcon,
              "aria-hidden": true
            }), /*#__PURE__*/_jsx("span", {
              className: classNames(_objectSpread({}, helperTextClass)),
              children: helperText
            })]
          })
        }), showCharacterCount && /*#__PURE__*/_jsxs("span", {
          className: styleClasses.characterCount || classes.characterCount,
          "aria-live": "polite",
          "data-testid": "textfield-character-count",
          children: [valueLength, "/", maxLength]
        })]
      })]
    }), error && /*#__PURE__*/_jsx("div", {
      className: styleClasses.errorMsgText,
      children: errorMsg
    })]
  });
};
Textfield.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node,
  secondaryLabel: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  width: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  height: PropTypes.string,
  onKeyUp: PropTypes.func,
  iconPosition: PropTypes.oneOf([iconPositionLeft, iconPositionRight]),
  maxLength: PropTypes.number,
  testId: PropTypes.string,
  styleClasses: PropTypes.shape({
    container: PropTypes.string,
    inputAndAssistiveWrapper: PropTypes.string,
    label: PropTypes.string,
    labelDisabled: PropTypes.string,
    helperText: PropTypes.string,
    helperTextDisabled: PropTypes.string,
    inputContainer: PropTypes.string,
    inputContainerErrorBorder: PropTypes.string,
    inputBox: PropTypes.string,
    errorMsgText: PropTypes.string,
    variantNaked: PropTypes.string,
    variantInline: PropTypes.string,
    inputContainerFocus: PropTypes.string,
    iconBoxRight: PropTypes.string,
    iconBoxLeft: PropTypes.string,
    inputWithIcon: PropTypes.string,
    inputContainerDisabled: PropTypes.string,
    inputBoxDisabled: PropTypes.string,
    inputBoxReadOnly: PropTypes.string,
    characterCount: PropTypes.string,
    assistiveRow: PropTypes.string,
    assistiveRowLeft: PropTypes.string,
    assistiveTextBlock: PropTypes.string,
    assistiveTextIcon: PropTypes.string
  })
};
export default Textfield;