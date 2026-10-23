 
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import MultiTextfield from './multiTextfield'
import { classes } from './constants'

describe('MultiTextfield component unit tests', () => {
  const defaultProps = {
    finalValue: vi.fn(),
    finalObject: vi.fn(),
    isAllFieldSaved: vi.fn(),
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the container element', () => {
    const { container } = render(<MultiTextfield {...defaultProps} />)
    expect(container.querySelector(`.${classes.container}`)).toBeInTheDocument()
  })

  it('should render an empty input field when no valueString is provided', () => {
    const { getAllByPlaceholderText } = render(<MultiTextfield {...defaultProps} />)
    expect(getAllByPlaceholderText('value').length).toBeGreaterThanOrEqual(1)
  })

  it('should render input fields for each comma-separated value', async () => {
    const { getAllByDisplayValue } = render(
      <MultiTextfield {...defaultProps} valueString="alpha,beta,gamma" />,
    )
    await waitFor(() => {
      expect(getAllByDisplayValue('alpha')).toHaveLength(1)
      expect(getAllByDisplayValue('beta')).toHaveLength(1)
      expect(getAllByDisplayValue('gamma')).toHaveLength(1)
    })
  })

  it('should call finalValue and finalObject when inputs change', async () => {
    const finalValue = vi.fn()
    const finalObject = vi.fn()
    const { getAllByPlaceholderText } = render(
      <MultiTextfield
        {...defaultProps}
        finalValue={finalValue}
        finalObject={finalObject}
      />,
    )

    const input = getAllByPlaceholderText('value')[0]
    fireEvent.change(input, { target: { name: 'value', value: 'newval' } })

    await waitFor(() => {
      expect(finalValue).toHaveBeenCalled()
      expect(finalObject).toHaveBeenCalled()
    })
  })

  it('should not allow comma in input values', async () => {
    const { getAllByPlaceholderText } = render(
      <MultiTextfield {...defaultProps} />,
    )

    const input = getAllByPlaceholderText('value')[0]
    fireEvent.change(input, { target: { name: 'value', value: 'hello,world' } })

    await waitFor(() => {
      expect(input.value).not.toContain(',')
    })
  })

  it('should not allow pipe in input values', async () => {
    const { getAllByPlaceholderText } = render(
      <MultiTextfield {...defaultProps} />,
    )

    const input = getAllByPlaceholderText('value')[0]
    fireEvent.change(input, { target: { name: 'value', value: 'hello|world' } })

    await waitFor(() => {
      expect(input.value).not.toContain('|')
    })
  })

  it('should call isAllFieldSaved with false when fields are empty', async () => {
    const isAllFieldSaved = vi.fn()
    render(<MultiTextfield {...defaultProps} isAllFieldSaved={isAllFieldSaved} />)

    await waitFor(() => {
      expect(isAllFieldSaved).toHaveBeenCalledWith(false)
    })
  })
})
