import React, { useState, useEffect, Fragment } from 'react';
import { nanoid } from 'nanoid';
import QuerySelector from '../query-selector';
import Button from '../button';
import Typography from '../typography';
import Pill from '../pill';
import { queryBuilderClasses } from './constants';
import { isEmpty } from 'lodash';
import { FiPlus } from 'react-icons/fi';

import './query-builder.scss';

const QueryBuilder = ({
  combinator = 'AND',
  isEditMode,
  savedQuery,
  existingSavedQueries,
  attributeGetOptionLabel,
  saveQueryFlag,
  addButtonLabel = 'Add Criteria',
  onlyAttributeInput = false,
  disableAddButton = false,
  attributeOptions,
  getQueryCount,
  ...restProps
}) => {
  const [selectorList, setSelectorList] = useState([]);
  const [query, setQuery] = useState([]);
  const [isDisabled, setIsDisabled] = useState();
  const [checkIsAnyPillActive, setCheckIsAnyPillActive] = useState();


  const handleAddQueryPills = (newQuery) => {
    const index = query.findIndex((e) => e.queryId === newQuery.queryId);
    if (index === -1) {

      setQuery((oldQuery) => [...oldQuery, newQuery]);
    } else {
      query[index] = newQuery;
      setQuery(query);
    }
    massageData(query);
    isAnyPillActive();
  };

  const updateActiveIndex = (queryId, flag) => {
    const index = query.findIndex((e) => e?.queryId === queryId);
    if (index !== -1) {
      query[index].isActiveIndex = flag;
      setQuery(query);
    }
    isAnyPillActive();
  }

  useEffect(() => {
    massageData(query);
  }, [query, isEditMode]);

  useEffect(() => {
    if (typeof getQueryCount === 'function') {
      getQueryCount(selectorList.length)
    }
  }, [selectorList.length])

  const massageData = (data) => {
    const result = data?.map(({ queryId, ...rest }) => ({ ...rest }));
    savedQuery(result);
  };

  useEffect(()=>{
    if(!isEmpty(existingSavedQueries) && !isEditMode) {
      let massagedQueries = existingSavedQueries.map((element) => {
        const newId = nanoid();
        return {
          attribute: attributeGetOptionLabel(element),
          operator: element?.operator,
          value: element?.value,
          isActiveIndex: false,
          queryId: newId
        }
      })
      setQuery(massagedQueries)
    }
    if (isEmpty(existingSavedQueries) && !isEditMode) {
      setQuery([])
    }
  },[JSON.stringify(existingSavedQueries), isEditMode])

  useEffect(() => {
    setSelectorList([]);
    if (isEditMode && !isEmpty(query)) {
      query.map((element) => {
        if (undefined != element) {
          fillAllFields(element);
        }
      });
    }
  }, [isEditMode]);

  const fillAllFields = (obj) => {
    setSelectorList((selectorList) => [
      ...selectorList,
      <span key={obj?.queryId} object={obj}></span>,
    ]);
  };

  const onAddBtnClick = () => {
    const newId = nanoid();
    setSelectorList((selectorList) => [
      ...selectorList,
      <span key={newId}></span>,
    ]);
  };

  const deleteHandleClick = (removeId) => {
    setSelectorList((selectorList) =>
      selectorList.filter((ele) => ele.key !== removeId)
    );
    isAnyPillActive();
  }

  const handleRemoveQueryPills = (id) => {
    const index = query.findIndex((e) => e?.queryId === id);
    if (index !== -1) {
      query[index].isActiveIndex = false;
    }
    setQuery((query) => query.filter((ele) => ele.queryId !== id));
  };

  useEffect(() => {
    if (isAnyPillActive()) {
      return saveQueryFlag(false);
    } else if (!isEmpty(existingSavedQueries) && isEmpty(selectorList) && isEmpty(query)) {
      return saveQueryFlag(true);
    } else if (isEmpty(existingSavedQueries) && isEmpty(selectorList) && isEmpty(query)) {
      return saveQueryFlag(false);
    }
    if(!isEmpty(existingSavedQueries) && isEditMode) {
      if (isEmpty(selectorList) &&  isEmpty(query)){
        setIsDisabled(true)
        return saveQueryFlag(true);
      }
    }
    if (isEmpty(query)){
      setIsDisabled(false)
      return saveQueryFlag(false);
    }
    if (!isEmpty(selectorList)) {
      if (selectorList?.length === query.length) {
        setIsDisabled(true)
        return saveQueryFlag(true);
      } else {
        setIsDisabled(false)
        return saveQueryFlag(false);
      }
    }
  }, [query, selectorList, isEditMode, checkIsAnyPillActive]);

  const checkAddCriteriaBtnFlag =()=>{
    if (isEmpty(selectorList) && isEmpty(query)) {
      return false;
    }
    return !isDisabled
  }

  const isAnyPillActive =()=>{
    let flag = query?.some((obj) => obj?.isActiveIndex === true)
    setCheckIsAnyPillActive(flag)
    return flag;
  }

  const renderValue = (value) => {
    let regex = /,/g;
    let str = value
      .split(',')
      .map((e) => e?.trim())
      .filter((e) => e)
      .join(',');
    let text = str
      .split(',')
      .map((e) => '"' + e?.trim() + '"')
      .join(',')
      .replace(regex, ' or ');
    return text;
  };

  const getPillLabel = ({ attribute, operator, value }) => {
    if (onlyAttributeInput) {
      return attribute
    }

    return `${attribute} ${operator} ${renderValue(value)}`
  }

  const excludedAttributes = query?.map(q => q.attribute)

  return (
    <div>
      {!isEditMode && (
        <div className={queryBuilderClasses.pillsContainer}>
          {query &&
            query.map((value, index) => {
              return (
                <Fragment key={value.queryId}>
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
                    data-testid="query-pill-wrapper"
                    className={queryBuilderClasses.pillsContainer}
                  >
                    <Pill readOnly={true} label={getPillLabel(value)} />
                  </div>
                </Fragment>
              );
            })}
        </div>
      )}

      {isEditMode && (
        <>
          <Button variant='textOnly' size='medium' onClick={onAddBtnClick} disabled={disableAddButton || checkIsAnyPillActive || checkAddCriteriaBtnFlag()}>
            <FiPlus size='20' color='#067fdb' style={{ marginRight: 5 }} />
            {addButtonLabel}
          </Button>
          <div className={queryBuilderClasses.pillsContainer}>
            {selectorList.map((ele, index) => {
              const currentAttribute = query[index]?.attribute
              const excludedItemForCurrentSelector = excludedAttributes.filter(attr => attr !== currentAttribute)
              return (
                <span key={`${excludedItemForCurrentSelector.join('-')}-${index}`} style={{ display: 'flex' }} >
                  <QuerySelector
                    queryId={ele.key}
                    deleteHandleClick={() => {
                      handleRemoveQueryPills(ele.key),
                        deleteHandleClick(ele.key);
                    }}
                    index={index}
                    handleAddQueryPills={handleAddQueryPills}
                    updateActiveIndex={updateActiveIndex}
                    currentElement={query[index]}
                    query={query}
                    selectorList={selectorList}
                    attributeGetOptionLabel={attributeGetOptionLabel}
                    onlyAttributeInput={onlyAttributeInput}
                    attributeOptions={attributeOptions}
                    excludedAttributes={excludedItemForCurrentSelector}
                    {...restProps}
                  />

                  {index !== selectorList.length - 1 && (
                    <div
                      className={queryBuilderClasses.pillsContainer}
                      style={{ padding: '0 8px', margin: 'auto', width: 'max-content' }}
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
