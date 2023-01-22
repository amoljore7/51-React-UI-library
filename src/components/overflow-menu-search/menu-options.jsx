import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, defaultIconSize, defaultWidth, OBJECT_TYPE } from './constants';
import SearchInput from '../search';
import Typography from '../typography';
import Tooltip from '../tooltip';
import CheckBox from '../checkbox';
import { createPortal } from 'react-dom';

import './menu-options.scss';

const MenuOptions = ({
  options,
  getSelectedOption,
  getOptionIcon,
  getOptionLabel,
  getOptionId,
  searchInputDisabled,
  containerDimension,
  portalContainerId,
}) => {
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(0);
  const [optionsContainerWidth, setOptionsContainerWidth] = useState(0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const [optionsEl] = useState(document.createElement('div'));
  optionsEl.id = `${portalContainerId}`;
  optionsEl.style.zIndex = 2000;
  optionsEl.style.backgroundColor = 'white';

  let bottomWidth, rightWidth, left, top;

  optionsEl.style.position = 'absolute';
  optionsEl.style.top = 0;
  optionsEl.style.left = 0;
  if (containerDimension) {
    bottomWidth = `${vh - containerDimension.bottom}`;
    rightWidth = `${vw - containerDimension.left}`;
    left =
      `${rightWidth}` < optionsContainerWidth
        ? containerDimension.right - optionsContainerWidth
        : containerDimension.left;
    top =
      `${bottomWidth}` < optionsContainerHeight
        ? containerDimension.top - optionsContainerHeight
        : containerDimension.bottom;
  }

  optionsEl.style.transform =
    containerDimension &&
    `translate3d(${left + window.pageXOffset}px,${top + window.pageYOffset}px,0)`;

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.appendChild(optionsEl);
    const optionsElHeight = optionsEl.getBoundingClientRect().height;
    const optionsElWidth = optionsEl.getBoundingClientRect().width;
    setOptionsContainerHeight(optionsElHeight);
    setOptionsContainerWidth(optionsElWidth);
    return () => bodyElement.removeChild(optionsEl);
  }, [optionsEl, options]);

  const optionsListProps = {
    options,
    getSelectedOption,
    getOptionIcon,
    getOptionLabel,
    getOptionId,
    searchInputDisabled,
  };

  return createPortal(<OverflowMenuList {...optionsListProps} />, optionsEl);
};

const OverflowMenuList = ({
  options = [],
  getSelectedOption,
  getOptionId,
  getOptionLabel,
  getOptionIcon,
  searchInputDisabled = false,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [isAllOptionUncheck, setIsAllOptionUncheck] = useState();
  const [flag, setFlag] = useState(false);

  const clearAllClass = {
    [classes.clearLabel]: true,
    [classes.clearLabelBlur]: isAllOptionUncheck === true,
  };

  useEffect(() => {
    if (searchValue) {
      const list = options.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(searchValue.toLowerCase())
      );
      setOptionList(list);
    } else {
      setOptionList(options);
    }
  }, [options]);

  useEffect(() => {
    const isUncheck = options.every((element) => {
      return element.checked === Boolean(false);
    });
    setIsAllOptionUncheck(isUncheck);
  }, [options]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredList = options.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(value.toLowerCase())
      );
      setOptionList(filteredList);
      setSearchValue(value);
    } else {
      setOptionList(options);
      setSearchValue('');
    }
  };

  const handleCheckboxChange = (event, element) => {
    event.stopPropagation();
    const newState = optionList.map((obj) => {
      if (getOptionId(obj) === getOptionId(element)) {
        return { ...obj, checked: !Boolean(element.checked) };
      }
      return obj;
    });
    setOptionList(newState);
    setFlag(true);
  };

  const handleClick = () => {
    if (isAllOptionUncheck) return;
    const unCheckAllOption = optionList.map((obj) => {
      return { ...obj, checked: false };
    });
    setOptionList(unCheckAllOption);
    setFlag(true);
  };

  const haveNested = (obj) => Object.values(obj).some((x) => typeof x === OBJECT_TYPE);
  const combine = (obj1, obj2) => {
    if (!haveNested(obj1)) return { ...obj1, ...obj2 };
    let res = obj1;
    for (let key in obj1) {
      if (typeof obj1[key] === OBJECT_TYPE) {
        res[key] = combine(obj1[key], obj2[key]);
      } else if (obj2[key]) res[key] = obj2[key];
    }
    return res;
  };

  useEffect(() => {
    if (flag) {
      const result = options?.map((x) => {
        let temp = optionList.find((a) => getOptionId(a) === getOptionId(x));
        return temp ? combine(x, temp) : x;
      });
      if (result) {
        getSelectedOption(result);
        setFlag(false);
      }
    }
  }, [flag]);

  return (
    <div className={classes.container} data-testid={'menu-wrapper'}>
      <div className={classes.searchWrapper}>
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          disabled={searchInputDisabled}
          width={defaultWidth}
        />
      </div>
      <div className={classNames({ ...clearAllClass })} onClick={() => handleClick()}>
        <Typography variant="label1">Clear All</Typography>
      </div>
      <div className={classes.menuItem} data-testid={'check-box-wrapper'}>
        {optionList?.map((element) => {
          return (
            <SingleOption
              key={getOptionId(element)}
              icon={getOptionIcon(element)}
              value={getOptionLabel(element)}
              checked={element.checked}
              handleCheckboxChange={(event) => handleCheckboxChange(event, element)}
            />
          );
        })}
      </div>
    </div>
  );
};

const SingleOption = ({ icon, value, checked = false, handleCheckboxChange }) => {
  return (
    <div className={classes.optionsContainer}>
      <CheckBox
        name={value}
        checked={checked}
        onChange={handleCheckboxChange}
        width={defaultIconSize}
        height={defaultIconSize}
      />
      {icon && <img src={icon} />}
      <Typography variant="label1">
        <Tooltip title={value} position="top">
          <div className={classes.titleEllipsis}>{value}</div>
        </Tooltip>
      </Typography>
    </div>
  );
};

SingleOption.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
};

OverflowMenuList.propTypes = {
  options: PropTypes.array.isRequired,
  getSelectedOption: PropTypes.func.isRequired,
  getOptionId: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func.isRequired,
  searchInputDisabled: PropTypes.bool.isRequired,
};

MenuOptions.propTypes = {
  options: PropTypes.array.isRequired,
  getSelectedOption: PropTypes.func.isRequired,
  getOptionId: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func.isRequired,
  searchInputDisabled: PropTypes.bool.isRequired,
  containerDimension: PropTypes.object.isRequired,
  portalContainerId: PropTypes.string.isRequired,
};

export default MenuOptions;
