import React from 'react'
import { render } from '@testing-library/react'
import { LabelIcon } from '../components/labelIcon'
import AzureIcon from '../../../assets/icons/azure.svg?react'

const setup = props => {
  const { queryByRole, queryByTestId, container } = render(<LabelIcon {...props} />)

  return { queryByRole, queryByTestId, container }
}

describe('LabelIcon tests.', () => {
  it('When the isLeaf and the useDefaultIcon props are true.', () => {
    const { container } = setup({
      isLeaf: true,
      useDefaultIcon: true,
    })

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('When the isLeaf is false and the useDefaultIcon is true.', () => {
    const { container } = setup({
      iconSource: false,
      useDefaultIcon: true,
    })

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('When the iconSource is present.', () => {
    const { container } = setup({
      iconSource: AzureIcon,
    })

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('When the tooltip is present.', () => {
    const tooltipText = 'This is a tooltip text.'
    const { queryByTestId, container } = setup({
      iconSource: AzureIcon,
      tooltip: tooltipText,
    })

    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(queryByTestId(`tree-view-icon-tooltip-${tooltipText}`)).toBeInTheDocument()
  })

  it('When the iconSource is not present, and the useDefaultIcon is false.', () => {
    const { container } = setup({
      useDefaultIcon: false,
    })

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})
