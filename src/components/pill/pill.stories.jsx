import Pill from './pill'
import { DarkStorySurface } from '../../story-assets/story-theme'

export default {
  title: 'design-components/Pill',
  component: Pill,
}

export const RegularPill = {
  args: {
    label: 'Regular',
    onDelete: _event => alert('This Pill will be deleted'),
  },
}

export const PillWithBGColor = {
  args: {
    label: 'Regular',
    pillColor: '#4B0082',
  },
}

export const PillWithError = {
  args: {
    error: true,
    label: 'Error',
    onDelete: () => alert('This Pill will be deleted'),
  },
}

export const DisabledPill = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
}

export const ReadOnlyPill = {
  args: {
    readOnly: true,
    label: 'Read Only',
  },
}

export const RegularPillDark = {
  render: args => (
    <DarkStorySurface>
      <Pill {...args} />
    </DarkStorySurface>
  ),
  args: {
    label: 'Regular',
    onDelete: () => {},
  },
}

RegularPillDark.storyName = 'Regular (dark theme)'
