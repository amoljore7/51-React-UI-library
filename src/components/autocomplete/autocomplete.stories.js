import React, { useState } from 'react';
import Autocomplete from './autocomplete';
import Button from '../button';
import SampleSmallIcon from '../../assets/icons/ico-sample-icon-24.svg';
import SampleLargeIcon from '../../assets/icons/ico-sample-icon-40.svg';

export default {
  title: 'design-components/Autocomplete',
  component: Autocomplete,
};

export const MultiSelectAutocomplete = () => {
  const props = {
    options: [
      { title: 'secret-create', icon: SampleSmallIcon },
      { title: 'secret-delete', icon: SampleSmallIcon },
      { title: 'secret-update', icon: SampleSmallIcon },
      { title: 'vault-create', icon: SampleSmallIcon },
      { title: 'vault-update', icon: SampleSmallIcon },
      { title: 'vault-delete', icon: SampleSmallIcon },
    ],
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(event.target.value, value),
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const WithIconLabelSublabelInOption = () => {
  const props = {
    options: [
      { title: 'secret-create', icon: SampleLargeIcon },
      { title: 'secret-delete', icon: SampleLargeIcon },
      { title: 'secret-update', icon: SampleLargeIcon },
      { title: 'vault-create', icon: SampleLargeIcon },
      { title: 'vault-update', icon: SampleLargeIcon },
      { title: 'vault-delete', icon: SampleLargeIcon },
    ],
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    getOptionLabel: (option) => {
      return option.title;
    },
    getOptionSublabel: (option) => {
      return option.title;
    },
    getOptionIcon: (option) => {
      return option.icon;
    },
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const WithLabelSublabelInOption = () => {
  const props = {
    options: [
      { title: 'secret-create' },
      { title: 'secret-delete' },
      { title: 'secret-update' },
      { title: 'vault-create' },
      { title: 'vault-update' },
      { title: 'vault-delete' },
    ],
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    getOptionLabel: (option) => {
      return option.title;
    },
    getOptionSublabel: (option) => {
      return option.title;
    },
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const WithIconLabelInOption = () => {
  const props = {
    options: [
      { title: 'secret-create', icon: SampleSmallIcon },
      { title: 'secret-delete', icon: SampleSmallIcon },
      { title: 'secret-update', icon: SampleSmallIcon },
      { title: 'vault-create', icon: SampleSmallIcon },
      { title: 'vault-update', icon: SampleSmallIcon },
      { title: 'vault-delete', icon: SampleSmallIcon },
    ],
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    getOptionIcon: function (option) {
      return option.icon;
    },
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const Disabled = () => {
  let options = [
    { title: 'secret-create', icon: SampleSmallIcon },
    { title: 'secret-delete', icon: SampleSmallIcon },
    { title: 'secret-update', icon: SampleSmallIcon },
    { title: 'vault-create', icon: SampleSmallIcon },
    { title: 'vault-update', icon: SampleSmallIcon },
    { title: 'vault-delete', icon: SampleSmallIcon },
  ];
  const props = {
    options: options,
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    disabled: true,
    readOnly: false,
    value: options.slice(1, 3),
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const ReadOnly = () => {
  let options = [
    { title: 'secret-create', icon: SampleSmallIcon },
    { title: 'secret-delete', icon: SampleSmallIcon },
    { title: 'secret-update', icon: SampleSmallIcon },
    { title: 'vault-create', icon: SampleSmallIcon },
    { title: 'vault-update', icon: SampleSmallIcon },
    { title: 'vault-delete', icon: SampleSmallIcon },
  ];
  const props = {
    options: options,
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(value),
    getOptionLabel: (option) => option.title,
    readOnly: true,
    value: options.slice(0, 3),
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const Error = () => {
  let options = [
    { title: 'secret-create', icon: SampleSmallIcon },
    { title: 'secret-delete', icon: SampleSmallIcon },
    { title: 'secret-update', icon: SampleSmallIcon },
    { title: 'vault-create', icon: SampleSmallIcon },
    { title: 'vault-update', icon: SampleSmallIcon },
    { title: 'vault-delete', icon: SampleSmallIcon },
  ];
  const props = {
    options: options,
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    value: options.slice(3, 5),
    error: true,
    errorMessage: "Vault Related actions can't be added",
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const SingleSelectAutocomplete = () => {
  const props = {
    options: [
      { title: 'secret-create', icon: SampleSmallIcon },
      { title: 'secret-delete', icon: SampleSmallIcon },
      { title: 'secret-update', icon: SampleSmallIcon },
      { title: 'vault-create', icon: SampleSmallIcon },
      { title: 'vault-update', icon: SampleSmallIcon },
      { title: 'vault-delete', icon: SampleSmallIcon },
    ],
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const DisabledSingleSelectAutocomplete = () => {
  let options = [
    { title: 'secret-create', icon: SampleSmallIcon },
    { title: 'secret-delete', icon: SampleSmallIcon },
    { title: 'secret-update', icon: SampleSmallIcon },
    { title: 'vault-create', icon: SampleSmallIcon },
    { title: 'vault-update', icon: SampleSmallIcon },
    { title: 'vault-delete', icon: SampleSmallIcon },
  ];
  const props = {
    options: options,
    value: [options[1]],
    disabled: true,
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const ReadOnlySingleSelectAutocomplete = () => {
  let options = [
    { title: 'secret-create', icon: SampleSmallIcon },
    { title: 'secret-delete', icon: SampleSmallIcon },
    { title: 'secret-update', icon: SampleSmallIcon },
    { title: 'vault-create', icon: SampleSmallIcon },
    { title: 'vault-update', icon: SampleSmallIcon },
    { title: 'vault-delete', icon: SampleSmallIcon },
  ];
  const props = {
    options: options,
    value: [options[1]],
    readOnly: true,
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    placeholder: 'Enter text',
  };
  return <Autocomplete {...props} />;
};

export const SingleSelectPortalToggle = () => {
  const [disablePortal, setDisablePortal] = useState(false);
  const props = {
    options: [
      { title: 'secret-create', icon: SampleSmallIcon },
      { title: 'secret-delete', icon: SampleSmallIcon },
      { title: 'secret-update', icon: SampleSmallIcon },
      { title: 'vault-create', icon: SampleSmallIcon },
      { title: 'vault-update', icon: SampleSmallIcon },
      { title: 'vault-delete', icon: SampleSmallIcon },
    ],
    width: '300px',
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => console.log(value),
    onChange: (event, value) => console.log(value),
    placeholder: 'Enter text',
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
        <Autocomplete {...props} />
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

export const MultiSelectPortalToggle = () => {
  const [disablePortal, setDisablePortal] = useState(false);
  const props = {
    options: [
      { title: 'secret-create', icon: SampleSmallIcon },
      { title: 'secret-delete', icon: SampleSmallIcon },
      { title: 'secret-update', icon: SampleSmallIcon },
      { title: 'vault-create', icon: SampleSmallIcon },
      { title: 'vault-update', icon: SampleSmallIcon },
      { title: 'vault-delete', icon: SampleSmallIcon },
    ],
    width: '512px',
    multiple: true,
    label: 'Actions',
    helperText: 'Choose actions for Permission',
    onInputChange: (event, value) => console.log(event.target.value, value),
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title;
    },
    placeholder: 'Enter text',
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
        <Autocomplete {...props} />
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
