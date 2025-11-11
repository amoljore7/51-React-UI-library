/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import SimpleSidebar from './';

describe('Unit tests for Simple Sidebar component', () => {
  it('children passed within sidebar should appears on the screen', () => {
    const { getByText } = render(<SimpleSidebar isOpen={true}>Hello</SimpleSidebar>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it('onToggle should be called on click of toggle button', () => {
    const onToggle = jest.fn();
    const { getByText, getByTestId } = render(<SimpleSidebar isOpen={true} onToggle={onToggle}>Hello</SimpleSidebar>);
    expect(getByText("Hello")).toBeInTheDocument();
    fireEvent.click(getByTestId("toggle"))
    expect(onToggle).toHaveBeenCalled()
  });

  it('should not render children whenn isOpen is false', () => {
    const onToggle = jest.fn();
    const { queryByText } = render(<SimpleSidebar isOpen={false}>Hello</SimpleSidebar>);
    expect(queryByText("Hello")).not.toBeInTheDocument();
  });
});
