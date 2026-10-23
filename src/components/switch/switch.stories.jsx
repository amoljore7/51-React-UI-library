import { useState } from 'react'
import Switch from './switch'

export default {
  title: 'design-components/Switch',
  component: Switch,
}

export const Default = () => {
  const [checked, setIsChecked] = useState(false)
  return (
    <Switch
      checked={checked}
      onToggle={() => setIsChecked(checked => !checked)}
    />
  )
}

export const WithLabel = () => {
  const [checked, setIsChecked] = useState(false)

  const label = {
    true: 'On',
    false: 'Off',
  }

  return (
    <Switch
      checked={checked}
      onToggle={checked => setIsChecked(!checked)}
      label={label[checked]}
    />
  )
}

export const Disabled = () => {
  return <Switch checked={false} disabled label='Off' />
}

export const DisabledWithChecked = () => {
  return <Switch checked={true} disabled label='Off' />
}

export const ErrorMessage = () => {
  const [checked, setIsChecked] = useState(false)
  return (
    <Switch
      checked={checked}
      onToggle={() => setIsChecked(checked => !checked)}
      error
      width={240}
      errorMessage='Something went wrong! Please try again after sometime.'
    />
  )
}

export const DarkTheme = () => {
  const [checked, setIsChecked] = useState(false)
  const label = { true: 'On', false: 'Off' }
  return (
    <div data-theme="dark" style={{ padding: '24px', background: '#040520', borderRadius: '8px' }}>
      <Switch
        checked={checked}
        onToggle={() => setIsChecked(c => !c)}
        label={label[checked]}
      />
    </div>
  )
}
