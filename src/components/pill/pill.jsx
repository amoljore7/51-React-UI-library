import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, defaultPillIconSize } from './constants';
import './pill.scss';
import { FiX } from 'react-icons/fi';
import { isColorDark } from  './utils'

const Pill = ({
  error = false,
  disabled = false,
  readOnly = false,
  label,
  onDelete,
  pillColor,
}) => {
  const hasCustomColor = !!pillColor;
  const isDark = pillColor ? isColorDark(pillColor) : false;
  const useDarkText = pillColor ? !isDark : true;

  const customStyle = hasCustomColor
    ? {
        backgroundColor: pillColor,
        color: useDarkText ? '#000' : '#fff',
      }
    : {};

  const pillContainerClasses = {
    [classes.container]: true,
    [classes.errorPill]: error,
    [classes.readOnlyPill]: readOnly,
    [classes.disabledPill]: disabled,
    [classes.bgDarkColor]: hasCustomColor && isDark,
    [classes.bgLightColor]: hasCustomColor && !isDark,
  };

  const pillLabelClasses = {
    [classes.label]: true,
    [classes.readOnlyPillLabel]: readOnly,
    [classes.disabledPillLabel]: disabled,
  };

  const pillIconClasses = {
    [classes.icon]: true,
    [classes.disabledPillIcon]: disabled,
  };

  const deleteIconClickHandler = (event) => {
    event.preventDefault();
    !disabled && onDelete?.(event);
  };

  return (
    <div className={classNames(pillContainerClasses)} style={customStyle}>
      <div title={label} className={classNames(pillLabelClasses)} style={customStyle}>
        {label}
      </div>
      {!readOnly ? (
        <div
          data-testid="pill-close-icon"
          className={classes.pillIconContainer}
          onClick={deleteIconClickHandler}
        >
          <FiX
            size={defaultPillIconSize}
            className={classNames(pillIconClasses)}
            style={{ color: customStyle.color }}
          />
        </div>
      ) : null }
    </div>
  );
};

Pill.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  pillColor: PropTypes.string,
};

export default Pill;