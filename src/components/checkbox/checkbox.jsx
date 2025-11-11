import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { checkboxType, classes } from './constants';
import './checkbox.scss';

const Checkbox = ({ name, label, checked, disabled, readOnly, onChange, indeterminate }) => {
  const inputRef = useRef()
  const initialIconState = () => {
    if (disabled) {
      if (checked) {
        return {
          checked: true,
          disabled: true,
        }
      } else if (indeterminate) {
        return {
          indeterminate: true,
          disabled: true,
        }
      } else {
        return {
          disabled: true,
        }
      }
    } else {
      if (readOnly) {
        return { readOnly };
      } else if (indeterminate) {
        return {
          indeterminate: true,
        }
      } else {
        return {};
      }
    }
  };

  const [checkboxHover, setCheckboxHover] = useState(false);
  const [checkboxIcon, setCheckboxIcon] = useState(initialIconState());

  const handleIconChange = () => {
    if (!checked && !disabled && !indeterminate) {
      setCheckboxIcon({});
    } else if (!checked && disabled && !indeterminate) {
      setCheckboxIcon({ disabled: true });
    } else if (checked && !disabled && !indeterminate) {
      setCheckboxIcon({ checked: true });
    } else if (checked && disabled && !indeterminate) {
      setCheckboxIcon({
        checked: true,
        disabled: true,
      });
    } else if (indeterminate && disabled && !checked) {
      setCheckboxIcon({
        indeterminate: true,
        disabled: true,
      });
    } else if (indeterminate && !disabled && !checked) {
      setCheckboxIcon({ indeterminate: true });
    }
  };

  const handleIconOnReadOnly = () => {
    if (readOnly) {
      setCheckboxIcon({ readOnly });
    } else {
      handleIconChange();
    }
  };

  useEffect(() => {
    inputRef.current.indeterminate = indeterminate
    handleIconChange()
  }, [indeterminate])

  useEffect(() => {
    !readOnly && handleIconChange();
  }, [checked, disabled]);
  useEffect(handleIconOnReadOnly, [readOnly]);

  const iconContainerClasses = {
    [classes.iconContainer]: true,
    [classes.iconContainerHover]: checkboxHover,
  }

  const checkboxIconClasses = {
    [classes.checkboxIcon]: true,
    [classes.checkboxIconDisabled]: checkboxIcon.disabled,
    [classes.checkboxIconChecked]: checkboxIcon.checked,
    [classes.checkboxIconReadonly]: checkboxIcon.readOnly,
    [classes.checkboxIconCheckedDisabled]: checkboxIcon.checked && checkboxIcon.disabled,
    [classes.checkboxIconIndeterminate]: checkboxIcon.indeterminate,
    [classes.checkboxIconIndeterminateDisabled]: checkboxIcon.indeterminate && checkboxIcon.disabled,
  }

  const checkboxIconInnerClasses = {
    [classes.checkboxIconInnerChecked]: checkboxIcon.checked,
    [classes.checkboxIconInnerReadonly]: checkboxIcon.readOnly,
    [classes.checkboxIconInnerIndeterminate]: checkboxIcon.indeterminate,
    [classes.checkboxIconInnerIndeterminateDisabled]: checkboxIcon.indeterminate && checkboxIcon.disabled,
  }

  return (
    <div className={classes.checkboxContainer}>
      <div
        className={classNames(iconContainerClasses)}
        onMouseOver={() => {
          !readOnly && !disabled && setCheckboxHover(true);
        }}
        onMouseLeave={() => {
          !readOnly && !disabled && setCheckboxHover(false);
        }}
      >
        <input
          type={checkboxType}
          role={checkboxType}
          id={name}
          name={name}
          value={name}
          disabled={disabled || readOnly}
          checked={checked}
          onChange={onChange} //It will not get invoked on readOnly state.
          ref={inputRef}
        />
        <div className={classNames(checkboxIconClasses)}>
          <span className={classNames(checkboxIconInnerClasses)} />
        </div>
      </div>
      <label htmlFor={name} className={classes.labelContainer}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
};

export default Checkbox;
