import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Textfield from '../textfield/textfield';
import Button from '../button';
import ConfirmIcon from '../../assets/icons/confirm.svg?react'
import CancelIcon from '../../assets/icons/cancel.svg?react'
import { getInputContainerClass, getNakedVariantClass } from './utils';
import {
  rawTextClasses,
  confirmButtonName,
  cancelButtonName,
  escapeKey,
  inlineEditClasses,
} from './constants';

const TextfieldInlineEdit = ({
  value,
  disabled,
  width,
  height,
  onChange,
  placeholder,
  label,
  secondaryLabel,
  error = false,
  helperText,
  errorMsg,
  readOnly,
  onFocus,
  onBlur,
  testId,
}) => {
  const [newValue, setNewValue] = useState('')
  const buttonIconsRef = useRef(null)

  const isDirty = (newValue ?? '') !== (value ?? '')
  const showButtons = isDirty && !readOnly && !disabled

  useEffect(() => {
    setNewValue(value)
  }, [value])

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }

    const root = buttonIconsRef.current?.closest(`.${rawTextClasses.container}`)

    if (!root) {
      return undefined
    }

    const discardIfOutside = (target) => {
      if (target && !root.contains(target)) {
        setNewValue(value)
      }
    }

    const handleDocumentMouseDown = (event) => {
      discardIfOutside(event.target)
    }

    const handleFocusOut = (event) => {
      discardIfOutside(event.relatedTarget)
    }

    document.addEventListener('mousedown', handleDocumentMouseDown)
    root.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown)
      root.removeEventListener('focusout', handleFocusOut)
    }
  }, [isDirty, value])

  const resetInputValue = () => {
    setNewValue(value)
  }

  const handleInputChange = (event) => {
    setNewValue(event.target.value)
  }

  const handleInputBlur = (event) => {
    if (typeof onBlur === 'function') {
      onBlur(event)
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === escapeKey) {
      event.preventDefault()
      resetInputValue()
      event.target.blur()
    }
  }

  const handleConfirmAction = (event) => {
    event.stopPropagation()
    if (onChange instanceof Function) {
      onChange(newValue)
    }
  }

  const handleCancelAction = () => {
    resetInputValue()
  }

  const iconButtons = (
    <div
      ref={buttonIconsRef}
      className={classNames(inlineEditClasses.inlineEditButtons, {
        [inlineEditClasses.inlineEditButtonsVisible]: showButtons,
      })}
    >
      <Button
        name={confirmButtonName}
        testId={testId ? `${testId}-confirm` : undefined}
        variant="textOnly"
        size="small"
        onClick={handleConfirmAction}
      >
        <ConfirmIcon aria-hidden focusable="false" />
      </Button>
      <Button
        name={cancelButtonName}
        testId={testId ? `${testId}-cancel` : undefined}
        variant="textOnly"
        size="small"
        onClick={handleCancelAction}
      >
        <CancelIcon aria-hidden focusable="false" />
      </Button>
    </div>
  )

  const props = {
    type: 'text',
    value: newValue,
    placeholder,
    disabled,
    width,
    height,
    variant: 'naked',
    label,
    secondaryLabel,
    error,
    errorMsg,
    helperText,
    readOnly,
    icon: iconButtons,
    onChange: handleInputChange,
    onBlur: handleInputBlur,
    onKeyUp: handleKeyUp,
    onFocus,
    testId,
    styleClasses: {
      ...rawTextClasses,
      variantNaked: getNakedVariantClass(newValue, placeholder, error),
      inputContainer: getInputContainerClass(readOnly),
    }
  };

  return <Textfield {...props} />
}

TextfieldInlineEdit.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  secondaryLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  errorMsg: PropTypes.string,
  readonly: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  // Applied to the input; the confirm / cancel icon buttons derive
  // `<testId>-confirm` and `<testId>-cancel` from it.
  testId: PropTypes.string,
};

export default TextfieldInlineEdit;