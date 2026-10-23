function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Select from '../select';
import MultiTextfield from '../multi-textfield';
import Typography from '../typography';
import Autocomplete from '../autocomplete/autocomplete';
import { classes } from './constants';
import { isEmpty } from 'lodash';
import Cancel from '../../assets/icons/cancel.svg?react';
import Close from '../../assets/icons/close.svg?react';
import CheckLight from '../../assets/icons/check-light.svg?react';
import CheckGreen from '../../assets/icons/check-green.svg?react';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root,\n[data-theme] {\n  --bds-query-selector-pill-bg: var(--theme-hover-bg);\n  --bds-query-selector-pill-border: var(--theme-separator);\n  --bds-query-selector-pipe: var(--theme-border);\n  --bds-query-selector-error: #da1e28;\n  --bds-query-selector-max-value-msg: var(--theme-text-placeholder);\n  --bds-query-selector-icon: inherit;\n}\n\n[data-theme=light] {\n  --bds-query-selector-pill-bg: #f4f4f4;\n  --bds-query-selector-pill-border: #e0e0e0;\n  --bds-query-selector-pipe: #a8a8a8;\n  --bds-query-selector-max-value-msg: #8d8d8d;\n}\n\n[data-theme=dark] {\n  --bds-query-selector-pill-bg: var(--theme-content-bg);\n  --bds-query-selector-pill-border: var(--theme-border);\n  --bds-query-selector-pipe: var(--theme-border);\n  --bds-query-selector-error: #e2615a;\n  --bds-query-selector-max-value-msg: #9b9ba6;\n  --bds-query-selector-icon: var(--theme-text-primary);\n}\n\n.bds-query-selector-parent-container {\n  display: flex;\n  padding: 10px 0;\n}\n.bds-query-selector-parent-container .bds-query-selector-level-one-container {\n  width: max-content;\n  border: 0.0625rem solid var(--bds-query-selector-pill-border);\n  border-radius: 25px;\n  padding: 5px 10px;\n  background-color: var(--bds-query-selector-pill-bg);\n  color: var(--theme-text-primary);\n}\n.bds-query-selector-parent-container .bds-query-selector-level-one-container .bds-query-selector-level-one-fields {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n.bds-query-selector-parent-container .bds-query-selector-level-one-container .bds-query-selector-cancel-icon {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.bds-query-selector-parent-container .bds-query-selector-level-one-container .bds-query-selector-cancel-icon svg {\n  color: var(--bds-query-selector-icon);\n}\n.bds-query-selector-parent-container .bds-query-selector-level-one-container .bds-query-selector-pipe {\n  border-left: 1px solid var(--bds-query-selector-pipe);\n  margin: 5px 0;\n}\n.bds-query-selector-parent-container .bds-query-selector-error-pill {\n  border: 0.0625rem solid var(--bds-query-selector-error);\n}\n.bds-query-selector-parent-container .bds-query-selector-error-msg-text {\n  font-size: 1rem;\n  color: var(--bds-query-selector-error);\n  padding-top: 10px;\n}\n.bds-query-selector-parent-container .bds-query-selector-max-value-msg {\n  font-size: 1rem;\n  color: var(--bds-query-selector-max-value-msg);\n  padding-top: 2px;\n}\n\n.bds-query-selector-disabled-pill {\n  pointer-events: none;\n  opacity: 0.7;\n}";
  const fileName = "selector_query-selector_5c7b3e2a-a9e8-4991-a859-c57b4efe9307";
  const element = document.querySelector("style[data-sass-component='selector_query-selector_5c7b3e2a-a9e8-4991-a859-c57b4efe9307']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const QuerySelector = _ref => {
  let {
    queryId,
    currentElement,
    query,
    isStandalone,
    updateActiveIndex,
    attributeOptionsLabel,
    attributeGetOptionLabel,
    handleAddQueryPills,
    index,
    selectorList,
    deleteHandleClick,
    attributeOptions,
    onlyAttributeInput = false,
    attributeSelectPlaceholder = 'Attribute',
    attributeInputWidth = '140px',
    excludedAttributes = [],
    groupPropertyName
  } = _ref;
  const [attributeValue, setAttributeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAllFieldSaved, setIsAllFieldSaved] = useState();
  useEffect(() => {
    if (!isEmpty(currentElement)) {
      commonUtils(currentElement);
    }
  }, [currentElement]);
  const isQueryEmpty = () => {
    if (onlyAttributeInput && isEmpty(attributeValue)) {
      return true;
    } else if (!onlyAttributeInput && (isEmpty(attributeValue) || isEmpty(operatorValue) || !isAllFieldSaved)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (!isQueryEmpty()) setIsError(false);
  }, [attributeValue, operatorValue, value]);
  const resetHandleClick = id => {
    const value = query === null || query === void 0 ? void 0 : query.findIndex(e => e.queryId === id);
    if (value === -1) {
      setValue('');
      setAttributeValue(null);
      setOperatorValue(null);
      setIsActive(false);
    } else {
      commonUtils(query[value]);
    }
    setIsActive(false);
    setIsError(false);
    !isStandalone && updateActiveIndex(queryId, false);
  };
  const commonUtils = data => {
    const {
      attribute,
      operator,
      value
    } = data;
    const key = attributeOptionsLabel || 'attribute';
    let attributeValueObject = {};
    attributeValueObject[key] = attribute;
    setAttributeValue(attributeValueObject);
    setOperatorValue({
      operator: operator
    });
    setValue(value === null || value === void 0 ? void 0 : value.trim());
    setIsActive(false);
  };
  const checkHandleClick = queryId => {
    setIsError(isQueryEmpty());
    setValue(value === null || value === void 0 ? void 0 : value.trim());
    if (!isQueryEmpty()) {
      const toBeInserted = {
        attribute: attributeGetOptionLabel(attributeValue),
        operator: operatorValue === null || operatorValue === void 0 ? void 0 : operatorValue.operator,
        value,
        isActiveIndex: false,
        queryId
      };
      setIsActive(false);
      !isStandalone && updateActiveIndex(queryId, false);
      handleAddQueryPills(toBeInserted);
    }
  };
  const checkIsAnyPillActive = () => {
    let flag = query === null || query === void 0 ? void 0 : query.some(obj => (obj === null || obj === void 0 ? void 0 : obj.isActiveIndex) === true);
    return flag;
  };
  const disabledOtherPills = obj => {
    if (currentElement !== null && currentElement !== void 0 && currentElement.isActiveIndex) {
      return false;
    } else if (!(currentElement !== null && currentElement !== void 0 && currentElement.isActiveIndex)) {
      return true;
    }
    return false;
  };
  const checkIsAnyPillEmpty = () => {
    if (index === (selectorList === null || selectorList === void 0 ? void 0 : selectorList.length) - 1) return false;
    return true;
  };
  const pillContainerClasses = {
    [classes.levelOneContainer]: true,
    [classes.errorPill]: isError
  };
  const queryClass = {
    [classes.disabledPill]: isStandalone ? false : (selectorList === null || selectorList === void 0 ? void 0 : selectorList.length) !== (query === null || query === void 0 ? void 0 : query.length) ? checkIsAnyPillEmpty() : checkIsAnyPillActive() ? disabledOtherPills() : false
  };
  let attrOptions = attributeOptions;
  if (excludedAttributes !== null && excludedAttributes !== void 0 && excludedAttributes.length) {
    attrOptions = attributeOptions.filter(option => !excludedAttributes.includes(attributeGetOptionLabel(option)));
  }
  const attributeProps = {
    options: attrOptions,
    onChange: (event, value) => {
      !isStandalone && updateActiveIndex(queryId, true);
      setAttributeValue(value), setIsActive(true);
    },
    value: attributeValue ? [attributeValue] : [],
    getOptionLabel: attributeGetOptionLabel,
    placeholder: attributeSelectPlaceholder,
    width: attributeInputWidth,
    height: '26px',
    allowClearing: false,
    filterCurrentValueFromOptions: true,
    groupPropertyName
  };
  const operatorProps = {
    options: [{
      operator: 'is'
    }, {
      operator: 'contains'
    }],
    getOptionLabel: function (option) {
      return option.operator;
    },
    onChange: (event, value) => {
      !isStandalone && updateActiveIndex(queryId, true);
      setOperatorValue(value), setIsActive(true);
    },
    value: operatorValue,
    placeholder: 'Operator',
    width: '140px',
    height: '26px'
  };
  const valueProps = {
    valueString: value,
    tooltip: true,
    addBtnTooltipText: 'Add Additional value with "Or" condition',
    finalValue: value => {
      setValue(value);
      !isStandalone && updateActiveIndex(queryId, true);
      setIsActive(true);
    },
    isAllFieldSaved: flag => setIsAllFieldSaved(flag),
    width: '100px',
    height: '26px'
  };
  return /*#__PURE__*/_jsx("div", {
    className: classNames(_objectSpread({}, queryClass)),
    children: /*#__PURE__*/_jsx("div", {
      className: classes.parentContainer,
      "data-testid": "pill-wrapper",
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("div", {
          className: classNames(_objectSpread({}, pillContainerClasses)),
          children: /*#__PURE__*/_jsxs("div", {
            className: classes.levelOneFields,
            children: [/*#__PURE__*/_jsx(Autocomplete, _objectSpread({}, attributeProps)), /*#__PURE__*/_jsx("span", {
              className: classes.pipe
            }), !onlyAttributeInput && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(Select, _objectSpread({}, operatorProps)), /*#__PURE__*/_jsx("span", {
                className: classes.pipe
              }), /*#__PURE__*/_jsx(MultiTextfield, _objectSpread({}, valueProps)), /*#__PURE__*/_jsx("span", {
                className: classes.pipe
              })]
            }), isActive && /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx("div", {
                className: classes.cancelIconBox,
                onClick: () => checkHandleClick(queryId),
                children: isQueryEmpty() ? /*#__PURE__*/_jsx(CheckLight, {
                  "aria-hidden": true,
                  focusable: "false"
                }) : /*#__PURE__*/_jsx(CheckGreen, {
                  "aria-hidden": true,
                  focusable: "false"
                })
              }), /*#__PURE__*/_jsx("div", {
                className: classes.cancelIconBox,
                onClick: () => resetHandleClick(queryId),
                children: /*#__PURE__*/_jsx(Cancel, {
                  "aria-hidden": true,
                  focusable: "false"
                })
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: classes.cancelIconBox,
              onClick: deleteHandleClick,
              children: /*#__PURE__*/_jsx(Close, {
                "aria-hidden": true,
                focusable: "false"
              })
            })]
          })
        }), isError && /*#__PURE__*/_jsx("div", {
          className: classes.errorMsgText,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "label1",
            children: 'Please specify values for all fields'
          })
        })]
      })
    })
  });
};
export default QuerySelector;