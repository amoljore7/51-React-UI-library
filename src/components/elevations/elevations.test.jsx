 
import React from 'react'
import { render } from '@testing-library/react'
import Elevations from './index'

describe('Elevations component unit tests', () => {
  it('should render the default elevation level 1', () => {
    const { getByText, container } = render(<Elevations />)
    expect(getByText(/Elevations Level 1/)).toBeInTheDocument()
    expect(container.querySelector('.elevation-level-1')).toBeInTheDocument()
  })

  it('should render the correct elevation level when a level prop is passed', () => {
    const { getByText, container } = render(<Elevations level={3} />)
    expect(getByText(/Elevations Level 3/)).toBeInTheDocument()
    expect(container.querySelector('.elevation-level-3')).toBeInTheDocument()
  })

  it('should have the elevation-container class', () => {
    const { container } = render(<Elevations level={2} />)
    expect(container.querySelector('.elevation-container')).toBeInTheDocument()
  })

  it('should display the class name text inside the component', () => {
    const { container } = render(<Elevations level={4} />)
    expect(container.textContent).toContain('elevation-level-4')
  })
})
