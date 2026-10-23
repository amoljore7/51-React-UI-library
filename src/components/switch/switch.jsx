import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { classes } from "./constants";
import "./switch.scss";
import Typography from "../typography";

const Switch = ({
  disabled,
  error,
  errorMessage,
  checked,
  label,
  onToggle,
  width,
  testId = classes.switch,
}) => {
  const switchClasses = {
    [classes.switch]: true,
    [classes.disabled]: disabled,
    [classes.checked]: checked,
  };

  const handleClick = () => {
    if (disabled) return;
    onToggle?.(checked);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle?.(checked);
    }
  };

  return (
    <div className={classes.switchContainer}>
      <div
        data-testid={testId}
        className={classNames(switchClasses)}
        onClick={handleClick}
      >
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          disabled={disabled}
          className={classes.track}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
        >
          <span className={classes.knob} />
        </button>
        {label != null && label !== "" && (
          <Typography variant="label1">{label}</Typography>
        )}
      </div>
      {error ? (
        <div className={classes.switchErrorMessage} style={{ width }}>
          <Typography variant="label1">{errorMessage}</Typography>
        </div>
      ) : null}
    </div>
  );
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onToggle: PropTypes.func,
  width: PropTypes.number,
  testId: PropTypes.string,
};

export default Switch;
