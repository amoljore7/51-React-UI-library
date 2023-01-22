import React, { useState } from 'react';
import QueryBuilder from './query-builder';
import Button from '../button';

export default {
  title: 'design-components/NewQueryBuilder',
  component: QueryBuilder,
};

export const QueryBuilderDemo = () => {
  const [isEditMode, setIsEditMode] = useState(true);
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
    savedQuery: (value) => console.log(value),
    isAllQuerySaved: (value) => setIsDisabled(!value),
  };

  return (
    <div>
      <div style={{ padding: '15px' }}>
        {isEditMode ? (
          <span style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant='primary'
              size='small'
              disabled={isDisabled}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {'Save'}
            </Button>
            <Button
              variant='secondary'
              size='small'
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {'Cancel'}
            </Button>
          </span>
        ) : (
          <Button
            variant='primary'
            size='small'
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
