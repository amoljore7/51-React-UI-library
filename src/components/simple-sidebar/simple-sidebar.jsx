import React from 'react';
import { classes } from './constants';
import classNames from 'classnames';
import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import './simple-sidebar.scss';

const SimpleSidebar = ({ isOpen, onToggle, children, width, height}) => {
  const drawerClass = {
    [classes.container]: true,
    [classes.containerActive]: isOpen,
  };

  return (
    <div className={classNames({ ...drawerClass })}
    style={{ height, ...isOpen ? { width }: {}}}>
      <img data-testid="toggle" className={classes.arrow} src={isOpen ? chevronLeft : chevronRight} onClick={onToggle}/>
      {isOpen && children}
    </div>
  );
};


export default SimpleSidebar;
