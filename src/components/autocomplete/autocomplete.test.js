/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Autocomplete from './autocomplete';
import '@testing-library/jest-dom';

describe('Autocomplete test cases', () => {
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
      onInputChange: jest.fn(),
      onChange: jest.fn(),
      getOptionLabel: (option) => option.title,
    };
    const { getByText } = render(<Autocomplete {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
    expect(getByText(props.helperText)).toBeInTheDocument();
  });
  it('onInputChange is called when user types in the input', () => {
    const props = {
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      onInputChange: jest.fn(),
      onChange: jest.fn(),
      getOptionLabel: (option) => option.title,
    };
    const { getByRole } = render(<Autocomplete {...props} />);
    const inputEl = getByRole('textbox');
    fireEvent.change(inputEl, { target: { value: 'secret' } });
    expect(props.onInputChange).toHaveBeenCalled();
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
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { getByRole, getAllByRole } = render(<Autocomplete {...props} />);
    const inputEl = getByRole('textbox');
    fireEvent.click(inputEl);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
  it('pills and input appear on the screen', () => {
    const props = {
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      multiple: true,
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      value: [{ title: 'secret-create' }, { title: 'secret-update' }],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { getAllByTestId, getByRole } = render(<Autocomplete {...props} />);
    expect(getAllByTestId('pill-wrapper').length).toEqual(2);
    expect(getByRole('textbox')).toBeInTheDocument();
  });
  it('corresponding options appear in suggestions on changing the value in input', () => {
    const props = {
      multiple: true,
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { getAllByRole, getByRole } = render(<Autocomplete {...props} />);
    const inputEl = getByRole('textbox');
    fireEvent.change(inputEl, { target: { value: 'secret' } });
    expect(getAllByRole('option').length).toEqual(2);
  });
  it('disabled autocomplete will not have input element', () => {
    const props = {
      multiple: true,
      disabled: true,
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { queryByRole } = render(<Autocomplete {...props} />);
    expect(queryByRole('textbox')).toEqual(null);
  });
  it('selected options appear in the box while remaining options appear in the suggestions list', () => {
    const props = {
      multiple: true,
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { getAllByRole, getAllByTestId, getByRole } = render(<Autocomplete {...props} />);
    const inputEl = getByRole('textbox');
    fireEvent.click(inputEl);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);
    fireEvent.click(inputEl);
    const secondOption = getAllByRole('option')[0];
    fireEvent.click(secondOption);
    expect(getAllByTestId('pill-wrapper').length).toEqual(2);
    fireEvent.click(inputEl);
    expect(getAllByRole('option').length).toEqual(2);
  });
  it('icon in option will not be present if getOptionsIcon is not defined', () => {
    const props = {
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { queryByRole, getByRole } = render(<Autocomplete {...props} />);
    const inputEl = getByRole('textbox');
    fireEvent.click(inputEl);
    expect(
      queryByRole('img', {
        name: 'secret-create' | 'secret-update' | 'vault-create' | 'vault-update',
      })
    ).toEqual(null);
  });
  it('read only autocomplete will have no images and input element', () => {
    const props = {
      multiple: true,
      readOnly: true,
      label: 'Actions',
      helperText: 'Choose actions for Permission',
      options: [
        { title: 'secret-create' },
        { title: 'secret-update' },
        { title: 'vault-create' },
        { title: 'vault-update' },
      ],
      getOptionLabel: (option) => option.title,
      onInputChange: jest.fn(),
      onChange: jest.fn(),
    };
    const { queryByRole } = render(<Autocomplete {...props} />);
    expect(queryByRole('textbox')).toEqual(null);
    expect(queryByRole('img')).toEqual(null);
  });
});
