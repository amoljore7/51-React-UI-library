import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { checkboxType, classes } from './constants';
import './checkbox.scss';

const Checkbox = ({
  name,
  label,
  checked,
  disabled,
  readOnly,
  onChange,
  indeterminate,
  testId = name,
}) => {
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isDisabled = disabled || readOnly;
  const showHover = hover && !isDisabled;

  const iconContainerClasses = {
    [classes.iconContainer]: true,
    [classes.iconContainerHover]: showHover,
  };

  const iconClasses = {
    [classes.checkboxIcon]: true,
    [classes.checkboxIconChecked]: checked && !indeterminate,
    [classes.checkboxIconIndeterminate]: indeterminate,
    [classes.checkboxIconDisabled]: disabled,
    [classes.checkboxIconReadonly]: readOnly && !disabled,
  };

  return (
    <div className={classes.checkboxContainer}>
      <div
        className={classNames(iconContainerClasses)}
        onMouseEnter={() => !isDisabled && setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          type={checkboxType}
          role={checkboxType}
          id={name}
          name={name}
          value={name}
          disabled={isDisabled}
          checked={checked}
          onChange={onChange}
          ref={inputRef}
          data-testid={testId}
        />
        <div className={classNames(iconClasses)} aria-hidden="true" />
      </div>
      {label != null && (
        <label htmlFor={name} className={classes.labelContainer}>
          {label}
        </label>
      )}
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
  testId: PropTypes.string,
};

export default Checkbox;
