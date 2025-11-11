import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Select from '../select';
import MultiTextfield from '../multi-textfield';
import Typography from '../typography';
import Autocomplete from '../autocomplete/autocomplete';
import { classes } from './constants';
import { isEmpty } from 'lodash';
import cancel from '../../assets/icons/cancel.svg';
import close from '../../assets/icons/close.svg';
import checkLight from '../../assets/icons/check-light.svg';
import checkGreen from '../../assets/icons/check-green.svg';

import './query-selector.scss';

const QuerySelector = ({
  queryId,
  currentElement,
  query,
  isStandalone,
  updateActiveIndex,
  attributeOptionsLabel,
  attributeGetOptionLabel,
  handleAddQueryPills,
  index,
  selectorList,
  deleteHandleClick,
  attributeOptions,
  onlyAttributeInput = false,
  attributeSelectPlaceholder = 'Attribute',
  attributeInputWidth = '140px',
  excludedAttributes = [],
  groupPropertyName
}) => {
  const [attributeValue, setAttributeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAllFieldSaved, setIsAllFieldSaved] = useState();

  useEffect(() => {
    if (!isEmpty(currentElement)) {
      commonUtils(currentElement);
    }
  }, [currentElement]);

  const isQueryEmpty = () => {
    if (onlyAttributeInput && isEmpty(attributeValue)) {
      return true;
    } else if (!onlyAttributeInput && (isEmpty(attributeValue) || isEmpty(operatorValue) || !isAllFieldSaved)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!isQueryEmpty()) setIsError(false)
  },[attributeValue, operatorValue, value])

  const resetHandleClick = (id) => {
    const value = query?.findIndex((e) => e.queryId === id);
    if (value === -1) {
      setValue('');
      setAttributeValue(null);
      setOperatorValue(null);
      setIsActive(false);
    } else {
      commonUtils(query[value]);
    }
    setIsActive(false)
    setIsError(false);
    !isStandalone && updateActiveIndex(queryId, false)
  };

  const commonUtils = (data) => {
    const { attribute, operator, value } = data;
    const key = attributeOptionsLabel || 'attribute';
    let attributeValueObject = {};
    attributeValueObject[key] = attribute;
    setAttributeValue(attributeValueObject);
    setOperatorValue({ operator: operator });
    setValue(value?.trim());
    setIsActive(false);
  };

  const checkHandleClick = (queryId) => {
    setIsError(isQueryEmpty());
    setValue(value?.trim())
    if (!isQueryEmpty()) {
      const toBeInserted = {
        attribute: attributeGetOptionLabel(attributeValue),
        operator: operatorValue?.operator,
        value,
        isActiveIndex: false,
        queryId,
      };
      setIsActive(false);
      !isStandalone && updateActiveIndex(queryId, false)
      handleAddQueryPills(toBeInserted);
    }
  };

  const checkIsAnyPillActive =()=>{
    let flag = query?.some((obj) => obj?.isActiveIndex === true)
    return flag
  }

  const disabledOtherPills =(obj)=>{
    if (currentElement?.isActiveIndex) {
      return false
    } else if(!currentElement?.isActiveIndex){
      return true
    }
    return false
  }

  const checkIsAnyPillEmpty =()=>{
      if (index === selectorList?.length -1) return false
      return true
  }

  const pillContainerClasses = {
    [classes.levelOneContainer]: true,
    [classes.errorPill]: isError,
  };
  const queryClass = {
    [classes.disabledPill]: isStandalone ? false :
      selectorList?.length !== query?.length ? checkIsAnyPillEmpty() : checkIsAnyPillActive() ? disabledOtherPills() : false,
  };

  let attrOptions = attributeOptions
  if (excludedAttributes?.length) {
    attrOptions = attributeOptions.filter(option => !excludedAttributes.includes(attributeGetOptionLabel(option)))
  }

  const attributeProps = {
    options: attrOptions,
    onChange: (event, value) => {
      !isStandalone && updateActiveIndex(queryId, true)
      setAttributeValue(value), setIsActive(true);
    },
    value: attributeValue ? [attributeValue] : [],
    getOptionLabel: attributeGetOptionLabel,
    placeholder: attributeSelectPlaceholder,
    width: attributeInputWidth,
    height: '26px',
    allowClearing: false,
    filterCurrentValueFromOptions: true,
    groupPropertyName,
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
      !isStandalone && updateActiveIndex(queryId, true)
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
      !isStandalone && updateActiveIndex(queryId, true)
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
              <Autocomplete {...attributeProps} />
              <span className={classes.pipe} />
              {!onlyAttributeInput && (
                <>
                  <Select {...operatorProps} />
                  <span className={classes.pipe} />
                  <MultiTextfield {...valueProps} />
                  <span className={classes.pipe} />
                </>
              )}
              {isActive && (
                <>
                  <div
                    className={classes.cancelIconBox}
                    onClick={() => checkHandleClick(queryId)}
                  >
                    <img src={isQueryEmpty() ? checkLight : checkGreen} />
                  </div>
                  <div
                    className={classes.cancelIconBox}
                    onClick={() => resetHandleClick(queryId)}
                  >
                    <img src={cancel} />
                  </div>
                </>
              )}
              {
                <div
                  className={classes.cancelIconBox}
                  onClick={deleteHandleClick}
                >
                  <img src={close} />
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
