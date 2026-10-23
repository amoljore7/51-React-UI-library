import React, { useState } from 'react'
import Button from '../button'
import RadioGroup from './radio'

const defaultOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other', disabled: true },
]

export default {
  title: 'design-components/RadioButton',
  component: RadioGroup,
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    defaultValue: { control: 'text' },
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    options: { control: 'object' },
  },
}

function InteractiveRadio(args) {
  const [value, setValue] = useState(args.defaultValue ?? '')
  return (
    <RadioGroup
      {...args}
      defaultValue={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

export const Horizontal = {
  args: {
    label: 'Gender',
    name: 'gender',
    defaultValue: 'male',
    options: defaultOptions,
    direction: 'horizontal',
  },
  render: args => <InteractiveRadio {...args} />,
}

export const Vertical = {
  args: {
    label: 'Choose one',
    name: 'choice',
    defaultValue: 'a',
    options: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
    ],
    direction: 'vertical',
  },
  render: args => <InteractiveRadio {...args} />,
}

export const NoGroupLabel = {
  args: {
    name: 'no-label',
    defaultValue: 'second',
    options: [
      { label: 'First', value: 'first' },
      { label: 'Second', value: 'second' },
      { label: 'Third', value: 'third' },
    ],
    direction: 'horizontal',
  },
  render: args => <InteractiveRadio {...args} />,
}

export const WithDisabledOptions = {
  args: {
    label: 'Status',
    name: 'status',
    defaultValue: 'active',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive', disabled: true },
      { label: 'Pending', value: 'pending', disabled: true },
    ],
    direction: 'horizontal',
  },
  render: args => <InteractiveRadio {...args} />,
}

export const DefaultValueUnselected = {
  args: {
    label: 'Select one',
    name: 'default-unset',
    defaultValue: '',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    direction: 'horizontal',
  },
  render: args => <InteractiveRadio {...args} />,
}

export const DarkTheme = {
  render: args => (
    <div
      data-theme="dark"
      style={{
        padding: '24px',
        background: '#0a0b2e',
        borderRadius: '8px',
      }}
    >
      <InteractiveRadio {...args} />
    </div>
  ),
  args: {
    label: 'Theme',
    name: 'theme-dark',
    defaultValue: 'light',
    options: [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
      { label: 'System', value: 'system' },
    ],
    direction: 'horizontal',
  },
}

export const WithReset = () => {
  const [value, setValue] = useState('male')
  return (
    <>
      <RadioGroup
        label="Gender"
        name="gender-reset"
        defaultValue={value}
        options={defaultOptions}
        direction="horizontal"
        onChange={e => setValue(e.target.value)}
      />
      <Button size="large" onClick={() => setValue('male')} style={{ marginTop: 12 }}>
        Reset to Male
      </Button>
    </>
  )
}
