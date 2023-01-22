import { useState } from 'react';
import Button from '../button';
import RadioGroup from './radio';

export default {
  title: 'design-components/RadioButton',
  component: RadioGroup,
  argTypes: {
    options: [],
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

const RadioGroupTemplate = (args) => <RadioGroup {...args} />;
export const RadioButtonGroup = RadioGroupTemplate.bind({});
RadioButtonGroup.args = {
  label: 'Gender',
  name: 'gender',
  defaultValue: 'male',
  options: [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
      disabled: false,
    },
    {
      label: 'Other',
      value: 'other',
      disabled: true,
    },
  ],
  direction: 'horizontal',
};

RadioButtonGroup.args.onChange = function (event) {
  event.preventDefault();
  console.log(event.target.value);
};

export const RadioButtonReset = () => {
  const [value, setValue] = useState('male');

  const props = {
    label: 'Gender',
    name: 'gender',
    defaultValue: value,
    options: [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
        disabled: false,
      },
      {
        label: 'Other',
        value: 'other',
        disabled: true,
      },
    ],
    direction: 'horizontal',
    onChange: (event) => {
      event.preventDefault();
      console.log(event.target.value);
      setValue(event.target.value);
    },
  };
  return (
    <>
      <RadioGroup {...props} />
      <Button size="large" onClick={() => setValue('male')}>
        {' '}
        Reset{' '}
      </Button>
    </>
  );
};
