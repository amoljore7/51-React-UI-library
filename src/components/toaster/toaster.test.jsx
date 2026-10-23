import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { toaster, subscribeToasts } from './toast-service'
import ToastItem from './toast-item'
import Toaster from './toaster'
import { classes } from './constants'

const TEST_ID = 'toast-test-id'

beforeEach(() => {
  toaster.dismiss()
})

// ─── toast-service ──────────────────────────────────────────────────────────

describe('toast-service', () => {
  it('create adds a toast', () => {
    let received = []
    const unsub = subscribeToasts(ts => { received = ts })
    toaster.create({ title: 'Hello', type: 'info' })
    expect(received).toHaveLength(1)
    expect(received[0].title).toBe('Hello')
    unsub()
  })

  it('create with the same id replaces the existing toast', () => {
    let received = []
    const unsub = subscribeToasts(ts => { received = ts })
    toaster.create({ id: 'dup', title: 'First', type: 'info' })
    toaster.create({ id: 'dup', title: 'Second', type: 'success' })
    expect(received).toHaveLength(1)
    expect(received[0].title).toBe('Second')
    unsub()
  })

  it('dismiss(id) removes only that toast', () => {
    let received = []
    const unsub = subscribeToasts(ts => { received = ts })
    const id = toaster.create({ title: 'A', type: 'info' })
    toaster.create({ title: 'B', type: 'success' })
    toaster.dismiss(id)
    expect(received).toHaveLength(1)
    expect(received[0].title).toBe('B')
    unsub()
  })

  it('dismiss() with no args clears all toasts', () => {
    let received = []
    const unsub = subscribeToasts(ts => { received = ts })
    toaster.create({ title: 'A', type: 'info' })
    toaster.create({ title: 'B', type: 'error' })
    toaster.dismiss()
    expect(received).toHaveLength(0)
    unsub()
  })

  it('subscribeToasts fires immediately with current state', () => {
    toaster.create({ title: 'Pre-existing', type: 'success', duration: null })
    let received = null
    const unsub = subscribeToasts(ts => { received = ts })
    expect(received).toHaveLength(1)
    expect(received[0].title).toBe('Pre-existing')
    unsub()
  })

  describe('timer-based', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('auto-dismisses after duration', () => {
      let received = []
      const unsub = subscribeToasts(ts => { received = ts })
      toaster.create({ title: 'Auto', type: 'info', duration: 1000 })
      expect(received).toHaveLength(1)
      act(() => vi.advanceTimersByTime(1000))
      expect(received).toHaveLength(0)
      unsub()
    })

    it('duration null never auto-dismisses', () => {
      let received = []
      const unsub = subscribeToasts(ts => { received = ts })
      toaster.create({ title: 'Infinite', type: 'info', duration: null })
      act(() => vi.advanceTimersByTime(60000))
      expect(received).toHaveLength(1)
      unsub()
    })

    it('early manual dismiss cancels the auto-dismiss timer', () => {
      let received = []
      const unsub = subscribeToasts(ts => { received = ts })
      const id = toaster.create({ title: 'Cancel me', type: 'info', duration: 5000 })
      toaster.dismiss(id)
      expect(received).toHaveLength(0)
      act(() => vi.advanceTimersByTime(5000))
      expect(received).toHaveLength(0)
      unsub()
    })
  })
})

const noop = () => {}

// ─── ToastItem ───────────────────────────────────────────────────────────────

