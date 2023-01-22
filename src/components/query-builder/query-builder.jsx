import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import QuerySelector from './query-selector';
import Button from '../button';
import Typography from '../typography';
import Pill from '../pill';
import Select from '../select';
import PropTypes from 'prop-types';
import { queryBuilderClasses } from './constants';
import { isEmpty } from 'lodash';
import { FiPlus } from 'react-icons/fi';

import './query-builder.scss';

const QueryBuilder = (props) => {
  const [selectorList, setSelectorList] = useState([]);
  const [combinator, setCombinator] = useState(props.combinator || 'AND');

  useEffect(() => {
    setSelectorList([]);
    if (props?.isEditMode && !isEmpty(props.queryPills.rules)) {
      props.queryPills.rules.map((element) => {
        if (undefined != element) {
          fillAllFields(element);
        }
      });
    }
  }, [props.isEditMode]);

  const fillAllFields = (ele) => {
    props.combinatorHandle(combinator);
    const newId = nanoid();
    setSelectorList((selectorList) => [
      ...selectorList,
      <QuerySelector
        key={newId}
        id={newId}
        deleteHandleClick={() => {
          props.handleRemoveQueryPills(newId), deleteHandleClick(newId);
        }}
        currentElement={ele}
        index={selectorList.length}
        {...props}
      />,
    ]);
    props.flushInitialQuerys();
  };

  const onAddBtnClick = () => {
    props.combinatorHandle(combinator);
    const newId = nanoid();
    setSelectorList((selectorList) => [
      ...selectorList,
      <QuerySelector
        key={newId}
        id={newId}
        deleteHandleClick={() => {
          props.handleRemoveQueryPills(newId), deleteHandleClick(newId);
        }}
        index={selectorList.length}
        {...props}
      />,
    ]);
  };

  const deleteHandleClick = (removeId) =>
    setSelectorList((selectorList) =>
      selectorList.filter((ele) => ele.key !== removeId)
    );

  const combinatorHandler = (value) => {
    setCombinator(value);
    props.combinatorHandle(value);
  };

  useEffect(() => {
    if (isEmpty(props?.queryPills?.rules)) return props.isAllQuerySaved(false);
    if (!isEmpty(selectorList)) {
      if (selectorList?.length === props?.queryPills?.rules.length) {
        return props.isAllQuerySaved(true);
      } else {
        return props.isAllQuerySaved(false);
      }
    }
  }, [props?.queryPills?.rules, selectorList]);

  const combinatorProps = {
    width: '65px',
    size: 'small',
    options: ['AND', 'OR', 'NOT'],
    value: combinator,
    inline: true,
    onChange: (event, value) => combinatorHandler(value),
    getOptionLabel: function (option) {
      return option;
    },
  };

  return (
    <div>
      {!props.isEditMode && (
        <div className={queryBuilderClasses.pillsContainer}>
          {props.queryPills.rules &&
            props.queryPills.rules.map((value, index) => {
              return (
                <>
                  {index !== 0 && (
                    <div style={{ padding: '0 15px' }}>
                      <Typography variant='label1'>{combinator}</Typography>
                    </div>
                  )}
                  <div
                    key={value.attribute}
                    className={queryBuilderClasses.pillsContainer}
                  >
                    <Pill
                      readOnly={true}
                      label={
                        value.attribute +
                        ' ' +
                        value.operator +
                        ' ' +
                        value.value
                      }
                    />
                  </div>
                </>
              );
            })}
        </div>
      )}

      {props.isEditMode && (
        <>
          <Button variant='textOnly' size='small' onClick={onAddBtnClick}>
            <FiPlus size='20' color='#067fdb' style={{ marginRight: 5 }} />
            Add Criteria
          </Button>
          <div style={{ padding: '10px 0' }}>
            {selectorList.length > 0 && <Select {...combinatorProps} />}
          </div>

          {selectorList}
        </>
      )}
    </div>
  );
};

QueryBuilder.propTypes = {
  isEditMode: PropTypes.bool,
  attributeOptions: PropTypes.array.isRequired,
  attributeGetOptionLabel: PropTypes.func.isRequired,
  handleAddQueryPills: PropTypes.func.isRequired,
  handleRemoveQueryPills: PropTypes.func.isRequired,
  flushInitialQuerys: PropTypes.func.isRequired,
  combinatorHandle: PropTypes.func,
  isAllQuerySaved: PropTypes.func,
};

export default QueryBuilder;
