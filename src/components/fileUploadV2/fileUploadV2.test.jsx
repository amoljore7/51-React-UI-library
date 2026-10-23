import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import FileUploadV2 from './FileUploadV2'
import {
  dropzoneTestId,
  inputTestId,
  removeTestId,
  viewTestId,
  thumbnailTestId,
  previewTestId,
  previewCloseTestId,
  previewImageTestId,
} from './constants'

const makeFile = (name = 'logo.svg', sizeInBytes = 1000, type = 'image/svg+xml') => {
  const file = new File(['x'], name, { type })
  Object.defineProperty(file, 'size', { value: sizeInBytes })
  return file
}

const drop = (dropzone, file) =>
  fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

describe('FileUploadV2 component', () => {
  it('should render label, prompt and hint text', () => {
    const { getByText } = render(
      <FileUploadV2
        label='Light logo'
        promptText='Upload light logo'
        hintText='PNG or SVG, under 1.5 MB'
      />,
    )

    expect(getByText('Light logo')).toBeInTheDocument()
    expect(getByText('Upload light logo')).toBeInTheDocument()
    expect(getByText('PNG or SVG, under 1.5 MB')).toBeInTheDocument()
  })

  it('should call onChange with the selected file', () => {
    const onChange = vi.fn()
    const file = makeFile()
    const { getByTestId } = render(<FileUploadV2 onChange={onChange} />)

    fireEvent.change(getByTestId(inputTestId), { target: { files: [file] } })

    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('should reject a file over maxFileSizeKb and surface the error', () => {
    const onChange = vi.fn()
    const { getByTestId, getByText } = render(
      <FileUploadV2
        onChange={onChange}
        maxFileSizeKb={1}
        fileSizeExceededMessage='Too large'
      />,
    )

    fireEvent.change(getByTestId(inputTestId), {
      target: { files: [makeFile('big.svg', 5000)] },
    })

    expect(onChange).toHaveBeenCalledWith(null)
    expect(getByText('Too large')).toBeInTheDocument()
  })

  it('should render the selected file name and reset it on remove', () => {
    const onChange = vi.fn()
    const onReset = vi.fn()
    const { getByText, getByTestId } = render(
      <FileUploadV2 file={makeFile('company-logo.svg')} onChange={onChange} onReset={onReset} />,
    )

    expect(getByText('company-logo.svg')).toBeInTheDocument()

    fireEvent.click(getByTestId(removeTestId))

    expect(onChange).toHaveBeenCalledWith(null)
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('should label the remove control when the stored asset has no filename', () => {
    const { getByTestId } = render(
      <FileUploadV2 file={{ name: '' }} previewUrl='/assets/logo.svg' />,
    )

    expect(getByTestId(removeTestId)).toHaveAttribute('aria-label', 'Remove file')
  })

  it('should render a thumbnail for an already-stored asset', () => {
    const { getByTestId } = render(
      <FileUploadV2 file={{ name: 'company-logo.svg' }} previewUrl='/assets/logo.svg' />,
    )

    expect(getByTestId(thumbnailTestId)).toHaveAttribute('src', '/assets/logo.svg')
  })

  it('should prefer the picked file over previewUrl for the thumbnail', async () => {
    const { findByTestId } = render(
      <FileUploadV2 file={makeFile()} previewUrl='/assets/old-logo.svg' />,
    )

    const thumbnail = await findByTestId(thumbnailTestId)
    expect(thumbnail.getAttribute('src')).toMatch(/^data:/)
  })

  it('should drop the thumbnail when the stored asset fails to load', () => {
    const { getByTestId, queryByTestId, getByText } = render(
      <FileUploadV2 file={{ name: 'company-logo.svg' }} previewUrl='/assets/gone.svg' />,
    )

    fireEvent.error(getByTestId(thumbnailTestId))

    expect(queryByTestId(thumbnailTestId)).not.toBeInTheDocument()
    expect(getByText('company-logo.svg')).toBeInTheDocument()
  })

  it('should preview a picked image whose type the browser did not report', async () => {
    const { findByTestId } = render(
      <FileUploadV2 file={makeFile('favicon.ico', 100, '')} />,
    )

    expect(await findByTestId(thumbnailTestId)).toBeInTheDocument()
  })

  it('should not preview a non-image file with no reported type', () => {
    const { queryByTestId } = render(
      <FileUploadV2 file={makeFile('archive.zip', 100, '')} />,
    )

    expect(queryByTestId(thumbnailTestId)).not.toBeInTheDocument()
  })

  it('should not render a thumbnail when no preview is available', () => {
    const { queryByTestId } = render(<FileUploadV2 file={{ name: 'report.pdf' }} />)

    expect(queryByTestId(thumbnailTestId)).not.toBeInTheDocument()
  })

  it('should not select a file when disabled', () => {
    const onChange = vi.fn()
    const { getByTestId } = render(<FileUploadV2 disabled onChange={onChange} />)

    drop(getByTestId(dropzoneTestId), makeFile())

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should reject a dropped file whose type is not accepted', () => {
    const onChange = vi.fn()
    const { getByTestId, getByText } = render(
      <FileUploadV2
        onChange={onChange}
        accept='image/png,image/svg+xml'
        fileTypeMismatchMessage='Unsupported format'
      />,
    )

    drop(getByTestId(dropzoneTestId), makeFile('notes.txt', 100, 'text/plain'))

    expect(onChange).toHaveBeenCalledWith(null)
    expect(getByText('Unsupported format')).toBeInTheDocument()
  })

  it('should accept a dropped file matching one of the accepted types', () => {
    const onChange = vi.fn()
    const file = makeFile('logo.webp', 100, 'image/webp')
    const { getByTestId } = render(
      <FileUploadV2 onChange={onChange} accept='image/png,image/webp' />,
    )

    drop(getByTestId(dropzoneTestId), file)

    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('should accept a dropped file by extension when the browser reports no type', () => {
    const onChange = vi.fn()
    const file = makeFile('favicon.ico', 100, '')
    const { getByTestId } = render(
      <FileUploadV2 onChange={onChange} accept='image/x-icon,.ico' />,
    )

    drop(getByTestId(dropzoneTestId), file)

    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('should accept any dropped file when no accept list is given', () => {
    const onChange = vi.fn()
    const file = makeFile('report.pdf', 100, 'application/pdf')
    const { getByTestId } = render(<FileUploadV2 onChange={onChange} />)

    drop(getByTestId(dropzoneTestId), file)

    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('should clear the type error once an accepted file is dropped', () => {
    const { getByTestId, queryByText } = render(
      <FileUploadV2 accept='image/png' fileTypeMismatchMessage='Unsupported format' />,
    )
    const dropzone = getByTestId(dropzoneTestId)

    drop(dropzone, makeFile('notes.txt', 100, 'text/plain'))
    expect(queryByText('Unsupported format')).toBeInTheDocument()

    drop(dropzone, makeFile('logo.png', 100, 'image/png'))
    expect(queryByText('Unsupported format')).not.toBeInTheDocument()
  })

  it('should hide the file name when showFileName is false', () => {
    const { queryByText, getByTestId } = render(
      <FileUploadV2 file={{ name: 'company-logo.svg' }} showFileName={false} />,
    )

    expect(queryByText('company-logo.svg')).not.toBeInTheDocument()
    expect(getByTestId(removeTestId)).toBeInTheDocument()
  })

  it('should offer the enlarge action only when a preview exists', () => {
    const { queryByTestId, rerender, getByTestId } = render(
      <FileUploadV2 file={{ name: 'report.pdf' }} />,
    )

    expect(queryByTestId(viewTestId)).not.toBeInTheDocument()

    rerender(
      <FileUploadV2 file={{ name: 'company-logo.svg' }} previewUrl='/assets/logo.svg' />,
    )

    expect(getByTestId(viewTestId)).toBeInTheDocument()
  })

  it('should open the preview with the label as its heading and close it again', () => {
    const { getByTestId, queryByTestId } = render(
      <FileUploadV2
        label='Light logo'
        file={{ name: 'company-logo.svg' }}
        previewUrl='/assets/logo.svg'
      />,
    )

    fireEvent.click(getByTestId(viewTestId))

    expect(getByTestId(previewTestId)).toHaveTextContent('Light logo')
    expect(getByTestId(previewImageTestId)).toHaveAttribute('src', '/assets/logo.svg')

    fireEvent.click(getByTestId(previewCloseTestId))

    expect(queryByTestId(previewTestId)).not.toBeInTheDocument()
  })

  it('should title the preview with previewLabel when the field has no label', () => {
    const { getByTestId } = render(
      <FileUploadV2
        previewLabel='Right-side panel'
        file={{ name: 'panel.png' }}
        previewUrl='/assets/panel.png'
      />,
    )

    fireEvent.click(getByTestId(viewTestId))

    expect(getByTestId(previewTestId)).toHaveTextContent('Right-side panel')
  })

  it('should still open the preview while disabled, but not remove the file', () => {
    const onChange = vi.fn()
    const { getByTestId } = render(
      <FileUploadV2
        disabled
        file={{ name: 'company-logo.svg' }}
        previewUrl='/assets/logo.svg'
        onChange={onChange}
      />,
    )

    fireEvent.click(getByTestId(removeTestId))
    expect(onChange).not.toHaveBeenCalled()

    fireEvent.click(getByTestId(viewTestId))
    expect(getByTestId(previewTestId)).toBeInTheDocument()
  })

  it('should give each instance a unique input id', () => {
    const { container } = render(
      <>
        <FileUploadV2 label='Light logo' />
        <FileUploadV2 label='Dark logo' />
      </>,
    )

    const ids = [...container.querySelectorAll('input[type="file"]')].map(input => input.id)

    expect(ids[0]).toBeTruthy()
    expect(ids[0]).not.toBe(ids[1])
  })
})
