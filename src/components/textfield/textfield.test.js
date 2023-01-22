/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Textfield from './textfield';

describe.only('Unit tests for Textfield component', () => {
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: '',
    placeholder: 'Placeholder...',
    disabled: false,
    readOnly: false,
    error: false,
    errorMsg: 'Error Message Here',
    width: '200px',
    onChange: jest.fn(),
  };

  it('Label passed in the props appears on the screen', () => {
    const { getByText } = render(<Textfield {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
  });
  it('Helper text passed in the props appears on the screen', () => {
    const { getByText } = render(<Textfield {...props} />);
    expect(getByText(props.helperText)).toBeInTheDocument();
  });

  it('Placeholder passed in the props appears on the screen', () => {
    const { queryAllByPlaceholderText } = render(<Textfield {...props}/>);
    expect(queryAllByPlaceholderText(props.placeholder)).toBeTruthy();
  });

  it('OnChange passed in the props', () => {
    const { getByTestId } = render(<Textfield {...props} />);
    const onChanageText = getByTestId('input-test-id');
    fireEvent.click(onChanageText);
    expect(props.onChange).toBeCalled;
  });

  it('ReadOnly passed as a props appears on the screen', () => {
    const updatedProps = { ...props, readOnly: true };
    const { getByTestId } = render(<Textfield {...updatedProps} />);
    expect(getByTestId('input-test-id')).toBeEnabled;
  });

  it('Disabled passed as a props appears on the screen', () => {
    const { getByTestId } = render(<Textfield {...props} />);
    expect(getByTestId('input-test-id').disabled).toEqual(props.disabled);
  });

  it('Width passed as a props appears on the screen', () => {
    const updatedProps = { ...props, with: '200px' };
    const { getByTestId } = render(<Textfield {...updatedProps} />);
    expect(getByTestId('input-test-id')).toBeInTheDocument();
  });

  it('Type passed as a props appears on the screen', () => {
    const updatedProps = { ...props, type: 'text' };
    const { getByTestId } = render(<Textfield {...updatedProps} />);
    expect(getByTestId('input-test-id')).toBeInTheDocument();
  });

  it('Error passed as  props appears on the screen', () => {
    const updatedProps = { ...props, error: false };
    const { getByTestId } = render(<Textfield {...updatedProps} />);
    expect(getByTestId('input-test-id')).toBeFalsy;
  });
});
