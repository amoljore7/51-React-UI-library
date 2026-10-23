import React from 'react';
import ChevronDown from '../../assets/icons/chevron-down.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import { classes } from './constants';
import PropTypes from 'prop-types';

const ExpandRowIcon = ({ isExpanded = false, onClick = () => {} }) => {
  const Icon = isExpanded ? ChevronDown : ChevronRight;
  return (
    <Icon
      className={classes.expandRowIcons}
      onClick={onClick}
      aria-hidden
      focusable="false"
    />
  );
};

ExpandRowIcon.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ExpandRowIcon;
