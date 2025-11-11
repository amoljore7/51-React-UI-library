import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultContainerWidth, enterKeyValue, classes } from './constants';
import Pill from '../pill';
import './pillInput.scss';

const PillInput = ({
  width = defaultContainerWidth,
  pillListData = [],
  handleUpdatePillList,
  handleDeletePill,
  error = false,
  errorMsg,
  isValid,
  setError,
  disabled = false,
  placeholder = ''
}) => {

  const pillInputContainer = {
    [classes.pillInputContainer]: true,
    [classes.inputContainerErrorBorder]: error,
    [classes.inputContainerDisabled]: disabled,
  };

  const [pillValue, setPillValue] = useState('');

  // To handle the data on key enter
  const handleKeyDown = (e) => {
    // To add newly added data into pill component
    if (e.keyCode === enterKeyValue && e.target.value.trim()) {
      onBlur(e)
    }
  }

  const onBlur = (e) => {  
    const trimmedValue = e.target.value.trim()
    if (isValid && !isValid(trimmedValue)) return
    trimmedValue && handleUpdatePillList(trimmedValue)
    setPillValue('')
  }

  return (
    <>
      <div className={classNames({ ...pillInputContainer })} style={{ width: width }}>
          {pillListData?.map(((pill, index) => {
            return <Pill key={`pill-input-data-${index}`} disabled={disabled} onDelete={() => handleDeletePill(pill)} label={pill} />
          }))}
          <input
            data-testid="pill-list-input"
            className={classes.textInput}
            placeholder={placeholder}
            value={pillValue.trim()}
            type="text"
            onChange={(e) => {
              setPillValue(e.target.value)
              setError && setError(false)
             }}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
      </div>
      {error && <div className={classes.errorMsgText}>{errorMsg}</div>}
    </>
  );
};

PillInput.propTypes = {
  width: PropTypes.number,
  pillListData: PropTypes.any,
  handleUpdatePillList: PropTypes.func,
  handleDeletePill: PropTypes.func,
};

export default PillInput;
