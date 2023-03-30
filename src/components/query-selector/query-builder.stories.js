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
      return option.attribute;
    },
    handleAddQueryPills: (value) => {
      setQuery([value]), console.log(value);
    },
    id: 1,
    query: query,
    currentElement: query[0],
  };

  return (
    <div>
      <QuerySelector {...props} />
    </div>
  );
};
