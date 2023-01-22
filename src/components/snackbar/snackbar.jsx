import React from 'react';
import PropTypes from 'prop-types';
import './snackbar.scss';
import errorIcon from '../../assets/icons/formError.svg';
import { imageRole, errorRole } from './constants';
import { classes } from './constants';

const Snackbar = ({ title, errorList }) => {
  return (
    <div className={classes.snackbarContainer}>
      <div className={classes.snackbar}>
        <div className={classes.imageTitle}>
          <img role={imageRole} src={errorIcon} alt={title} />
          {title && <span className={classes.title}>{title}</span>}
        </div>
        <div className="error-list-container">
          {errorList && errorList.length
            ? errorList.map((element, index) => (
                <div
                  key={index}
                  data-testid={errorRole}
                  className={classes.errorList}
                >
                  {element}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

Snackbar.propTypes = {
  title: PropTypes.string,
  errorList: PropTypes.array,
};

export default Snackbar;
