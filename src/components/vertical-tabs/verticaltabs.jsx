import React from 'react';
import PropTypes from 'prop-types';
import {
  classes,
  defaultTabIndex,
  defaultTabsWidth,
  defaultTopPadding,
  tabKeyPrefix,
} from './constants';
import classNames from 'classnames';
import './verticaltabs.scss';

const VerticalTabs = ({
  value,
  handleChange,
  items,
  width = defaultTabsWidth,
  topPadding = defaultTopPadding,
}) => {
  const tabClickHandler = (index) => {
    handleChange(index);
  };

  const ulClasses = {
    [classes.verticalTabsUlList]: true,
  };

  return (
    <ul
      style={{ width: width, paddingTop: topPadding }}
      className={classNames({ ...ulClasses })}
      tabIndex={defaultTabIndex}
    >
      {items &&
        items.length &&
        items.map((element, index) => {
          const isSelected = index === value ? true : false;
          return (
            <Tab
              itemIndex={index}
              key={`${tabKeyPrefix}${index}`}
              isSelected={isSelected}
              title={element.title}
              icon={element.icon}
              tabClickHandler={tabClickHandler}
            />
          );
        })}
    </ul>
  );
};

const Tab = ({ title, isSelected, tabClickHandler, itemIndex, icon }) => {
  const liClasses = {
    [classes.verticalLi]: true && !Boolean(icon),
    [classes.selectedVerticalLi]: isSelected && !Boolean(icon),
    [classes.verticalLiWithIcon]: Boolean(icon),
    [classes.selectedVerticalLiWithIcon]: Boolean(icon) && isSelected,
  };

  const tabTitleClasses = {
    [classes.verticalTabTitle]: true,
    [classes.selectedVerticalTabTitle]: isSelected,
  };
  return (
    <li
      tabIndex={defaultTabIndex}
      className={classNames({ ...liClasses })}
      onClick={() => tabClickHandler(itemIndex)}
      title={title}
    >
      <div className={classes.verticalTabContainer}>
        {icon && <div className={classes.verticalTabIconContainer}>{icon}</div>}
        {title && <div className={classNames({ ...tabTitleClasses })}>{title}</div>}
      </div>
    </li>
  );
};

VerticalTabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  width: PropTypes.string,
  topPadding: PropTypes.string,
};

export default VerticalTabs;
