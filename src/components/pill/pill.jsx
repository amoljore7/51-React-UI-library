import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, defaultPillIconSize } from './constants';
import './pill.scss';
import { FiX } from 'react-icons/fi';

const Pill = ({ error = false, disabled = false, readOnly = false, label, onDelete }) => {
  const pillContainerClasses = {
    [classes.container]: true,
    [classes.errorPill]: error,
    [classes.readOnlyPill]: readOnly,
    [classes.disabledPill]: disabled,
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
    !disabled && onDelete(event);
  };

  const [crossIconHover, setCrossIconHover] = useState(false);

  return (
    <div className={classNames({ ...pillContainerClasses })}>
      <div title={label} className={classNames({ ...pillLabelClasses })}>
        {label}
      </div>
      {!readOnly ? (
        <div
          data-testid="pill-close-icon"
          className={classes.pillIconContainer}
          onClick={deleteIconClickHandler}
          onMouseOver={() => {
            !readOnly && !disabled && setCrossIconHover(true);
          }}
          onMouseLeave={() => {
            !readOnly && !disabled && setCrossIconHover(false);
          }}
        >
          <FiX size={defaultPillIconSize} className={classNames({ ...pillIconClasses })} />
        </div>
      ) : null}
    </div>
  );
};

Pill.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default Pill;
