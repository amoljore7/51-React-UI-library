/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ModalPopup from './modal-popup';

const okHandler = jest.fn();
const cancelHandler = jest.fn();
const props = {
  width: 464,
  title: 'Add Permission',
  onCancel: jest.fn(),
  buttons: [
    {
      text: 'Ok',
      type: 'primary',
      onClick: okHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      type: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
    {
      text: 'Cancel',
      type: 'secondary',
      onClick: cancelHandler,
      size: 'large',
    },
  ],
};

describe('modal popup test cases', () => {
  it('Title passed as a prop appears on the screen', () => {
    const { getByText } = render(<ModalPopup {...props} />);
    expect(getByText(props.title)).toBeInTheDocument();
  });
  it('buttons passed as props appear on the screen', () => {
    const { getAllByRole } = render(<ModalPopup {...props} />);
    expect(getAllByRole('button').length).toEqual(3);
  });
  it('onCancel is called on clicking cross icon', () => {
    const { getByRole } = render(<ModalPopup {...props} />);
    const crossIcon = getByRole('cross-icon');
    fireEvent.click(crossIcon);
    expect(props.onCancel).toBeCalled();
  });
});
