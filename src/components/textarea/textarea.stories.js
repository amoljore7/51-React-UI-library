import React, { useState } from 'react';
import Textarea from './textarea';

export default {
  title: 'design-components/Textarea',
  component: Textarea,
};

export const Default = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};

export const Readonly = () => {
  const [value, setValue] = useState(
    'A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.'
  );

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    variant: 'naked',
    readOnly: true,
    width: '300px',
    height: '104px',
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};

export const Error = () => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    error: true,
    errorMsg: 'Error Message Here',
    width: '300px',
    height: '104px',
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};

export const Scroll = () => {
  const [value, setValue] = useState(
    'A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.'
  );

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};

export const FullWidth = () => {
  const [value, setValue] = useState(
    'A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.'
  );

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};
export const Disabled = () => {
  const [value, setValue] = useState(
    'A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.'
  );

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
  };
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    width: '300px',
    height: '104px',
    disabled: true,
    onChange: onChangeHandler,
  };
  return <Textarea {...props} />;
};

export const OnBlur = () => {
  const [blurLable, setBlurLabel] = useState('');
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target.value;
    setValue(value);
    setBlurLabel('');
  };

  const onBlurHandler = () => {
    setBlurLabel('Triggered because this input lost focus');
  };
  const onFocusHandler = () => {
    setBlurLabel('');
  };

  return (
    <>
      <Textarea
        label="Enter Name"
        name="name"
        type="text"
        value={value}
        width="400px"
        placeholder="Enter vault name"
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
      <label>{blurLable && blurLable}</label>
    </>
  );
};
