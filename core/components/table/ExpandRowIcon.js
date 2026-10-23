import React from 'react';
import ChevronDown from '../../assets/icons/chevron-down.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import { classes } from './constants';
import PropTypes from 'prop-types';
import { jsx as _jsx } from "react/jsx-runtime";
const ExpandRowIcon = _ref => {
  let {
    isExpanded = false,
    onClick = () => {}
  } = _ref;
  const Icon = isExpanded ? ChevronDown : ChevronRight;
  return /*#__PURE__*/_jsx(Icon, {
    className: classes.expandRowIcons,
    onClick: onClick,
    "aria-hidden": true,
    focusable: "false"
  });
};
ExpandRowIcon.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func
};
export default ExpandRowIcon;