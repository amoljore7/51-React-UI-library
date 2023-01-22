/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DialogPopup from './dialog';

const props = {
  type: 'general',
  width: 464,
  height: 278,
  title: 'Title',
  message: 'Message here',
  primaryButtonText: 'OK',
  secondaryButtonText: 'Cancel',
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
};

describe('dialog popup test cases', () => {
  it('Type passed as a props appears on the screen', () => {
    const { getByRole } = render(<DialogPopup {...props} />);
    expect(getByRole('popup-strap').style.backgroundColor).toEqual(
      'rgb(6, 127, 219)'
    );
  });

  it('Width passed as a props appears on the screen', () => {
    const { getByRole } = render(<DialogPopup {...props} />);
    expect(getByRole('dialog-popup').style.width).toEqual(`${props.width}px`);
  });

  it('Height passed as a props appears on the screen', () => {
    const { getByRole } = render(<DialogPopup {...props} />);
    expect(getByRole('dialog-popup').style.height).toEqual(`${props.height}px`);
  });

  it('Title passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });

  it('Message passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />);
    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('PrimaryButtonText passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />);
    expect(getByText(props.primaryButtonText)).toBeInTheDocument();
  });

  it('SecondaryButtonText passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />);
    expect(getByText(props.secondaryButtonText)).toBeInTheDocument();
  });
});
