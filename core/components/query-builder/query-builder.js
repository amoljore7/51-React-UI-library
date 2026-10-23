const _excluded = ["combinator", "isEditMode", "savedQuery", "existingSavedQueries", "attributeGetOptionLabel", "saveQueryFlag", "addButtonLabel", "onlyAttributeInput", "disableAddButton", "attributeOptions", "getQueryCount"],
  _excluded2 = ["queryId"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState, useEffect, Fragment } from 'react';
import { nanoid } from 'nanoid';
import QuerySelector from '../query-selector';
import Button from '../button';
import Typography from '../typography';
import Pill from '../pill';
import { queryBuilderClasses } from './constants';
import { isEmpty } from 'lodash';
import { FiPlus } from 'react-icons/fi';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-query-builder-pills-container {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 2px 0;\n  row-gap: 15px;\n}\n\n[data-theme=dark] .bds-query-builder-pills-container {\n  color: var(--theme-text-primary);\n}";
  const fileName = "builder_query-builder_cab35e27-df2e-4968-97f1-1f761fe2b8a7";
  const element = document.querySelector("style[data-sass-component='builder_query-builder_cab35e27-df2e-4968-97f1-1f761fe2b8a7']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const QueryBuilder = _ref => {
  let {
      combinator = 'AND',
      isEditMode,
      savedQuery,
      existingSavedQueries,
      attributeGetOptionLabel,
      saveQueryFlag,
      addButtonLabel = 'Add Criteria',
      onlyAttributeInput = false,
      disableAddButton = false,
      attributeOptions,
      getQueryCount
    } = _ref,
    restProps = _objectWithoutProperties(_ref, _excluded);
  const [selectorList, setSelectorList] = useState([]);
  const [query, setQuery] = useState([]);
  const [isDisabled, setIsDisabled] = useState();
  const [checkIsAnyPillActive, setCheckIsAnyPillActive] = useState();
  const handleAddQueryPills = newQuery => {
    const index = query.findIndex(e => e.queryId === newQuery.queryId);
    if (index === -1) {
      setQuery(oldQuery => [...oldQuery, newQuery]);
    } else {
      query[index] = newQuery;
      setQuery(query);
    }
    massageData(query);
    isAnyPillActive();
  };
  const updateActiveIndex = (queryId, flag) => {
    const index = query.findIndex(e => (e === null || e === void 0 ? void 0 : e.queryId) === queryId);
    if (index !== -1) {
      query[index].isActiveIndex = flag;
      setQuery(query);
    }
    isAnyPillActive();
  };
  useEffect(() => {
    massageData(query);
  }, [query, isEditMode]);
  useEffect(() => {
    if (typeof getQueryCount === 'function') {
      getQueryCount(selectorList.length);
    }
  }, [selectorList.length]);
  const massageData = data => {
    const result = data === null || data === void 0 ? void 0 : data.map(_ref2 => {
      let {
          queryId
        } = _ref2,
        rest = _objectWithoutProperties(_ref2, _excluded2);
      return _objectSpread({}, rest);
    });
    savedQuery(result);
  };
  useEffect(() => {
    if (!isEmpty(existingSavedQueries) && !isEditMode) {
      let massagedQueries = existingSavedQueries.map(element => {
        const newId = nanoid();
        return {
          attribute: attributeGetOptionLabel(element),
          operator: element === null || element === void 0 ? void 0 : element.operator,
          value: element === null || element === void 0 ? void 0 : element.value,
          isActiveIndex: false,
          queryId: newId
        };
      });
      setQuery(massagedQueries);
    }
    if (isEmpty(existingSavedQueries) && !isEditMode) {
      setQuery([]);
    }
  }, [JSON.stringify(existingSavedQueries), isEditMode]);
  useEffect(() => {
    setSelectorList([]);
    if (isEditMode && !isEmpty(query)) {
      query.map(element => {
        if (undefined != element) {
          fillAllFields(element);
        }
      });
    }
  }, [isEditMode]);
  const fillAllFields = obj => {
    setSelectorList(selectorList => [...selectorList, /*#__PURE__*/_jsx("span", {
      object: obj
    }, obj === null || obj === void 0 ? void 0 : obj.queryId)]);
  };
  const onAddBtnClick = () => {
    const newId = nanoid();
    setSelectorList(selectorList => [...selectorList, /*#__PURE__*/_jsx("span", {}, newId)]);
  };
  const deleteHandleClick = removeId => {
    setSelectorList(selectorList => selectorList.filter(ele => ele.key !== removeId));
    isAnyPillActive();
  };
  const handleRemoveQueryPills = id => {
    const index = query.findIndex(e => (e === null || e === void 0 ? void 0 : e.queryId) === id);
    if (index !== -1) {
      query[index].isActiveIndex = false;
    }
    setQuery(query => query.filter(ele => ele.queryId !== id));
  };
  useEffect(() => {
    if (isAnyPillActive()) {
      return saveQueryFlag(false);
    } else if (!isEmpty(existingSavedQueries) && isEmpty(selectorList) && isEmpty(query)) {
      return saveQueryFlag(true);
    } else if (isEmpty(existingSavedQueries) && isEmpty(selectorList) && isEmpty(query)) {
      return saveQueryFlag(false);
    }
    if (!isEmpty(existingSavedQueries) && isEditMode) {
      if (isEmpty(selectorList) && isEmpty(query)) {
        setIsDisabled(true);
        return saveQueryFlag(true);
      }
    }
    if (isEmpty(query)) {
      setIsDisabled(false);
      return saveQueryFlag(false);
    }
    if (!isEmpty(selectorList)) {
      if ((selectorList === null || selectorList === void 0 ? void 0 : selectorList.length) === query.length) {
        setIsDisabled(true);
        return saveQueryFlag(true);
      } else {
        setIsDisabled(false);
        return saveQueryFlag(false);
      }
    }
  }, [query, selectorList, isEditMode, checkIsAnyPillActive]);
  const checkAddCriteriaBtnFlag = () => {
    if (isEmpty(selectorList) && isEmpty(query)) {
      return false;
    }
    return !isDisabled;
  };
  const isAnyPillActive = () => {
    let flag = query === null || query === void 0 ? void 0 : query.some(obj => (obj === null || obj === void 0 ? void 0 : obj.isActiveIndex) === true);
    setCheckIsAnyPillActive(flag);
    return flag;
  };
  const renderValue = value => {
    let regex = /,/g;
    let str = value.split(',').map(e => e === null || e === void 0 ? void 0 : e.trim()).filter(e => e).join(',');
    let text = str.split(',').map(e => '"' + (e === null || e === void 0 ? void 0 : e.trim()) + '"').join(',').replace(regex, ' or ');
    return text;
  };
  const getPillLabel = _ref3 => {
    let {
      attribute,
      operator,
      value
    } = _ref3;
    if (onlyAttributeInput) {
      return attribute;
    }
    return "".concat(attribute, " ").concat(operator, " ").concat(renderValue(value));
  };
  const excludedAttributes = query === null || query === void 0 ? void 0 : query.map(q => q.attribute);
  return /*#__PURE__*/_jsxs("div", {
    children: [!isEditMode && /*#__PURE__*/_jsx("div", {
      className: queryBuilderClasses.pillsContainer,
      children: query && query.map((value, index) => {
        return /*#__PURE__*/_jsxs(Fragment, {
          children: [index !== 0 && /*#__PURE__*/_jsx("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px'
            },
            children: /*#__PURE__*/_jsx(Typography, {
              variant: "label1",
              children: combinator
            })
          }), /*#__PURE__*/_jsx("div", {
            "data-testid": "query-pill-wrapper",
            className: queryBuilderClasses.pillsContainer,
            children: /*#__PURE__*/_jsx(Pill, {
              readOnly: true,
              label: getPillLabel(value)
            })
          })]
        }, value.queryId);
      })
    }), isEditMode && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(Button, {
        variant: "textOnly",
        size: "medium",
        onClick: onAddBtnClick,
        disabled: disableAddButton || checkIsAnyPillActive || checkAddCriteriaBtnFlag(),
        children: [/*#__PURE__*/_jsx(FiPlus, {
          size: "20",
          color: "#067fdb",
          style: {
            marginRight: 5
          }
        }), addButtonLabel]
      }), /*#__PURE__*/_jsx("div", {
        className: queryBuilderClasses.pillsContainer,
        children: selectorList.map((ele, index) => {
          var _query$index;
          const currentAttribute = (_query$index = query[index]) === null || _query$index === void 0 ? void 0 : _query$index.attribute;
          const excludedItemForCurrentSelector = excludedAttributes.filter(attr => attr !== currentAttribute);
          return /*#__PURE__*/_jsxs("span", {
            style: {
              display: 'flex'
            },
            children: [/*#__PURE__*/_jsx(QuerySelector, _objectSpread({
              queryId: ele.key,
              deleteHandleClick: () => {
                handleRemoveQueryPills(ele.key), deleteHandleClick(ele.key);
              },
              index: index,
              handleAddQueryPills: handleAddQueryPills,
              updateActiveIndex: updateActiveIndex,
              currentElement: query[index],
              query: query,
              selectorList: selectorList,
              attributeGetOptionLabel: attributeGetOptionLabel,
              onlyAttributeInput: onlyAttributeInput,
              attributeOptions: attributeOptions,
              excludedAttributes: excludedItemForCurrentSelector
            }, restProps)), index !== selectorList.length - 1 && /*#__PURE__*/_jsx("div", {
              className: queryBuilderClasses.pillsContainer,
              style: {
                padding: '0 8px',
                margin: 'auto',
                width: 'max-content'
              },
              children: /*#__PURE__*/_jsx(Typography, {
                variant: "label1",
                children: combinator
              })
            })]
          }, "".concat(excludedItemForCurrentSelector.join('-'), "-").concat(index));
        })
      })]
    })]
  });
};
export default QueryBuilder;