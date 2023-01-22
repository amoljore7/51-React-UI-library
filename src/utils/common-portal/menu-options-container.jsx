import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classes, optionRole, defaultTabIndex } from './constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './menu-options-container.scss';

const MenuOptions = ({
  options,
  onChange,
  getOptionIcon,
  getOptionLabel,
  getOptionSublabel,
  width,
  containerDimension,
  value,
  portalContainerId,
  disablePortal = false,
}) => {
  const [optionsContainerHeight, setOptionsContainerHeight] = useState(0);
  const [optionsContainerWidth, setOptionsContainerWidth] = useState(0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const [optionsEl] = useState(document.createElement('div'));
  optionsEl.id = `${portalContainerId}`;
  optionsEl.style.zIndex = 3000;
  optionsEl.style.backgroundColor = 'white';

  let bottomWidth, rightWidth, left, top;
  if (!disablePortal) {
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
  }

  useEffect(() => {
    if (!disablePortal) {
      const bodyElement = document.getElementsByTagName('body')[0];
      bodyElement.appendChild(optionsEl);
      const optionsElHeight = optionsEl.getBoundingClientRect().height;
      const optionsElWidth = optionsEl.getBoundingClientRect().width;
      setOptionsContainerHeight(optionsElHeight);
      setOptionsContainerWidth(optionsElWidth);
      return () => bodyElement.removeChild(optionsEl);
    }
  }, [optionsEl, options]);

  const optionsListProps = {
    options,
    getOptionLabel,
    getOptionSublabel,
    getOptionIcon,
    value,
    onChange,
    width,
    disablePortal,
  };

  return disablePortal ? (
    <div style={{ position: 'relative' }}>
      <OptionsList {...optionsListProps} />
    </div>
  ) : (
    createPortal(<OptionsList {...optionsListProps} />, optionsEl)
  );
};

const OptionsList = ({
  options,
  getOptionLabel,
  getOptionSublabel,
  getOptionIcon,
  value,
  onChange,
  width,
  disablePortal,
}) => {
  const isOptionSelected = (item) => {
    let isOptionSelected = false;
    for (let i in value) {
      if (value[i] === item) {
        isOptionSelected = true;
        break;
      }
    }
    return isOptionSelected;
  };

  const isOptionDisabled = (item) => {
    return Boolean(item.isDisabled);
  };

  const labelClasses = {
    [classes.optionLabel]: true,
    [classes.optionLabelWithSublabel]: Boolean(getOptionLabel) && Boolean(getOptionSublabel),
    [classes.optionLabelAlone]:
      Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && !Boolean(getOptionIcon),
  };

  const optionClasses = {
    [classes.option]: true,
    [classes.optionWithLabelSublabel]:
      Boolean(getOptionLabel) && Boolean(getOptionSublabel) && !Boolean(getOptionIcon),
    [classes.optionWithLabel]:
      Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && !Boolean(getOptionIcon),
  };

  const optionIconClasses = {
    [classes.optionIcon]: true,
    [classes.optionIconLarge]:
      Boolean(getOptionIcon) && Boolean(getOptionLabel) && Boolean(getOptionSublabel),
    [classes.optionIconSmall]:
      Boolean(getOptionLabel) && !Boolean(getOptionSublabel) && Boolean(getOptionIcon),
  };

  const optionContainerClasses = {
    [classes.optionsContainer]: true,
  };
  return (
    <div
      className={classNames({ ...optionContainerClasses })}
      style={{
        width: width,
        ...(disablePortal
          ? { backgroundColor: 'white', position: 'absolute', top: 0, left: 0, zIndex: 30000 }
          : {}),
      }}
    >
      {options &&
        Boolean(options.length) &&
        options.map((item, index) => {
          return Boolean(item.separator) ? (
            <hr role={optionRole} key={`separator-${index}`} className={classes.separator} />
          ) : (
            <div
              tabIndex={defaultTabIndex}
              role={optionRole}
              title={getOptionLabel(item)}
              className={classNames({
                ...optionClasses,
                [classes.selectedOption]: isOptionSelected(item),
              })}
              onMouseDown={(event) => event.preventDefault()}
              key={`filter-option-${index}`}
              onClick={(event) => onChange(event, item)}
            >
              {getOptionIcon && (
                <div className={classNames({ ...optionIconClasses })}>
                  <img src={getOptionIcon(item)} alt={getOptionLabel(item)} />
                </div>
              )}
              <div className={classes.optionLabelSublabelContainer}>
                <div
                  className={classNames({
                    ...labelClasses,
                    [classes.disabledOptionLabel]: isOptionDisabled(item),
                  })}
                >
                  {getOptionLabel(item)}
                </div>
                {getOptionSublabel && (
                  <div className={classes.optionSublabel}>{getOptionSublabel(item)}</div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

MenuOptions.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionIcon: PropTypes.func,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSublabel: PropTypes.func,
  width: PropTypes.string,
  containerDimension: PropTypes.object.isRequired,
  value: PropTypes.array,
  portalContainerId: PropTypes.string.isRequired,
  disablePortal: PropTypes.bool,
};

export default MenuOptions;
