import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'
import { classes } from './constants'
import { getBooleanStatusType, getStatusType } from './utils'

const Icon = props => <svg data-testid="badge-icon" {...props} />

describe('StatusBadge', () => {
  it('renders the label', () => {
    render(<StatusBadge label="Success" />)
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('defaults to the general type', () => {
    const { container } = render(<StatusBadge label="Draft" />)
    expect(container.firstChild).toHaveClass(`${classes.badge}--general`)
  })

  it.each(['success', 'error', 'warning', 'info', 'general'])(
    'applies the %s type class',
    type => {
      const { container } = render(<StatusBadge label="Status" type={type} />)
      expect(container.firstChild).toHaveClass(`${classes.badge}--${type}`)
    },
  )

  it('renders an optional icon', () => {
    render(<StatusBadge label="Success" icon={Icon} />)
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument()
  })

  it('renders no icon wrapper when no icon is given', () => {
    const { container } = render(<StatusBadge label="Success" />)
    expect(container.querySelector(`.${classes.icon}`)).toBeNull()
  })

  it('applies a numeric height as an inline style', () => {
    const { container } = render(<StatusBadge label="Success" height={28} />)
    expect(container.firstChild).toHaveStyle({ height: '28px' })
  })

  it('applies a string height verbatim', () => {
    const { container } = render(<StatusBadge label="Success" height="2rem" />)
    expect(container.firstChild).toHaveStyle({ height: '2rem' })
  })

  it('exposes a testId', () => {
    render(<StatusBadge label="Success" testId="status" />)
    expect(screen.getByTestId('status')).toBeInTheDocument()
  })
})

describe('StatusBadge with nothing to show', () => {
  it.each([[undefined], [null], [false], [''], ['   ']])(
    'renders nothing for a label of %p',
    label => {
      const { container } = render(<StatusBadge label={label} />)
      expect(container).toBeEmptyDOMElement()
    },
  )

  it('still renders when an icon carries the meaning on its own', () => {
    render(<StatusBadge label="" icon={Icon} />)
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument()
  })

  it('drops the label element rather than rendering it empty', () => {
    const { container } = render(<StatusBadge label="" icon={Icon} />)
    expect(container.querySelector(`.${classes.label}`)).toBeNull()
  })

  it('keeps rendering a zero, which is a value and not an absence', () => {
    render(<StatusBadge label={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})

describe('getStatusType', () => {
  it.each([
    ['Success', 'success'],
    ['FAILED', 'error'],
    ['TIMED_OUT', 'warning'],
    ['timed-out', 'warning'],
    ['In Progress', 'info'],
    ['InProgress', 'info'],
    ['checkedOut', 'general'],
    ['checkInSubmitted', 'info'],
    ['Draft', 'general'],
  ])('maps %s to %s', (value, expected) => {
    expect(getStatusType(value)).toBe(expected)
  })

  it('falls back to general for an unknown or missing value', () => {
    expect(getStatusType('Reticulating Splines')).toBe('general')
    expect(getStatusType(undefined)).toBe('general')
    expect(getStatusType(null)).toBe('general')
  })

  it('maps booleans for enabled/disabled style columns', () => {
    expect(getBooleanStatusType(true)).toBe('success')
    expect(getBooleanStatusType(false)).toBe('general')
  })
})
