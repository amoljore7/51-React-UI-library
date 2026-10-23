import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  classes,
  dataTestId,
  defaultHeight,
  messageSymbols,
  variantNaked,
} from "./constants";
import Tooltip from "../tooltip";
import InfoIcon from "../../assets/icons/info.svg?react";
import "./textarea-lines.scss";

const TextareaLines = ({
  value = "",
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
  lineMessages,
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

  const lineCount = value?.split("\n").length || 1;
  const [numberOfLines, setNumberOfLines] = useState(lineCount);
  const [lineMessageMap, setLineMessageMap] = useState({});
  const textAreaRef = useRef(null);

  useEffect(() => {
    setNumberOfLines(value?.split("\n").length || 1);
  }, [value]);

  useEffect(() => {
    if (lineMessages?.length) {
      setLineMessageMap(
        Object.fromEntries(
          lineMessages
            .filter(Boolean)
            .map((lineMessage) => [
              lineMessage.line,
              { type: lineMessage.type, message: lineMessage.message },
            ]),
        ),
      );
    } else {
      setLineMessageMap({});
    }
  }, [lineMessages]);

  useEffect(() => {
    const el = textAreaRef.current;
    if (!el) return;
    const handleInput = () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight + 8}px`;
    };
    el.addEventListener("input", handleInput);
    return () => el.removeEventListener("input", handleInput);
  }, []);

  const LineNumber = ({ lineNumber }) => {
    const messageType = lineMessageMap[lineNumber]?.type;
    const message = lineMessageMap[lineNumber]?.message;
    return message ? (
      <Tooltip title={message || null} position="bottom-right">
        <div>
          {messageType && (
            <span className={messageType}>{messageSymbols[messageType]}</span>
          )}
          <span>{lineNumber}</span>
        </div>
      </Tooltip>
    ) : (
      <div>
        <span />
        <span>{lineNumber}</span>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      {label && (
        <div className={classNames({ ...textareaLabelClass })}>{label}</div>
      )}
      <div style={{ width: width ?? undefined, height: height ?? undefined }}>
        <div className={classNames({ ...textareaWrapper })}>
          <div
            className="line-number"
            data-testid="line-number"
          >
            {Array.from({ length: numberOfLines }, (_, i) => (
              <LineNumber lineNumber={i + 1} key={i} />
            ))}
          </div>
          <textarea
            ref={textAreaRef}
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
            wrap="off"
          />
        </div>
        {error && errorMsg && (
          <div className={classes.errorMsgText}>{errorMsg}</div>
        )}
      </div>
      {helperText && (
        <div className={classes.helperRow}>
          <div className={classNames({ ...textareaHelperTextClass })}>
            <InfoIcon className={classes.helperIcon} aria-hidden />
            <span>{helperText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

TextareaLines.propTypes = {
  value: PropTypes.string,
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
  variant: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  lineMessages: PropTypes.arrayOf(
    PropTypes.shape({
      line: PropTypes.number.isRequired,
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
};

export default TextareaLines;
