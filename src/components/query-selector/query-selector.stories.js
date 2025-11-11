import React, { useState } from 'react';
import QuerySelector from './query-selector';

export default {
  title: 'design-components/QuerySelector',
  component: QuerySelector,
};

export const QuerySelectorDemo = () => {
  const [query, setQuery] = useState([]);

  const props = {
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: (value) => {
      setQuery([value]), console.log(value);
    },
    queryId: 1,
    query: query,
    currentElement: query[0],
    isStandalone: true,
  };

  return (
    <div>
      <QuerySelector {...props} />
    </div>
  );
};

export const OnlyAttribute = () => {
  const [query, setQuery] = useState([{
    attribute: "skills-1",
    isActiveIndex: false,
    value: "",
  }]);

  const props = {
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: (value) => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    currentElement: query[0], // This is equivalent to the value in the input element.
    isStandalone: true,
    onlyAttributeInput: true,
  };

  return (
    <div>
      <QuerySelector {...props} />
    </div>
  );
};

export const OnlyAttributeWithExcludedAtributes = () => {
  const [query, setQuery] = useState([{
    attribute: "skills-1",
    isActiveIndex: false,
    value: "",
  }]);

  const props = {
    attributeOptions: [
      { attribute: 'skills-1' },
      { attribute: 'skills-2' },
      { attribute: 'skills-3' },
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: (value) => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    currentElement: query[0], // This is equivalent to the value in the input element.
    isStandalone: true,
    onlyAttributeInput: true,
    excludedAttributes: ['skills-3'],
  };

  return (
    <div>
      <QuerySelector {...props} />
    </div>
  );
};

export const OnlyAttributeWithGroupOptions = () => {
  const [query, setQuery] = useState([{
    attribute: "skills-1",
    isActiveIndex: false,
    value: "",
  }]);

  const props = {
    attributeOptions: [
      { attribute: 'skills-1', type: 'Type-1' },
      { attribute: 'skills-2', type: 'Type-1' },
      { attribute: 'skills-3', type: 'Type-1' },
      { attribute: 'skills-4', type: 'Type-2' },
      { attribute: 'skills-5', type: 'Type-2'},
      { attribute: 'skills-6', type: 'Type-3'},
    ],
    attributeGetOptionLabel: function (option) {
      return option?.attribute;
    },
    attributeOptionsLabel: 'attribute',
    handleAddQueryPills: (value) => {
      setQuery([value]), console.log(value);
    },
    onInputChange: () => {},
    query,
    currentElement: query[0], // This is equivalent to the value in the input element.
    isStandalone: true,
    onlyAttributeInput: true,
    groupPropertyName: 'type',
  };

  return (
    <div>
      <QuerySelector {...props} />
    </div>
  );
};