 
import React from 'react'
import { render } from '@testing-library/react'
import DialogPopup from './dialog'

const props = {
  type: 'general',
  width: 464,
  height: 278,
  title: 'Title',
  message: 'Message here',
  primaryButtonText: 'OK',
  secondaryButtonText: 'Cancel',
  onSubmit: vi.fn(),
  onCancel: vi.fn(),
}

describe('dialog popup test cases', () => {
  it('Type passed as a props appears on the screen', () => {
    // Mock getComputedStyle to provide the --brand CSS variable
    // which is normally set via SCSS but unavailable in the test environment
    const originalGetComputedStyle = window.getComputedStyle
    vi.spyOn(window, 'getComputedStyle').mockImplementation(el => {
      const style = originalGetComputedStyle(el)
      return {
        ...style,
        getPropertyValue: prop => {
          if (prop === '--brand') return 'rgb(6, 127, 219)'
          return style.getPropertyValue(prop)
        },
      }
    })

    const { getByRole } = render(<DialogPopup {...props} />)
    expect(getByRole('popup-strap').style.backgroundColor).toEqual(
      'rgb(6, 127, 219)',
    )

    vi.restoreAllMocks()
  })

  it('Width passed as a props appears on the screen', () => {
    const { getByRole } = render(<DialogPopup {...props} />)
    expect(getByRole('dialog-popup').style.width).toEqual(`${props.width}px`)
  })

  it('Height passed as a props appears on the screen', () => {
    const { getByRole } = render(<DialogPopup {...props} />)
    expect(getByRole('dialog-popup').style.height).toEqual(`${props.height}px`)
  })

  it('Title passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />)
    expect(getByText(props.title)).toBeInTheDocument()
  })

  it('Message passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />)
    expect(getByText(props.message)).toBeInTheDocument()
  })

  it('PrimaryButtonText passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />)
    expect(getByText(props.primaryButtonText)).toBeInTheDocument()
  })

  it('SecondaryButtonText passed as a props appears on the screen', () => {
    const { getByText } = render(<DialogPopup {...props} />)
    expect(getByText(props.secondaryButtonText)).toBeInTheDocument()
  })
})
