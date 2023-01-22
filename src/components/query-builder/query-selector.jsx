import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FiSlash, FiCheck, FiX } from 'react-icons/fi';
import Select from '../select';
import Textfield from '../textfield';
import { querySelectorClasses } from './constants';
import { isEmpty } from 'lodash';

import './query-selector.scss';

const QuerySelector = (props) => {
  const [attributeValue, setAttributeValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (props?.currentElement) {
      const { attribute, operator, value, isActive } = props.currentElement;
      const key = Object.keys(props.attributeOptions[0])[0];
      let attributeValueObject = {};
      attributeValueObject[key] = attribute;
      setAttributeValue(attributeValueObject || { attribute: attribute });
      setOperatorValue({ operator: operator });
      setValue(value);
      setIsActive(!isActive);
    }
  }, [props?.currentElement]);

  const isQueryEmpty = () => {
    if (isEmpty(attributeValue) || isEmpty(operatorValue) || isEmpty(value)) {
      return true;
    } else {
      return false;
    }
  };

  const valueOnChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const cancelHandleClick = () => {
    setValue('');
    setAttributeValue(null);
    setOperatorValue(null);
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
    onChange: (event, value) => setAttributeValue(value),
    value: attributeValue,
    getOptionLabel: props.attributeGetOptionLabel,
    placeholder: 'Attribute',
    width: '200px',
    disabled: !isActive,
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
    onChange: (event, value) => setOperatorValue(value),
    value: operatorValue,
    placeholder: 'Operator',
    width: '150px',
    disabled: !isActive,
  };

  const valueProps = {
    value: value,
    onChange: valueOnChange,
    type: 'text',
    placeholder: 'value',
    width: '200px',
    disabled: !isActive,
  };

  return (
    <>
      <div className={querySelectorClasses.parentContainer}>
        <div>
          <div className={classNames({ ...pillContainerClasses })}>
            <div className={querySelectorClasses.levelOneFields}>
              <Select {...attributeProps} />
              <Select {...operatorProps} />
              <Textfield {...valueProps} />
              {isActive && (
                <>
                  <div
                    className={querySelectorClasses.cancelIconBox}
                    onClick={cancelHandleClick}
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
              {'Select all the fields...'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

QuerySelector.propTypes = {
  attributeOptions: PropTypes.array.isRequired,
  attributeGetOptionLabel: PropTypes.func.isRequired,
  handleAddQueryPills: PropTypes.func.isRequired,
};

export default QuerySelector;
