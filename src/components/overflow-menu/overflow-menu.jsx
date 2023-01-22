import React from 'react';
import { useRef, useState } from 'react';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import { FiMoreVertical } from 'react-icons/fi';
import { classes, defaultTabIndex, defaultIconSize, defaultWidth } from './constants';
import PropTypes from 'prop-types';
import './overflow-menu.scss';

const OverflowMenu = ({
  options,
  onChange,
  width = defaultWidth,
  getOptionLabel,
  icon,
  onClick = () => {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState(null);
  const iconRef = useRef();
  const getContainerDimension = () => {
    let rect = iconRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height,
    };
    setContainerDimension(dimension);
  };

  const showAllOptions = () => {
    getContainerDimension();
    setShowOptions(!showOptions);
  };

  const clickHandler = (e) => {
    onClick && onClick(e);
    showAllOptions();
  };

  const blurHandler = () => {
    setShowOptions(false);
  };

  const selectOption = (event, value) => {
    event.stopPropagation();
    if (!Boolean(value.isDisabled)) {
      setShowOptions(false);
      onChange(event, value);
    }
  };

  const iconKeyDownHandler = (event) => {
    if (event.code === 'Enter') {
      showAllOptions();
    }
  };

  return (
    <>
      <div
        data-testid={'icon-wrapper'}
        className={classes.iconWrapper}
        ref={iconRef}
        onBlur={blurHandler}
        onClick={clickHandler}
        onKeyDown={iconKeyDownHandler}
        tabIndex={defaultTabIndex}
      >
        {Boolean(icon) ? icon : <FiMoreVertical size={defaultIconSize} />}
      </div>
      {showOptions && (
        <MenuOptions
          portalContainerId={'overflow-menu-options'}
          options={options}
          getOptionLabel={getOptionLabel}
          containerDimension={containerDimension}
          onChange={selectOption}
          width={width}
        />
      )}
    </>
  );
};

OverflowMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  width: PropTypes.string,
  onClick: PropTypes.func,
};

export default OverflowMenu;
