import React, { useState } from 'react';
import Notification from './notification.jsx';

export default {
  title: 'design-components/Notification',
  component: Notification,
};
export const General = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  const props = {
    type: 'general',
    title: 'This is a general message',
    open: isOpen,
    onClose: closeHandler,
  };
  return <Notification {...props} />;
};

export const Success = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  const props = {
    type: 'success',
    title: 'This is a success message',
    open: isOpen,
    onClose: closeHandler,
  };
  return <Notification {...props} />;
};

export const Error = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  const props = {
    type: 'error',
    title: 'This is an error message',
    open: isOpen,
    onClose: closeHandler,
  };
  return <Notification {...props} />;
};

export const Warning = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  const props = {
    type: 'warning',
    title: 'This is an alert message',
    open: isOpen,
    onClose: closeHandler,
  };
  return <Notification {...props} />;
};

export const Link = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <Notification
      type='warning'
      open={isOpen}
      onClose={closeHandler}
      title={
        <>
          This is a notification with link. Go to{' '}
          <a href='https://storybook.js.org/' target='_blank'>
            Settings
          </a>{' '}
          page
        </>
      }
    />
  );
};

export const AutoDismiss = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeHandler = () => {
    setIsOpen(false);
  };
  const props = {
    type: 'general',
    title: 'This is a general message',
    duration: 3000,
    open: isOpen,
    onClose: closeHandler,
  };
  return <Notification {...props} />;
};

export const inPlaceNotification = () => {
  // use this to show notification in a container

  const [open, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    open && (
      <div style={{ position: 'absolute', width: '60vh' }}>
        <Notification
          {...{
            type: 'warning',
            title: 'Some warning message.',
            open,
            inPlace: true,
          }}
        />
      </div>
    )
  );
};
