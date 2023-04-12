import React from 'react';
import './textfield.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  classes,
  variantNaked,
  variantInline,
  inputRole,
  inputTestId,
  defaultType,
  autoCompleteOff,
} from './constants';

const Textfield = ({
  type = defaultType,
  value,
  label,
  placeholder,
  error = false,
  helperText,
  variant,
  onChange,
  onBlur,
  onFocus,
  onIconClick,
  disabled = false,
  icon,
  errorMsg,
  width,
  readOnly = false,
  name,
  height,
}) => {
  const labelClass = {
    [classes.label]: true,
    [classes.labelDisabled]: disabled,
  };
  const helperTextClass = {
    [classes.helperText]: true,
    [classes.helperTextDisabled]: disabled,
  };
  const inputClass = {
    [classes.inputContainer]: true,
    [classes.inputContainerErrorBorder]: error,
    [classes.variantInline]: variant === variantInline,
    [classes.variantNaked]: variant === variantNaked,
    [classes.inputContainerFocus]: !readOnly,
    [classes.inputWithIcon]: !!icon,
    [classes.inputContainerDisabled]: disabled,
  };
  const inputBox = {
    [classes.inputBox]: true,
    [classes.inputBoxDisabled]: disabled,
    [classes.inputBoxReadOnly]: readOnly,
  };

  return (
    <div className={classes.container}>
      {label && <div className={classNames({ ...labelClass })}>{label}</div>}
      {helperText && <div className={classNames({ ...helperTextClass })}>{helperText}</div>}
      <div className={classNames({ ...inputClass })} style={{ width: width, height: height }}>
        <input
          className={classNames({ ...inputBox })}
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly={readOnly}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          roles={inputRole}
          data-testid={inputTestId}
          autoComplete={autoCompleteOff}
        />

        {icon && (
          <div className={classes.iconBox} onClick={onIconClick}>
            {icon}
          </div>
        )}
      </div>
      {error && <div className={classes.errorMsgText}>{errorMsg}</div>}
    </div>
  );
};

Textfield.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  width: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  height: PropTypes.string,
};

export default Textfield;
