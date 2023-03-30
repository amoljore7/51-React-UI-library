import React, { useState } from 'react';
import QueryBuilder from './query-builder';
import Button from '../button';

export default {
  title: 'design-components/QueryBuilder',
  component: QueryBuilder,
};

let existingSavedQueries = [
  { attribute: 'skills-1', operator: 'is', value: 'A' },
  { attribute: 'skills-2', operator: 'is', value: 'B' },
]

export const QueryBuilderDemo = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();

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
    attributeOptionsLabel: 'attribute',
    savedQuery: (value) => console.log(value),
    saveQueryFlag: (value) => setIsDisabled(!value),
    existingSavedQueries,
  };

  return (
    <div>
      <div style={{ padding: '15px 15px 15px 0px' }}>
        {isEditMode ? (
          <span style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant='primary'
              size='medium'
              disabled={isDisabled}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {'Save'}
            </Button>
            <Button
              variant='secondary'
              size='medium'
              onClick={() => window.location.reload()}
            >
              {'Cancel'}
            </Button>
          </span>
        ) : (
          <Button
            variant='primary'
            size='medium'
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {'Edit'}
          </Button>
        )}
      </div>

      <QueryBuilder {...props} />
    </div>
  );
};
