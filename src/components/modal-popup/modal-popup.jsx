import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes, { string } from 'prop-types';
import Typography from '../typography';
import Button from '../button';
import { FiX } from 'react-icons/fi';
import {
  classes,
  iconSize,
  buttonWrapperPrefix,
  modalPopupRole,
  modalPopupId,
  enterCode,
  crossIconRole,
} from './constants';

import './modal-popup.scss';

const ModalPopup = ({ width, title, buttons, onCancel, children }) => {
  const [modalEl] = useState(document.createElement('div'));
  modalEl.id = modalPopupId;
  modalEl.style.zIndex = 100;

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(modalEl);
    return () => bodyElement.removeChild(modalEl);
  }, [modalEl]);

  const getModalStrap = () => {
    return <div className={classes.modalStrap} style={{ width: width - 2 }}></div>;
  };

  const crossIconKeyDownHandler = (event) => {
    if (event.code === enterCode) {
      onCancel();
    }
  };

  const getModalHeader = () => {
    return (
      <div className={classes.headingContainer}>
        <div className={classes.titleContainer}>
          <Typography variant="heading4">{title}</Typography>
        </div>
        <div className={classes.iconContainer}>
          <FiX
            tabIndex={0}
            size={iconSize}
            onClick={onCancel}
            onKeyDown={crossIconKeyDownHandler}
            className={classes.icon}
            role={crossIconRole}
          />
        </div>
      </div>
    );
  };

  const getActionButtons = () => {
    return (
      buttons && (
        <div className={classes.buttonsContainer}>
          {buttons.map((item, index) => {
            return (
              <div key={`${buttonWrapperPrefix}${index}`} className={classes.buttonWrapper}>
                <Button variant={item.variant} size={item.size} onClick={item.onClick}>
                  {item.text}
                </Button>
              </div>
            );
          })}
        </div>
      )
    );
  };

  return createPortal(
    <>
      <div className={classes.overlayContainer} />
      <div role={modalPopupRole} className={classes.modalContainer} style={{ width: width }}>
        {getModalStrap()}
        {getModalHeader()}
        {getActionButtons()}
        <hr className={classes.contentSeparator} />
        <div className={classes.modalChildrenContainer}>
          <div className={classes.modalChildren}>{children}</div>
        </div>
      </div>
    </>,
    modalEl
  );
};

ModalPopup.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      variant: PropTypes.string,
      size: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  onCancel: PropTypes.func.isRequired,
};

export default ModalPopup;
