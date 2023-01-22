import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { checkboxType, classes, iconAlt, imageRole } from './constants';

import enabledUnchecked from '../../assets/icons/enabled-unchecked.svg';
import hoverUnchecked from '../../assets/icons/hover-unchecked.svg';
import disabledUnchecked from '../../assets/icons/disabled-unchecked.svg';
import enabledChecked from '../../assets/icons/enabled-checked.svg';
import hoverChecked from '../../assets/icons/hover-checked.svg';
import disabledChecked from '../../assets/icons/disabled-checked.svg';
import readonlyChecked from '../../assets/icons/readonly-checked.svg';

import './checkbox.scss';

const Checkbox = ({ name, label, checked, disabled, readOnly, onChange }) => {
  const initialIconState = () => {
    if (disabled) {
      if (checked) {
        return disabledChecked;
      } else {
        return disabledUnchecked;
      }
    } else {
      if (readOnly) {
        return readonlyChecked;
      } else {
        return enabledUnchecked;
      }
    }
  };

  const [checkboxHover, setCheckboxHover] = useState(false);
  const [checkboxIcon, setCheckboxIcon] = useState(initialIconState());

  const handleIconOnChange = () => {
    if (!checked && !disabled) {
      setCheckboxIcon(enabledUnchecked);
    } else if (!checked && disabled) {
      setCheckboxIcon(disabledUnchecked);
    } else if (checked && !disabled) {
      setCheckboxIcon(enabledChecked);
    } else if (checked && disabled) {
      setCheckboxIcon(disabledChecked);
    }
  };

  const handleIconOnHover = () => {
    if (!checked && checkboxHover) {
      setCheckboxIcon(hoverUnchecked);
    } else if (!checked && !checkboxHover) {
      setCheckboxIcon(enabledUnchecked);
    } else if (checked && checkboxHover) {
      setCheckboxIcon(hoverChecked);
    } else if (checked && !checkboxHover) {
      setCheckboxIcon(enabledChecked);
    }
  };

  const handleIconOnReadOnly = () => {
    if (readOnly) {
      setCheckboxIcon(readonlyChecked);
    } else {
      handleIconOnChange();
    }
  };

  useEffect(() => {
    !readOnly && handleIconOnChange();
  }, [checked, disabled]);
  useEffect(handleIconOnReadOnly, [readOnly]);
  useEffect(() => {
    !readOnly && !disabled && handleIconOnHover();
  }, [checkboxHover]);

  return (
    <div className={classes.checkboxContainer}>
      <div className={classes.iconContainer}>
        <input
          type={checkboxType}
          role={checkboxType}
          id={name}
          name={name}
          value={name}
          className={classes.checkboxInput}
          disabled={disabled || readOnly}
          checked={checked}
          onChange={onChange} //It will not get invoked on readOnly state.
          onMouseOver={() => {
            !readOnly && !disabled && setCheckboxHover(true);
          }}
          onMouseLeave={() => {
            !readOnly && !disabled && setCheckboxHover(false);
          }}
        />
        <img role={imageRole} src={checkboxIcon} alt={iconAlt} />
      </div>
      <label htmlFor={name} className={classes.labelContainer}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
