import React, { useState } from 'react';
import OldQuerySelector from './old-query-selector';

export default {
  title: 'design-components/OldQuerySelector',
  component: OldQuerySelector,
};

export const OldQuerySelectorDemo = () => {
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
      <OldQuerySelector {...props} />
    </div>
  );
};
