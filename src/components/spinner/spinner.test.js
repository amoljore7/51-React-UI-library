/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Spinner from './spinner';
import { classes } from './constants';

const props = {
  size: 'medium',
  message: 'Loading Message...',
  overlay: true,
};

describe('Spinner test cases', () => {
  it('Size passed as a props appears on the screen', () => {
    const { getByTestId } = render(<Spinner {...props} />);
    expect(getByTestId(classes.loader).classList.contains(classes.mediumLoader)).toBe(true);
  });

  it('Message passed as a props appears on the screen', () => {
    const { getByText } = render(<Spinner {...props} />);
    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('Overlay passed as a props appears on the screen', () => {
    const { getByTestId } = render(<Spinner {...props} />);
    expect(getByTestId(classes.loaderOverlay).classList.contains(classes.loaderOverlay)).toBe(true);
  });
});
