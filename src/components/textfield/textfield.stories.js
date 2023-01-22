import React, { useState } from 'react';
import Textfield from './textfield';
import { FiEye, FiEyeOff, FiSquare } from 'react-icons/fi';

export default {
  title: 'design-components/Textfield',
  component: Textfield,
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
    type: 'text',
    value: value,
    placeholder: 'Placeholder...',
    width: '200px',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const DefaultWithIcon = () => {
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
    width: '200px',
    icon: <FiSquare size="24" />,
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const Inline = () => {
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
    width: '200px',
    variant: 'inline',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const InlineWithIcon = () => {
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
    variant: 'inline',
    icon: <FiSquare size="24" />,
    width: '200px',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};
export const NakedWithIcon = () => {
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
    width: '200px',
    variant: 'naked',
    icon: <FiSquare size="24" />,
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};
export const Naked = () => {
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
    width: '200px',
    variant: 'naked',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const Disabled = () => {
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
    width: '200px',
    disabled: true,
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const ReadonlyWithLongText = () => {
  const [value, setValue] = useState('Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');

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
    width: '200px',
    readOnly: true,
    variant: 'naked',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
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
    width: '200px',
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const ErrorWithIcon = () => {
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
    width: '200px',
    icon: <FiSquare size="24" />,
    onChange: onChangeHandler,
  };
  return <Textfield {...props} />;
};

export const Password = () => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    const value1 = e.target.value;
    setValue(value1);
  };
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    type: showPassword ? 'text' : 'password',
    value: value,
    placeholder: 'Placeholder...',
    disabled: false,
    error: false,
    errorMsg: 'Error Message Here',
    width: '200px',
    icon: showPassword ? <FiEye size="24" /> : <FiEyeOff size="24" />,
    onChange: onChangeHandler,
    onIconClick: handleClickShowPassword,
  };
  return <Textfield {...props} />;
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
      <Textfield
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
