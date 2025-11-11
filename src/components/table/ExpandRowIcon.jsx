import React from 'react';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import { classes } from './constants';
import PropTypes from 'prop-types';

const ExpandRowIcon = ({ isExpanded = false, onClick = () => {} }) => {
  return (
    <img
      className={classes.expandRowIcons}
      src={isExpanded ? ChevronDown : ChevronRight}
      onClick={onClick}
    />
  );
};

ExpandRowIcon.propTypes = {
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ExpandRowIcon;
