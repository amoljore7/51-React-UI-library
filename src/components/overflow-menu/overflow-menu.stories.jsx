import OverflowMenu from './overflow-menu'
import { FiInfo, FiEdit2, FiTrash2, FiCopy, FiEye } from 'react-icons/fi'
import { defaultIconSize } from './constants'
import {
  DarkStorySurface,
  CustomStorySurface,
  CustomStoryDocument,
} from '../../story-assets/story-theme'

export default {
  title: 'design-components/OverflowMenu',
  component: OverflowMenu,
}

export const WithDefaultIcon = () => {
  const props = {
    options: [
      { title: 'Open' },
      { title: 'Add New Node under the same parent node' },
      { title: 'Rename', isDisabled: true },
      { separator: true },
      { title: 'Delete' },
      { title: 'Add Secret' },
      { title: 'Add policy' },
      { separator: true },
      { title: 'View Policy' },
    ],
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title
    },
  }

  return <OverflowMenu {...props} />
}

export const WithCustomIcon = () => {
  const props = {
    options: [
      { title: 'Open' },
      { title: 'Add New Node under the same parent node' },
      { title: 'Rename' },
      { separator: true },
      { title: 'Delete' },
      { title: 'Add Secret' },
      { title: 'Add policy' },
      { separator: true },
      { title: 'View Policy' },
    ],
    width: '300px',
    icon: <FiInfo size={defaultIconSize} />,
    onChange: (event, value) => console.log(value),
    getOptionLabel: function (option) {
      return option.title
    },
  }

  return <OverflowMenu {...props} />
}

export const WithIconsInOptions = () => {
  const props = {
    options: [
      { title: 'Rename', icon: <FiEdit2 size={defaultIconSize} /> },
      { title: 'View Policy', icon: <FiEye size={defaultIconSize} /> },
      { title: 'Copy', icon: <FiCopy size={defaultIconSize} /> },
      { separator: true },
      { title: 'Delete', icon: <FiTrash2 size={defaultIconSize} /> },
    ],
    onChange: (event, value) => console.log(value),
    getOptionLabel: option => option.title,
    getOptionIcon: option => option.icon,
  }

  return <OverflowMenu {...props} />
}

export const Disabled = () => {
  const props = {
    options: [
      { title: 'Open' },
      { title: 'Rename' },
      { separator: true },
      { title: 'Delete' },
    ],
    onChange: (event, value) => console.log(value),
    getOptionLabel: option => option.title,
    disabled: true,
  }

  return <OverflowMenu {...props} />
}

const ThemeShowcase = () => (
  <div style={{ display: 'flex', gap: '48px' }}>
    <WithDefaultIcon />
    <WithIconsInOptions />
    <Disabled />
  </div>
)

export const DarkTheme = () => (
  <DarkStorySurface>
    <ThemeShowcase />
  </DarkStorySurface>
)

DarkTheme.storyName = 'Dark theme'

// The options list is portaled to <body>, so the custom surface variables have to
// be set on <html> for the open menu to pick them up.
export const CustomTheme = () => (
  <CustomStoryDocument>
    <CustomStorySurface>
      <ThemeShowcase />
    </CustomStorySurface>
  </CustomStoryDocument>
)

CustomTheme.storyName = 'Custom theme'
