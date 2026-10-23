import React from "react";
import "./textarea.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  dataTestIdForCharCount,
  variantNaked,
  defaultHeight,
  dataTestId,
  classes,
} from "./constants";
import InfoIcon from "../../assets/icons/info.svg?react";

const Textarea = ({
  showCharLeftCount = false,
  maxLength,
  value,
  label,
  placeholder,
  error = false,
  helperText,
  variant,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  errorMsg,
  readOnly = false,
  width,
  height = defaultHeight,
  name,
}) => {
  const textareaLabelClass = {
    [classes.textareaLabel]: true,
    [classes.textareaLabelDisabled]: disabled,
  };
  const textareaHelperTextClass = {
    [classes.textareaHelperText]: true,
    [classes.textareaHelperTextDisabled]: disabled,
  };
  const textareaWrapper = {
    [classes.textareaContainer]: true,
    [classes.textareaContainerDisabled]: disabled,
    [classes.textareaContainerErrorBorder]: error,
    [classes.variantNaked]: variant === variantNaked,
    [classes.textareaContainerFocus]: !readOnly,
  };
  const textareaClass = {
    [classes.textareaBox]: true,
    [classes.textareaBoxDisabled]: disabled,
    [classes.textareaBoxReadOnly]: readOnly,
    [classes.variantNaked]: variant === variantNaked,
  };

  const currentLength = value?.length ?? 0;
  const hasMaxLength = maxLength != null && parseInt(maxLength, 10) > 0;
  const showCharCount = hasMaxLength && showCharLeftCount;

  return (
    <div className={classes.container}>
      {label && (
        <div className={classNames({ ...textareaLabelClass })}>{label}</div>
      )}
      <div
        className={classNames({ ...textareaWrapper })}
        style={{
          width: width ?? undefined,
          height: variant === variantNaked ? "auto" : height,
        }}
      >
        <textarea
          className={classNames({ ...textareaClass })}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          data-testid={dataTestId}
          {...(hasMaxLength && { maxLength })}
        />
      </div>
      {error && errorMsg && (
        <div className={classes.errorMsgText}>{errorMsg}</div>
      )}
      {helperText && (
        <div
          className={classes.helperRow}
          style={width ? { width } : undefined}
        >
          <div className={classNames({ ...textareaHelperTextClass })}>
            <InfoIcon className={classes.helperIcon} aria-hidden />
            <span>{helperText}</span>
          </div>
          {showCharCount && (
            <div
              data-testid={dataTestIdForCharCount}
              className={classes.charLeftCount}
            >
              {`${currentLength}/${maxLength}`}
            </div>
          )}
        </div>
      )}
      {showCharCount && !helperText && (
        <div
          className={classes.charCountOnly}
          style={width ? { width } : undefined}
        >
          <span
            data-testid={dataTestIdForCharCount}
            className={classes.charLeftCount}
          >
            {`${currentLength}/${maxLength}`}
          </span>
        </div>
      )}
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  showCharLeftCount: PropTypes.bool,
  maxLength: PropTypes.number,
  variant: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Textarea;
