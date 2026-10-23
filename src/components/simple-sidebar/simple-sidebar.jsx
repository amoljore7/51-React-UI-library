import React from 'react';
import { classes } from './constants';
import classNames from 'classnames';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import './simple-sidebar.scss';

const SimpleSidebar = ({ isOpen, onToggle, children, width, height}) => {
  const drawerClass = {
    [classes.container]: true,
    [classes.containerActive]: isOpen,
  };

  return (
    <div className={classNames({ ...drawerClass })}
    style={{ height, ...isOpen ? { width }: {}}}>
      {isOpen ? (
        <ChevronLeft
          data-testid="toggle"
          className={classes.arrow}
          onClick={onToggle}
          aria-hidden
          focusable="false"
        />
      ) : (
        <ChevronRight
          data-testid="toggle"
          className={classes.arrow}
          onClick={onToggle}
          aria-hidden
          focusable="false"
        />
      )}
      {isOpen && children}
    </div>
  );
};


export default SimpleSidebar;
