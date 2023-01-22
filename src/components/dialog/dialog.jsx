import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import { FiX } from 'react-icons/fi';
import {
  alertColor,
  classes,
  errorColor,
  generalColor,
  iconColor,
  iconSize,
  dialogType,
  zIndex,
  defaultWidth,
  defaultHeight,
} from './constants';

import './dialog.scss';

const DialogPopup = ({
  type = dialogType.general,
  width = defaultWidth,
  height = defaultHeight,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onSubmit,
  onCancel,
  children,
  primaryButtonDisabled = false,
}) => {
  const [dialogEl] = useState(document.createElement('div'));
  dialogEl.id = 'dialog-popup';
  dialogEl.style.position = 'fixed';
  dialogEl.style.zIndex = zIndex;

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(dialogEl);
    return () => bodyElement.removeChild(dialogEl);
  }, [dialogEl]);

  const getStrapColor = () => {
    switch (type) {
      case dialogType.general:
        return generalColor;
      case dialogType.alert:
        return alertColor;
      case dialogType.error:
        return errorColor;
    }
  };

  const getDialogStrap = () => {
    return (
      <div
        role="popup-strap"
        className={classes.popupStrap}
        style={{ width: width - 2, backgroundColor: getStrapColor() }}
      ></div>
    );
  };

  const getDialogHeader = () => {
    return (
      <div className={classes.headingContainer}>
        <div className={classes.titleContainer}>
          <Typography variant="heading4">{title}</Typography>
        </div>
        <div className={classes.iconContainer}>
          <FiX color={iconColor} size={iconSize} onClick={onCancel} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    );
  };

  const getDialogMessage = () => {
    return (
      <div role="message" className={classes.messageContainer}>
        <Typography variant="body">{message}</Typography>
      </div>
    );
  };
  const getChildrenContainer = () => {
    return <div className={classes.dialogChildrenWrapper}>{children}</div>;
  };

  const getDialogButton = () => {
    return (
      <div className={classes.buttonContainer}>
        {secondaryButtonText && getActionButton('secondary', secondaryButtonText, onCancel)}
        {primaryButtonText &&
          getActionButton('primary', primaryButtonText, onSubmit, primaryButtonDisabled)}
      </div>
    );
  };

  const getActionButton = (type, buttonText, clickHandler, primaryButtonDisabled) => {
    return (
      <div className={classes.buttonWrapper}>
        <Button variant={type} size="large" onClick={clickHandler} disabled={primaryButtonDisabled}>
          {buttonText}
        </Button>
      </div>
    );
  };

  return createPortal(
    <>
      <div className={classes.overlayContainer} />
      <div
        role="dialog-popup"
        className={classes.dialogContainer}
        style={{ width: width, height: height }}
      >
        {getDialogStrap()}
        {getDialogHeader()}
        {getDialogMessage()}
        {children && getChildrenContainer()}
        {(primaryButtonText || secondaryButtonText) && getDialogButton()}
      </div>
    </>,
    dialogEl
  );
};

DialogPopup.propTypes = {
  type: PropTypes.oneOf([dialogType.general, dialogType.alert, dialogType.error]),
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.object,
  primaryButtonDisabled: PropTypes.bool,
};

export default DialogPopup;
