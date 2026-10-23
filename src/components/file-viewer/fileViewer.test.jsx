 
import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import FileViewer from './'
import { classes } from './constants'



describe('File viewer unit tests', () => {
  it('File viewer is able to open given image', async () => {
    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' })
    const { getByText, findByAltText } = render(<FileViewer {...{file}}/>)
    const fileNameEl = getByText('glasses.png')
    expect(fileNameEl).toBeInTheDocument()

    // Wait for the FileReader to complete and the image preview to render
    const imageEl = await findByAltText('glasses.png')

    // Click the image preview to open fullscreen view
    fireEvent.click(imageEl)

    await waitFor(() => {
      expect(
        document.getElementsByClassName(
          classes.fullScreenContainer,
        )[0],
      ).toBeInTheDocument()
    })
  })
})