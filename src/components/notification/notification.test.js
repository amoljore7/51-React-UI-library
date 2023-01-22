/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notification from './notification';
import { typeToClass } from './constants';

describe('Unit tests for Notification component', () => {
  const infoType = 'general';
  const successType = 'success';
  const errorType = 'error';
  const warningType = 'warning';

  it('Title passed in the props appears on the screen', () => {
    const props = {
      title: 'Submit Error',
      onClose: () => {},
      open: true,
    };
    const { getByText } = render(<Notification {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('Check General Notification', () => {
    const { container } = render(<Notification type={infoType} onClose={() => {}} open={true} />);
    expect(container.firstChild.firstChild.classList.contains(typeToClass.general)).toBe(true);
  });

  it('Check Success Notification', () => {
    const { container } = render(
      <Notification type={successType} onClose={() => {}} open={true} />
    );
    expect(container.firstChild.firstChild.classList.contains(typeToClass.success)).toBe(true);
  });

  it('Check Error Notification', () => {
    const { container } = render(<Notification type={errorType} onClose={() => {}} open={true} />);
    expect(container.firstChild.firstChild.classList.contains(typeToClass.error)).toBe(true);
  });

  it('Check Warning Notification', () => {
    const { container } = render(
      <Notification type={warningType} onClose={() => {}} open={true} />
    );
    expect(container.firstChild.firstChild.classList.contains(typeToClass.warning)).toBe(true);
  });
});
