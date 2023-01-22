/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import RadioGroup from './radio';

import selectedRadio from '../../assets/icons/enabled-selected-radio.svg';

const props = {
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
  onChange: jest.fn(),
};

describe('radio button test cases', () => {
  it('Label passed as a props appears on the screen', () => {
    const { getByText } = render(<RadioGroup {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
  });

  it('Name passed in the props', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />);
    const radioButtons = getAllByRole('radio');
    for (let i = 0; i < radioButtons.length; i++) {
      expect(radioButtons[i].name).toEqual(props.name);
    }
  });

  it('DefaultValue passed in the props', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />);
    const radioButtons = getAllByRole('radio');
    let checkedRadioButtonIndex;
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].value === props.defaultValue) {
        checkedRadioButtonIndex = i;
        return;
      }
    }
    expect(getAllByRole('img')[checkedRadioButtonIndex].src).toEqual(
      selectedRadio
    );
  });

  it('Options passed as a props appears on the screen', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />);
    const radioButtons = getAllByRole('radio');

    expect(radioButtons.length).toEqual(props.options.length);
  });

  it('Directions passed as a props appears on the screen', () => {
    const { getByTestId } = render(<RadioGroup {...props} />);
    const radioGroup = getByTestId('radio-group');

    expect(radioGroup.classList.contains('horizontal-align')).toBe(true);
  });

  it('onChange passed in the props', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />);
    let radioField = getAllByRole('radio')[0];
    fireEvent.click(radioField);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
