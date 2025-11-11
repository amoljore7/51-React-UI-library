/* eslint-disable no-undef */
import Pill from './pill';
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, getAllByTestId } from '@testing-library/react';

describe('pill test cases', () => {
  it('label appears on the screen', () => {
    const props = {
      label: 'Britive',
    };
    const { getByText } = render(<Pill {...props} />);
    expect(getByText(props.label)).toBeInTheDocument();
  });
  it('onDelete is called on clicking Icon', () => {
    const props = {
      label: 'Britive',
      onDelete: jest.fn(),
    };
    const { getByTestId } = render(<Pill {...props} />);
    const closeIcon = getByTestId('pill-close-icon');
    fireEvent.click(closeIcon);
    expect(props.onDelete).toBeCalled();
  });
  it('disabled Pill will have no iteractions', () => {
    const props = {
      disabled: true,
      label: 'Britive',
      onDelete: jest.fn(),
    };
    const { getByTestId } = render(<Pill {...props} />);
    const closeIcon = getByTestId('pill-close-icon');
    fireEvent.click(closeIcon);
    expect(props.onDelete).toHaveBeenCalledTimes(0);
  });
  it('readOnly Pill has no close Icon', () => {
    const props = {
      readOnly: true,
      label: 'Britive',
    };
    const { queryByTestId } = render(<Pill {...props} />);
    const closeIcon = queryByTestId('pill-close-icon');
    expect(closeIcon).toEqual(null);
  });
});
