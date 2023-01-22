/* eslint-disable no-undef */
import OverflowMenu from './overflow-menu';
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

describe('overflow-menu test cases', () => {
  let options = [
    { title: 'Open' },
    { title: 'Add New Node' },
    { title: 'Rename' },
    { separator: true },
    { title: 'Delete' },
    { title: 'Add Secret' },
    { title: 'Add policy' },
    { separator: true },
    { title: 'View Policy' },
  ];
  it('icon appears on the screen', () => {
    const props = {
      options: options,
      onChange: jest.fn(),
      getOptionLabel: jest.fn(),
      width: '300px',
    };
    const { getByTestId } = render(<OverflowMenu {...props} />);
    expect(getByTestId('icon-wrapper')).toBeInTheDocument();
  });
  it('all options appear on screen when user clicks the icon', () => {
    const props = {
      options: options,
      onChange: jest.fn(),
      getOptionLabel: jest.fn(),
      width: '300px',
    };
    const { getByTestId, getAllByRole } = render(<OverflowMenu {...props} />);
    const iconWrapper = getByTestId('icon-wrapper');
    fireEvent.click(iconWrapper);
    expect(getAllByRole('option').length).toEqual(9);
  });
  it('onChange is called when user selects an option', () => {
    const props = {
      options: options,
      onChange: jest.fn(),
      getOptionLabel: jest.fn(),
      width: '300px',
    };
    const { getByTestId, getAllByRole } = render(<OverflowMenu {...props} />);
    const iconWrapper = getByTestId('icon-wrapper');
    fireEvent.click(iconWrapper);
    const firstOption = getAllByRole('option')[0];
    fireEvent.click(firstOption);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
