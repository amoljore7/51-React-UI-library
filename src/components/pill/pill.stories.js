import React from 'react';
import Pill from './pill';

export default {
  title: 'design-components/Pill',
  component: Pill,
};

const PillTemplate = (args) => <Pill {...args} />;
export const RegularPill = PillTemplate.bind({});
RegularPill.args = {
  label: 'Regular',
  onDelete: (event) => alert('This Pill will be deleted'),
};

export const PillWithError = PillTemplate.bind({});
PillWithError.args = {
  error: true,
  label: 'Error',
  onDelete: () => alert('This Pill will be deleted'),
};

export const DisabledPill = PillTemplate.bind({});
DisabledPill.args = {
  disabled: true,
  label: 'Disabled',
};

export const ReadOnlyPill = PillTemplate.bind({});
ReadOnlyPill.args = {
  readOnly: true,
  label: 'Read Only',
};
