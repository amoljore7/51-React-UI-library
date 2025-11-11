import React, { useState } from 'react';
import QueryBuilder from './query-builder';
import Button from '../button';
import Typography from '../typography';

export default {
  title: 'design-components/QueryBuilder',
  component: QueryBuilder,
};

let existingSavedQueriesResponse = [
  { attribute: 'skills-1', operator: 'is', value: 'ABC,XYZ' },
  { attribute: 'skills-2', operator: 'contains', value: 'PQR,ZMR' }
]

export const QueryBuilderDemo = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();
  const [savedQuery, setSavedQuery] = useState()
  const [existingSavedQueries, setExistingSavedQueries] = useState(existingSavedQueriesResponse)

  const props = {
    isEditMode: isEditMode,
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    savedQuery: (value) => setSavedQuery(value),
    saveQueryFlag: (value) => setIsDisabled(!value),
    existingSavedQueries,
  };

  const saveHandler = () => {
    setExistingSavedQueries(savedQuery)
    setIsEditMode(!isEditMode)
  }

  return (
    <div>
      <div style={{ padding: '15px 15px 15px 0px' }}>
        {isEditMode ? (
          <span style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant='primary'
              size='medium'
              disabled={isDisabled}
              onClick={() => saveHandler()}
            >
              {'Save'}
            </Button>
            <Button
              variant='secondary'
              size='medium'
              onClick={() => setIsEditMode(false)}
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

export const OnlyAttribute = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();

  let existingSavedQueries = [
    { attribute: 'skills-1' },
    { attribute: 'skills-2' }
  ]

  const props = {
    isEditMode: isEditMode,
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    savedQuery: (value) => console.log(value),
    saveQueryFlag: (value) => setIsDisabled(!value),
    existingSavedQueries,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Something With Only Attribute',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or',
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

export const WorkflowExample = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState();

  let existingSavedQueries = []

  let existingSavedQueriesApps = []

  const eventProps = {
    isEditMode: isEditMode,
    attributeOptions: [
      { attribute: 'New accounts are created' },
      { attribute: 'Existing accounts are deleted' },
      { attribute: 'New permissions are created' },
      { attribute: 'Existing permissions are deleted' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    savedQuery: (value) => console.log(value),
    saveQueryFlag: (value) => setIsDisabled(!value),
    existingSavedQueries,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Event',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or',
    attributeInputWidth: '250px',
  };

  const applicationProps = {
    isEditMode: isEditMode,
    attributeOptions: [
      { attribute: 'AWS' },
      { attribute: 'GCP' },
      { attribute: 'AZURE' },
      { attribute: 'OCI' },
      { attribute: 'SalesForce' },
      { attribute: 'Britive' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    savedQuery: (value) => console.log(value),
    saveQueryFlag: (value) => setIsDisabled(!value),
    existingSavedQueries: existingSavedQueriesApps,
    onlyAttributeInput: true,
    addButtonLabel: 'Add Application',
    attributeSelectPlaceholder: 'A Placeholder',
    combinator: 'Or',
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
      <Typography variant="heading5">When</Typography>
      <br />

      <QueryBuilder {...eventProps} />
      <br />

      <Typography variant="heading5">In</Typography>
      <br />

      <QueryBuilder {...applicationProps} />
    </div>
  );
};