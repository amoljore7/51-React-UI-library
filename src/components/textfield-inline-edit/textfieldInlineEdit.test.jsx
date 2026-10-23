 
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TextfieldInlineEdit from './textfieldInlineEdit'
import { cancelButtonName, confirmButtonName, escapeKey, inlineEditClasses } from './constants'

afterEach(() => {
  vi.resetAllMocks()
})

const label = 'This is a label'
const secondaryLabel = 'This is a secondary label'
const helperText = 'This is a helper text'
const value = 'test'
const newValue = 'New Value'
const placeholder = 'Placeholder'
const errorMsg = 'This is an error message'
const handleChange = vi.fn()
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
      const { getByText } = render(<TextfieldInlineEdit {...props} />)
      expect(getByText(label)).toBeInTheDocument()
    })

    it('should render the secondary label on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />)
      expect(getByText(secondaryLabel)).toBeInTheDocument()
    })

    it('should render the helper text on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />)
      expect(getByText(helperText)).toBeInTheDocument()
    })

    it('should render the value on the screen', () => {
      const { getByDisplayValue } = render(<TextfieldInlineEdit {...props} />)
      expect(getByDisplayValue(value)).toBeInTheDocument()
    })
  })

  describe('When the value is not passed to the component', () => {
    it('should render the placeholder on the screen', () => {
      const { getByPlaceholderText } = render(
        <TextfieldInlineEdit
          placeholder={placeholder}
        />,
      )
      expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
    })
  })

  describe('When the input is read only', () => {
    const props = {
      value,
      readOnly: true,
    }

    it('should render the read only styles', () => {
      const { container } = render(<TextfieldInlineEdit {...props} />)
      expect(
        container.querySelector(`.${inlineEditClasses.inputContainerReadOnly}`),
      ).toBeInTheDocument()
    })
  })

  describe('When the value is empty', () => {
    it('should render the empty input styles', () => {
      const { container } = render(<TextfieldInlineEdit value={''} />)
      expect(
        container.querySelector(`.${inlineEditClasses.variantNakedEmpty}`),
      ).toBeInTheDocument()
    })
  })

  describe('When the input has error', () => {
    const props = {
      value,
      error: true,
      errorMsg,
    }

    it('should render the error input styles', () => {
      const { container } = render(<TextfieldInlineEdit {...props} />)
      expect(
        container.querySelector(`.${inlineEditClasses.variantNakedError}`),
      ).toBeInTheDocument()
    })

    it('should render the error message on the screen', () => {
      const { getByText } = render(<TextfieldInlineEdit {...props} />)
      expect(getByText(errorMsg)).toBeInTheDocument()
    })
  })

  describe('When the user tries to edit value.', () => {
    const props = {
      value,
      onChange: handleChange,
    }

    const setup = () => {
      const { getAllByTestId, getByRole, getByDisplayValue, container } = render(
        <TextfieldInlineEdit {...props} />,
      )
      const input = getByRole('textbox')
      fireEvent.click(input)
      const buttons = getAllByTestId('button')
      const buttonsWrapper = container.querySelector(
        `.${inlineEditClasses.inlineEditButtons}`,
      )

      return {
        buttons,
        input,
        getByDisplayValue,
        buttonsWrapper,
      }
    }

    it('should render the confirm and cancel buttons.', () => {
      const { buttons } = setup()
      expect(buttons[0].name).toEqual(confirmButtonName)
      expect(buttons[1].name).toEqual(cancelButtonName)
    })

    it('should keep the confirm and cancel buttons hidden while the value is unchanged.', () => {
      const { buttonsWrapper } = setup()
      expect(buttonsWrapper).not.toHaveClass(
        inlineEditClasses.inlineEditButtonsVisible,
      )
    })

    it('should show the confirm and cancel buttons once the value has been edited.', () => {
      const { input, buttonsWrapper } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      expect(buttonsWrapper).toHaveClass(
        inlineEditClasses.inlineEditButtonsVisible,
      )
    })

    it('should call the onChange function on click of the confirm button.', () => {
      const { buttons, input } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      fireEvent.click(buttons[0])

      expect(handleChange).toBeCalledWith(newValue)
    })

    it('should keep the buttons visible - and the edit intact - after the input loses focus, so a click on confirm always lands (this is what makes Safari, which does not focus a clicked button, behave like every other browser - PAB-25969).', () => {
      const { input, buttonsWrapper, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.blur(input, { relatedTarget: null })

      expect(buttonsWrapper).toHaveClass(
        inlineEditClasses.inlineEditButtonsVisible,
      )
      expect(getByDisplayValue(newValue)).toBeInTheDocument()
    })

    it('should still commit the value when the confirm click arrives after the input has already blurred.', () => {
      const { buttons, input } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.blur(input, { relatedTarget: null })
      fireEvent.click(buttons[0])

      expect(handleChange).toBeCalledWith(newValue)
    })

    it('should not discard the edit when the mousedown lands on the confirm button, so the click that follows still commits (this is the Safari sequence - PAB-25969).', () => {
      const { buttons, input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.mouseDown(buttons[0])
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.blur(input, { relatedTarget: null })
      fireEvent.click(buttons[0])

      expect(handleChange).toBeCalledWith(newValue)
    })
  })

  describe('When the user clicks outside the component with a pending edit.', () => {
    const props = {
      value,
      onChange: handleChange,
    }

    const setup = () => {
      const { getByRole, getByDisplayValue, getByTestId, container } = render(
        <div>
          <TextfieldInlineEdit {...props} />
          <button type="button" data-testid="outside">outside</button>
        </div>,
      )
      const input = getByRole('textbox')
      fireEvent.click(input)

      return { input, getByDisplayValue, getByTestId, container }
    }

    it('should discard the pending edit and revert to the original value.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.mouseDown(document.body)

      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument()
    })

    it('should hide the confirm and cancel buttons again once the edit is discarded.', () => {
      const { input, container } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.mouseDown(document.body)

      expect(
        container.querySelector(`.${inlineEditClasses.inlineEditButtons}`),
      ).not.toHaveClass(inlineEditClasses.inlineEditButtonsVisible)
    })

    it('should keep the pending edit when the mousedown lands inside the component.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.mouseDown(input)

      expect(getByDisplayValue(newValue)).toBeInTheDocument()
    })

    it('should discard the pending edit when the user tabs away, so keyboard navigation matches the mouse behaviour (no mousedown fires in that case).', () => {
      const { input, getByDisplayValue, getByTestId } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.focusOut(input, { relatedTarget: getByTestId('outside') })

      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument()
    })

    it('should NOT discard on a focusout with no relatedTarget - that is Safari clicking our own confirm button, and discarding there is the PAB-25969 regression.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      fireEvent.focusOut(input, { relatedTarget: null })

      expect(getByDisplayValue(newValue)).toBeInTheDocument()
    })

    it('should keep the pending edit when focus moves to a control inside the component.', () => {
      const { input, getByDisplayValue, container } = setup()
      fireEvent.change(input, {target: {value: newValue}})

      const confirmButton = container.querySelector(`[name="${confirmButtonName}"]`)
      fireEvent.focusOut(input, { relatedTarget: confirmButton })

      expect(getByDisplayValue(newValue)).toBeInTheDocument()
    })
  })

  describe('When the user cancel the input form.', () => {
    const props = {
      value,
      onChange: handleChange,
    }

    const setup = () => {
      const {
        getByDisplayValue,
        getByRole,
        getAllByTestId,
        container,
      } = render(
        <TextfieldInlineEdit {...props} />,
      )
      const input = getByRole('textbox')
      fireEvent.click(input)
      const buttons = getAllByTestId('button')

      return {
        getByDisplayValue,
        buttons,
        input,
        container,
      }
    }

    it('should revert to the original value on cancel button click.', () => {
      const { buttons, input, getByDisplayValue, container } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.click(buttons[1])
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument()

      // No longer dirty, so the buttons hide themselves again.
      expect(
        container.querySelector(`.${inlineEditClasses.inlineEditButtons}`),
      ).not.toHaveClass(inlineEditClasses.inlineEditButtonsVisible)
    })

    it('should NOT revert to the original value on losing focus - a pending edit survives blur, and is discarded only via cancel or Escape.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.blur(input)
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(newValue)).toBeInTheDocument()
    })

    it('should revert to the original value when the Esc key is pressed.', () => {
      const { input, getByDisplayValue } = setup()
      fireEvent.change(input, {target: {value: newValue}})
      expect(getByDisplayValue(newValue)).toBeInTheDocument()

      fireEvent.keyUp(input, {
        key: escapeKey,
      })
      expect(handleChange).not.toBeCalled()
      expect(getByDisplayValue(value)).toBeInTheDocument()
    })
  })
})