/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Snackbar from './snackbar';

describe('Unit tests for Snackbar component', () => {
  let errorList = [
    '- This is a error list toast component.',
    '- This is a error list toast component.',
    '- This is a error list toast component.',
  ];

  it('Title passed in the props appears on the screen', () => {
    const props = {
      title: 'Submit Error',
    };
    const { getByText } = render(<Snackbar {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('form error list passed in the props appears on the screen', () => {
    const props = {
      errorList: errorList,
    };
    const { getAllByTestId } = render(<Snackbar {...props} />);
    expect(getAllByTestId('errorItem').length).toEqual(3);
  });
});
