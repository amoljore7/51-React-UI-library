import React, { useState, useRef, useEffect } from 'react';
import MenuOptions from '../../utils/common-portal/menu-options-container';
import {
  classes,
  defaultIconSize,
  defaultTabIndex,
  autocompletePortalId,
  defaultPlaceholder,
} from './constants';
import './autocomplete.scss';
import Pill from '../pill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FiX } from 'react-icons/fi';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { shallowCompare } from '../../utils/helper-utils';

const Autocomplete = ({
  options,
  multiple = false,
  label,
  helperText,
  onInputChange,
  onChange,
  getOptionLabel,
  getOptionSublabel,
  getOptionIcon,
  value,
  disabled = false,
  readOnly = false,
  width,
  errorMessage,
  placeholder = defaultPlaceholder,
  name,
  onBlur,
  error,
  disablePortal = false,
}) => {
  let selectedValues;
  let filteredOptions;

  useEffect(() => {
    const inputValue = !multiple && Boolean(value) ? getOptionLabel(selectedValues[0]) : '';
    setInputValue(inputValue);
    setSelectedOptions(selectedValues);
  }, [value]);

  const filterSelectedOptionsFromOptions = (allOptions, selectedOptions) => {
    let optionsAfterFilter = [...allOptions];
    for (const selectedOption of selectedOptions) {
      optionsAfterFilter = optionsAfterFilter.filter(
        (item) => !shallowCompare(item, selectedOption)
      );
    }
    return optionsAfterFilter;
  };

  selectedValues = Boolean(value) ? [...value] : [];
  filteredOptions = multiple ? filterSelectedOptionsFromOptions(options, selectedValues) : options;

  const [inputValue, setInputValue] = useState(
    !multiple && Boolean(value) ? getOptionLabel(selectedValues[0]) : ''
  );
  const [filteredSuggestions, setFilteredSuggestions] = useState(filteredOptions);
  const [selectedOptions, setSelectedOptions] = useState(selectedValues);
  const [showOptions, setShowOptions] = useState(false);
  const [containerDimension, setContainerDimension] = useState({});
  const autocompleteRef = useRef();

  const getContainerDimension = () => {
    let rect = autocompleteRef.current.getBoundingClientRect();
    let dimension = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      height: rect.height,
    };
    setContainerDimension(dimension);
  };

  const blurHandler = (event) => {
    let isOptionCorrect = false;
    for (let i in options) {
      if (getOptionLabel(options[i]) === inputValue) isOptionCorrect = true;
    }
    if (!multiple && !isOptionCorrect) {
      setInputValue('');
      setFilteredSuggestions(options);
    }
    if (multiple) {
      setInputValue('');
      setFilteredSuggestions(filterSelectedOptionsFromOptions(options, selectedOptions));
    }
    setShowOptions(false);
    !isOptionCorrect && onInputChange(event, '');
  };

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    setShowOptions(true);
    if (multiple) {
      const filteredSuggestions = filterSelectedOptionsFromOptions(options, selectedOptions);
      const filteredOptions = filteredSuggestions.filter((option) => {
        return String(getOptionLabel(option) || '')
          .toLowerCase()
          .includes((event.target.value || '').toLowerCase());
      });
      setFilteredSuggestions(filteredOptions);
    } else {
      const filteredOptions = options.filter((option) => {
        return String(getOptionLabel(option) || '')
          .toLowerCase()
          .includes((event.target.value || '').toLowerCase());
      });
      setFilteredSuggestions(filteredOptions);
    }
    onInputChange(event, event.target.value);
  };

  const selectOption = (event, value) => {
    event.preventDefault();
    setShowOptions(false);
    if (multiple) {
      setInputValue('');
      const newOptions = [...selectedOptions, value];
      setSelectedOptions(newOptions);
      setFilteredSuggestions(filterSelectedOptionsFromOptions(options, newOptions));
      onChange(event, newOptions);
    } else {
      setFilteredSuggestions(options);
      setInputValue(getOptionLabel(value));
      onChange(event, value);
    }
  };

  const deletePill = (event, value) => {
    const filteredOptions = selectedOptions.filter((item) => item !== value);
    setSelectedOptions(filteredOptions);
    setFilteredSuggestions(filterSelectedOptionsFromOptions(options, filteredOptions));
    onChange(event, filteredOptions);
  };

  const showSuggestions = () => {
    if (!(disabled || readOnly)) {
      getContainerDimension();
      setShowOptions(!showOptions);
    }
  };

  const inputClickHandler = () => {
    showSuggestions();
  };

  const inputKeyDownHandler = (event) => {
    if (event.code === 'Enter') {
      showSuggestions();
    }
  };

  const clearAllHandler = (event) => {
    if (!disabled) {
      setShowOptions(false);
      if (!multiple) {
        setInputValue('');
        onInputChange(event, '');
        return;
      }
      setFilteredSuggestions(options);
      setSelectedOptions([]);
      onChange(event, []);
    }
  };

  const crossIconClickHandler = (event) => {
    clearAllHandler(event);
  };

  const crossIconKeyDownHandler = (event) => {
    if (event.code === 'Enter') {
      clearAllHandler(event);
    }
  };

  const renderPills = () => {
    return (
      multiple &&
      selectedOptions.map((option, index) => {
        return (
          <div
            data-testid="pill-wrapper"
            key={`pill-wrapper-${index}`}
            className={classes.pillWrapper}
          >
            <Pill
              disabled={disabled}
              readOnly={readOnly}
              label={getOptionLabel(option)}
              onDelete={(event) => deletePill(event, option)}
            />
          </div>
        );
      })
    );
  };

  const labelClasses = {
    [classes.autocompleteLabel]: true,
    [classes.autocompleteLabelDisabled]: disabled,
  };

  const helperTextClasses = {
    [classes.autocompleteHelperText]: true,
    [classes.autocompleteHelperTextDisabled]: disabled,
  };

  const containerClasses = {
    [classes.container]: multiple ? true : !readOnly,
    [classes.autocompleteContainerError]: !(readOnly || disabled) && multiple && error,
    [classes.autocompleteSingleSelectContainerError]: !(multiple || readOnly || disabled) && error,
    [classes.containerDisabled]: disabled,
    [classes.containerReadOnly]: readOnly,
    [classes.autocompleteContainerFocus]: !(disabled || readOnly),
    [classes.singleSelectContainer]: !(multiple || readOnly),
    [classes.autocompleteSingleSelectContainerFocus]: !(multiple || disabled || readOnly),
  };

  const inputClasses = {
    [classes.autocompleteInput]: true,
    [classes.autocompleteSingleSelectInput]: !multiple,
    [classes.autocompleteSingleSelectDisabledInput]: !multiple && disabled,
  };

  const actionsContainerItemClasses = {
    [classes.actionsContainerItem]: true,
    [classes.autocompleteSingleSelectActionsContainerItem]: !multiple,
    [classes.autocompleteActionsContainerDisabledItem]: disabled,
  };

  const pillInputWrapperClasses = {
    [classes.autocompleteSingleSelectInputWrapper]: !multiple && !readOnly,
    [classes.pillsAndInputWrapper]: multiple,
  };

  return (
    <div className={classes.wrapper}>
      {label && <div className={classNames({ ...labelClasses })}>{label}</div>}
      {!readOnly && helperText && (
        <div className={classNames({ ...helperTextClasses })}>{helperText}</div>
      )}
      <div
        ref={autocompleteRef}
        className={classNames({ ...containerClasses })}
        style={{ width: width }}
        tabIndex={defaultTabIndex}
        onBlur={blurHandler}
      >
        <div className={classNames({ ...pillInputWrapperClasses })}>
          {renderPills()}
          {multiple && !(disabled || readOnly) && (
            <input
              className={classNames({ ...inputClasses })}
              placeholder={placeholder}
              type="text"
              value={inputValue}
              onChange={changeHandler}
              onClick={inputClickHandler}
              onKeyDown={inputKeyDownHandler}
              tabIndex={defaultTabIndex}
              name={name}
              onBlur={(e) => onBlur && onBlur(e)}
            />
          )}
          {!multiple &&
            (!readOnly ? (
              <input
                className={classNames({ ...inputClasses })}
                placeholder={placeholder}
                type="text"
                disabled={disabled}
                value={inputValue}
                onChange={changeHandler}
                onClick={inputClickHandler}
                onKeyDown={inputKeyDownHandler}
                tabIndex={defaultTabIndex}
                name={name}
                onBlur={(e) => onBlur && onBlur(e)}
              />
            ) : (
              <div className={classes.autocompleteSingleSelectReadOnly}>{inputValue}</div>
            ))}
        </div>
        {!readOnly && (
          <div className={classes.actionsContainer}>
            <div
              className={classNames({ ...actionsContainerItemClasses })}
              onClick={crossIconClickHandler}
              onKeyDown={crossIconKeyDownHandler}
              tabIndex={defaultTabIndex}
            >
              {((multiple && selectedOptions.length > 0) || (!multiple && inputValue !== '')) && (
                <FiX
                  size={defaultIconSize}
                  className={disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon}
                />
              )}
            </div>
            <div
              className={classNames({ ...actionsContainerItemClasses })}
              onClick={inputClickHandler}
              onKeyDown={inputKeyDownHandler}
              tabIndex={defaultTabIndex}
            >
              {showOptions ? (
                <IoChevronUp
                  size={defaultIconSize}
                  className={disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon}
                />
              ) : (
                <IoChevronDown
                  size={defaultIconSize}
                  className={disabled ? classes.autocompleteIconDisabled : classes.autocompleteIcon}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {showOptions && filteredSuggestions.length > 0 && (
        <MenuOptions
          portalContainerId={autocompletePortalId}
          containerDimension={containerDimension}
          width={width}
          options={filteredSuggestions}
          onChange={selectOption}
          getOptionLabel={getOptionLabel}
          getOptionIcon={getOptionIcon}
          getOptionSublabel={getOptionSublabel}
          disablePortal={disablePortal}
        />
      )}
      {error ? (
        <div className={classes.autocompleteErrorMessage} style={{ width: width }}>
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSublabel: PropTypes.func,
  getOptionIcon: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  disablePortal: PropTypes.bool,
};

export default Autocomplete;
