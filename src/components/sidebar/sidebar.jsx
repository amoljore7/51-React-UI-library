import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { classes, listRole } from './constants';
import classNames from 'classnames';
import './sidebar.scss';

const Sidebar = ({ sidebarData, open, menuTitle, history, onClose }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(-1);

  const drawerClass = {
    [classes.drawer]: true,
    [classes.drawerActive]: open,
  };

  const clickHandler = (route, itemIndex, groupIndex) => {
    history && route && history.push(route);
    setCurrentGroupIndex(groupIndex);
    setCurrentItemIndex(itemIndex);
  };
  return (
    <nav className={classNames({ ...drawerClass })}>
      <div className={classes.menuTitle}>
        <span>{menuTitle}</span>
      </div>
      <ul role={listRole} className={classes.drawerItems}>
        {sidebarData &&
          sidebarData.map((element, groupIndex) => {
            const menuGroupProps = {
              element,
              groupIndex,
              currentGroupIndex,
              currentItemIndex,
              clickHandler,
              onClose,
              key: `menu-group-${groupIndex}`,
            };
            return <MenuGroup {...menuGroupProps} />;
          })}
      </ul>
    </nav>
  );
};

const MenuGroup = ({
  element,
  groupIndex,
  currentItemIndex,
  currentGroupIndex,
  clickHandler,
  onClose,
}) => {
  return (
    <>
      <div className={classes.groupHeader} key={`${groupIndex}-`}>
        {element.GroupHeader}
      </div>
      {element.items &&
        element.items.map((item, itemIndex) => {
          const wasClicked = currentItemIndex === itemIndex && currentGroupIndex === groupIndex;

          return (
            <MenuItem
              key={`group-menu-item-${itemIndex}-${groupIndex}`}
              groupIndex={groupIndex}
              itemIndex={itemIndex}
              wasClicked={wasClicked}
              route={item.route}
              icon={item.icon}
              title={item.title}
              clickHandler={clickHandler}
              onClose={onClose}
            />
          );
        })}
    </>
  );
};

const MenuItem = ({
  route,
  title,
  icon,
  clickHandler,
  onClose,
  itemIndex,
  wasClicked,
  groupIndex,
}) => {
  const navListClass = {
    [classes.navList]: !wasClicked,
    [classes.navListFocus]: wasClicked,
  };
  return (
    <li
      className={classNames({ ...navListClass })}
      onClick={(event) => {
        event.preventDefault();
        clickHandler(route, itemIndex, groupIndex);
        onClose && onClose();
      }}
    >
      <div className={classes.navListItems}>
        <div className={classes.navIcon}>{icon}</div>
        <div>
          <span>{title}</span>
        </div>
      </div>
    </li>
  );
};

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  sidebarData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func,
};

export default Sidebar;
