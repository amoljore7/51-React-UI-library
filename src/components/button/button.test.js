/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Button from './button';
import { classes } from './constants';

describe('Button component unit test cases', () => {
  const primaryVariant = 'primary';
  const secondaryVariant = 'secondary';
  const textOnlyVariant = 'textOnly';

  const smallSize = 'small';
  const mediumSize = 'medium';
  const largeSize = 'large';

  it('Check Button Primary', () => {
    const { container } = render(<Button variant={primaryVariant} />);
    expect(container.firstChild.classList.contains(classes.buttonPrimary)).toBe(true);
  });

  it('Check Button Secondary', () => {
    const { container } = render(<Button variant={secondaryVariant} />);
    expect(container.firstChild.classList.contains(classes.buttonSecondary)).toBe(true);
  });

  it('Check Button TextOnly', () => {
    const { container } = render(<Button variant={textOnlyVariant} />);
    expect(container.firstChild.classList.contains(classes.buttonTextOnly)).toBe(true);
  });

  it('Check Button Primary & Size Small', () => {
    const { container } = render(<Button variant={primaryVariant} size={smallSize} />);
    expect(container.firstChild.classList.contains(classes.buttonSmall)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonPrimary)).toBe(true);
  });

  it('Check Button Primary & Size Medium', () => {
    const { container } = render(<Button variant={primaryVariant} size={mediumSize} />);
    expect(container.firstChild.classList.contains(classes.buttonMedium)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonPrimary)).toBe(true);
  });

  it('Check Button Primary & Size Large', () => {
    const { container } = render(<Button variant={primaryVariant} size={largeSize} />);
    expect(container.firstChild.classList.contains(classes.buttonLarge)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonPrimary)).toBe(true);
  });

  it('Check Button Secondary & Size Small', () => {
    const { container } = render(<Button variant={secondaryVariant} size={smallSize} />);
    expect(container.firstChild.classList.contains(classes.buttonSmall)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonSecondary)).toBe(true);
  });

  it('Check Button Secondary & Size Medium', () => {
    const { container } = render(<Button variant={secondaryVariant} size={mediumSize} />);
    expect(container.firstChild.classList.contains(classes.buttonMedium)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonSecondary)).toBe(true);
  });

  it('Check Button Secondary & Size Large', () => {
    const { container } = render(<Button variant={secondaryVariant} size={largeSize} />);
    expect(container.firstChild.classList.contains(classes.buttonLarge)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonSecondary)).toBe(true);
  });

  it('Check Button TextOnly & Size Small', () => {
    const { container } = render(<Button variant={textOnlyVariant} size={smallSize} />);
    expect(container.firstChild.classList.contains(classes.buttonSmall)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonTextOnly)).toBe(true);
  });

  it('Check Button TextOnly & Size Medium', () => {
    const { container } = render(<Button variant={textOnlyVariant} size={mediumSize} />);
    expect(container.firstChild.classList.contains(classes.buttonMedium)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonTextOnly)).toBe(true);
  });

  it('Check Button TextOnly & Size Large', () => {
    const { container } = render(<Button variant={textOnlyVariant} size={largeSize} />);
    expect(container.firstChild.classList.contains(classes.buttonLarge)).toBe(true);
    expect(container.firstChild.classList.contains(classes.buttonTextOnly)).toBe(true);
  });

  it('Check Button false props', () => {
    const { container } = render(<Button variant={primaryVariant} />);
    expect(container.firstChild.classList.contains(classes.buttonSmall)).toBe(false);
  });

  it('ClickHandler was called', () => {
    const props = {
      onClick: jest.fn(),
    };

    const { getByTestId } = render(<Button {...props} />);
    const buttonComponent = getByTestId('button');
    fireEvent.click(buttonComponent);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
