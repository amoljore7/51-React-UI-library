 
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from './checkbox'

const props = {
  name: 'checkbox',
  label: 'Checkbox Button',
  checked: false,
  disabled: false,
  readOnly: false,
  onChange: vi.fn(),
}

describe('checkbox button test cases', () => {
  it('Label passed as a props appears on the screen', () => {
    const { getByText } = render(<Checkbox {...props} />)
    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('Name passed in the props', () => {
    const { getByRole } = render(<Checkbox {...props} />)
    expect(getByRole('checkbox').name).toEqual(props.name)
  })

  it('Checked passed as a props appears on the screen', () => {
    const { getByRole } = render(<Checkbox {...props} />)
    expect(getByRole('checkbox').checked).toEqual(props.checked)
  })

  it('Disabled passed as a props appears on the screen', () => {
    const { getByRole } = render(<Checkbox {...props} />)
    expect(getByRole('checkbox').disabled).toEqual(props.disabled)
  })

  it('ReadOnly passed as a props appears on the screen', () => {
    const updatedProps = { ...props, readOnly: true }
    const { container } = render(<Checkbox {...updatedProps} />)
    expect(container.querySelector('.bds-checkbox-icon-readonly')).toBeInTheDocument()
  })

  it('OnChange passed in the props', () => {
    const { getByRole } = render(<Checkbox {...props} />)
    const checkboxButton = getByRole('checkbox')
    fireEvent.click(checkboxButton)
    expect(props.onChange).toHaveBeenCalledTimes(1)
  })
})
