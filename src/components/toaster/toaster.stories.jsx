import React, { useEffect, useState } from 'react'
import Toaster from './toaster'
import { toaster } from './toast-service'
import Button from '../button'

// ─── Story metadata ───────────────────────────────────────────────────────────
export default {
  title: 'design-components/Toaster',
  component: Toaster,
  argTypes: {
    // Toaster container props
    position: {
      control: { type: 'select' },
      options: ['top-center', 'top-right', 'top-left', 'bottom-center', 'bottom-right', 'bottom-left'],
      description: 'Position of the toast container on screen',
    },
    maxVisible: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of toasts visible at once',
    },
    // Toast content props
    title: {
      control: 'text',
      description: 'Toast title text',
    },
    description: {
      control: 'text',
      description: 'Optional supporting description below the title',
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual type variant — controls icon, border, and accent color',
    },
    closable: {
      control: 'boolean',
      description: 'Show the dismiss (×) button',
    },
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Auto-dismiss delay in ms. Set to 0 for persistent toast.',
    },
    // Primary button props
    primaryButtonText: {
      control: 'text',
      description: 'Primary button label. Leave blank to hide the button.',
    },
    primaryButtonDisabled: {
      control: 'boolean',
      description: 'Disable the primary button',
    },
    // Secondary button props
    secondaryButtonText: {
      control: 'text',
      description: 'Secondary button label. Leave blank to hide the button.',
    },
    secondaryButtonDisabled: {
      control: 'boolean',
      description: 'Disable the secondary button',
    },
  },
}

// ─── Playground ───────────────────────────────────────────────────────────────
// dismiss() before create() ensures only one toast is visible at a time.
export const Playground = ({
  position,
  maxVisible,
  title,
  description,
  type,
  closable,
  duration,
  primaryButtonText,
  primaryButtonDisabled,
  secondaryButtonText,
  secondaryButtonDisabled,
}) => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({
      title,
      // Empty string from the control is treated as "no description"
      description: description || undefined,
      type,
      closable,
      // duration === 0 means the control was left at its minimum — treat as
      // persistent
      duration: duration > 0 ? duration : null,
      primaryButton: primaryButtonText
        ? { text: primaryButtonText, onClick: () => console.log('Primary clicked'), disabled: primaryButtonDisabled }
        : undefined,
      secondaryButton: secondaryButtonText
        ? { text: secondaryButtonText, onClick: () => console.log('Secondary clicked'), disabled: secondaryButtonDisabled }
        : undefined,
    })
  }, [
    title, description, type, closable, duration,
    primaryButtonText, primaryButtonDisabled,
    secondaryButtonText, secondaryButtonDisabled,
  ])

  return <Toaster position={position} maxVisible={maxVisible} />
}

// Default control values shown in Storybook on first load
Playground.args = {
  position: 'top-center',
  maxVisible: 5,
  title: 'Profile access granted',
  description: '',
  type: 'success',
  closable: true,
  duration: 0,
  primaryButtonText: '',
  primaryButtonDisabled: false,
  secondaryButtonText: '',
  secondaryButtonDisabled: false,
}

// ─── Imperative API ───────────────────────────────────────────────────────────
// Demonstrates calling toaster.create / toaster.dismiss directly from button
// handlers
export const ImperativeAPI = () => {
  // Clear any leftover toasts from other stories on mount
  useEffect(() => { toaster.dismiss() }, [])
  return (
    <>
      <Toaster />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
        <Button variant="secondary" size="small" onClick={() => toaster.create({ title: 'Profile access granted', type: 'success', closable: true })}>
          Show Success
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({ title: 'Failed to withdraw access', type: 'error', closable: true })}>
          Show Error
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({ title: 'Session expiring in 5 minutes', type: 'warning', closable: true })}>
          Show Warning
        </Button>
        <Button variant="secondary" size="small" onClick={() => toaster.create({ title: 'Session will expire soon', type: 'info', closable: true })}>
          Show Info
        </Button>
        {/* No id passed — dismisses every active toast */}
        <Button variant="secondary" size="small" onClick={() => toaster.dismiss()}>
          Dismiss All
        </Button>
      </div>
    </>
  )
}

// ─── Type variant stories ─────────────────────────────────────────────────────
// Each story shows one toast with duration: null so it stays visible in the canvas

export const Success = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({ title: 'Profile access granted successfully', type: 'success', duration: null, closable: true })
  }, [])
  return <Toaster />
}

export const Error = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({ title: 'Failed to process request', type: 'error', duration: null, closable: true })
  }, [])
  return <Toaster />
}

export const Warning = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({ title: 'Session expiring in 5 minutes', type: 'warning', duration: null, closable: true })
  }, [])
  return <Toaster />
}

export const Info = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({ title: 'Your session expires in 5 minutes', type: 'info', duration: null, closable: true })
  }, [])
  return <Toaster />
}

// ─── Layout variant stories ───────────────────────────────────────────────────

// Description pushes action buttons below the title into their own row
export const WithDescription = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({
      title: 'Access request submitted',
      description: 'You will be notified once your request is approved.',
      type: 'success',
      duration: null,
      closable: true,
    })
  }, [])
  return <Toaster />
}

