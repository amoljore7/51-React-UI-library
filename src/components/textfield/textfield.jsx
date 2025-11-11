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
  iconPositionLeft,
  iconPositionRight,
} from './constants';

const Textfield = ({
  type = defaultType,
  value = '',
  label,
  secondaryLabel,
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
  styleClasses = classes,
  onKeyUp,
  iconPosition = iconPositionRight,
  autoComplete = autoCompleteOff
}) => {
  const labelClass = {
    [styleClasses.label]: true,
    [styleClasses.labelDisabled]: disabled,
  };
  const secondaryLabelClass = {
    [styleClasses.secondaryLabel]: true,
  };
  const helperTextClass = {
    [styleClasses.helperText]: true,
    [styleClasses.helperTextDisabled]: disabled,
  };
  const inputClass = {
    [styleClasses.inputContainer]: true,
    [styleClasses.inputContainerErrorBorder]: error,
    [styleClasses.variantInline]: variant === variantInline,
    [styleClasses.variantNaked]: variant === variantNaked,
    [styleClasses.inputContainerFocus]: !readOnly,
    [styleClasses.inputWithIcon]: !!icon,
    [styleClasses.inputContainerDisabled]: disabled,
  };
  const inputBox = {
    [styleClasses.inputBox]: true,
    [styleClasses.inputBoxDisabled]: disabled,
    [styleClasses.inputBoxReadOnly]: readOnly,
  };

  return (
    <div className={styleClasses.container}>
      {label && <div className={classNames({ ...labelClass })}>{label}{secondaryLabel && <span className={classNames({ ...secondaryLabelClass })}> {secondaryLabel}</span>}</div>}
      {helperText && <div className={classNames({ ...helperTextClass })}>{helperText}</div>}
      <div className={classNames({ ...inputClass })} style={{ width: width, height: height }}>
        {icon && iconPosition === iconPositionLeft && (
          <div
            data-testid="icon-textfield"
            className={styleClasses.iconBoxLeft}
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
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
          autoComplete={autoComplete}
          onKeyUp={onKeyUp}
        />

        {icon && iconPosition === iconPositionRight && (
          <div
            data-testid="icon-textfield"
            className={styleClasses.iconBoxRight}
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
      </div>
      {error && <div className={styleClasses.errorMsgText}>{errorMsg}</div>}
    </div>
  );
};

Textfield.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node,
  secondaryLabel: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  width: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onIconClick: PropTypes.func,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  height: PropTypes.string,
  onKeyUp: PropTypes.func,
  iconPosition: PropTypes.oneOf([ iconPositionLeft, iconPositionRight ]),
  styleClasses: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    labelDisabled: PropTypes.string,
    helperText: PropTypes.string,
    helperTextDisabled: PropTypes.string,
    inputContainer: PropTypes.string,
    inputContainerErrorBorder: PropTypes.string,
    inputBox: PropTypes.string,
    inputIcon: PropTypes.string,
    errorMsgText: PropTypes.string,
    variantNaked: PropTypes.string,
    variantInline: PropTypes.string,
    inputContainerFocus: PropTypes.string,
    inputBoxWrapper: PropTypes.string,
    iconBox: PropTypes.string,
    inputWithIcon: PropTypes.string,
    inputContainerDisabled: PropTypes.string,
    inputBoxDisabled: PropTypes.string,
    inputBoxReadOnly: PropTypes.string,
  })
};

export default Textfield;
