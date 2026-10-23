 
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PillInput from './PillInput'
import { classes } from './constants'

describe('PillInput component unit tests', () => {
  const defaultProps = {
    pillListData: [],
    handleUpdatePillList: vi.fn(),
    handleDeletePill: vi.fn(),
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the pill input container', () => {
    const { container } = render(<PillInput {...defaultProps} />)
    expect(container.querySelector(`.${classes.pillInputContainer}`)).toBeInTheDocument()
  })

  it('should render the text input', () => {
    const { getByTestId } = render(<PillInput {...defaultProps} />)
    expect(getByTestId('pill-list-input')).toBeInTheDocument()
  })

  it('should render pills from pillListData', () => {
    const props = {
      ...defaultProps,
      pillListData: ['Tag1', 'Tag2', 'Tag3'],
    }
    const { getByText } = render(<PillInput {...props} />)
    expect(getByText('Tag1')).toBeInTheDocument()
    expect(getByText('Tag2')).toBeInTheDocument()
    expect(getByText('Tag3')).toBeInTheDocument()
  })

  it('should call handleUpdatePillList when Enter key is pressed with a value', () => {
    const handleUpdatePillList = vi.fn()
    const { getByTestId } = render(
      <PillInput {...defaultProps} handleUpdatePillList={handleUpdatePillList} />,
    )

    const input = getByTestId('pill-list-input')
    fireEvent.change(input, { target: { value: 'NewTag' } })
    fireEvent.keyDown(input, { keyCode: 13 })

    expect(handleUpdatePillList).toHaveBeenCalledWith('NewTag')
  })

  it('should not call handleUpdatePillList when Enter key is pressed with empty value', () => {
    const handleUpdatePillList = vi.fn()
    const { getByTestId } = render(
      <PillInput {...defaultProps} handleUpdatePillList={handleUpdatePillList} />,
    )

    const input = getByTestId('pill-list-input')
    fireEvent.keyDown(input, { keyCode: 13 })

    expect(handleUpdatePillList).not.toHaveBeenCalled()
  })

  it('should call handleUpdatePillList on input blur with a value', () => {
    const handleUpdatePillList = vi.fn()
    const { getByTestId } = render(
      <PillInput {...defaultProps} handleUpdatePillList={handleUpdatePillList} />,
    )

    const input = getByTestId('pill-list-input')
    fireEvent.change(input, { target: { value: 'BlurTag' } })
    fireEvent.blur(input)

    expect(handleUpdatePillList).toHaveBeenCalledWith('BlurTag')
  })

  it('should display error message when error prop is true', () => {
    const { getByText, container } = render(
      <PillInput {...defaultProps} error={true} errorMsg="Invalid input" />,
    )
    expect(getByText('Invalid input')).toBeInTheDocument()
    expect(container.querySelector(`.${classes.inputContainerErrorBorder}`)).toBeInTheDocument()
  })

  it('should not display error message when error prop is false', () => {
    const { queryByText } = render(
      <PillInput {...defaultProps} error={false} errorMsg="Invalid input" />,
    )
    expect(queryByText('Invalid input')).not.toBeInTheDocument()
  })

  it('should render with disabled state', () => {
    const { getByTestId, container } = render(
      <PillInput {...defaultProps} disabled={true} />,
    )
    expect(getByTestId('pill-list-input')).toBeDisabled()
    expect(container.querySelector(`.${classes.inputContainerDisabled}`)).toBeInTheDocument()
  })

  it('should render the placeholder text', () => {
    const { getByPlaceholderText } = render(
      <PillInput {...defaultProps} placeholder="Enter tags..." />,
    )
    expect(getByPlaceholderText('Enter tags...')).toBeInTheDocument()
  })

  it('should clear input after adding a pill', () => {
    const { getByTestId } = render(
      <PillInput {...defaultProps} handleUpdatePillList={vi.fn()} />,
    )

    const input = getByTestId('pill-list-input')
    fireEvent.change(input, { target: { value: 'TestPill' } })
    fireEvent.keyDown(input, { keyCode: 13 })

    expect(input.value).toBe('')
  })
})
