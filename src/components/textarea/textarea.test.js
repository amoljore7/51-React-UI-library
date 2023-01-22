/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Textarea from './textarea';


describe('Unit tests for Textarea component', () => {
  const props = {
    label: 'Label',
    helperText: 'Sub Label',
    value: '',
    placeholder: 'Placeholder...',
    disabled: false,
    readOnly: false,
    error: false,
    errorMsg: 'Error Message Here',
    width: '300px',
    onChange: jest.fn(),
  };

  it('Label passed in the props appears on the screen', () => {
    const { getByText } = render(<Textarea {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
  });
  it('Helper text passed in the props appears on the screen', () => {
    const { getByText } = render(<Textarea {...props} />);
    expect(getByText(props.helperText)).toBeInTheDocument();
  });

  it('Placeholder passed in the props appears on the screen', () => {
    const { queryAllByPlaceholderText } = render(<Textarea {...props}/>);
    expect(queryAllByPlaceholderText(props.placeholder)).toBeTruthy();
  });

  it('ReadOnly passed as a props appears on the screen', () => {
    const updatedProps = { ...props, readOnly: true };
    const { getByTestId } = render(<Textarea {...updatedProps} />);
    expect(getByTestId('textarea-test-id')).toBeEnabled;
  });

  it('Disabled passed as a props appears on the screen', () => {
    const { getByTestId } = render(<Textarea {...props} />);
    expect(getByTestId('textarea-test-id').disabled).toEqual(props.disabled);
  });

  it('Width passed as a props appears on the screen', () => {
    const updatedProps = { ...props, with: '200px' };
    const { getByTestId } = render(<Textarea {...updatedProps} />);
    expect(getByTestId('textarea-test-id')).toBeInTheDocument();
  });

  it('Type passed as a props appears on the screen', () => {
    const updatedProps = { ...props, type: 'text' };
    const { getByTestId } = render(<Textarea {...updatedProps} />);
    expect(getByTestId('textarea-test-id')).toBeInTheDocument();
  });

  it('Error passed as  props appears on the screen', () => {
    const updatedProps = { ...props, error: false };
    const { getByTestId } = render(<Textarea {...updatedProps} />);
    expect(getByTestId('textarea-test-id')).toBeFalsy;
  });
});
