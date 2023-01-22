import React, { useState, useRef, useEffect } from 'react';
import { classes, defaultIconSize, smallIconSize, defaultTabIndex } from './constants';
import './select.scss';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const Select = ({
  options = [],
  label,
  helperText,
  onChange,
  getOptionLabel,
  disabled = false,
  readOnly = false,
  width,
  value,
  error,
  errorMessage,
  inline = false,
  placeholder,
  size = 'large',
  onBlur,
  disablePortal = false,
}) => {
  let optionSelected = Boolean(value) ? value : null;
  const [selectedValue, setSelectedValue] = useState(optionSelected);
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState();
  const selectRef = useRef();

  useEffect(() => {
    setSelectedValue(optionSelected);
  }, [value]);

  const getContainerDimension = () => {
    let rect = selectRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height,
    };
    setContainerDimension(dimension);
  };

  const showSuggestions = () => {
    getContainerDimension();
    setShowOptions(!showOptions);
  };

  const selectedValueClickHandler = () => {
    if (!(disabled || readOnly)) {
      showSuggestions();
    }
  };

  const selectedValueKeyDownHandler = (event) => {
    if (event.code === 'Enter') {
      if (!(disabled || readOnly)) {
        showSuggestions();
      }
    }
  };

  const blurHandler = (e) => {
    setShowOptions(false);
    onBlur && onBlur(e);
  };

  const selectOption = (event, value) => {
    setShowOptions(false);
    setSelectedValue(value);
    onChange(event, value);
  };

  const labelClasses = {
    [classes.selectLabel]: true,
    [classes.selectLabelDisabled]: disabled,
  };

  const helperTextClasses = {
    [classes.selectHelperText]: true,
    [classes.selectHelperTextDisabled]: disabled,
  };

  const containerClasses = {
    [classes.container]: true,
    [classes.selectContainerFocus]: !(disabled || readOnly) && size !== 'small',
    [classes.selectContainerDisabled]: disabled && !inline,
    [classes.selectContainerDisabledInline]: disabled && inline,
    [classes.selectContainerInline]: !disabled && inline,
    [classes.selectContainerError]: errorMessage,
    [classes.selectContainerReadOnly]: readOnly,
    [classes.selectSmallContainerFocus]: size === 'small',
    [classes.selectSmallContainer]: size === 'small',
  };

  const selectValueClasses = {
    [classes.selectValue]: true,
    [classes.selectPlaceholder]: !selectedValue && !readOnly,
    [classes.selectValueDisabled]: disabled,
    [classes.selectValueReadOnly]: readOnly,
    [classes.selectSmallValueWrapper]: size === 'small',
  };

  const actionsContainerItemClasses = {
    [classes.actionsContainerItem]: true,
    [classes.selectActionsSmallContainerItem]: size === 'small',
  };

  return (
    <>
      <div className={classes.wrapper}>
        {label && <div className={classNames({ ...labelClasses })}>{label}</div>}
        {!readOnly && helperText && (
          <div className={classNames({ ...helperTextClasses })}>{helperText}</div>
        )}
        <div
          ref={selectRef}
          className={classNames({ ...containerClasses })}
          style={{ width: width }}
          tabIndex={defaultTabIndex}
          onBlur={blurHandler}
        >
          <div
            data-testid="select-value"
            className={classNames({ ...selectValueClasses })}
            onClick={selectedValueClickHandler}
            onKeyDown={selectedValueKeyDownHandler}
            tabIndex={defaultTabIndex}
          >
            {selectedValue ? getOptionLabel(selectedValue) : readOnly ? 'None' : placeholder}
          </div>
          {!readOnly && (
            <div className={classes.actionsContainer}>
              <div
                className={classNames({ ...actionsContainerItemClasses })}
                onClick={selectedValueClickHandler}
                onKeyDown={selectedValueKeyDownHandler}
                tabIndex={defaultTabIndex}
              >
                {showOptions ? (
                  <IoChevronUp
                    className={disabled ? classes.selectIconDisabled : classes.selectIcon}
                    size={size === 'small' ? smallIconSize : defaultIconSize}
                  />
                ) : (
                  <IoChevronDown
                    className={disabled ? classes.selectIconDisabled : classes.selectIcon}
                    size={size === 'small' ? smallIconSize : defaultIconSize}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {error ? (
          <div className={classes.selectErrorMessage} style={{ width: width }}>
            {errorMessage}
          </div>
        ) : null}
      </div>

      {showOptions && (
        <MenuOptions
          portalContainerId={'dropdown-components'}
          containerDimension={containerDimension}
          width={width}
          options={options}
          onChange={selectOption}
          getOptionLabel={getOptionLabel}
          disablePortal={disablePortal}
        />
      )}
    </>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
};

export default Select;
