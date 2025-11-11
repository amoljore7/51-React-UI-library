import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LabelIcon } from '../components/labelIcon';
import azureIcon from '../../../assets/icons/azure.svg'

const setup = (props) => {
  const { queryByRole, queryByTestId} = render(<LabelIcon {...props} />);

  return { queryByRole, queryByTestId }
}

describe('LabelIcon tests.', () => {
  it('When the isLeaf and the useDefaultIcon props are true.', () => {
    const { queryByRole } = setup({
      isLeaf: true,
      useDefaultIcon: true,
    })

    expect(queryByRole('img').src).toBe('http://localhost/hard-drive.svg')
  })

  it('When the isLeaf is false and the useDefaultIcon is true.', () => {
    const { queryByRole } = setup({
      iconSource: false,
      useDefaultIcon: true,
    })

    expect(queryByRole('img').src).toBe('http://localhost/folder.svg')
  })

  it('When the iconSource is present.', () => {
    const { queryByRole } = setup({
      iconSource: azureIcon,
    })

    expect(queryByRole('img').src).toBe('http://localhost/azure.svg')
  })

  it('When the tooltip is present.', () => {
    const tooltipText = 'This is a tooltip text.'
    const { queryByRole, queryByTestId } = setup({
      iconSource: azureIcon,
      tooltip: tooltipText,
    })

    expect(queryByRole('img').src).toBe('http://localhost/azure.svg')
    expect(queryByTestId(`tree-view-icon-tooltip-${tooltipText}`)).toBeInTheDocument()
  })

  it('When the iconSource is not present, and the useDefaultIcon is false.', () => {
    const { queryByRole } = setup({
      useDefaultIcon: false
    })

    expect(queryByRole('img')).not.toBeInTheDocument()
  })
})
