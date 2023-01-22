import React, { useEffect, useRef, useState } from 'react';
import MenuOptions from './menu-options';
import { FiMoreVertical } from 'react-icons/fi';
import { classes, defaultIconSize } from './constants';
import PropTypes from 'prop-types';
import './overflow-menu-search.scss';

const OverflowMenuSearch = ({
  options,
  onChange,
  getOptionIcon,
  getOptionLabel,
  getOptionId,
  icon,
  searchInputDisabled = false,
  onClick = () => {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState(null);
  const iconRef = useRef();
  const getContainerDimension = () => {
    let rect = iconRef?.current?.getBoundingClientRect();
    let dimension = {
      top: rect?.top,
      right: rect?.right,
      bottom: rect?.bottom,
      left: rect?.left,
      height: rect?.height,
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

  const selectOption = (value) => {
    onChange(value);
  };
  const handleResize = () => {
    getContainerDimension();
  };

  useEffect(() => {
    getContainerDimension();
    window.addEventListener('resize', handleResize, false);
  }, [options]);

  return (
    <>
      <div
        data-testid={'icon-wrapper'}
        className={classes.iconWrapper}
        ref={iconRef}
        onClick={clickHandler}
      >
        {Boolean(icon) ? icon : <FiMoreVertical size={defaultIconSize} />}
      </div>

      {showOptions && containerDimension && (
        <MenuOptions
          portalContainerId={'search-overflow-menu-options'}
          options={options}
          getSelectedOption={selectOption}
          getOptionLabel={getOptionLabel}
          getOptionId={getOptionId}
          getOptionIcon={getOptionIcon}
          searchInputDisabled={searchInputDisabled}
          containerDimension={containerDimension}
        />
      )}
    </>
  );
};

OverflowMenuSearch.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionId: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func,
  icon: PropTypes.elementType,
  searchInputDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OverflowMenuSearch;
