import React, { useState, useRef, useEffect } from 'react';
import { classes, defaultIconSize, smallIconSize, defaultTabIndex } from './constants';
import './select.scss';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import Tooltip from '../tooltip';
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
  showTooltip = true,
  height,
}) => {
  let optionSelected = Boolean(value) ? value : null;
  const [selectedValue, setSelectedValue] = useState(optionSelected);
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState();
  const [enableTooltip, setEnableTooltip] = useState(false);
  const selectRef = useRef();
  const selectedValueRef = useRef(null);

  useEffect(() => {
    setSelectedValue(optionSelected);
  }, [value]);

  useEffect(() => {
    handleTooltipVisibility()
  }, [selectedValue])

  const handleTooltipVisibility = () => {
    const element = selectedValueRef.current;
    if (showTooltip && selectedValue && element) {
      setEnableTooltip(element.scrollWidth > element.clientWidth)
    } else {
      setEnableTooltip(false)
    }
  }

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

  const renderSelectedValue = () => (
    <div
      data-testid="select-value"
      className={classNames({ ...selectValueClasses })}
      onClick={selectedValueClickHandler}
      onKeyDown={selectedValueKeyDownHandler}
      tabIndex={defaultTabIndex}
      ref={selectedValueRef}
    >
      {selectedValue ? getOptionLabel(selectedValue) : readOnly ? 'None' : placeholder}
    </div>
  )

  return (
    <>
        {label && <div className={classNames({ ...labelClasses })}>{label}</div>}
        {!readOnly && helperText && (
          <div className={classNames({ ...helperTextClasses })}>{helperText}</div>
        )}
        <div
          ref={selectRef}
          className={classNames({ ...containerClasses })}
          style={{ width: width, height: height }}
          tabIndex={defaultTabIndex}
          onBlur={blurHandler}
          data-testid={classes.container}
        >
          {
            enableTooltip && showTooltip ? (
              <Tooltip title={getOptionLabel(selectedValue)} position="top" className="select-value-tooltip">
                {renderSelectedValue()}
              </Tooltip>
            ) :
            renderSelectedValue()
          }
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
        {showOptions && (
          <MenuOptions
            portalContainerId={'dropdown-components'}
            containerDimension={containerDimension}
            width={selectRef?.current?.offsetWidth || width}
            options={options}
            onChange={selectOption}
            getOptionLabel={getOptionLabel}
            disablePortal={disablePortal}
          />
        )}
        {error ? (
          <div className={classes.selectErrorMessage} style={{ width: width }}>
            {errorMessage}
          </div>
        ) : null}
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
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  placeholder: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  height: PropTypes.string,
};

export default Select;
