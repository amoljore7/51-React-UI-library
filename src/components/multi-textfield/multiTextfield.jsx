import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiPlus, FiX } from 'react-icons/fi';
import { isEmpty } from 'lodash';
import { classes } from './constants';
import Textfield from '../textfield';
import Typography from '../typography';
import Tooltip from '../tooltip';

import './multiTextfield.scss';

const MultiTextfield = ({
  valueString,
  finalValue = () => {},
  finalObject = () => {},
  isAllFieldSaved,
  tooltip = false,
  addBtnTooltipText,
  width,
  height
}) => {
  const [inputList, setInputList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let flag = inputList?.some((obj) => isEmpty(obj?.value))
    setIsDisabled(flag)
  });

  useEffect(() => {
    setInputList([]);
    if (isEmpty(valueString)) setInputList([{ value: '' }]);
  }, []);

  useEffect(() => {
    if (!isEmpty(valueString)) {
      setInputList([]);
      let arr = valueString.split(/\s*,\s*/);
      arr?.forEach((value, i) => fillAllFields(value, i));
    }
  }, [valueString]);

  useEffect(() => {
    if (isEmpty(valueString)) {
      setInputList([{ value: '' }]);
    }
  }, [valueString]);


  const fillAllFields = (value, i) => {
      setInputList((inputList) => [...inputList, { value: value }]);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { value: '' }]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (value?.includes(',') || value?.includes('|')) return false;
    const list = [...inputList];
    list[index][name] = value.trimStart();
    setInputList(list);
  };

  useEffect(() => {
    const value = inputList?.map((x) => x?.value).join(',');
    if (!isEmpty(value) && value !== valueString) {
      finalValue(value);
    }
    finalObject(inputList);

    let text = value
      .split(',')
      .map((e) => e.trim())
      .filter((e) => (e))
      .join(',');

    if (isEmpty(text) || text.split(',').length !== inputList.length) {
      isAllFieldSaved(false);
    } else {
      isAllFieldSaved(true);
    }
  }, [inputList]);

  const renderFields = () => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inputWrapper}>
          {!isEmpty(inputList) &&
            inputList.map((ele, index) => {
              return (
                <div key={`multi-text-without-tooltip-${index}`} className={classes.crossBtnWrapper}>
                  <Textfield
                    name='value'
                    value={ele.value}
                    onChange={(e) => handleInputChange(e, index)}
                    type='text'
                    placeholder='value'
                    width={width}
                    height={height}
                    icon={
                      inputList?.length !== 1 && <FiX size='16' color='#8d8d8d' />
                    }
                    onIconClick={() => handleRemoveClick(index)}
                  />
                  {index !== inputList.length - 1 && (
                    <span style={{ marginLeft: '5px', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="heading6">{'or'}</Typography>
                    </span>
                  )}
                </div>
              );
            })}
        </div>
          <FiPlus
            className={classes.addBtn}
            onClick={isDisabled ? () => {} : handleAddClick}
            size='24'
            color={isDisabled ? '#8d8d8d' : ''}
          />
      </div>
    )
  }

  const renderFieldsWithTooltip = () => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inputWrapper}>
          {!isEmpty(inputList) &&
            inputList.map((ele, index) => {
              return (
                <Tooltip key={`multi-text-with-tooltip-${index}`} title={ele?.value} position="top" zIndex={2000}>
                  <div className={classes.crossBtnWrapper}>
                    <Textfield
                      name='value'
                      value={ele?.value}
                      onChange={(e) => handleInputChange(e, index)}
                      type='text'
                      placeholder='value'
                      width={width}
                      height={height}
                      icon={
                        inputList?.length !== 1 && <FiX size='16' color='#8d8d8d' />
                      }
                      onIconClick={() => handleRemoveClick(index)}
                    />
                    {index !== inputList.length - 1 && (
                      <span style={{ marginLeft: '5px', display: 'flex', alignItems: 'center' }}>
                        <Typography variant="heading6">{'or'}</Typography>
                      </span>
                    )}
                  </div>
                </Tooltip>
              );
            })}
        </div>
        <Tooltip title={addBtnTooltipText} position="top" zIndex={2000}>
          <div className={classes.wrapper}>
              <FiPlus
                className={classes.addBtn}
                onClick={isDisabled ? () => {} : handleAddClick}
                size='24'
                color={isDisabled ? '#8d8d8d' : ''}
              />
          </div>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {tooltip ? renderFieldsWithTooltip() : renderFields()}
    </div>
  );
};

MultiTextfield.propTypes = {
  valueString: PropTypes.string,
  finalValue: PropTypes.func.isRequired,
  finalObject: PropTypes.func,
  isAllFieldSaved: PropTypes.func,
  tooltip: PropTypes.bool,
  addBtnTooltipText: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default MultiTextfield;
