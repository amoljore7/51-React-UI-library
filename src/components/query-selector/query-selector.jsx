import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { FiSlash, FiCheck, FiX } from 'react-icons/fi';
import Select from '../select';
import MultiTextfield from '../multi-textfield';
import Typography from '../typography';
import { classes } from './constants';
import { isEmpty } from 'lodash';

import './query-selector.scss';

const QuerySelector = (props) => {
  const [attributeValue, setAttributeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAllFieldSaved, setIsAllFieldSaved] = useState();

  useEffect(() => {
    if (!isEmpty(props?.currentElement)) {
      commonUtils(props?.currentElement);
    }
  }, [props?.currentElement]);

  const isQueryEmpty = () => {
    if (isEmpty(attributeValue) || isEmpty(operatorValue) || !isAllFieldSaved) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!isQueryEmpty()) setIsError(false)
  },[attributeValue, operatorValue, value])

  const resetHandleClick = (id) => {
    const value = props?.query?.findIndex((e) => e.queryId === id);
    if (value === -1) {
      setValue('');
      setAttributeValue(null);
      setOperatorValue(null);
      setIsActive(false);
    } else {
      commonUtils(props?.query[value]);
    }
    setIsActive(false)
    setIsError(false);
    props?.updateActiveIndex(props?.queryId, false)
  };

  const commonUtils = (data) => {
    const { attribute, operator, value } = data;
    const key = props?.attributeOptionsLabel || 'attribute';
    let attributeValueObject = {};
    attributeValueObject[key] = attribute;
    setAttributeValue(attributeValueObject);
    setOperatorValue({ operator: operator });
    setValue(value.trim());
    setIsActive(false);
  };

  const checkHandleClick = (queryId) => {
    setIsError(isQueryEmpty());
    setValue(value.trim())
    if (!isQueryEmpty()) {
      const toBeInserted = {
        attribute: props?.attributeGetOptionLabel(attributeValue),
        operator: operatorValue?.operator,
        value,
        isActiveIndex: false,
        queryId,
      };
      setIsActive(false);
      props?.updateActiveIndex(queryId, false)
      props?.handleAddQueryPills(toBeInserted);
    }
  };

  const checkIsAnyPillActive =()=>{
    let flag = props?.query?.some((obj) => obj?.isActiveIndex === true)
    return flag
  }

  const disabledOtherPills =(obj)=>{
    if (props?.currentElement?.isActiveIndex) {
      return false
    } else if(!props?.currentElement?.isActiveIndex){
      return true
    }
    return false
  }

  const checkIsAnyPillEmpty =()=>{
      if (props?.index === props?.selectorList?.length -1) return false
      return true
  }

  const pillContainerClasses = {
    [classes.levelOneContainer]: true,
    [classes.errorPill]: isError,
  };
  const queryClass = {
    [classes.disabledPill]:
      props?.selectorList?.length !== props?.query?.length ? checkIsAnyPillEmpty() : checkIsAnyPillActive() ? disabledOtherPills() : false,
  };

  const attributeProps = {
    options: props?.attributeOptions,
    onChange: (event, value) => {
      props?.updateActiveIndex(props?.queryId, true)
      setAttributeValue(value), setIsActive(true);
    },
    value: attributeValue,
    getOptionLabel: props?.attributeGetOptionLabel,
    placeholder: 'Attribute',
    width: '140px',
    height: '26px'
  };

  const operatorProps = {
    options: [
      { operator: 'is' },
      { operator: 'contains' },
    ],
    getOptionLabel: function (option) {
      return option.operator;
    },
    onChange: (event, value) => {
      props?.updateActiveIndex(props?.queryId, true)
      setOperatorValue(value), setIsActive(true);
    },
    value: operatorValue,
    placeholder: 'Operator',
    width: '140px',
    height: '26px'
  };

  const valueProps = {
    valueString: value,
    tooltip: true,
    addBtnTooltipText: 'Add Additional value with "Or" condition',
    finalValue: (value) => {
      setValue(value)
      props?.updateActiveIndex(props?.queryId, true)
      setIsActive(true);
    },
    isAllFieldSaved: (flag) => setIsAllFieldSaved(flag),
    width: '100px',
    height: '26px',
  };

  return (
    <div className={classNames({ ...queryClass })}>
      <div className={classes.parentContainer} data-testid="pill-wrapper">
        <div>
          <div className={classNames({ ...pillContainerClasses })}>
            <div className={classes.levelOneFields}>
              <Select {...attributeProps} />
              <span className={classes.pipe} />
              <Select {...operatorProps} />
              <span className={classes.pipe} />
              <MultiTextfield {...valueProps} />
              <span className={classes.pipe} />
              {isActive && (
                <>
                  <div
                    className={classes.cancelIconBox}
                    onClick={() => checkHandleClick(props?.queryId)}
                  >
                    <FiCheck
                      size='24'
                      color={isQueryEmpty() ? '#c6c6c6' : '#24a148'}
                    />
                  </div>
                  <div
                    className={classes.cancelIconBox}
                    onClick={() => resetHandleClick(props?.queryId)}
                  >
                    <FiSlash size='24' />
                  </div>
                </>
              )}
              {
                <div
                  className={classes.cancelIconBox}
                  onClick={props?.deleteHandleClick}
                >
                  <FiX size='24' />
                </div>
              }
            </div>
          </div>
          {isError && (
            <div className={classes.errorMsgText}>
              <Typography variant='label1'>
                {'Please specify values for all fields'}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuerySelector;
