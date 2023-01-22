/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import moment from 'moment';
import NotificationCard from './notification-card';

const notificationMessage = <span>Dummy text</span>;

const props = {
  notificationTitle: 'Secrets Manager',
  notificationTime: new Date().toUTCString(),
  notificationMessage: notificationMessage,
  primaryActionLabel: 'Remove',
  primaryActionHandler: jest.fn(),
  secondaryActionLabel: 'Review Request',
  secondaryActionHandler: jest.fn(),
};

describe('notification card test cases', () => {
  it('notificationTitle passed as a props appears on the screen', () => {
    const { getByText } = render(<NotificationCard {...props} />);
    expect(getByText(props.notificationTitle)).toBeInTheDocument();
  });

  it('notificationTime passed as a props appears on the screen', () => {
    const { getByText } = render(<NotificationCard {...props} />);
    const date = moment(props.notificationTime);

    //Converting Time to the appropriate format
    const time = date.format('h:mm A');

    expect(getByText(time)).toBeInTheDocument();
  });

  it('notificationMessage passed as a props appears on the screen', () => {
    const { getByText } = render(<NotificationCard {...props} />);
    expect(getByText('Dummy text')).toBeInTheDocument();
  });

  it('primaryActionLabel passed as a props appears on the screen', () => {
    const { getByRole } = render(<NotificationCard {...props} />);
    const primaryButton = getByRole('button', { name: props.primaryActionLabel });
    expect(primaryButton).toBeInTheDocument();
  });

  it('primaryActionHandler called once on click of primary button', () => {
    const { getByRole } = render(<NotificationCard {...props} />);
    const primaryButton = getByRole('button', { name: props.primaryActionLabel });
    fireEvent.click(primaryButton);
    expect(props.primaryActionHandler).toBeCalledTimes(1);
  });

  it('secondaryActionLabel passed as a props appears on the screen', () => {
    const { getByRole } = render(<NotificationCard {...props} />);
    const secondaryButton = getByRole('button', { name: props.secondaryActionLabel });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('secondaryActionHandler called once on click of secondary button', () => {
    const { getByRole } = render(<NotificationCard {...props} />);
    const secondaryButton = getByRole('button', { name: props.secondaryActionLabel });
    fireEvent.click(secondaryButton);
    expect(props.secondaryActionHandler).toBeCalledTimes(1);
  });
});
