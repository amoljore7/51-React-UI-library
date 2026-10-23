import Card from './card'
import britiveLogo from '../../story-assets/images/britive-logo.jpg'
import DetailsIcon from '../../story-assets/images/details.svg?react'
import { DarkStorySurface } from '../../story-assets/story-theme'

export default {
  title: 'design-components/Card',
  component: Card,
}

export const CardWithImageAndTitle = {
  args: {
    title: 'Static Secret Templates',
    image: DetailsIcon,
    clickHandler: event => {
      event.preventDefault()
      alert('Card with title Static Secret Templates has been clicked')
    },
  },
}

export const CardWithDisabled = {
  args: {
    title: 'Secret Governance',
    image: britiveLogo,
    disabled: true,
    clickHandler: event => {
      event.preventDefault()
      alert('Card with title Secret Governance has been clicked')
    },
  },
}

export const CardWithImageAndTitleDark = {
  render: args => (
    <DarkStorySurface>
      <Card {...args} />
    </DarkStorySurface>
  ),
  args: {
    ...CardWithImageAndTitle.args,
  },
}

CardWithImageAndTitleDark.storyName = 'Card with image (dark theme)'

export const CardWithDisabledDark = {
  render: args => (
    <DarkStorySurface>
      <Card {...args} />
    </DarkStorySurface>
  ),
  args: {
    ...CardWithDisabled.args,
  },
}

CardWithDisabledDark.storyName = 'Card disabled (dark theme)'
