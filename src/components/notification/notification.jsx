import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './notification.scss';
import close from '../../assets/icons/close.svg';
import closeInvert from '../../assets/icons/close-invert.svg';
import { BsExclamationCircle, BsExclamationTriangle } from 'react-icons/bs';
import {
  classes,
  warningType,
  autoHideDuration,
  defaultType,
  typeToClass,
} from './constants';
import classNames from 'classnames';

const Notification = ({
  title,
  type = defaultType,
  duration,
  onClose,
  open,
  inPlace = false,
}) => {
  let timeoutID = null;
  useEffect(() => {
    if (open) {
      timeoutID = setTimeout(() => {
        onClose && onClose();
      }, duration || autoHideDuration);
    }
  }, [open]);

  const errorIconClasses = {
    [classes.icon]: true,
    [classes.errorIconColor]: true,
  };

  const warningIconClasses = {
    [classes.icon]: true,
    [classes.warningIconColor]: true,
  };

  const iconType = {
    error: (
      <BsExclamationCircle className={classNames({ ...errorIconClasses })} />
    ),
    success: null,
    general: null,
    warning: (
      <BsExclamationTriangle
        className={classNames({ ...warningIconClasses })}
      />
    ),
  };

  const containerClasses = {
    [classes.container]: true,
    [classes.inPlaceNotification]: inPlace,
  };

  return (
    open && (
      <div className={classNames({ ...containerClasses })}>
        <div className={`${classes.notification} ${typeToClass[type]}`}>
          <div className={classes.image}>{iconType[type]}</div>
          <div className={classes.title}>{title}</div>
          {onClose && (
            <img
              className={classes.closeButton}
              src={type == warningType ? close : closeInvert}
              alt={type}
              onClick={() => {
                onClose && onClose();
                clearTimeout(timeoutID);
              }}
            />
          )}
        </div>
      </div>
    )
  );
};

Notification.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.oneOf(['general', 'success', 'error', 'warning']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Notification;
