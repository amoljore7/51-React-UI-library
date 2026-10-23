function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Table from '../../table';
import Checkbox from '../../checkbox';
import Typography from '../../typography';
import { getDisplayDate, getNodesToRender, prepareDataForTable } from '../utils';
import { SHOW_SELECTED, TreeNodeClasses, asc, unsorted } from '../constants';
import { LabelIcon } from './labelIcon';
import { RadioButton } from '../../radio/radio';
import Pill from '../../pill/pill';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NodesTable = _ref => {
  var _rows;
  let {
    nodes,
    updateCount,
    filter,
    searchText,
    readOnly,
    handleCheckboxClick,
    hideCheckboxes,
    singleSelect,
    singleSelectRadio,
    allowOnlyLeafSelection,
    allowRootSelection = true,
    showCreatedDate,
    rootLeafNodesFirst = false,
    showTags = false
  } = _ref;
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const nodesToRender = getNodesToRender([...nodes], singleSelect, rootLeafNodesFirst);
    setTableData(prepareDataForTable(nodesToRender, filter === SHOW_SELECTED, searchText));
  }, [updateCount, filter, searchText]);
  const handleSorting = (sortOrder, sortBy) => {
    let sortedNodes = [...nodes];
    if (sortOrder !== unsorted) {
      sortedNodes.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === asc ? 1 : -1;
        }
        if (b[sortBy] > a[sortBy]) {
          return sortOrder === asc ? -1 : 1;
        }
        return 0;
      });
    }
    setTableData(prepareDataForTable(sortedNodes, filter === SHOW_SELECTED, searchText));
  };
  const renderName = row => {
    var _row$leftIcon, _row$leftIcon2, _row$leftIcon3, _row$leftIcon4, _row$rightIcon, _row$rightIcon2, _row$rightIcon3;
    const isLeaf = row.type === 'leaf';
    const isRowDisable = singleSelect && singleSelectRadio && (row === null || row === void 0 ? void 0 : row.disabled);
    const parentNodeClass = {
      [TreeNodeClasses.tableNameCellContent]: true,
      [TreeNodeClasses.disabledRow]: isRowDisable,
      [TreeNodeClasses.restrictedRow]: row === null || row === void 0 ? void 0 : row.disabledIcon
    };
    const textNodeClass = {
      [TreeNodeClasses.parentText]: true,
      [TreeNodeClasses.disabledRow]: isRowDisable
    };
    return /*#__PURE__*/_jsxs("div", {
      className: classNames(_objectSpread({}, parentNodeClass)),
      children: [!(hideCheckboxes || singleSelect) && /*#__PURE__*/_jsx(Checkbox, {
        checked: row.checked,
        disabled: readOnly || row.disabled,
        indeterminate: row.indeterminate,
        onChange: _ref2 => {
          let {
            target
          } = _ref2;
          return handleCheckboxClick(row._id, target.checked);
        }
      }), singleSelectRadio && singleSelect && /*#__PURE__*/_jsx(RadioButton, {
        onChange: event => {
          handleCheckboxClick(row._id, event.target.checked);
        },
        selected: row === null || row === void 0 ? void 0 : row.checked,
        disabled: row === null || row === void 0 ? void 0 : row.disabled
      }), /*#__PURE__*/_jsx(LabelIcon, {
        isLeaf: isLeaf,
        iconSource: row === null || row === void 0 || (_row$leftIcon = row.leftIcon) === null || _row$leftIcon === void 0 ? void 0 : _row$leftIcon.icon,
        tooltip: row === null || row === void 0 || (_row$leftIcon2 = row.leftIcon) === null || _row$leftIcon2 === void 0 ? void 0 : _row$leftIcon2.tooltip,
        useDefaultIcon: row !== null && row !== void 0 && (_row$leftIcon3 = row.leftIcon) !== null && _row$leftIcon3 !== void 0 && _row$leftIcon3.icon ? false : true,
        onClick: row === null || row === void 0 || (_row$leftIcon4 = row.leftIcon) === null || _row$leftIcon4 === void 0 ? void 0 : _row$leftIcon4.onClick,
        disabled: singleSelect && singleSelectRadio && (row === null || row === void 0 ? void 0 : row.disabled)
      }), /*#__PURE__*/_jsx("div", {
        className: classNames(_objectSpread({}, textNodeClass)),
        children: /*#__PURE__*/_jsxs(Typography, {
          variant: !isLeaf || row.highlighted ? 'label2' : 'label1',
          children: [row.label, " ", row.highlighted ? '*' : '']
        })
      }), /*#__PURE__*/_jsx(LabelIcon, {
        iconSource: row === null || row === void 0 || (_row$rightIcon = row.rightIcon) === null || _row$rightIcon === void 0 ? void 0 : _row$rightIcon.icon,
        tooltip: row === null || row === void 0 || (_row$rightIcon2 = row.rightIcon) === null || _row$rightIcon2 === void 0 ? void 0 : _row$rightIcon2.tooltip,
        onClick: row === null || row === void 0 || (_row$rightIcon3 = row.rightIcon) === null || _row$rightIcon3 === void 0 ? void 0 : _row$rightIcon3.onClick
      }), row.disabledIcon]
    });
  };
  const renderCreatedDate = row => /*#__PURE__*/_jsx(Typography, {
    variant: 'label1',
    children: getDisplayDate(row === null || row === void 0 ? void 0 : row.createdDate)
  });
  const columns = [{
    field: 'label',
    headerName: 'Name',
    sortable: true,
    renderColumn: renderName
  }, {
    field: 'path',
    headerName: 'Path',
    sortable: true
  }];
  if (showCreatedDate) {
    columns.push({
      field: 'createdDate',
      headerName: 'Created Date',
      sortable: true,
      renderColumn: renderCreatedDate
    });
  }
  if (showTags) {
    columns.push({
      headerName: 'Tags',
      sortable: false,
      renderColumn: row => {
        var _row$tableNodeTagCont;
        return (_row$tableNodeTagCont = row.tableNodeTagContent) !== null && _row$tableNodeTagCont !== void 0 ? _row$tableNodeTagCont : null;
      }
    });
  }
  let rows = tableData;
  if (allowOnlyLeafSelection) {
    rows = tableData.filter(data => data.type === 'leaf' || allowRootSelection && data._id === '0');
  }
  const singleSelectTableProps = {
    allowRowSelect: true,
    highlightedRow: (_rows = rows) === null || _rows === void 0 ? void 0 : _rows.find(row => row.checked),
    onRowSelect: clickedRow => {
      if (singleSelect && singleSelectRadio && clickedRow !== null && clickedRow !== void 0 && clickedRow.disabled) {
        return;
      }
      handleCheckboxClick(clickedRow._id, true);
    }
  };
  return /*#__PURE__*/_jsx(Table, _objectSpread(_objectSpread({
    rows: rows,
    sortHandler: handleSorting,
    columns: columns
  }, singleSelect ? singleSelectTableProps : {}), {}, {
    disableColumnManagement: true
  }));
};
export default NodesTable;