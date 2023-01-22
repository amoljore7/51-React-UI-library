/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import VerticalTabs from './verticalTabs';

describe('Unit tests for vertical tab component', () => {
  const props = {
    value: 0,
    handleChange: jest.fn(),
    items: [
      { title: 'Page One' },
      { title: 'Page Two' },
      { title: 'Page Three' },
      { title: 'Page Four' },
    ],
  };

  it('tabs passed as prop appear on the screen', () => {
    const { getAllByRole } = render(<VerticalTabs {...props} />);
    const allLiItems = getAllByRole('listitem');
    expect(allLiItems.length).toEqual(4);
  });

  it('handleChange is called on clicking any tab', () => {
    const { getAllByRole } = render(<VerticalTabs {...props} />);
    const allLiItems = getAllByRole('listitem');
    const secondItem = allLiItems[1];
    fireEvent.click(secondItem);
    expect(props.handleChange).toBeCalledTimes(1);
  });
});
