function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useRef, useEffect } from 'react';
import { classes, defaultIconSize, smallIconSize, defaultTabIndex } from './constants';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma comboBox: 40px height, 12px/8px padding, 8px radius, border-rest/focus/error/disabled */\n/* Small size */\n:root {\n  --bds-select-bg: var(--theme-content-bg);\n  --bds-select-border: var(--theme-border);\n  --bds-select-border-hover: var(--theme-border-strong);\n  --bds-select-border-focus: var(--theme-text-primary);\n  --bds-select-border-error: #cf332b;\n  --bds-select-border-disabled: var(--theme-border);\n  --bds-select-label: var(--theme-text-primary);\n  --bds-select-label-disabled: var(--theme-text-secondary);\n  --bds-select-helper: var(--theme-text-secondary);\n  --bds-select-helper-disabled: var(--theme-text-secondary);\n  --bds-select-value: var(--theme-text-primary);\n  --bds-select-placeholder: var(--theme-text-placeholder);\n  --bds-select-value-disabled: var(--theme-border);\n  --bds-select-value-readonly: var(--theme-text-secondary);\n  --bds-select-icon: var(--theme-text-secondary);\n  --bds-select-icon-disabled: var(--theme-border);\n  --bds-select-error: #cf332b;\n}\n\n[data-theme=light] {\n  --bds-select-bg: var(--theme-content-bg);\n  --bds-select-border: rgba(4, 5, 32, 0.4);\n  --bds-select-border-hover: rgba(4, 5, 32, 0.4);\n  --bds-select-border-focus: #181143;\n  --bds-select-border-error: #cf332b;\n  --bds-select-border-disabled: rgba(4, 5, 32, 0.2);\n  --bds-select-label: var(--theme-text-primary);\n  --bds-select-label-disabled: #9b9ba6;\n  --bds-select-helper: var(--theme-text-secondary);\n  --bds-select-helper-disabled: #9b9ba6;\n  --bds-select-value: var(--theme-text-primary);\n  --bds-select-placeholder: var(--theme-text-placeholder);\n  --bds-select-value-disabled: #cdcdd2;\n  --bds-select-value-readonly: var(--theme-text-secondary);\n  --bds-select-icon: #686979;\n  --bds-select-icon-disabled: #9b9ba6;\n  --bds-select-error: #cf332b;\n}\n\n[data-theme=dark] {\n  --bds-select-bg: var(--theme-content-bg);\n  --bds-select-border: var(--theme-border);\n  --bds-select-border-hover: var(--theme-border-strong);\n  --bds-select-border-focus: var(--theme-text-primary);\n  --bds-select-border-error: #e2615a;\n  --bds-select-border-disabled: var(--theme-border);\n  --bds-select-label: var(--theme-text-primary);\n  --bds-select-label-disabled: #9b9ba6;\n  --bds-select-helper: var(--theme-text-secondary);\n  --bds-select-helper-disabled: #9b9ba6;\n  --bds-select-value: var(--theme-text-primary);\n  --bds-select-placeholder: var(--theme-text-placeholder);\n  --bds-select-value-disabled: #9b9ba6;\n  --bds-select-value-readonly: var(--theme-text-secondary);\n  --bds-select-icon: #9b9ba6;\n  --bds-select-icon-disabled: #686979;\n  --bds-select-error: #e2615a;\n}\n\n.bds-select-container {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.0625rem solid var(--bds-select-border);\n  border-radius: 0.5rem;\n  background-color: var(--bds-select-bg);\n  box-sizing: border-box;\n}\n\n.bds-select-container-focus:focus-within {\n  border-width: 0.125rem;\n  border-color: var(--bds-select-border-focus);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n\n.bds-select-container-disabled {\n  border-color: var(--bds-select-border-disabled);\n}\n\n.bds-select-container-error {\n  border-width: 0.125rem;\n  border-color: var(--bds-select-border-error);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n\n.bds-select-container-inline {\n  border: none;\n  padding: 0;\n}\n\n.bds-select-container-disabled-inline {\n  border: none;\n}\n\n.bds-select-container-read-only {\n  border: none;\n  padding: 0;\n  min-height: unset;\n  background: transparent;\n}\n\n/* Small size */\n.bds-select-small-container {\n  min-height: 2rem;\n  padding: 0.375rem 0.5rem;\n}\n\n.bds-select-small-container-focus:focus-within {\n  padding: 0.375rem-1px 0.5rem-2px;\n}\n\n.bds-select-label {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.125rem;\n  letter-spacing: 0.013125rem;\n  color: var(--bds-select-label);\n  margin-bottom: 0.5rem;\n}\n\n.bds-select-label-disabled {\n  color: var(--bds-select-label-disabled);\n}\n\n.bds-select-helper-text {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.8125rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.015rem;\n  color: var(--bds-select-helper);\n  margin-bottom: 0.25rem;\n}\n\n.bds-select-helper-text-disabled {\n  color: var(--bds-select-helper-disabled);\n}\n\n.bds-select-value {\n  flex: 1;\n  min-width: 0;\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  line-height: 1.25rem;\n  letter-spacing: 0.009375rem;\n  color: var(--bds-select-value);\n  text-align: left;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.bds-select-placeholder {\n  color: var(--bds-select-placeholder);\n}\n\n.bds-select-value-disabled {\n  color: var(--bds-select-value-disabled);\n}\n\n.bds-select-value-read-only {\n  color: var(--bds-select-value-readonly);\n}\n\n.bds-select-small-value-wrapper {\n  display: flex;\n  align-items: center;\n  min-height: 2rem-0.375rem-0.375rem;\n}\n\n.bds-select-actions-container {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n\n.bds-select-actions-container-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.bds-select-actions-small-container-item {\n  width: 1rem;\n  height: 1rem;\n}\n\n.bds-select-icon,\n.bds-select-icon-disabled {\n  flex-shrink: 0;\n}\n\n.bds-select-icon {\n  color: var(--bds-select-icon);\n}\n\n.bds-select-icon-disabled {\n  color: var(--bds-select-icon-disabled);\n}\n\n.bds-select-error-message {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.75rem;\n  letter-spacing: 0.5px;\n  margin-top: 0.0625rem;\n  color: var(--bds-select-error);\n}";
  const fileName = "select_select_3cf46bd1-4ab9-40fb-a187-665b39bef508";
  const element = document.querySelector("style[data-sass-component='select_select_3cf46bd1-4ab9-40fb-a187-665b39bef508']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import MenuOptions from '../../utils/common-portal/menu-options-container';
import Tooltip from '../tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Select = _ref => {
  var _selectRef$current;
  let {
    options = [],
    label,
    helperText,
    onChange,
    getOptionLabel,
    disabled = false,
    readOnly = false,
    width,
    value,
    error,
    errorMessage,
    inline = false,
    placeholder,
    size = 'large',
    onBlur,
    disablePortal = false,
    showTooltip = true,
    height,
    testId = 'select-value'
  } = _ref;
  let optionSelected = Boolean(value) ? value : null;
  const [selectedValue, setSelectedValue] = useState(optionSelected);
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState();
  const [enableTooltip, setEnableTooltip] = useState(false);
  const selectRef = useRef();
  const selectedValueRef = useRef(null);
  useEffect(() => {
    setSelectedValue(optionSelected);
  }, [value]);
  useEffect(() => {
    handleTooltipVisibility();
  }, [selectedValue]);
  const handleTooltipVisibility = () => {
    const element = selectedValueRef.current;
    if (showTooltip && selectedValue && element) {
      setEnableTooltip(element.scrollWidth > element.clientWidth);
    } else {
      setEnableTooltip(false);
    }
  };
  const getContainerDimension = () => {
    let rect = selectRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height
    };
    setContainerDimension(dimension);
  };
  const showSuggestions = () => {
    getContainerDimension();
    setShowOptions(!showOptions);
  };
  const selectedValueClickHandler = () => {
    if (!(disabled || readOnly)) {
      showSuggestions();
    }
  };
  const selectedValueKeyDownHandler = event => {
    if (event.code === 'Enter') {
      if (!(disabled || readOnly)) {
        showSuggestions();
      }
    }
  };
  const blurHandler = e => {
    setShowOptions(false);
    onBlur && onBlur(e);
  };
  const selectOption = (event, value) => {
    setShowOptions(false);
    setSelectedValue(value);
    onChange(event, value);
  };
  const labelClasses = {
    [classes.selectLabel]: true,
    [classes.selectLabelDisabled]: disabled
  };
  const helperTextClasses = {
    [classes.selectHelperText]: true,
    [classes.selectHelperTextDisabled]: disabled
  };
  const containerClasses = {
    [classes.container]: true,
    [classes.selectContainerFocus]: !(disabled || readOnly) && size !== 'small',
    [classes.selectContainerDisabled]: disabled && !inline,
    [classes.selectContainerDisabledInline]: disabled && inline,
    [classes.selectContainerInline]: !disabled && inline,
    [classes.selectContainerError]: errorMessage,
    [classes.selectContainerReadOnly]: readOnly,
    [classes.selectSmallContainerFocus]: size === 'small',
    [classes.selectSmallContainer]: size === 'small'
  };
  const selectValueClasses = {
    [classes.selectValue]: true,
    [classes.selectPlaceholder]: !selectedValue && !readOnly,
    [classes.selectValueDisabled]: disabled,
    [classes.selectValueReadOnly]: readOnly,
    [classes.selectSmallValueWrapper]: size === 'small'
  };
  const actionsContainerItemClasses = {
    [classes.actionsContainerItem]: true,
    [classes.selectActionsSmallContainerItem]: size === 'small'
  };
  const renderSelectedValue = () => /*#__PURE__*/_jsx("div", {
    "data-testid": testId,
    className: classNames(_objectSpread({}, selectValueClasses)),
    onClick: selectedValueClickHandler,
    onKeyDown: selectedValueKeyDownHandler,
    tabIndex: defaultTabIndex,
    ref: selectedValueRef,
    children: selectedValue ? getOptionLabel(selectedValue) : readOnly ? 'None' : placeholder
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [label && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, labelClasses)),
      children: label
    }), !readOnly && helperText && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, helperTextClasses)),
      children: helperText
    }), /*#__PURE__*/_jsxs("div", {
      ref: selectRef,
      className: classNames(_objectSpread({}, containerClasses)),
      style: {
        width: width,
        height: height
      },
      tabIndex: defaultTabIndex,
      onBlur: blurHandler,
      "data-testid": classes.container,
      children: [enableTooltip && showTooltip ? /*#__PURE__*/_jsx(Tooltip, {
        title: getOptionLabel(selectedValue),
        position: "top",
        className: "select-value-tooltip",
        children: renderSelectedValue()
      }) : renderSelectedValue(), !readOnly && /*#__PURE__*/_jsx("div", {
        className: classes.actionsContainer,
        children: /*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, actionsContainerItemClasses)),
          onClick: selectedValueClickHandler,
          onKeyDown: selectedValueKeyDownHandler,
          tabIndex: defaultTabIndex,
          children: showOptions ? /*#__PURE__*/_jsx(IoChevronUp, {
            className: disabled ? classes.selectIconDisabled : classes.selectIcon,
            size: size === 'small' ? smallIconSize : defaultIconSize
          }) : /*#__PURE__*/_jsx(IoChevronDown, {
            className: disabled ? classes.selectIconDisabled : classes.selectIcon,
            size: size === 'small' ? smallIconSize : defaultIconSize
          })
        })
      })]
    }), showOptions && /*#__PURE__*/_jsx(MenuOptions, {
      portalContainerId: 'dropdown-components',
      containerDimension: containerDimension,
      width: (selectRef === null || selectRef === void 0 || (_selectRef$current = selectRef.current) === null || _selectRef$current === void 0 ? void 0 : _selectRef$current.offsetWidth) || width,
      options: options,
      onChange: selectOption,
      getOptionLabel: getOptionLabel,
      disablePortal: disablePortal,
      themeSourceRef: selectRef
    }), error ? /*#__PURE__*/_jsx("div", {
      className: classes.selectErrorMessage,
      style: {
        width: width
      },
      children: errorMessage
    }) : null]
  });
};
Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  placeholder: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  height: PropTypes.string,
  showTooltip: PropTypes.bool,
  testId: PropTypes.string
};
export default Select;