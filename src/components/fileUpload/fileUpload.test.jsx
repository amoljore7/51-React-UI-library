 
import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import FileUpload from './'
import { UploadFormClasses } from './constants'

// jsdom's FileReader.onload ProgressEvent always reports loaded=0, which
// breaks the component's file size validation. This mock wraps the real
// FileReader and provides the correct blob size in the onload event.
const OriginalFileReader = globalThis.FileReader

class PatchedFileReader {
  constructor() {
    this._real = new OriginalFileReader()
    this.result = null
    this.onload = null
    this.onprogress = null
    this.onerror = null
  }

  readAsDataURL(blob) {
    const self = this
    const blobSize = blob.size

    this._real.onprogress = function (_event) {
      if (self.onprogress) {
        self.onprogress(
          new ProgressEvent('progress', { loaded: blobSize, total: blobSize }),
        )
      }
    }

    this._real.onload = function () {
      self.result = self._real.result
      if (self.onload) {
        self.onload(
          new ProgressEvent('load', { loaded: blobSize, total: blobSize }),
        )
      }
    }

    this._real.onerror = function (event) {
      if (self.onerror) {
        self.onerror(event)
      }
    }

    this._real.readAsDataURL(blob)
  }
}

describe('File Upload component unit tests', () => {
  const uploadFormProps = {
    fileSizeLimitKb: 500,
    onChange: vi.fn(),
    savedFile: undefined,
  }

  beforeAll(() => {
    globalThis.FileReader = PatchedFileReader
  })

  afterAll(() => {
    globalThis.FileReader = OriginalFileReader
  })

  beforeEach(() => {
    uploadFormProps.onChange.mockClear()
  })

  it('To upload file if the size is correct.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />)

    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' })
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput,
    )[0]

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } }),
    )

    await waitFor(() => {
      expect(
        document.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail,
        )[0],
      ).toBeTruthy()
    })

    expect(
      document.getElementsByClassName(
        UploadFormClasses.uploadFormCompleteThumbnail,
      )[0],
    ).toBeInTheDocument()
  })

  it('To fail when the file is greater than the size file limit size.', async () => {
    const modifiedSizeProps = { ...uploadFormProps, fileSizeLimitKb: 100 }
    const { container } = render(<FileUpload {...modifiedSizeProps} />)

    let largeImageString = '(⌐□_□)'
    for (let i = 0; i < 1000; i++) {
      largeImageString +=
        '(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)'
    }
    const file = new File([largeImageString], 'glasses.png', {
      type: 'image/png',
    })

    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput,
    )[0]
    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } }),
    )

    await waitFor(() => {
      expect(
        container.getElementsByClassName(
          UploadFormClasses.uploadFormErrorText,
        )[0],
      ).toBeTruthy()
    })

    expect(
      container.getElementsByClassName(
        UploadFormClasses.uploadFormCompleteThumbnail,
      )[0],
    ).toBeUndefined()
  })

  it('To replace uploaded file on click if the size is less than provided limit.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />)
    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' })
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput,
    )[0]

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } }),
    )

    await waitFor(() => {
      expect(
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail,
        )[0],
      ).toBeTruthy()
    })

    const file1 = new File(['(⌐□_□⌐)'], 'pistons.png', { type: 'image/png' })

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file1] } }),
    )

    await waitFor(() => {
      expect(
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail,
        )[0],
      ).toBeTruthy()
    })
  })

  it('To remove uploaded file on click if the size is correct.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />)

    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' })
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput,
    )[0]

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } }),
    )

    await waitFor(() => {
      expect(
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail,
        )[0],
      ).toBeTruthy()
    })

    const removeFileButton = container.getElementsByClassName(
      UploadFormClasses.uploadFormCompleteReset,
    )[0].querySelector('svg')
    fireEvent.click(removeFileButton)

    await waitFor(() => {
      expect(
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail,
        )[0],
      ).toBeUndefined()
    })
  })
})
