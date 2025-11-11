import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  classes,
  dataTestId,
  defaultHeight,
  messageSymbols,
  variantNaked,
} from "./constants";
import "./textarea-lines.scss";
import { useEffect, useRef } from "react";
import Tooltip from "../tooltip";

const TextareaLines = ({
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
    [classes.variantNaked]: variant == variantNaked,
    [classes.textareaContainerFocus]: !readOnly,
  };
  const textareaClass = {
    [classes.textareaBox]: true,
    [classes.textareaBoxDisabled]: disabled,
    [classes.textareaBoxReadOnly]: readOnly,
    [classes.variantNaked]: variant == variantNaked,
  };
  const [numberOfLines, setNumberOfLines] = useState(
    value?.split("\n").length || 1,
  );
  const [lineMessageMap, setLineMessageMap] = useState({});
  const lineNumberRef = useRef(null);
  const textArea = useRef(null);

  useEffect(() => {
    setNumberOfLines(value?.split("\n").length);
  }, [value]);

  useEffect(() => {
    if (lineMessages?.length) {
      setLineMessageMap(
        Object.fromEntries(
          lineMessages?.map((lineMessage) =>
            lineMessage
              ? [
                  lineMessage.line,
                  { type: lineMessage.type, message: lineMessage.message },
                ]
              : [],
          ),
        ),
      );
    } else {
      setLineMessageMap({});
    }
  }, [lineMessages]);

  useEffect(() => {
    const handleInput = () => {
      textArea.current.style.height = "auto";
      textArea.current.style.height = textArea.current.scrollHeight + 8 + "px";
    };
    textArea.current.addEventListener("input", handleInput);

    return () => {
      textArea?.current &&
        textArea.current.removeEventListener("input", handleInput);
    };
  }, []);

  const LineNumber = ({ lineNumber }) => {
    const messageType = lineMessageMap[lineNumber]?.type;
    return lineMessageMap[lineNumber] ? (
      <Tooltip
        title={lineMessageMap[lineNumber].message || null}
        position="bottom-right"
      >
        <div>
          {messageType && (
            <span className={messageType}>{messageSymbols[messageType]}</span>
          )}
          <span>{lineNumber}</span>
        </div>
      </Tooltip>
    ) : (
      <div>
        <span></span>
        <span>{lineNumber}</span>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classNames({ ...textareaLabelClass })}>{label}</div>
      {helperText && (
        <div className={classNames({ ...textareaHelperTextClass })}>
          {helperText}
        </div>
      )}
      <div style={{ width: `${width}`, height: `${height}` }}>
        <div className={classNames({ ...textareaWrapper })}>
          <div
            className="line-number"
            ref={lineNumberRef}
            data-testid="line-number"
          >
            {new Array(numberOfLines).fill(null).map((d, i) => (
              <LineNumber lineNumber={i + 1} key={i} />
            ))}
          </div>
          <textarea
            ref={textArea}
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
        {error && <div className={classes.errorMsgText}>{errorMsg}</div>}
      </div>
    </div>
  );
};
TextareaLines.propTypes = {
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
  lineMessages: PropTypes.arrayOf({
    line: PropTypes.number,
    message: PropTypes.string,
    type: PropTypes.string,
  }),
};
export default TextareaLines;
