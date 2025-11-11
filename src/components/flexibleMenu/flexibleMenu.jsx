import React from 'react';
import Button from '../button';
import './flexibleMenu.scss';
import closeX from '../../assets/icons/close-x.svg';

const FlexibleMenu = ({
  maxHeight = false,
  title,
  footer,
  onClose,
  children,
}) => {
  // Add a class for maxHeight if needed
  const menuClass = `bds-flexible-menu${maxHeight ? ' bds-flexible-menu-max-height' : ''}`;

  return (
    <div className={menuClass}>
      {title && (
        <div className="bds-flexible-menu-header">
          <span>{title}</span>
          <Button
            variant="textOnly"
            color="primary"
            size="medium"
            aria-label="Close"
            onClick={onClose}
          >
            <img src={closeX} />
          </Button>
        </div>
      )}
      <div className="bds-flexible-menu-content">
        {children}
      </div>
      {footer?.text && (
        <div className="bds-flexible-menu-footer">
          <Button variant="textOnly" color="primary" onClick={footer?.onClick}>
            {footer.text}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlexibleMenu;
