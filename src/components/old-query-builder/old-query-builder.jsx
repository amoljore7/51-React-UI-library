import React, { useState, useEffect, Fragment } from 'react';
import { nanoid } from 'nanoid';
import OldQuerySelector from '../old-query-selector';
import Button from '../button';
import Typography from '../typography';
import Pill from '../pill';
import { queryBuilderClasses } from './constants';
import { isEmpty } from 'lodash';
import { FiPlus } from 'react-icons/fi';

import './old-query-builder.scss';

const OldQueryBuilder = (props) => {
  const [selectorList, setSelectorList] = useState([]);
  const [query, setQuery] = useState([]);
  const combinator = props?.combinator || 'AND';


  const handleAddQueryPills = (newQuery) => {
    const index = query.findIndex((e) => e.queryId === newQuery.queryId);
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
    const result = data?.map(({ isActive, queryId, ...rest }) => ({ ...rest }));
    props.savedQuery(result);
  };

  useEffect(()=>{
    if(!isEmpty(props?.existingSavedQueries)) {
      let massagedQueries = props.existingSavedQueries.map((element) => {
        const newId = nanoid();
        return {
          attribute: props?.attributeGetOptionLabel(element),
          operator: element?.operator,
          value: element?.value,
          isActive: false,
          queryId: newId
        }
      })
      setQuery(massagedQueries)
    }
  },[props?.existingSavedQueries])

  useEffect(() => {
    setSelectorList([]);
    if (props?.isEditMode && !isEmpty(query)) {
      query.map((element) => {
        if (undefined != element) {
          fillAllFields(element);
        }
      });
    }
  }, [props?.isEditMode]);

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

  const deleteHandleClick = (removeId) =>
    setSelectorList((selectorList) =>
      selectorList.filter((ele) => ele.key !== removeId)
    );

  const handleRemoveQueryPills = (id) => {
    setQuery((query) => query.filter((ele) => ele.queryId !== id));
  };

  useEffect(() => {
    if(!isEmpty(props?.existingSavedQueries) && props?.isEditMode) {
      if (isEmpty(selectorList) &&  isEmpty(query)) return props?.saveQueryFlag(true);
    }
    if (isEmpty(query)) return props.saveQueryFlag(false);
    if (!isEmpty(selectorList)) {
      if (selectorList?.length === query.length) {
        return props.saveQueryFlag(true);
      } else {
        return props.saveQueryFlag(false);
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
                </Fragment>
              );
            })}
        </div>
      )}

      {props.isEditMode && (
        <>
          <Button variant='textOnly' size='medium' onClick={onAddBtnClick}>
            <FiPlus size='20' color='#067fdb' style={{ marginRight: 5 }} />
            Add Criteria
          </Button>
          <div className={queryBuilderClasses.pillsContainer}>
            {selectorList.map((ele, index) => {
              return (
                <span key={ele.key} style={{ display: 'flex' }} >
                  <OldQuerySelector
                    queryId={ele.key}
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

export default OldQueryBuilder;
