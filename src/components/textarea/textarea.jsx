import React, { useState, useEffect } from "react";
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
  const [charLeftCount, setCharLeftCount] = useState(0);
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
    [classes.variantNaked]: variant == variantNaked,
    [classes.textareaContainerFocus]: !readOnly,
  };
  const textareaClass = {
    [classes.textareaBox]: true,
    [classes.textareaBoxDisabled]: disabled,
    [classes.textareaBoxReadOnly]: readOnly,
    [classes.variantNaked]: variant == variantNaked,
  };

  useEffect(() => {
    if (showCharLeftCount && parseInt(maxLength) > 0) {
      const currentCharCount = value?.length;
      const charLeftCount = parseInt(maxLength) - parseInt(currentCharCount);
      setCharLeftCount(charLeftCount);
    }
  }, [value]);

  return (
    <div className={classes.container}>
      <div className={classNames({ ...textareaLabelClass })}>{label}</div>
      {helperText && (
        <div className={classNames({ ...textareaHelperTextClass })}>
          {helperText}
        </div>
      )}
      <div
        className={classNames({ ...textareaWrapper })}
        style={{ width: `${width}`, height: variant == variantNaked ? 'auto' : `${height}` }}
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
          {...(maxLength > 0 && {maxLength})}
        />
      </div>
      {error && <div className={classes.errorMsgText}>{errorMsg}</div>}
      {showCharLeftCount && charLeftCount > 0 &&
        <div data-testid={dataTestIdForCharCount} className={classes.charLeftCount}>
          {`${charLeftCount} character(s) remaining`}
        </div>
      }
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
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  showCharLeftCount: PropTypes.bool,
  maxLength: PropTypes.number
};
export default Textarea;
