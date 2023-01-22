/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './select';
import '@testing-library/jest-dom';

describe.only('Select dropdown test cases', () => {
  it('label and helper text appear on the screen', () => {
    const props = {
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      placeholder: 'Choose An Option',
      getOptionLabel: (option) => option.title,
      onChange: jest.fn(),
    };
    const { getByText } = render(<Select {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
    expect(getByText(props.helperText)).toBeInTheDocument();
    expect(getByText(props.placeholder)).toBeInTheDocument();
  });
  it('onChange is called when user select an option', () => {
    const props = {
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      placeholder: 'Choose An Option',
      getOptionLabel: (option) => option.title,
      onChange: jest.fn(),
    };
    const { getByTestId, getAllByRole } = render(<Select {...props} />);
    const selectElement = getByTestId('select-value');
    fireEvent.click(selectElement);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
  it('value passed through prop appears on the screen', () => {
    const props = {
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      placeholder: 'Choose An Option',
      getOptionLabel: (option) => option.title,
      onChange: jest.fn(),
      value: { title: 'secret-update' },
    };
    const { getByText } = render(<Select {...props} />);
    expect(getByText(props.value.title)).toBeInTheDocument();
  });
  it('disabled select will not trigger onchange event', () => {
    const props = {
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      disabled: true,
      placeholder: 'Choose An Option',
      getOptionLabel: (option) => option.title,
      onChange: jest.fn(),
      value: { title: 'secret-update' },
    };
    const { getByTestId, queryAllByRole } = render(<Select {...props} />);
    const selectElement = getByTestId('select-value');
    fireEvent.click(selectElement);
    const options = queryAllByRole('option');
    expect(options.length).toEqual(0);
  });
});
