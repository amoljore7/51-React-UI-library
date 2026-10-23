import StatusBadge from './StatusBadge'
import SuccessIcon from '../../assets/icons/success.svg?react'
import ErrorIcon from '../../assets/icons/error.svg?react'
import WarningIcon from '../../assets/icons/warning.svg?react'
import InfoIcon from '../../assets/icons/info.svg?react'
import {
  CustomStoryDocument,
  CustomStorySurface,
  DarkStoryDocument,
} from '../../story-assets/story-theme'

export default {
  title: 'design-components/StatusBadge',
  component: StatusBadge,
}

const row = { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }
const stack = { display: 'flex', flexDirection: 'column', gap: '16px' }

const AllTypes = () => (
  <div style={row}>
    <StatusBadge type="success" label="Success" />
    <StatusBadge type="error" label="Failed" />
    <StatusBadge type="warning" label="Timed Out" />
    <StatusBadge type="info" label="In Progress" />
    <StatusBadge label="Draft" />
  </div>
)

const AllTypesWithIcons = () => (
  <div style={row}>
    <StatusBadge type="success" label="Success" icon={SuccessIcon} />
    <StatusBadge type="error" label="Failed" icon={ErrorIcon} />
    <StatusBadge type="warning" label="Timed Out" icon={WarningIcon} />
    <StatusBadge type="info" label="In Progress" icon={InfoIcon} />
    <StatusBadge label="Draft" icon={InfoIcon} />
  </div>
)

export const Types = () => <AllTypes />

export const WithIcon = () => <AllTypesWithIcons />

export const CustomHeight = () => (
  <div style={row}>
    <StatusBadge type="success" label="20px" height={20} />
    <StatusBadge type="success" label="28px" height={28} />
    <StatusBadge type="success" label="2rem" height="2rem" icon={SuccessIcon} />
  </div>
)

export const DarkTheme = () => (
  <DarkStoryDocument>
    <div style={stack}>
      <AllTypes />
      <AllTypesWithIcons />
    </div>
  </DarkStoryDocument>
)

export const CustomTheme = () => (
  <CustomStoryDocument>
    <CustomStorySurface>
      <div style={stack}>
        <AllTypes />
        <AllTypesWithIcons />
      </div>
    </CustomStorySurface>
  </CustomStoryDocument>
)
