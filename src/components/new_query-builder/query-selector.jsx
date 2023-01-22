import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { FiSlash, FiCheck, FiX } from 'react-icons/fi';
import Select from '../select';
import Textfield from '../textfield';
import Typography from '../typography';
import { querySelectorClasses } from './constants';
import { isEmpty } from 'lodash';

import './query-selector.scss';

const QuerySelector = (props) => {
  const [attributeValue, setAttributeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (props?.currentElement) {
      commonUtils(props.currentElement);
    }
  }, [props?.currentElement]);

  const isQueryEmpty = () => {
    if (isEmpty(attributeValue) || isEmpty(operatorValue) || isEmpty(value)) {
      return true;
    } else {
      return false;
    }
  };

  const resetHandleClick = (id) => {
    const index = props.query.findIndex((e) => e.id === id);
    if (index === -1) {
      setValue('');
      setAttributeValue(null);
      setOperatorValue(null);
      setIsActive(false);
    } else {
      commonUtils(props.query[index]);
    }
    setIsError(false);
  };

  const commonUtils = (data) => {
    const { attribute, operator, value } = data;
    const key = Object.keys(props.attributeOptions[0])[0];
    let attributeValueObject = {};
    attributeValueObject[key] = attribute;
    setAttributeValue(attributeValueObject || { attribute: attribute });
    setOperatorValue({ operator: operator });
    setValue(value);
    setIsActive(false);
  };

  const checkHandleClick = (id) => {
    setIsError(isQueryEmpty());
    if (!isQueryEmpty()) {
      const toBeInserted = {
        attribute: props?.attributeGetOptionLabel(attributeValue),
        operator: operatorValue?.operator,
        value,
        isActive: false,
        id,
      };
      setIsActive(false);
      props.handleAddQueryPills(toBeInserted);
    }
  };

  const pillContainerClasses = {
    [querySelectorClasses.levelOneContainer]: true,
    [querySelectorClasses.errorPill]: isError,
  };

  const attributeProps = {
    options: props.attributeOptions,
    onChange: (event, value) => {
      setAttributeValue(value), setIsActive(true);
    },
    value: attributeValue,
    getOptionLabel: props.attributeGetOptionLabel,
    placeholder: 'Attribute',
    width: '200px',
  };

  const operatorProps = {
    options: [
      { operator: 'is' },
      { operator: 'in' },
      { operator: 'contains' },
      { operator: 'equal' },
      { operator: 'not_equal' },
      { operator: 'not_in' },
      { operator: 'is_null' },
      { operator: 'is_not_null' },
      { operator: 'is_empty' },
    ],
    getOptionLabel: function (option) {
      return option.operator;
    },
    onChange: (event, value) => {
      setOperatorValue(value), setIsActive(true);
    },
    value: operatorValue,
    placeholder: 'Operator',
    width: '150px',
  };

  const valueProps = {
    value: value,
    onChange: (e) => {
      setValue(e.target.value), setIsActive(true);
    },
    type: 'text',
    placeholder: 'value',
    width: '200px',
  };

  return (
    <>
      <div className={querySelectorClasses.parentContainer}>
        <div>
          <div className={classNames({ ...pillContainerClasses })}>
            <div className={querySelectorClasses.levelOneFields}>
              <Select {...attributeProps} />
              <span className={querySelectorClasses.pipe} />
              <Select {...operatorProps} />
              <span className={querySelectorClasses.pipe} />
              <Textfield {...valueProps} />
              <span className={querySelectorClasses.pipe} />
              {isActive && (
                <>
                  <div
                    className={querySelectorClasses.cancelIconBox}
                    onClick={() => resetHandleClick(props.id)}
                  >
                    <FiSlash size='24' />
                  </div>
                  <div
                    className={querySelectorClasses.cancelIconBox}
                    onClick={() => checkHandleClick(props.id)}
                  >
                    <FiCheck
                      size='24'
                      color={isQueryEmpty() ? '#c6c6c6' : '#24a148'}
                    />
                  </div>
                </>
              )}
              {
                <div
                  className={querySelectorClasses.cancelIconBox}
                  onClick={props.deleteHandleClick}
                >
                  <FiX size='24' />
                </div>
              }
            </div>
          </div>
          {isError && (
            <div className={querySelectorClasses.errorMsgText}>
              <Typography variant='label1'>
                {'Select all the fields...'}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuerySelector;
