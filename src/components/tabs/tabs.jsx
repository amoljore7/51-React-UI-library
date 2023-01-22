import React from 'react';
import PropTypes from 'prop-types';
import {
  classes,
  selected,
  variantFixedProp,
  variantAutoProp,
  tabTestId,
  defaultTabIndex,
  iconStart,
  iconEnd,
  iconTop,
} from './constants';
import classNames from 'classnames';
import './tabs.scss';

const Tabs = ({ value, handleChange, items, variant }) => {
  const ulClass = {
    [classes.horizontalTabsUlList]: true,
    [classes.variantAuto]: variant === variantAutoProp,
  };
  return (
    <ul className={classNames({ ...ulClass })} data-testid={tabTestId}>
      {items &&
        items.length &&
        items.map((element, index) => {
          const selectedTab = index === value ? selected : null;
          return (
            <Tab
              key={`tab-item-${index}`}
              index={index}
              selectedTab={selectedTab}
              title={element.title}
              icon={element.icon}
              iconPosition={element.iconPosition}
              handleChange={handleChange}
              variant={variant}
            />
          );
        })}
    </ul>
  );
};

const Tab = ({
  title,
  selectedTab,
  handleChange,
  index,
  icon,
  iconPosition,
  variant,
}) => {
  const listClass = {
    [classes.horizontalTabsLiList]: true,
    [classes.selected]: selectedTab,
    [classes.variantFixed]: variant === variantFixedProp,
  };

  const getIcon = (icon) => {
    return <div className={classes.horizontalTabIconBox}>{icon}</div>;
  };
  return (
    <li
      className={classNames({ ...listClass })}
      key={`list-item-${index}`}
      tabIndex={defaultTabIndex}
      onClick={() => handleChange(index)}
    >
      <div className={classes.horizontalTabContainer}>
        {iconStart === iconPosition && icon && getIcon(icon)}
        <div>
          {iconTop === iconPosition && icon && getIcon(icon)}
          {title && <div className={classes.horizontalTabTitle}>{title}</div>}
        </div>
        {iconEnd === iconPosition && icon && getIcon(icon)}
      </div>
    </li>
  );
};

Tabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  variant: PropTypes.string,
};

export default Tabs;
