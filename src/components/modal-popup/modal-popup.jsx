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

const ModalPopup = React.forwardRef(({ width, title, buttons, onCancel, children, classNamePrefix },ref) => {
  const [modalEl] = useState(document.createElement('div'));
  modalEl.id = modalPopupId;
  modalEl.style.zIndex = 100;
  if (classNamePrefix) {
    modalEl.className = `${classNamePrefix}-${modalPopupId}`
  }

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(modalEl);
    return () => bodyElement.removeChild(modalEl);
  }, [modalEl]);

  const getClassNames = (elementClassName) => {
    let finalClassName = elementClassName

    if (classNamePrefix) {
      finalClassName += ` ${classNamePrefix}-${elementClassName}`
    }

    return finalClassName
  }

  const getModalStrap = () => {
    return <div className={getClassNames(classes.modalStrap)} style={{ width: width - 2 }}></div>;
  };

  const crossIconKeyDownHandler = (event) => {
    if (event.code === enterCode) {
      onCancel();
    }
  };

  const getModalHeader = () => {
    return (
      <div className={getClassNames(classes.headingContainer)}>
        <div className={getClassNames(classes.titleContainer)}>
          <Typography variant="heading4">{title}</Typography>
        </div>
        <div className={getClassNames(classes.iconContainer)}>
          <FiX
            tabIndex={0}
            size={iconSize}
            onClick={onCancel}
            onKeyDown={crossIconKeyDownHandler}
            className={getClassNames(classes.icon)}
            role={crossIconRole}
          />
        </div>
      </div>
    );
  };

  const getActionButtons = () => {
    return (
      buttons && (
        <div className={getClassNames(classes.buttonsContainer)}>
          {buttons.map((item, index) => {
            return (
              <div
                key={`${buttonWrapperPrefix}${index}`}
                className={getClassNames(classes.buttonWrapper)}
              >
                <Button
                  variant={item.variant}
                  size={item.size}
                  onClick={item.onClick}
                  disabled={item?.disabled}
                  leftSVGIcon={item?.leftSVGIcon}
                  rightSVGIcon={item?.rightSVGIcon}
                >
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
      <div className={getClassNames(classes.overlayContainer)} />
      <div role={modalPopupRole} className={getClassNames(classes.modalContainer)} style={{ width: width }}>
        {getModalStrap()}
        {getModalHeader()}
        {getActionButtons()}
        <hr className={getClassNames(classes.contentSeparator)} />
        <div className={getClassNames(classes.modalChildrenContainer)} ref={ref}>
          <div className={getClassNames(classes.modalChildren)}>{children}</div>
        </div>
      </div>
    </>,
    modalEl
  );
});

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
  classNamePrefix: PropTypes.string,
};

export default ModalPopup;
