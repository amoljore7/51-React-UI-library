import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  classes,
  radioType,
  horizontal,
  vertical,
  keyPrefix,
  testId,
} from './constants';

import './radio.scss';

const RadioGroup = ({
  label,
  name,
  defaultValue = '',
  direction = horizontal,
  options,
  onChange,
}) => {
  const radioClass = {
    [classes.horizontalAlign]: true,
    [classes.verticalAlign]: direction === vertical,
  };
  const radioItemClass = {
    [classes.radioContainer]: true,
    [classes.radioContainerVertical]: direction === vertical,
  };

  return (
    <div className={classes.bdsRadioGroup}>
      {label && <div className={classes.mainLabel}>{label}</div>}
      <div data-testid={testId} className={classNames({ ...radioClass })}>
        {options.map(({ label, value, disabled }, index) => {
          const allProps = {
            name,
            onChange: onChange,
            selected: defaultValue === value,
            label,
            value,
            disabled,
          };
          return (
            <div
              key={`${keyPrefix}${index}`}
              className={classNames({ ...radioItemClass })}
            >
              <RadioButton {...allProps} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RadioButton = ({
  name,
  label,
  value,
  disabled,
  selected,
  onChange,
}) => {
  const radioLabelClass = {
    [classes.labelContainer]: true,
    [classes.disableLabel]: disabled,
  };

  const handleChange = (e) => {
    if (disabled) return;
    // Wrap the event to prevent preventDefault misuse
    const safeEvent = {
      ...e,
      preventDefault: () => {
        console.warn(
          'preventDefault() is disabled in RadioButton to avoid breaking selection behavior.'
        );
      },
      stopPropagation: e.stopPropagation?.bind(e),
      persist: e.persist?.bind(e),
      target: {
        ...e.target,
        value,
        name,
      },
    };
    onChange?.(safeEvent);
  };
  return (
    <div className={classes.bdsRadioCustomBtn}>
      <input
        role={radioType}
        type={radioType}
        id={`${name}${value}`}
        name={name}
        value={value}
        className={classes.radioBtnStyle}
        disabled={disabled}
        checked={selected}
        onChange={handleChange}
      />

      {label && (
        <label
          htmlFor={`${name}${value}`}
          className={classNames({ ...radioLabelClass })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  direction: PropTypes.oneOf([horizontal, vertical]),
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
