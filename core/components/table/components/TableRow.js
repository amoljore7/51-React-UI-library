const _excluded = ["row", "columns", "rowIndex", "rowId", "highlightedRow", "allowRowSelect", "onRowSelect", "handleExpandedRows", "expandedRows", "noDataMessage", "expandedContent", "isActionColumnCollapsed", "isChecked", "onCheckRow", "disableCheckbox", "isNewRowTable"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { classes } from '../constants';
import { renderTableRow } from './RenderTableRow';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const TableRow = /*#__PURE__*/React.memo(_ref => {
  var _row$subRows, _row$subRows2;
  let {
      row,
      columns,
      rowIndex,
      rowId = rowIndex,
      highlightedRow,
      allowRowSelect,
      onRowSelect,
      handleExpandedRows,
      expandedRows,
      noDataMessage,
      expandedContent,
      isActionColumnCollapsed = false,
      isChecked = false,
      onCheckRow,
      disableCheckbox = false,
      isNewRowTable = false
    } = _ref,
    restProps = _objectWithoutProperties(_ref, _excluded);
  const handleClick = useCallback(e => onRowSelect === null || onRowSelect === void 0 ? void 0 : onRowSelect(row, e), [row, onRowSelect]);
  const isHighlighted = row === highlightedRow;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("tr", _objectSpread(_objectSpread({
      "data-testid": classes.row,
      className: "".concat(classes.row, " ").concat(isHighlighted ? classes.rowHighlighted : '', " ").concat(isChecked ? classes.rowChecked : '', " ").concat(allowRowSelect ? classes.rowSelectable : ''),
      onClick: allowRowSelect ? handleClick : undefined
    }, restProps), {}, {
      children: row && renderTableRow(row, columns, rowIndex, {
        rowId,
        handleExpandedRows,
        expandedRows,
        isActionColumnCollapsed,
        isChecked,
        onCheckRow,
        disableCheckbox,
        isNewRowTable
      })
    })), (expandedRows === null || expandedRows === void 0 ? void 0 : expandedRows.includes(rowId)) && ((row === null || row === void 0 || (_row$subRows = row.subRows) === null || _row$subRows === void 0 ? void 0 : _row$subRows.length) > 0 ? row.subRows.map((subRow, index) => {
      return /*#__PURE__*/_jsx("tr", {
        className: "".concat(classes.row, " ").concat(classes.expandedRow),
        children: renderTableRow(subRow, columns, subRow === null || subRow === void 0 ? void 0 : subRow.id, {
          isSubRow: true,
          isActionColumnCollapsed
        })
      }, "".concat(rowIndex, "-").concat(index));
    }) : /*#__PURE__*/_jsx("tr", {
      className: classes.row,
      children: /*#__PURE__*/_jsxs("td", {
        className: expandedContent ? "".concat(classes.expandedContentRender) : "".concat(classes.expandedCellRender, " ").concat(classes.render),
        colSpan: columns === null || columns === void 0 ? void 0 : columns.length,
        children: [expandedContent && /*#__PURE__*/_jsx(_Fragment, {
          children: expandedContent(row)
        }), !(row !== null && row !== void 0 && (_row$subRows2 = row.subRows) !== null && _row$subRows2 !== void 0 && _row$subRows2.length) && !expandedContent && /*#__PURE__*/_jsx("div", {
          className: classes.noDataFound,
          children: noDataMessage
        })]
      })
    }))]
  });
});
TableRow.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rowIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightedRow: PropTypes.object,
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  handleExpandedRows: PropTypes.func,
  expandedRows: PropTypes.array,
  noDataMessage: PropTypes.string,
  expandedContent: PropTypes.func,
  isActionColumnCollapsed: PropTypes.bool,
  isChecked: PropTypes.bool,
  onCheckRow: PropTypes.func,
  disableCheckbox: PropTypes.bool,
  isNewRowTable: PropTypes.bool
};
export default TableRow;