function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useRef, useEffect } from 'react';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import { classes, defaultIconSize, defaultTabIndex, autocompletePortalId, defaultPlaceholder } from './constants';
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = "@charset \"UTF-8\";\n:root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n/* Figma comboBox: same as Select \u2013 40px single, 12/8px padding, 8px radius */\n/* Multiple select: pills + input */\n:root {\n  --bds-autocomplete-bg: var(--theme-content-bg);\n  --bds-autocomplete-border: var(--theme-border);\n  --bds-autocomplete-border-hover: var(--theme-border-strong);\n  --bds-autocomplete-border-focus: var(--theme-text-primary);\n  --bds-autocomplete-border-error: #cf332b;\n  --bds-autocomplete-border-disabled: var(--theme-border);\n  --bds-autocomplete-label: var(--theme-text-primary);\n  --bds-autocomplete-label-disabled: var(--theme-text-secondary);\n  --bds-autocomplete-helper: var(--theme-text-secondary);\n  --bds-autocomplete-helper-disabled: var(--theme-text-secondary);\n  --bds-autocomplete-input-text: var(--theme-text-primary);\n  --bds-autocomplete-input-placeholder: var(--theme-text-placeholder);\n  --bds-autocomplete-input-disabled: var(--theme-border);\n  --bds-autocomplete-input-readonly: var(--theme-text-secondary);\n  --bds-autocomplete-icon: var(--theme-text-secondary);\n  --bds-autocomplete-icon-disabled: var(--theme-border);\n  --bds-autocomplete-error: #cf332b;\n}\n\n[data-theme=light] {\n  --bds-autocomplete-bg: var(--theme-content-bg);\n  --bds-autocomplete-border: rgba(4, 5, 32, 0.4);\n  --bds-autocomplete-border-hover: rgba(4, 5, 32, 0.4);\n  --bds-autocomplete-border-focus: #181143;\n  --bds-autocomplete-border-error: #cf332b;\n  --bds-autocomplete-border-disabled: rgba(4, 5, 32, 0.2);\n  --bds-autocomplete-label: var(--theme-text-primary);\n  --bds-autocomplete-label-disabled: #9b9ba6;\n  --bds-autocomplete-helper: var(--theme-text-secondary);\n  --bds-autocomplete-helper-disabled: #9b9ba6;\n  --bds-autocomplete-input-text: var(--theme-text-primary);\n  --bds-autocomplete-input-placeholder: var(--theme-text-placeholder);\n  --bds-autocomplete-input-disabled: #cdcdd2;\n  --bds-autocomplete-input-readonly: var(--theme-text-secondary);\n  --bds-autocomplete-icon: #686979;\n  --bds-autocomplete-icon-disabled: #9b9ba6;\n  --bds-autocomplete-error: #cf332b;\n}\n\n[data-theme=dark] {\n  --bds-autocomplete-bg: var(--theme-content-bg);\n  --bds-autocomplete-border: var(--theme-border);\n  --bds-autocomplete-border-hover: var(--theme-border-strong);\n  --bds-autocomplete-border-focus: var(--theme-text-primary);\n  --bds-autocomplete-border-error: #e2615a;\n  --bds-autocomplete-border-disabled: var(--theme-border);\n  --bds-autocomplete-label: var(--theme-text-primary);\n  --bds-autocomplete-label-disabled: #9b9ba6;\n  --bds-autocomplete-helper: var(--theme-text-secondary);\n  --bds-autocomplete-helper-disabled: #9b9ba6;\n  --bds-autocomplete-input-text: var(--theme-text-primary);\n  --bds-autocomplete-input-placeholder: var(--theme-text-placeholder);\n  --bds-autocomplete-input-disabled: #9b9ba6;\n  --bds-autocomplete-input-readonly: var(--theme-text-secondary);\n  --bds-autocomplete-icon: #9b9ba6;\n  --bds-autocomplete-icon-disabled: #686979;\n  --bds-autocomplete-error: #e2615a;\n}\n\n.bds-autocomplete-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n}\n\n.bds-autocomplete-container {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n  border: 0.0625rem solid var(--bds-autocomplete-border);\n  border-radius: 0.5rem;\n  background-color: var(--bds-autocomplete-bg);\n  box-sizing: border-box;\n}\n\n.bds-autocomplete-single-select-container {\n  min-height: 2.5rem;\n  padding: 0.5rem 0.75rem;\n}\n\n.bds-autocomplete-container-focus:focus-within {\n  border-width: 0.125rem;\n  border-color: var(--bds-autocomplete-border-focus);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n.bds-autocomplete-container-focus:focus-within .bds-pill-wrapper {\n  padding-bottom: 0.5rem-1px;\n}\n\n.bds-autocomplete-single-select-container-focus:focus-within {\n  border-width: 0.125rem;\n  border-color: var(--bds-autocomplete-border-focus);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n\n.bds-autocomplete-container-error {\n  border-width: 0.125rem;\n  border-color: var(--bds-autocomplete-border-error);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n\n.bds-autocomplete-single-select-container-error {\n  border-width: 0.125rem;\n  border-color: var(--bds-autocomplete-border-error);\n  padding: 0.5rem-1px 0.75rem-2px;\n}\n\n.bds-autocomplete-container-disabled {\n  border-color: var(--bds-autocomplete-border-disabled);\n}\n\n.bds-autocomplete-container-read-only {\n  border: none;\n  padding: 0;\n  background: transparent;\n}\n\n.bds-autocomplete-label {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.125rem;\n  letter-spacing: 0.013125rem;\n  color: var(--bds-autocomplete-label);\n  margin-bottom: 0.5rem;\n}\n\n.bds-autocomplete-label-disabled {\n  color: var(--bds-autocomplete-label-disabled);\n}\n\n.bds-autocomplete-helper-text {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.8125rem;\n  line-height: 1.125rem;\n  letter-spacing: 0.015rem;\n  color: var(--bds-autocomplete-helper);\n  margin-bottom: 0.25rem;\n}\n\n.bds-autocomplete-helper-text-disabled {\n  color: var(--bds-autocomplete-helper-disabled);\n}\n\n.bds-actions-container {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n\n.bds-actions-multiple-input-container {\n  padding-top: 0;\n}\n\n.bds-actions-container-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.bds-single-select-actions-container-item {\n  margin-left: 0;\n}\n\n.bds-autocomplete-actions-container-disabled-item {\n  cursor: default;\n}\n\n.bds-pills-input-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  flex: 1;\n  min-width: 0;\n  gap: 0.5rem;\n}\n\n.bds-autocomplete-single-select-input-wrapper {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n}\n\n.bds-pill-wrapper {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.bds-autocomplete-input {\n  border: none;\n  min-height: 1.5rem;\n  padding: 0;\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  line-height: 1.25rem;\n  letter-spacing: 0.009375rem;\n  color: var(--bds-autocomplete-input-text);\n  background: transparent;\n  flex: 1;\n  min-width: 5rem;\n}\n.bds-autocomplete-input:focus {\n  outline: none;\n}\n.bds-autocomplete-input::placeholder {\n  color: var(--bds-autocomplete-input-placeholder);\n}\n\n.bds-autocomplete-single-select-input {\n  width: 100%;\n  min-height: 1.5rem;\n}\n\n.bds-autocomplete-single-select-disabled-input {\n  color: var(--bds-autocomplete-input-disabled);\n}\n\n.bds-autocomplete-single-select-read-only {\n  font-family: \"OpenSansRegular\";\n  font-size: 1rem;\n  line-height: 1.25rem;\n  letter-spacing: 0.009375rem;\n  color: var(--bds-autocomplete-input-readonly);\n}\n\n.bds-autocomplete-icon {\n  color: var(--bds-autocomplete-icon);\n}\n\n.bds-autocomplete-icon-disabled {\n  color: var(--bds-autocomplete-icon-disabled);\n}\n\n.bds-autocomplete-error-message {\n  font-family: \"OpenSansRegular\";\n  font-size: 0.75rem;\n  letter-spacing: 0.5px;\n  margin-top: 0.0625rem;\n  color: var(--bds-autocomplete-error);\n}";
  const fileName = "autocomplete_autocomplete_16dec5ae-1cb1-4501-93e6-e82e04f5eef9";
  const element = document.querySelector("style[data-sass-component='autocomplete_autocomplete_16dec5ae-1cb1-4501-93e6-e82e04f5eef9']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
import Pill from '../pill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FiX } from 'react-icons/fi';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { shallowCompare } from '../../utils/helper-utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Autocomplete = _ref => {
  let {
    options,
    multiple = false,
    label,
    helperText,
    onInputChange,
    onChange,
    getOptionLabel,
    getOptionSublabel,
    getOptionIcon,
    value,
    disabled = false,
    readOnly = false,
    width,
    errorMessage,
    placeholder = defaultPlaceholder,
    name,
    onBlur,
    error,
    disablePortal = false,
    allowClearing = true,
    height,
    filterCurrentValueFromOptions = false,
    groupPropertyName,
    showOptionsOnBlur = false
  } = _ref;
  let selectedValues;
  let filteredOptions;
  useEffect(() => {
    const inputValue = !multiple && Boolean(value) ? getOptionLabel(selectedValues[0]) : '';
    setInputValue(inputValue || '');
    setSelectedOptions(selectedValues);
  }, [JSON.stringify(value)]);
  const filterSelectedOptionsFromOptions = (allOptions, selectedOptions) => {
    let optionsAfterFilter = [...allOptions];
    for (const selectedOption of selectedOptions) {
      optionsAfterFilter = optionsAfterFilter.filter(item => !shallowCompare(item, selectedOption));
    }
    return optionsAfterFilter;
  };
  selectedValues = Boolean(value) ? [...value] : [];
  filteredOptions = multiple ? filterSelectedOptionsFromOptions(options, selectedValues) : options;
  const [inputValue, setInputValue] = useState(!multiple && Boolean(value) ? getOptionLabel(selectedValues[0]) : '');
  const [filteredSuggestions, setFilteredSuggestions] = useState(filteredOptions);
  const [selectedOptions, setSelectedOptions] = useState(selectedValues);
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState({});
  const autocompleteRef = useRef();
  useEffect(() => {
    setFilteredSuggestions(multiple ? filterSelectedOptionsFromOptions(options, selectedValues) : options);
  }, [JSON.stringify(options)]);
  const getContainerDimension = () => {
    let rect = autocompleteRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height
    };
    setContainerDimension(dimension);
  };
  const blurHandler = event => {
    let isOptionCorrect = false;
    for (let i in options) {
      if (getOptionLabel(options[i]) === inputValue) isOptionCorrect = true;
    }
    if (showOptionsOnBlur) {
      /**
       * Show the options list only if the following conditions are true:
       * 1. The list is already open.
       * 2. There is some text input by the user.
       * 3. The text input doesn't matches any of the available options.
       */
      if (showOptions && inputValue && !isOptionCorrect) {
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
      return;
    }
    if (!multiple && !isOptionCorrect) {
      setInputValue('');
      setFilteredSuggestions(options);
    }
    if (multiple) {
      setInputValue('');
      setFilteredSuggestions(filterSelectedOptionsFromOptions(options, selectedOptions));
    }
    setShowOptions(false);
    !isOptionCorrect && typeof onInputChange === 'function' && onInputChange(event, '');
  };
  const changeHandler = event => {
    setInputValue(event.target.value);
    setShowOptions(true);
    if (multiple) {
      const filteredSuggestions = filterSelectedOptionsFromOptions(options, selectedOptions);
      const filteredOptions = filteredSuggestions.filter(option => {
        return String(getOptionLabel(option) || '').toLowerCase().includes((event.target.value || '').toLowerCase());
      });
      setFilteredSuggestions(filteredOptions);
    } else {
      const filteredOptions = options.filter(option => {
        return String(getOptionLabel(option) || '').toLowerCase().includes((event.target.value || '').toLowerCase());
      });
      setFilteredSuggestions(filteredOptions);
    }
    if (typeof onInputChange === 'function') {
      onInputChange(event, event.target.value);
    }
  };
  const selectOption = (event, value) => {
    event.preventDefault();
    setShowOptions(false);
    if (multiple) {
      setInputValue('');
      const newOptions = [...selectedOptions, value];
      setSelectedOptions(newOptions);
      setFilteredSuggestions(filterSelectedOptionsFromOptions(options, newOptions));
      onChange(event, newOptions);
    } else {
      setFilteredSuggestions(options);
      setInputValue(getOptionLabel(value));
      onChange(event, value);
    }
  };
  const deletePill = (event, value) => {
    const filteredOptions = selectedOptions.filter(item => item !== value);
    setSelectedOptions(filteredOptions);
    setFilteredSuggestions(filterSelectedOptionsFromOptions(options, filteredOptions));
    onChange(event, filteredOptions);
  };
  const showSuggestions = () => {
    if (!(disabled || readOnly)) {
      getContainerDimension();
      setShowOptions(true);
    }
  };
  const inputClickHandler = () => {
    showSuggestions();
  };
  const inputKeyDownHandler = event => {
    if (event.code === 'Enter') {
      showSuggestions();
    }
  };
  const clearAllHandler = event => {
    if (!disabled) {
      setShowOptions(false);
      if (!multiple) {
        setInputValue('');
        onInputChange(event, '');
        return;
      }
      setFilteredSuggestions(options);
      setSelectedOptions([]);
      onChange(event, []);
    }
  };
  const crossIconClickHandler = event => {
    clearAllHandler(event);
    event.stopPropagation();
  };
  const crossIconKeyDownHandler = event => {
    if (event.code === 'Enter') {
      clearAllHandler(event);
    }
  };
  const renderPills = () => {
    return multiple && selectedOptions.map((option, index) => {
      return /*#__PURE__*/_jsx("div", {
        "data-testid": "pill-wrapper",
        className: classes.pillWrapper,
        children: /*#__PURE__*/_jsx(Pill, {
          disabled: disabled,
          readOnly: readOnly,
          label: getOptionLabel(option),
          onDelete: event => {
            deletePill(event, option);
            event.stopPropagation();
          }
        })
      }, "pill-wrapper-".concat(index));
    });
  };
  const labelClasses = {
    [classes.autocompleteLabel]: true,
    [classes.autocompleteLabelDisabled]: disabled
  };
  const helperTextClasses = {
    [classes.autocompleteHelperText]: true,
    [classes.autocompleteHelperTextDisabled]: disabled
  };
  const containerClasses = {
    [classes.container]: multiple ? true : !readOnly,
    [classes.autocompleteContainerError]: !(readOnly || disabled) && multiple && error,
    [classes.autocompleteSingleSelectContainerError]: !(multiple || readOnly || disabled) && error,
    [classes.containerDisabled]: disabled,
    [classes.containerReadOnly]: readOnly,
    [classes.autocompleteContainerFocus]: !(disabled || readOnly),
    [classes.singleSelectContainer]: !(multiple || readOnly),
    [classes.autocompleteSingleSelectContainerFocus]: !(multiple || disabled || readOnly)
  };
  const inputClasses = {
    [classes.autocompleteInput]: true,
    [classes.autocompleteSingleSelectInput]: !multiple,
    [classes.autocompleteSingleSelectDisabledInput]: !multiple && disabled
  };
  const actionsContainerItemClasses = {
    [classes.actionsContainerItem]: true,
    [classes.autocompleteSingleSelectActionsContainerItem]: !multiple,
    [classes.autocompleteActionsContainerDisabledItem]: disabled
  };
  const pillInputWrapperClasses = {
    [classes.autocompleteSingleSelectInputWrapper]: !multiple && !readOnly,
    [classes.pillsAndInputWrapper]: multiple
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classes.wrapper,
    children: [label && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, labelClasses)),
      children: label
    }), !readOnly && helperText && /*#__PURE__*/_jsx("div", {
      className: classNames(_objectSpread({}, helperTextClasses)),
      children: helperText
    }), /*#__PURE__*/_jsxs("div", {
      ref: autocompleteRef,
      className: classNames(_objectSpread({}, containerClasses)),
      style: {
        width,
        height
      },
      tabIndex: defaultTabIndex,
      onBlur: blurHandler,
      "data-testid": classes.container,
      onClick: inputClickHandler,
      children: [/*#__PURE__*/_jsxs("div", {
        className: classNames(_objectSpread({}, pillInputWrapperClasses)),
        children: [renderPills(), multiple && !(disabled || readOnly) && /*#__PURE__*/_jsx("input", {
          className: classNames(_objectSpread({}, inputClasses)),
          placeholder: placeholder,
          type: "text",
          value: inputValue,
          onChange: changeHandler,
          onClick: inputClickHandler,
          onKeyDown: inputKeyDownHandler,
          tabIndex: defaultTabIndex,
          name: name,
          onBlur: e => onBlur && onBlur(e)
        }), !multiple && (!readOnly ? /*#__PURE__*/_jsx("input", {
          className: classNames(_objectSpread({}, inputClasses)),
          placeholder: placeholder,
          type: "text",
          disabled: disabled,
          value: inputValue,
          onChange: changeHandler,
          onClick: inputClickHandler,
          onKeyDown: inputKeyDownHandler,
          tabIndex: defaultTabIndex,
          name: name,
          onBlur: e => onBlur && onBlur(e)
        }) : /*#__PURE__*/_jsx("div", {
          className: classes.autocompleteSingleSelectReadOnly,
          children: inputValue
        }))]
      }), !readOnly && /*#__PURE__*/_jsxs("div", {
        className: "".concat(classes.actionsContainer, " ").concat(multiple ? classes.multipleInputActionsContainer : ''),
        children: [allowClearing && /*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, actionsContainerItemClasses)),
          onClick: crossIconClickHandler,
          onKeyDown: crossIconKeyDownHandler,
          tabIndex: defaultTabIndex,
          children: (multiple && selectedOptions.length > 0 || !multiple && inputValue !== '') && /*#__PURE__*/_jsx(FiX, {
            size: defaultIconSize,
            className: disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon
          })
        }), /*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, actionsContainerItemClasses)),
          onClick: inputClickHandler,
          onKeyDown: inputKeyDownHandler,
          tabIndex: defaultTabIndex,
          children: showOptions ? /*#__PURE__*/_jsx(IoChevronUp, {
            size: defaultIconSize,
            className: disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon
          }) : /*#__PURE__*/_jsx(IoChevronDown, {
            size: defaultIconSize,
            className: disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon
          })
        })]
      })]
    }), showOptions && filteredSuggestions.length > 0 && /*#__PURE__*/_jsx(MenuOptions, {
      portalContainerId: autocompletePortalId,
      containerDimension: containerDimension,
      width: width,
      options: multiple || !filterCurrentValueFromOptions ? filteredSuggestions : filteredSuggestions.filter(option => getOptionLabel(option) !== inputValue),
      onChange: selectOption,
      getOptionLabel: getOptionLabel,
      getOptionIcon: getOptionIcon,
      getOptionSublabel: getOptionSublabel,
      disablePortal: disablePortal,
      groupPropertyName: groupPropertyName,
      themeSourceRef: autocompleteRef
    }), error ? /*#__PURE__*/_jsx("div", {
      className: classes.autocompleteErrorMessage,
      style: {
        width: width
      },
      children: errorMessage
    }) : null]
  });
};
Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSublabel: PropTypes.func,
  getOptionIcon: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  disablePortal: PropTypes.bool,
  height: PropTypes.string,
  allowClearing: PropTypes.bool,
  filterCurrentValueFromOptions: PropTypes.bool,
  groupPropertyName: PropTypes.string,
  showOptionsOnBlur: PropTypes.bool
};
export default Autocomplete;