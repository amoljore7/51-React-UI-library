import React, { useState, useEffect } from 'react'
import QueryBuilder from './query-builder'
import Button from '../button'

export default {
  title: 'design-components/QueryBuilder',
  component: QueryBuilder,
}


export const QueryBuilderDemo = () => {
  const [query, setQuery] = useState([])
  const [combinator, setCombinator] = useState('AND');
  const [isEditMode, setIsEditMode] = useState(true)

  const finalObject = {
    combinator: combinator,
    rules: query
  }

  const handleAddQueryPills = (newQuery) => {
    setQuery(current => [...current, newQuery]);
  }
  const handleRemoveQueryPills = (id) => {
    setQuery((query) =>
      query.filter((ele) => ele.id !== id)
    );
  }
  const combinatorHandle = (combinator) => {
    setCombinator(combinator)
  }
  const flushInitialQuerys = () => {
    setQuery([])
  }

  useEffect(() => {
    finalObject.combinator = combinator;
    finalObject.rules = query;
  }, [query, combinator])

  const props = {
    isEditMode: isEditMode,
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option.attribute;
    },
    handleAddQueryPills: handleAddQueryPills,
    handleRemoveQueryPills: handleRemoveQueryPills,
    flushInitialQuerys: flushInitialQuerys,
    combinatorHandle: combinatorHandle,
    isAllQuerySaved: (value) => console.log(value),
    combinator: combinator,
    queryPills: finalObject,
  };
  console.log('>>finalObject>>', finalObject)

  return (
    <div>
      <div style={{ padding: '15px' }}>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {'Toggle'}
        </Button>
        <hr></hr>
      </div>

      <QueryBuilder {...props} />
    </div>

  );
};