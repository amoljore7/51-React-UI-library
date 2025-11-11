import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { classes } from "./constants";
import toggleOn from "../../assets/icons/toggle-on.svg";
import toggleOff from "../../assets/icons/toggle-off.svg";
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
}) => {
  const switchClasses = {
    [classes.switch]: true,
    [classes.disabled]: disabled,
  };

  return (
    <div className={classes.switchContainer}>
      <div
        data-testid={classes.switch}
        className={classNames(switchClasses)}
        onClick={() => onToggle(checked)}
      >
        <img src={checked ? toggleOn : toggleOff} />
        <Typography variant='label1'>{label}</Typography>
      </div>
      {error ? (
        <div className={classes.switchErrorMessage} style={{ width }}>
          <Typography variant='label1'>{errorMessage}</Typography>
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
};

export default Switch;
