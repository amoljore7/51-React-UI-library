import React from 'react';
import PropTypes from 'prop-types';
import { classes } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
const TableWithNoData = _ref => {
  let {
    noDataMessage,
    columns
  } = _ref;
  if (!noDataMessage) return null;
  return /*#__PURE__*/_jsx("tr", {
    className: classes.row,
    children: /*#__PURE__*/_jsx("td", {
      className: "".concat(classes.expandedCellRender, " ").concat(classes.render),
      colSpan: (columns === null || columns === void 0 ? void 0 : columns.length) || 1,
      children: /*#__PURE__*/_jsx("div", {
        className: classes.noDataFound,
        children: noDataMessage
      })
    })
  });
};
TableWithNoData.propTypes = {
  noDataMessage: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object)
};
export default TableWithNoData;