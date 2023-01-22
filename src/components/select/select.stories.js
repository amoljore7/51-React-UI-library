import React, { useState } from 'react';
import Select from './select';
import Button from '../button';

export default {
  title: 'design-components/Select',
  component: Select,
};

export const DropdownWithLabelAndHelperText = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    placeholder: 'Choose an option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Disabled = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    disabled: true,
    value: { title: 'secret-delete' },
    placeholder: 'Choose An Option',
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Error = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    error: true,
    errorMessage:
      "You can't choose this action. Actions can only be chosen from pre-defined list of action",
    value: { title: 'secret-delete' },
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const ReadOnly = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    readOnly: true,
    value: { title: 'secret-delete' },
    width: '300px',
    label: 'Actions',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const WithoutLabel = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    value: { title: 'secret-delete' },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const Inline = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    inline: true,
    value: { title: 'secret-delete' },
    width: '300px',
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
  };
  return <Select {...props} />;
};

export const SmallDropdown = () => {
  const props = {
    width: '56px',
    size: 'small',
    options: [10, 20, 30, 40],
    value: 10,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option;
    },
  };
  return <Select {...props} />;
};

export const DropdownWithoutPortal = () => {
  const [disablePortal, setDisablePortal] = useState(false);
  const props = {
    options: [{ title: 'secret-create' }, { title: 'secret-delete' }, { title: 'secret-update' }],
    placeholder: 'Choose an option',
    width: '500px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onChange: (_, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    disablePortal,
  };
  return (
    <div style={{ width: '600px', height: '600px', overflowY: 'scroll' }}>
      <div
        style={{
          width: '400px',
          height: '300px',
          border: '1px solid salmon',
          fontSize: '18px',
          letterSpacing: '1px',
          padding: '10%',
        }}
      >
        Usually the options container is a portal and hence sits above all other elements. This can
        cause problems if container has scrolling. <br />
        <br />
        <br />
        Click on the dropdown and try to scroll this container.
        <br />
        <br />
        Observe that options container remains fixed.
        <br />
        <div style={{ padding: '10%' }}>
          <Button size="large" type="primary" onClick={() => setDisablePortal(!disablePortal)}>
            {!disablePortal ? 'Disable Portal' : 'Enable Portal'} portal in dropdown
          </Button>
        </div>
      </div>
      <div style={{ margin: '20px' }}>
        <Select {...props} />
      </div>

      <div
        style={{
          width: '400px',
          height: '300px',
          border: '1px solid teal',
          textAlign: 'center',
          padding: '10%',
          paddingTop: '40%',
          fontSize: '36px',
          marginTop: '10%',
        }}
      >
        some form content
      </div>
    </div>
  );
};