// Both primary and secondary buttons present — renders inline (no description)
export const WithButtons = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({
      title: 'Profile checkout requires approval',
      type: 'info',
      duration: null,
      closable: true,
      primaryButton: { text: 'View', onClick: () => console.log('View clicked') },
      secondaryButton: { text: 'Dismiss', onClick: () => toaster.dismiss() },
    })
  }, [])
  return <Toaster />
}

// Only a primary button — secondary slot is empty
export const WithPrimaryButtonOnly = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({
      title: 'Profile checkout requires approval',
      type: 'info',
      duration: null,
      closable: true,
      primaryButton: { text: 'View', onClick: () => console.log('View clicked') },
    })
  }, [])
  return <Toaster />
}

// Description + both buttons — buttons move to their own stacked row below
// the description
export const WithDescriptionAndButtons = () => {
  useEffect(() => {
    toaster.dismiss()
    toaster.create({
      title: 'Access request failed',
      description: 'Your request could not be processed. Please try again or contact support.',
      type: 'error',
      duration: null,
      closable: true,
      primaryButton: { text: 'Retry', onClick: () => console.log('Retry clicked') },
      secondaryButton: { text: 'Cancel', onClick: () => toaster.dismiss() },
    })
  }, [])
  return <Toaster />
}

// ─── Behaviour stories ────────────────────────────────────────────────────────

// Verifies the auto-dismiss timer; toast disappears after 2 s without user action
export const AutoDismiss = () => {
  const trigger = () => {
    toaster.dismiss()
    toaster.create({ title: 'This will dismiss in 2 seconds', type: 'success', duration: 2000 })
  }
  return (
    <>
      <Toaster />
      <div style={{ padding: 16 }}>
        <Button variant="secondary" size="small" onClick={trigger}>Trigger auto-dismiss toast (2s)</Button>
      </div>
    </>
  )
}

// Shows all four types simultaneously to verify stacking and maxVisible behaviour
export const Stacking = () => {
  const triggerAll = () => {
    toaster.dismiss()
    toaster.create({ title: 'Access granted', type: 'success', duration: null, closable: true })
    toaster.create({ title: 'Connection error', type: 'error', duration: null, closable: true })
    toaster.create({ title: 'Session expiring in 5 minutes', type: 'warning', duration: null, closable: true })
    toaster.create({ title: 'Session expiring soon', type: 'info', duration: null, closable: true })
  }
  return (
    <>
      <Toaster />
      <div style={{ padding: 16 }}>
        <Button variant="secondary" size="small" onClick={triggerAll}>Stack all four types</Button>
      </div>
    </>
  )
}

// Remounts Toaster with a new key when position changes so CSS positioning
// resets cleanly
export const Positions = () => {
  const [position, setPosition] = useState('top-center')
  const show = pos => {
    setPosition(pos)
    toaster.dismiss()
    toaster.create({ title: `Toast at ${pos}`, type: 'info', duration: 3000, closable: true })
  }
  return (
    <>
      {/* key forces a remount when position changes, avoiding stale placement */}
      <Toaster key={position} position={position} />
      <div style={{ display: 'flex', gap: 8, padding: 16 }}>
        {['top-center', 'top-right', 'top-left', 'bottom-center', 'bottom-right', 'bottom-left'].map(p => (
          <Button key={p} variant="secondary" size="small" onClick={() => show(p)}>{p}</Button>
        ))}
      </div>
    </>
  )
}

// ─── Dark theme ───────────────────────────────────────────────────────────────
// Toaster uses a portal, so DarkStorySurface's wrapper div is not an ancestor
// of the rendered toasts. Instead we create a data-theme="dark" DOM node and
// pass it as portalTarget — toasts render inside it and inherit dark CSS tokens.
export const DarkTheme = () => {
  // null until the effect appends the node; Toaster is not rendered until ready
  const [portalEl, setPortalEl] = useState(null)

  useEffect(() => {
    const el = document.createElement('div')
    el.setAttribute('data-theme', 'dark')
    document.body.appendChild(el)
    setPortalEl(el)
    toaster.dismiss()
    return () => {
      toaster.dismiss()
      document.body.removeChild(el)
    }
  }, [])

  const stackAll = () => {
    toaster.dismiss()
    toaster.create({ title: 'Access granted', type: 'success', duration: null, closable: true })
    toaster.create({ title: 'Request failed', type: 'error', duration: null, closable: true })
    toaster.create({ title: 'Session expiring in 5 minutes', type: 'warning', duration: null, closable: true })
    toaster.create({ title: 'Session expiring', type: 'info', duration: null, closable: true })
  }

  return (
    // data-theme="dark" + dark background gives the canvas the right visual context
    <div
      data-theme="dark"
      style={{ padding: 24, background: '#040520', borderRadius: 8, minHeight: 120, display: 'flex', gap: 8 }}
    >
      {portalEl && <Toaster portalTarget={portalEl} />}
      <Button variant="secondary" size="small" onClick={stackAll}>
        Stack all four types
      </Button>
      <Button variant="secondary" size="small" onClick={() => toaster.dismiss()}>
        Dismiss All
      </Button>
    </div>
  )
}

DarkTheme.storyName = 'Dark theme'
