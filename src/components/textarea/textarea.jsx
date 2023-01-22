import React from 'react';
import './textarea.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { classes, variantNaked, dataTestId, defaultHeight } from './constants';

const Textarea = ({
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
    [classes.variantNaked]: variant == variantNaked,
    [classes.textareaContainerFocus]: !readOnly,
  };
  const textareaClass = {
    [classes.textareaBox]: true,
    [classes.textareaBoxDisabled]: disabled,
    [classes.textareaBoxReadOnly]: readOnly,
    [classes.variantNaked]: variant == variantNaked,
  };

  return (
    <div className={classes.container}>
      <div className={classNames({ ...textareaLabelClass })}>{label}</div>
      {helperText && <div className={classNames({ ...textareaHelperTextClass })}>{helperText}</div>}
      <div
        className={classNames({ ...textareaWrapper })}
        style={{ width: `${width}`, height: `${height}` }}
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
        />
      </div>
      {error && <div className={classes.errorMsgText}>{errorMsg}</div>}
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
};
export default Textarea;