describe('ToastItem', () => {

  it('renders title text', () => {
    render(<ToastItem id={TEST_ID} title="Test title" type="info" />)
    expect(screen.getByText('Test title')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<ToastItem id={TEST_ID} title="Title" description="More detail" type="success" />)
    expect(screen.getByText('More detail')).toBeInTheDocument()
  })

  it('does not render description when omitted', () => {
    render(<ToastItem id={TEST_ID} title="Title" type="success" />)
    expect(screen.queryByText('More detail')).not.toBeInTheDocument()
  })

  it('renders close button when closable is true', () => {
    render(<ToastItem id={TEST_ID} title="Close me" type="info" closable />)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('does not render close button when closable is false', () => {
    render(<ToastItem id={TEST_ID} title="No close" type="info" closable={false} />)
    expect(screen.queryByRole('button', { name: /dismiss/i })).not.toBeInTheDocument()
  })

  describe('close button dismiss', () => {
    let spy
    beforeEach(() => { spy = vi.spyOn(toaster, 'dismiss') })
    afterEach(() => spy.mockRestore())

    it('calls toaster.dismiss with id when close button is clicked', () => {
      render(<ToastItem id={TEST_ID} title="Close me" type="info" closable />)
      fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))
      expect(spy).toHaveBeenCalledWith(TEST_ID)
    })
  })

  it('applies the correct type class', () => {
    const { container } = render(<ToastItem id={TEST_ID} title="T" type="success" />)
    expect(container.firstChild).toHaveClass(classes.toastSuccess)
  })

  // ── primaryButton / secondaryButton props ─────────────────────────────────

  it('renders primaryButton when provided', () => {
    render(<ToastItem id={TEST_ID} title="Title" type="info" primaryButton={{ text: 'Confirm', onClick: noop }} />)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('renders both primaryButton and secondaryButton', () => {
    render(
      <ToastItem
        id={TEST_ID} title="Title" type="info"
        primaryButton={{ text: 'Confirm', onClick: noop }}
        secondaryButton={{ text: 'Cancel', onClick: noop }}
      />,
    )
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('does not render buttons section when neither button prop is provided', () => {
    const { container } = render(<ToastItem id={TEST_ID} title="Title" type="info" />)
    expect(container.querySelector(`.${classes.buttons}`)).not.toBeInTheDocument()
  })

  it('renders disabled button when disabled is true', () => {
    render(
      <ToastItem id={TEST_ID} title="Title" type="info"
        primaryButton={{ text: 'Confirm', onClick: noop, disabled: true }}
      />,
    )
    expect(screen.getByText('Confirm').closest('button')).toBeDisabled()
  })

  it('renders buttons inline in head-row when no description', () => {
    const { container } = render(
      <ToastItem id={TEST_ID} title="Title" type="info" primaryButton={{ text: 'Go', onClick: noop }} />,
    )
    const headRow = container.querySelector(`.${classes.headRow}`)
    expect(headRow).toContainElement(screen.getByText('Go').closest('button'))
    expect(container.querySelector(`.${classes.buttons}`)).not.toBeInTheDocument()
  })

  it('renders buttons in stacked row when description is present', () => {
    const { container } = render(
      <ToastItem id={TEST_ID} title="Title" description="Some detail" type="info"
        primaryButton={{ text: 'Go', onClick: noop }}
      />,
    )
    expect(container.querySelector(`.${classes.buttons}`)).toBeInTheDocument()
    const headRow = container.querySelector(`.${classes.headRow}`)
    expect(headRow).not.toContainElement(screen.getByText('Go').closest('button'))
  })

  it('renders description element when description is provided', () => {
    const { container } = render(
      <ToastItem id={TEST_ID} title="Title" description="Detail" type="info" />,
    )
    expect(container.querySelector(`.${classes.description}`)).toBeInTheDocument()
  })

  it('does not render description element when description is absent', () => {
    const { container } = render(<ToastItem id={TEST_ID} title="Title" type="info" />)
    expect(container.querySelector(`.${classes.description}`)).not.toBeInTheDocument()
  })
})

// ─── Toaster ─────────────────────────────────────────────────────────────────

describe('Toaster', () => {
  it('mounts without crashing', () => {
    render(<Toaster />)
  })

  it('renders nothing when there are no toasts', () => {
    const { container } = render(<Toaster />)
    expect(container.firstChild).toBeNull()
  })

  it('renders toast items when the service has toasts', () => {
    act(() => {
      toaster.create({ title: 'Hello world', type: 'success', duration: null })
    })
    render(<Toaster />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('removes a toast when dismissed', () => {
    let id
    act(() => {
      id = toaster.create({ title: 'Goodbye', type: 'info', duration: null })
    })
    render(<Toaster />)
    expect(screen.getByText('Goodbye')).toBeInTheDocument()
    act(() => { toaster.dismiss(id) })
    expect(screen.queryByText('Goodbye')).not.toBeInTheDocument()
  })

  it('passes primaryButton prop through to ToastItem', () => {
    act(() => {
      toaster.create({ title: 'With buttons', type: 'info', duration: null, primaryButton: { text: 'Action', onClick: noop } })
    })
    render(<Toaster />)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('unsubscribes when unmounted', () => {
    const { unmount } = render(<Toaster />)
    unmount()
    act(() => {
      toaster.create({ title: 'Post-unmount', type: 'info', duration: null })
    })
  })
})
