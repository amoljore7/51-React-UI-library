import React from 'react'
import Button from '../button'
import ButtonGroup from './buttonGroup'
import { FaList, FaChartBar, FaTable } from 'react-icons/fa'

export default {
  title: 'design-components/ButtonGroup',
  component: ButtonGroup,
}

// Figma: buttonGroup - standard — primary + tint
export const StandardPrimaryTint = () => (
  <ButtonGroup color="tint">
    <Button variant="primary">One</Button>
    <Button variant="primary">Two</Button>
    <Button variant="primary">Three</Button>
  </ButtonGroup>
)

// Figma: buttonGroup - standard — primary + neutral
export const StandardPrimaryNeutral = () => (
  <ButtonGroup color="neutral">
    <Button variant="primary">One</Button>
    <Button variant="primary">Two</Button>
    <Button variant="primary">Three</Button>
  </ButtonGroup>
)

// Figma: buttonGroup - standard — secondary + tint
export const StandardSecondaryTint = () => (
  <ButtonGroup color="tint">
    <Button variant="secondary">One</Button>
    <Button variant="secondary">Two</Button>
    <Button variant="secondary">Three</Button>
  </ButtonGroup>
)

// Figma: buttonGroup - standard — secondary + neutral
export const StandardSecondaryNeutral = () => (
  <ButtonGroup color="neutral">
    <Button variant="secondary">One</Button>
    <Button variant="secondary">Two</Button>
    <Button variant="secondary">Three</Button>
  </ButtonGroup>
)

// Figma: buttonGroup - toggle (selection uses Button `toggled`; use secondary
// + toggled for filled active)
export const Toggle = () => (
  <ButtonGroup type="radio" color="neutral" onClick={value => console.log(value)}>
    <Button variant="secondary" value="list"><FaList /> List</Button>
    <Button variant="secondary" value="chart"><FaChartBar /> Chart</Button>
    <Button variant="secondary" value="table"><FaTable /> Table</Button>
  </ButtonGroup>
)

export const ToggleWithDefault = () => (
  <ButtonGroup type="radio" defaultValue="chart" color="neutral" onClick={value => console.log(value)}>
    <Button variant="secondary" value="list"><FaList /> List</Button>
    <Button variant="secondary" value="chart"><FaChartBar /> Chart</Button>
    <Button variant="secondary" value="table"><FaTable /> Table</Button>
  </ButtonGroup>
)

// Sizes (Figma: small / medium / large)
export const StandardSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
    <ButtonGroup size="small" color="tint">
      <Button variant="primary">Small</Button>
      <Button variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup size="medium" color="tint">
      <Button variant="primary">Medium</Button>
      <Button variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup size="large" color="tint">
      <Button variant="primary">Large</Button>
      <Button variant="primary">Group</Button>
    </ButtonGroup>
  </div>
)

// Dark theme
export const StandardOnDark = () => (
  <div data-theme="dark" style={{ padding: '16px', background: '#040520' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <ButtonGroup color="tint">
        <Button variant="primary">One</Button>
        <Button variant="primary">Two</Button>
        <Button variant="primary">Three</Button>
      </ButtonGroup>
      <ButtonGroup color="tint">
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </ButtonGroup>
      <ButtonGroup color="neutral">
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </ButtonGroup>
    </div>
  </div>
)

export const ToggleOnDark = () => (
  <div data-theme="dark" style={{ padding: '16px', background: '#040520' }}>
    <ButtonGroup type="radio" color="neutral" onClick={v => console.log(v)}>
      <Button variant="secondary" value="list"><FaList /> List</Button>
      <Button variant="secondary" value="chart"><FaChartBar /> Chart</Button>
      <Button variant="secondary" value="table"><FaTable /> Table</Button>
    </ButtonGroup>
  </div>
)

export const WithTooltip = () => (
  <ButtonGroup color="tint">
    <Button variant="primary" tooltipText="First">One</Button>
    <Button variant="primary" tooltipText="Second">Two</Button>
    <Button variant="primary" tooltipText="Third">Three</Button>
  </ButtonGroup>
)

// Per-button variants in one group
export const MixedVariants = () => (
  <ButtonGroup color="tint">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="textOnly">Tertiary</Button>
  </ButtonGroup>
)
