/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import TextfieldInlineEdit from './textfieldInlineEdit';
import { cancelButtonName, confirmButtonName, escapeKey, inlineEditClasses } from './constants';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks()
})

const label = 'This is a label'
const secondaryLabel = 'This is a secondary label'
const helperText = 'This is a helper text'
const value = 'test'
const newValue = 'New Value'
const placeholder = 'Placeholder'
const errorMsg = 'This is an error message'
const handleChange = jest.fn()
handleChange.__proto__ = Function.prototype

describe('Unit tests for Textfield component.', () => {

  describe('When the valid props are passed to the component', () => {
    const props = {
      value,
      label,
      secondaryLabel,
      helperText,
    }

    it('should render the label on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />);
      expect(getByText(label)).toBeInTheDocument();
    })

    it('should render the secondary label on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />);
      expect(getByText(secondaryLabel)).toBeInTheDocument();
    })

    it('should render the helper text on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />);
      expect(getByText(helperText)).toBeInTheDocument();
    })

    it('should render the value on the screen', () => {
      const { getByDisplayValue } = render(<TextfieldInlineEdit {...props} />);
      expect(getByDisplayValue(value)).toBeInTheDocument();
    })
  })

  describe('When the value is not passed to the component', () => {
    it('should render the placeholder on the screen', () => {
      const { getByPlaceholderText } = render(<TextfieldInlineEdit placeholder={placeholder} />);
      expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
    })
  })

  describe('When the input is read only', () => {
    const props = {
      value,
      readOnly: true,
    }

    it('should render the read only styles', () => {
      const { container } = render(<TextfieldInlineEdit {...props} />);
      expect(container.firstChild.lastChild).toHaveClass(inlineEditClasses.inputContainerReadOnly);
    })
  })

  describe('When the value is empty', () => {
    it('should render the empty input styles', () => {
      const { container } = render(<TextfieldInlineEdit value={''} />);
      expect(container.firstChild.lastChild).toHaveClass(inlineEditClasses.variantNakedEmpty);
    })
  })

  describe('When the input has error', () => {
    const props = {
      value,
      error: true,
      errorMsg,
    }

    it('should render the error input styles', () => {
      const { container } = render(<TextfieldInlineEdit {...props} />);
      expect(container.firstChild.firstChild).toHaveClass(inlineEditClasses.variantNakedError);
    })

    it('should render the error message on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />);
      expect(getByText(errorMsg)).toBeInTheDocument();
    })
  })

  describe('When the user tries to edit value.', () => {
    const props = {
      value,
      onChange: handleChange
    }

    const setup = () => {
      const { getAllByRole, getByRole } = render(<TextfieldInlineEdit {...props} />);
      const input = getByRole('textbox')
      fireEvent.click(input)
      const buttons = getAllByRole('button')

      return {
        buttons,
        input,
      }
    }

    it('should render the confirm and cancel buttons on focus.', () => {
      const { buttons } = setup()
      expect(buttons[0].name).toEqual(confirmButtonName)
      expect(buttons[1].name).toEqual(cancelButtonName)
    })

    it('should call the onChange function on click of the confirm button.', () => {
      const { buttons, input } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      fireEvent.click(buttons[0])

      expect(handleChange).toBeCalledWith(newValue)
    })
  })

  describe('When the user cancel the input form.', () => {
    const props = {
      value,
      onChange: handleChange
    }

    const setup = () => {
      const { getByDisplayValue, getByRole, getAllByRole } = render(<TextfieldInlineEdit {...props} />);
      const input = getByRole('textbox')
      fireEvent.click(input)
      const buttons = getAllByRole('button')

      return {
        getByDisplayValue,
        buttons,
        input,
      }
    }

    it('should revert to the original value on cancel button click.', () => {
      const { buttons, input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument();

      fireEvent.click(buttons[1])
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument();
    })

    it('should revert to the original value on losing focus.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument();

      fireEvent.blur(input)
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument();
    })

    it('should revert to the original value when the Esc key is pressed.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument();

      fireEvent.keyUp(input, {
        key: escapeKey,
      });
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument();
    })
  })
})