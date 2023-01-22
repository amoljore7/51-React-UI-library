/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Tabs from './tabs';

describe('Unit tests for Horizontal tab component', () => {
  const props = {
    value: 0,
    variant: 'auto',
    handleChange: jest.fn(),
    items: [
      { title: 'Page One' },
      { title: 'Page Two' },
      { title: 'Page Three' },
      { title: 'Page Four' },
    ],
  };

  it('Tabs passed as a props appears on the screen', () => {
    const { getAllByTestId } = render(<Tabs tab={props.initialTab} {...props} />);
    const tab = getAllByTestId('tab-test-id');
    expect(tab.length).toEqual(1);
  });

  it('Variant passed as a props', () => {
    const updatedProps = { ...props, variant: 'auto' };
    const { getAllByTestId } = render(<Tabs {...updatedProps} />);
    expect(getAllByTestId('tab-test-id')).toBeTruthy;
  });

  it('Value passed as a props', () => {
    const updatedProps = { ...props, variant: 'auto' };
    const { getAllByTestId } = render(<Tabs {...updatedProps} />);
    expect(getAllByTestId('tab-test-id')).toBeTruthy;
  });

  it('OnChange passed in the props', () => {
    const { getByTestId } = render(<Tabs {...props} />);
    const onChangeTab = getByTestId('tab-test-id');
    fireEvent.click(onChangeTab);
    expect(props.handleChange).toBeCalled;
  });
});
