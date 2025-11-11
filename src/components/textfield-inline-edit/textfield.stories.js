import React, { useState } from 'react';
import TextfieldInlineEdit from './';

export default {
  title: 'design-components/TextfieldInlineEdit',
  component: TextfieldInlineEdit,
};

export const Default = () => {
  const [ value, setValue ] = useState('initial string')
  return (
    <TextfieldInlineEdit
      label="Enter value"
      secondaryLabel="(Required)"
      value={value}
      width="200px"
      onChange={(value) => {
        setValue(value)
        console.log('New Value', value)
      }}
    />
  );
};

export const Empty = () => {
  return (
    <TextfieldInlineEdit
      value=""
      width="200px"
    />
  );
};

export const ReadOnly = () => {
  return (
    <TextfieldInlineEdit
      value="test"
      width="200px"
      readOnly
    />
  );
};

export const Disabled = () => {
  return (
    <TextfieldInlineEdit
      value="test"
      width="200px"
      disabled
    />
  );
};

export const Error = () => {
  return (
    <TextfieldInlineEdit
      value="test"
      width="200px"
      error
      errorMsg="Error Message Here"
      onChange={(value) => {
        console.log('New Value', value)
      }}
    />
  );
};

export const WithLabel = () => {
  return (
    <TextfieldInlineEdit
      value="test text"
      width="200px"
      label="This is a label"
      onChange={(value) => {
        console.log('New Value', value)
      }}
    />
  );
};

export const WithHelperText = () => {
  return (
    <TextfieldInlineEdit
      value="test text"
      width="200px"
      label="This is a label"
      helperText="This is a helper text."
      onChange={(value) => {
        console.log('New Value', value)
      }}
    />
  );
};