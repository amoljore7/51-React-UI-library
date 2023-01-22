import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ButtonGroup from './buttonGroup';
import Button from '../button';

const getButtonGroupElements = () => {
  return (
    <ButtonGroup size="large">
      <Button variant="primary" onClick={ () => {} }>
        one
      </Button>
      <Button variant="primary" onClick={ () => {} }>
        Two
      </Button>
      <Button variant="primary" onClick={ () => {} }>
        Three
      </Button>
    </ButtonGroup>
  );
};

const clickHandler = jest.fn();
const getButtonGroupElementsWithRadioType = () => {
  return (
    <ButtonGroup type="radio" onClick={(value) => { clickHandler(value); }}>
      <Button value="one">
        one
      </Button>
      <Button value="two">
        Two
      </Button>
    </ButtonGroup>
  );
};

describe('ButtonGroup component unit test cases', () => {

  it('Should render the container with the correct class', () => {
    const { container } = render(getButtonGroupElements());
    expect(container.firstChild.classList.contains('bds-btn-group')).toBe(true);
  });

  it('Should render the count of buttons correctly in the group', () => {
    const { queryAllByRole } = render(getButtonGroupElements());
    const button = queryAllByRole('button')
    expect(button.length).toBe(3);
  });

  it('Should render the size of buttons correctly in the group', () => {
    const { queryAllByRole } = render(getButtonGroupElements());
    const button = queryAllByRole('button')
    expect(button[0].className.includes('bds-btn-large')).toBe(true);
  });

});

describe('ButtonGroup component unit test cases when the type is radio.', () => {

  it('Should render the container with the correct class', () => {
    const { container } = render(getButtonGroupElementsWithRadioType());
    expect(container.firstChild.classList.contains('bds-btn-group')).toBe(true);
  });

  it('Should render the button classes correctly', () => {
    const { queryAllByRole } = render(getButtonGroupElementsWithRadioType());
    const button = queryAllByRole('button')

    expect(button[0].className.includes('bds-btn-primary')).toBe(true);
    expect(button[1].className.includes('bds-btn-secondary')).toBe(true);
  });

  it('Should toggle the button variant on click.', () => {
    const { queryAllByRole } = render(getButtonGroupElementsWithRadioType());
    const button = queryAllByRole('button')

    fireEvent.click(button[1]);
    expect(button[0].className.includes('bds-btn-secondary')).toBe(true);
    expect(button[1].className.includes('bds-btn-primary')).toBe(true);
  });

  it('Should get the value of the button clicked.', () => {
    const { queryAllByRole } = render(getButtonGroupElementsWithRadioType());
    const button = queryAllByRole('button')

    fireEvent.click(button[1]);
    expect(clickHandler).toBeCalledWith('two');
  });

});
