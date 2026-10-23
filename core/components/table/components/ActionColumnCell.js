import PropTypes from 'prop-types';
import React from 'react';
import OverflowMenu from '../../overflow-menu';
import { classes } from '../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getOptionLabel = option => {
  var _option$collapsedMenu, _option$testId;
  // collapsedMenuIcon overrides icon specifically for this list row inside
  // the collapsed ⋮ dropdown — the same action still uses icon for its own
  // inline button when the column is expanded (TableCell.jsx's other
  // branch), so a consumer only needs collapsedMenuIcon when the two
  // contexts genuinely call for different art (e.g. icon carries a color
  // cue that only reads correctly against the expanded row, not inside a
  // dropdown).
  const icon = (_option$collapsedMenu = option.collapsedMenuIcon) !== null && _option$collapsedMenu !== void 0 ? _option$collapsedMenu : option.icon;
  return /*#__PURE__*/_jsxs("span", {
    className: classes.columnMenuOption,
    "data-testid": (_option$testId = option.testId) !== null && _option$testId !== void 0 ? _option$testId : option.name,
    children: [icon && /*#__PURE__*/_jsx("span", {
      className: classes.columnMenuOptionIcon,
      children: icon
    }), /*#__PURE__*/_jsx("span", {
      className: classes.columnMenuOptionText,
      children: option.name
    })]
  });
};
const ActionColumnCell = _ref => {
  let {
    row,
    actionItems,
    actionsMenuWidth = '200px'
  } = _ref;
  const options = actionItems !== null && actionItems !== void 0 ? actionItems : [];
  return /*#__PURE__*/_jsx("div", {
    className: classes.actionIconsContainer,
    children: /*#__PURE__*/_jsx(OverflowMenu, {
      options: options,
      onClick: e => e.stopPropagation(),
      onChange: (_e, option) => {
        var _option$onClick;
        return (_option$onClick = option.onClick) === null || _option$onClick === void 0 ? void 0 : _option$onClick.call(option, row);
      },
      getOptionLabel: getOptionLabel,
      width: actionsMenuWidth,
      disabled: options.length === 0
    })
  });
};
ActionColumnCell.propTypes = {
  row: PropTypes.object,
  actionItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.node,
    collapsedMenuIcon: PropTypes.node,
    tooltip: PropTypes.string,
    testId: PropTypes.string,
    onClick: PropTypes.func,
    button: PropTypes.shape({
      variant: PropTypes.string,
      size: PropTypes.string,
      disabled: PropTypes.bool
    })
  })),
  actionsMenuWidth: PropTypes.string
};
export default ActionColumnCell;