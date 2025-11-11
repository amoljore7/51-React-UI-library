import React,  { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Textfield from '../textfield/textfield';
import Button from '../button';
import confirmIcon from '../../assets/icons/confirm.svg'
import cancelIcon from '../../assets/icons/cancel.svg'
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
}) => {
  const [newValue, setNewValue] = useState('')
  const buttonIconsRef = useRef(null)

  const removeFocusFromInput = () => {
    Array.from(buttonIconsRef?.current?.children || [])?.forEach(child => {
      child?.blur()
    })
  }

  useEffect(() => {
    setNewValue(value)
  }, [value])

  const resetInputValue = () => {
    setNewValue(value)
  }

  const handleInputChange = (event) => {
    setNewValue(event.target.value)
  }

  const handleInputBlur = (event) => {
    if (event?.relatedTarget?.name === confirmButtonName) {
      return
    }

    resetInputValue()

    if (typeof onBlur === 'function') {
      onBlur(event)
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === escapeKey) {
      event.preventDefault()
      event.target.blur()
      resetInputValue()
    }
  }

  const handleConfirmAction = (event) => {
    event.stopPropagation()
    if (onChange instanceof Function) {
      onChange(newValue)
    }

    removeFocusFromInput()
  }

  const handleCancelAction = () => {
    resetInputValue()
    removeFocusFromInput()
  }

  const iconButtons = (
    <div className={inlineEditClasses.inlineEditButtons} ref={buttonIconsRef}>
      <Button name={confirmButtonName} variant="textOnly" size="small" onClick={handleConfirmAction}>
        <img src={confirmIcon} />
      </Button>
      <Button name={cancelButtonName} variant="textOnly" size="small" onClick={handleCancelAction}>
        <img src={cancelIcon} />
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
};

export default TextfieldInlineEdit;