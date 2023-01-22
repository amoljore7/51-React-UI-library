import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import QuerySelector from './query-selector';
import Button from '../button';
import Typography from '../typography';
import Pill from '../pill';
import { queryBuilderClasses } from './constants';
import { isEmpty } from 'lodash';
import { FiPlus } from 'react-icons/fi';

import './query-builder.scss';

const QueryBuilder = (props) => {
  const [selectorList, setSelectorList] = useState([]);
  const [query, setQuery] = useState([]);
  const combinator = props?.combinator || 'AND';

  const handleAddQueryPills = (newQuery) => {
    const index = query.findIndex((e) => e.id === newQuery.id);
    if (index === -1) {
      setQuery((oldQuery) => [...oldQuery, newQuery]);
    } else {
      query[index] = newQuery;
      setQuery(query);
    }
    massageData(query);
  };

  useEffect(() => {
    massageData(query);
  }, [query, props?.isEditMode]);

  const massageData = (data) => {
    const result = data.map(({ isActive, id, ...rest }) => ({ ...rest }));
    props.savedQuery(result);
  };

  useEffect(() => {
    setSelectorList([]);
    if (props?.isEditMode && !isEmpty(query)) {
      query.map((element) => {
        if (undefined != element) {
          fillAllFields(element);
        }
      });
    }
  }, [props.isEditMode]);

  const fillAllFields = (obj) => {
    setSelectorList((selectorList) => [
      ...selectorList,
      <span key={obj?.id} object={obj}></span>,
    ]);
  };

  const onAddBtnClick = () => {
    const newId = nanoid();
    setSelectorList((selectorList) => [
      ...selectorList,
      <span key={newId}></span>,
    ]);
  };

  const deleteHandleClick = (removeId) =>
    setSelectorList((selectorList) =>
      selectorList.filter((ele) => ele.key !== removeId)
    );

  const handleRemoveQueryPills = (id) => {
    setQuery((query) => query.filter((ele) => ele.id !== id));
  };

  useEffect(() => {
    if (isEmpty(query)) return props.isAllQuerySaved(false);
    if (!isEmpty(selectorList)) {
      if (selectorList?.length === query.length) {
        return props.isAllQuerySaved(true);
      } else {
        return props.isAllQuerySaved(false);
      }
    }
  }, [query, selectorList, props?.isEditMode]);

  return (
    <div>
      {!props.isEditMode && (
        <div className={queryBuilderClasses.pillsContainer}>
          {query &&
            query.map((value, index) => {
              return (
                <>
                  {index !== 0 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 10px',
                      }}
                    >
                      <Typography variant='label1'>{combinator}</Typography>
                    </div>
                  )}
                  <div
                    key={value.id}
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
          <div className={queryBuilderClasses.pillsContainer}>
            {selectorList.map((ele, index) => {
              return (
                <span key={ele.key} style={{ display: 'flex' }}>
                  <QuerySelector
                    id={ele.key}
                    deleteHandleClick={() => {
                      handleRemoveQueryPills(ele.key),
                        deleteHandleClick(ele.key);
                    }}
                    index={selectorList.length}
                    handleAddQueryPills={handleAddQueryPills}
                    currentElement={ele?.props?.object}
                    query={query}
                    {...props}
                  />

                  {index !== selectorList.length - 1 && (
                    <div
                      className={queryBuilderClasses.pillsContainer}
                      style={{ padding: '0 8px', margin: 'auto' }}
                    >
                      <Typography variant='label1'>{combinator}</Typography>
                    </div>
                  )}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default QueryBuilder;
