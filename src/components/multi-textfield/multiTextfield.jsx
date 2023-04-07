import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiPlus } from 'react-icons/fi';
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
  maxField = 0,
  tooltip = false,
  addBtnTooltipText,
}) => {
  const [inputList, setInputList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let result = inputList.map((obj) => {
      if (isEmpty(obj.value)) return true
      return false
    })
    setIsDisabled(result.includes(true))
  });

  useEffect(() => {
    setInputList([]);
    if (isEmpty(valueString)) setInputList([{ value: '' }]);
  }, []);

  useEffect(() => {
    if (!isEmpty(valueString)) {
      setInputList([]);
      let str = valueString
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e)
        .join(',');

      let arr = str.split(/\s*,\s*/);

      arr?.map((value, i) => fillAllFields(value, i));
    }
  }, [valueString]);

  useEffect(() => {
    if (isEmpty(valueString)) {
      setInputList([{ value: '' }]);
    }
  }, [valueString]);


  const fillAllFields = (value, i) => {
    if (maxField && maxField > i) {
      setInputList((inputList) => [...inputList, { value: value }]);
      setIsDisabled(true)
    }
    if (!maxField) {
      setInputList((inputList) => [...inputList, { value: value }]);
    }
  };

  useEffect(() => {
    if (maxField && inputList.length >= maxField) setIsDisabled(true)
  }, [inputList]);

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
    if (!isEmpty(value)) finalValue(value);
    finalObject(inputList);

    let text = value
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e)
      .join(',');

    if (isEmpty(text) || text.split(',').length !== inputList.length) {
      isAllFieldSaved(false);
    } else {
      isAllFieldSaved(true);
    }
  }, [inputList]);

  const renderFields = () => {
    return (
      <>
        <div className={classes.inputWrapper}>
          {!isEmpty(inputList) &&
            inputList.map((ele, index) => {
              return (
                <Fragment key={index}>
                  <Textfield
                    name='value'
                    value={ele.value}
                    onChange={(e) => handleInputChange(e, index)}
                    type='text'
                    placeholder='value'
                    width='120px'
                    icon={
                      inputList?.length !== 1 && <FiX size='24' color='#8d8d8d' />
                    }
                    onIconClick={() => handleRemoveClick(index)}
                  />
                  {index !== inputList.length - 1 && (
                    <span style={{ margin: 'auto' }}>
                      <Typography variant="heading6">{'or'}</Typography>
                    </span>
                  )}
                </Fragment>
              );
            })}
        </div>
        <div className={classes.btnWrapper}>
          <FiPlus
            className={classes.addBtn}
            onClick={isDisabled ? () => {} : handleAddClick}
            size='24'
            color={isDisabled ? '#8d8d8d' : ''}
          />
        </div>
      </>
    )
  }

  const renderFieldsWithTooltip = () => {
    return (
      <>
        <div className={classes.inputWrapper}>
          {!isEmpty(inputList) &&
            inputList.map((ele, index) => {
              return (
                <Tooltip title={ele?.value} position="top" zIndex={2000}>
                  <div key={index} className={classes.btnWrapper}>
                    <Textfield
                      name='value'
                      value={ele?.value}
                      onChange={(e) => handleInputChange(e, index)}
                      type='text'
                      placeholder='value'
                      width='120px'
                      icon={
                        inputList?.length !== 1 && <FiX size='24' color='#8d8d8d' />
                      }
                      onIconClick={() => handleRemoveClick(index)}
                    />
                    {index !== inputList.length - 1 && (
                      <span style={{ marginLeft: '5px' }}>
                        <Typography variant="heading6">{'or'}</Typography>
                      </span>
                    )}
                  </div>
                </Tooltip>
              );
            })}
        </div>
        <Tooltip title={addBtnTooltipText} position="top" zIndex={2000}>
          <div className={classes.btnWrapper}>
            <FiPlus
              className={classes.addBtn}
              onClick={isDisabled ? () => {} : handleAddClick}
              size='24'
              color={isDisabled ? '#8d8d8d' : ''}
            />
          </div>
        </Tooltip>
      </>
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
};

export default MultiTextfield;
