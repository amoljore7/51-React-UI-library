import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Switch from './switch'

describe('Switch component', () => {
  it('should render switch component correctly', () => {
    const { getByTestId, getByText } = render(
      <Switch label='Toggle' checked={false} />,
    )

    const switchElement = getByTestId('bds-switch')
    const labelElement = getByText('Toggle')

    expect(switchElement).toBeInTheDocument()
    expect(labelElement).toBeInTheDocument()
  })

  it('should call onToggle function when clicked', () => {
    const onToggleMock = vi.fn()
    const { getByTestId } = render(
      <Switch label='Toggle' checked={false} onToggle={onToggleMock} />,
    )

    const switchElement = getByTestId('bds-switch')
    fireEvent.click(switchElement)

    expect(onToggleMock).toHaveBeenCalledTimes(1)
  })

  it('should have aria-checked true when checked is true', () => {
    const { getByRole } = render(
      <Switch label='Toggle' checked={true} onToggle={() => {}} />,
    )

    const switchRole = getByRole('switch')

    expect(switchRole).toHaveAttribute('aria-checked', 'true')
  })

  it('should have aria-checked false when checked is false', () => {
    const { getByRole } = render(
      <Switch label='Toggle' checked={false} onToggle={() => {}} />,
    )

    const switchRole = getByRole('switch')

    expect(switchRole).toHaveAttribute('aria-checked', 'false')
  })

  it('should have checked class when checked is true', () => {
    const { getByTestId } = render(
      <Switch label='Toggle' checked={true} onToggle={() => {}} />,
    )

    const switchElement = getByTestId('bds-switch')

    expect(switchElement).toHaveClass('bds-switch--checked')
  })

  it('should show error message when error prop is true', () => {
    const { getByText } = render(
      <Switch
        label='Toggle'
        checked={false}
        error={true}
        errorMessage='Error message'
      />,
    )

    const errorMessageElement = getByText('Error message')

    expect(errorMessageElement).toBeInTheDocument()
  })

  it('should not show error message when error prop is false', () => {
    const { queryByText } = render(
      <Switch
        label='Toggle'
        checked={false}
        error={false}
        errorMessage='Error message'
      />,
    )

    const errorMessageElement = queryByText('Error message')

    expect(errorMessageElement).not.toBeInTheDocument()
  })

  it('should be in disabled state when disabled is true', () => {
    const { getByTestId } = render(<Switch checked={false} disabled />)

    const switchElement = getByTestId('bds-switch')

    expect(switchElement).toHaveClass('disabled')
  })
})
