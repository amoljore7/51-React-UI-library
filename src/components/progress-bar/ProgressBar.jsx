import PropTypes from 'prop-types';
import React from 'react';
import Typography from '../typography';
import { classes } from './constants';
import './ProgressBar.scss';

const ProgressBar = ({ progressPercentage, displayValue, width, height }) => {
  return (
    <>
      <div className={classes.parentContainer}>
        <div className={classes.container} style={{ width, height }}>
          <div
            className={classes.leading}
            style={{ width: `${(progressPercentage / 100) * width}px` }}
          />
          <div
            className={classes.trailing}
            style={{ width: `${((100 - progressPercentage) / 100) * width}px` }}
          />
        </div>
        <div className={classes.value}>
          <Typography variant='label1'>{displayValue}</Typography>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
ProgressBar.propTypes = {
  progressPercentage: PropTypes.number,
  width: PropTypes.number,
  displayValue: PropTypes.string,
};
