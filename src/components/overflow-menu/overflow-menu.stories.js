import React from 'react';
import OverflowMenu from './overflow-menu';
import { FiInfo } from 'react-icons/fi';
import { defaultIconSize } from './constants';

export default {
  title: 'design-components/OverflowMenu',
  component: OverflowMenu,
};

export const WithDefaultIcon = () => {
  const props = {
    options: [
      { title: 'Open' },
      { title: 'Add New Node under the same parent node' },
      { title: 'Rename', isDisabled: true },
      { separator: true },
      { title: 'Delete' },
      { title: 'Add Secret' },
      { title: 'Add policy' },
      { separator: true },
      { title: 'View Policy' },
    ],
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };

  return <OverflowMenu {...props} />;
};

export const WithCustomIcon = () => {
  const props = {
    options: [
      { title: 'Open' },
      { title: 'Add New Node under the same parent node' },
      { title: 'Rename' },
      { separator: true },
      { title: 'Delete' },
      { title: 'Add Secret' },
      { title: 'Add policy' },
      { separator: true },
      { title: 'View Policy' },
    ],
    width: '300px',
    icon: <FiInfo size={defaultIconSize} />,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };

  return <OverflowMenu {...props} />;
};
