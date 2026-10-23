import React from 'react'
import Button from './button.jsx'
import CircularIcon from '../../story-assets/icons/circle.svg?react'
import CancelRequestIcon from '../../story-assets/icons/cancelRequest.svg?react'
import { FaBeer } from 'react-icons/fa'

export default {
  title: 'design-components/Button',
  component: Button,
}

export const Primary = () => {
  return (
    <Button variant="primary" size="large" type="submit" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}

export const Secondary = () => {
  return (
    <Button variant="secondary" size="large" type="reset" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}

export const TextOnly = () => {
  return (
    <Button variant="textOnly" size="large" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}

export const Icon = () => {
  return (
    <Button variant="textOnly" size="large" onClick={() => alert('Button clicked')}>
      <FaBeer />
    </Button>
  )
}

export const Large = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}
export const Medium = () => {
  return (
    <Button variant="primary" size="medium" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}
export const Small = () => {
  return (
    <Button variant="primary" size="small" onClick={() => alert('Button clicked')}>
      Button
    </Button>
  )
}

export const RightIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      <CircularIcon aria-label="icon" style={{ marginRight: '0.5rem' }} />
      Button
    </Button>
  )
}

export const LeftIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      Button
      <CircularIcon aria-label="icon" style={{ marginLeft: '0.5rem' }} />
    </Button>
  )
}

export const BothIcon = () => {
  return (
    <Button variant="primary" size="large" onClick={() => alert('Button clicked')}>
      <CircularIcon aria-label="icon" style={{ marginRight: '0.5rem' }} />
      Button
      <CircularIcon aria-label="icon" style={{ marginLeft: '0.5rem' }} />
    </Button>
  )
}

export const PrimaryDisabled = () => {
  return (
    <Button variant="primary" size="medium" disabled={true}>
      Disabled
    </Button>
  )
}
export const SecondaryDisabled = () => {
  return (
    <Button variant="secondary" size="medium" disabled={true}>
      Disabled
    </Button>
  )
}
export const TextOnlyDisabled = () => {
  return (
    <Button variant="textOnly" size="medium" disabled={true}>
      Disabled
    </Button>
  )
}

export const LeftSVGIcon = () => {
  // use this to pass an svg icon as a prop
  // instead of adding it as a children
  return (
    <Button variant='primary' size='large' leftSVGIcon={CancelRequestIcon}>
      Withdraw Request
    </Button>
  )
}

export const RightSVGIcon = () => {
  // use this to pass an svg icon as a prop
  // instead of adding it as a children
  return (
    <Button variant='primary' size='large' rightSVGIcon={CancelRequestIcon}>
      Withdraw Request
    </Button>
  )
}

export const WithTooltip = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
    >
      Button
    </Button>
  )
}

export const WithTooltipWithIcon = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
    >
      <CircularIcon aria-label="icon" style={{ marginRight: '0.5rem' }} />
      Button
    </Button>
  )
}

export const WithTooltipWithSVGIcon = () => {
  return (
    <Button
      variant="primary"
      size="large"
      onClick={() => alert('Button clicked')}
      tooltipText="This is a tooltip text."
      tooltipPosition="right"
      leftSVGIcon={CancelRequestIcon}
    >
      Button
    </Button>
  )
}

export const WithTooltipDisabled = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '3rem' }}>
      {['primary', 'secondary', 'textOnly'].map(variant => (
        <Button
          key={variant}
          variant={variant}
          size="medium"
          disabled
          tooltipText="This action is not available right now."
          tooltipPosition="right"
        >
          {variant}
        </Button>
      ))}
    </div>
  )
}

// --- Figma: color variants (tint, neutral, negative, positive) ---
export const ColorTint = () => (
  <Button variant="primary" size="large" color="tint">
    Button
  </Button>
)

export const ColorNeutral = () => (
  <Button variant="primary" size="large" color="neutral">
    Button
  </Button>
)

export const ColorNegative = () => (
  <Button variant="primary" size="large" color="negative">
    Delete
  </Button>
)

export const ColorPositive = () => (
  <Button variant="primary" size="large" color="positive">
    Confirm
  </Button>
)

export const ColorMatrix = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
    <Button variant="primary" size="medium" color="tint">Primary Tint</Button>
    <Button variant="primary" size="medium" color="neutral">Primary Neutral</Button>
    <Button variant="primary" size="medium" color="negative">Primary Negative</Button>
    <Button variant="primary" size="medium" color="positive">Primary Positive</Button>
    <Button variant="secondary" size="medium" color="tint">Secondary Tint</Button>
    <Button variant="secondary" size="medium" color="neutral">Secondary Neutral</Button>
    <Button variant="secondary" size="medium" color="negative">Secondary Negative</Button>
    <Button variant="secondary" size="medium" color="positive">Secondary Positive</Button>
    <Button variant="textOnly" size="medium" color="tint">Tertiary Tint</Button>
    <Button variant="textOnly" size="medium" color="neutral">Tertiary Neutral</Button>
    <Button variant="textOnly" size="medium" color="negative">Tertiary Negative</Button>
    <Button variant="textOnly" size="medium" color="positive">Tertiary Positive</Button>
  </div>
)

// --- Dropdown, badge, loading ---
export const WithDropdown = () => (
  <Button variant="primary" size="large" dropdown>
    Actions
  </Button>
)

export const WithBadge = () => (
  <Button variant="primary" size="large" badge>
    Notifications
  </Button>
)

export const Loading = () => (
  <Button variant="primary" size="large" loading>
    Saving...
  </Button>
)

export const LoadingIconOnly = () => (
  <Button variant="primary" size="medium" leftSVGIcon={CancelRequestIcon} loading />
)

// --- Icon-only (inferred: no children + icon) ---
export const IconOnlyInferred = () => (
  <Button variant="primary" size="large" leftSVGIcon={CancelRequestIcon} />
)

// --- Toggle button (Figma buttonToggle) ---
export const Toggle = () => {
  const [on, setOn] = React.useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button
          variant="secondary"
          size="medium"
          color="tint"
          toggled={on}
          onClick={() => setOn(!on)}
        >
          {on ? 'Toggle on' : 'Toggle off'}
        </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="medium" color="tint" toggled={on}>Primary toggled</Button>
        <Button variant="secondary" size="medium" color="tint" toggled={on}>Secondary toggled</Button>
        <Button variant="textOnly" size="medium" color="tint" toggled={on}>Tertiary toggled</Button>
        <Button variant="secondary" size="medium" color="neutral" toggled={on}>Neutral toggled</Button>
        <Button variant="secondary" size="medium" color="negative" toggled={on}>Negative toggled</Button>
        <Button variant="secondary" size="medium" color="positive" toggled={on}>Positive toggled</Button>
      </div>
    </div>
  )
}

// --- Dark theme ---
export const DarkTheme = () => (
  <div data-theme="dark" style={{ padding: '24px', background: 'rgba(4, 5, 32, 1)', borderRadius: '8px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="medium" color="tint">Primary</Button>
        <Button variant="secondary" size="medium" color="tint">Secondary</Button>
        <Button variant="textOnly" size="medium" color="tint">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="medium" color="neutral">Neutral</Button>
        <Button variant="secondary" size="medium" color="neutral">Neutral</Button>
        <Button variant="textOnly" size="medium" color="neutral">Neutral</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="medium" color="neutral" disabled>Disabled</Button>
        <Button variant="secondary" size="medium" color="neutral" disabled>Disabled</Button>
        <Button variant="textOnly" size="medium" color="neutral" disabled>Disabled</Button>
      </div>
    </div>
  </div>
)
