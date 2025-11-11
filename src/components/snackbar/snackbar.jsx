import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './snackbar.scss';
import errorIcon from '../../assets/icons/formError.svg';
import closeError from '../../assets/icons/close-error.svg';
import { imageRole, errorRole } from './constants';
import { classes } from './constants';

const Snackbar = ({
  title,
  errorList,
  maxWidth = null,
  maxHeight = null,
  allowClosing = false,
  onClose,
}) => {
  const [ isClosed, setIsClosed ] = useState(false)

  const handleClose = e => {
    e.stopPropagation()
    setIsClosed(true)

    if (typeof onClose === 'function') {
      onClose()
    }
  }

  if (isClosed) {
    return null
  }

  return (
    <div className={classes.snackbarContainer} data-testid={classes.snackbarContainer}>
      <div className={classes.snackbar}>
        <div className={classes.imageTitle}>
          <img role={imageRole} src={errorIcon} alt={title} />
        </div>
        <div className={classes.detailsContainer}>
          {title && <span className={classes.title}>{title}</span>}
          <div
            className={classes.errorListContainer}
            style={{ maxWidth, maxHeight }}
          >
            {errorList && errorList.length
              ? errorList.map((element, index) => (
                  <div key={index} data-testid={errorRole}>
                    {element}
                  </div>
                ))
              : null}
          </div>
        </div>
        {allowClosing && (
          <button className={classes.closeIcon} onClick={handleClose}>
            <img role={'close-snackbar'} src={closeError} alt={'Close'} />
          </button>
        )}
      </div>
    </div>
  );
};

Snackbar.propTypes = {
  title: PropTypes.string,
  errorList: PropTypes.array,
  allowClosing: PropTypes.bool,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  onClose: PropTypes.func,
};

export default Snackbar;
