 
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import RadioGroup from './radio'

const props = {
  label: 'Gender',
  name: 'gender',
  defaultValue: 'male',
  options: [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
      disabled: false,
    },
    {
      label: 'Other',
      value: 'other',
      disabled: true,
    },
  ],
  direction: 'horizontal',
  onChange: vi.fn(),
}

describe('radio button test cases', () => {
  it('Label passed as a props appears on the screen', () => {
    const { getByText } = render(<RadioGroup {...props} />)
    expect(getByText(props.label)).toBeInTheDocument()
  })

  it('Name passed in the props', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />)
    const radioButtons = getAllByRole('radio')
    for (let i = 0; i < radioButtons.length; i++) {
      expect(radioButtons[i].name).toEqual(props.name)
    }
  })

  it('DefaultValue passed in the props', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />)
    const radioButtons = getAllByRole('radio')
    const checkedRadio = radioButtons.find(r => r.value === props.defaultValue)
    expect(checkedRadio).toBeTruthy()
    expect(checkedRadio.checked).toBe(true)
  })

  it('Options passed as a props appears on the screen', () => {
    const { getAllByRole } = render(<RadioGroup {...props} />)
    const radioButtons = getAllByRole('radio')

    expect(radioButtons.length).toEqual(props.options.length)
  })

  it('Directions passed as a props appears on the screen', () => {
    const { getByTestId } = render(<RadioGroup {...props} />)
    const radioGroup = getByTestId('radio-group')

    expect(radioGroup.classList.contains('horizontal-align')).toBe(true)
  })

  it('onChange passed in the props', () => {
    const onChangeSpy = vi.fn()
    const { getAllByRole } = render(<RadioGroup {...props} onChange={onChangeSpy} />)
    let radioField = getAllByRole('radio')[1]
    fireEvent.click(radioField)
    expect(onChangeSpy).toHaveBeenCalledTimes(1)
  })
})
