 
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FlexibleMenu from './flexibleMenu'

describe('FlexibleMenu component unit tests', () => {
  const defaultProps = {
    title: 'Menu Title',
    onClose: vi.fn(),
    children: <div data-testid="menu-content">Menu Content</div>,
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the title when provided', () => {
    const { getByText } = render(<FlexibleMenu {...defaultProps} />)
    expect(getByText('Menu Title')).toBeInTheDocument()
  })

  it('should render children content', () => {
    const { getByTestId } = render(<FlexibleMenu {...defaultProps} />)
    expect(getByTestId('menu-content')).toBeInTheDocument()
  })

  it('should not render header when title is not provided', () => {
    const { container } = render(
      <FlexibleMenu onClose={defaultProps.onClose}>
        <div>Content</div>
      </FlexibleMenu>,
    )
    expect(container.querySelector('.bds-flexible-menu-header')).not.toBeInTheDocument()
  })

  it('should call onClose when the close button is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(
      <FlexibleMenu
        {...defaultProps}
        onClose={onClose}
      />,
    )
    const closeButton = container.querySelector('.bds-flexible-menu-header button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should render footer when footer text is provided', () => {
    const footer = { text: 'View All', onClick: vi.fn() }
    const { getByText } = render(<FlexibleMenu {...defaultProps} footer={footer} />)
    expect(getByText('View All')).toBeInTheDocument()
  })

  it('should call footer onClick when footer button is clicked', () => {
    const footer = { text: 'View All', onClick: vi.fn() }
    const { getByText } = render(<FlexibleMenu {...defaultProps} footer={footer} />)
    fireEvent.click(getByText('View All'))
    expect(footer.onClick).toHaveBeenCalledTimes(1)
  })

  it('should not render footer when footer is not provided', () => {
    const { container } = render(<FlexibleMenu {...defaultProps} />)
    expect(container.querySelector('.bds-flexible-menu-footer')).not.toBeInTheDocument()
  })

  it('should apply max-height class when maxHeight prop is true', () => {
    const { container } = render(<FlexibleMenu {...defaultProps} maxHeight={true} />)
    expect(container.querySelector('.bds-flexible-menu-max-height')).toBeInTheDocument()
  })

  it('should not apply max-height class when maxHeight prop is false', () => {
    const { container } = render(
      <FlexibleMenu
        {...defaultProps}
        maxHeight={false}
      />,
    )
    expect(container.querySelector('.bds-flexible-menu-max-height')).not.toBeInTheDocument()
  })
})
