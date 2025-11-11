/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, wait, waitFor } from '@testing-library/react';
import FileUpload from './';
import { UploadFormClasses } from './constants';

describe('File Upload component unit tests', () => {
  const uploadFormProps = {
    fileSizeLimitKb: 500,
    onChange: jest.fn(),
    savedFile: undefined,
  };

  it('To upload file if the size is correct.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />);

    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' });
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput
    )[0];

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } })
    );

    await waitFor(
      () =>
        document.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail
        )[0]
    );

    expect(
      document.getElementsByClassName(
        UploadFormClasses.uploadFormCompleteThumbnail
      )[0]
    ).toBeInTheDocument();
  });

  it('To fail when the file is greater than the size file limit size.', async () => {
    const modifiedSizeProps = { ...uploadFormProps, fileSizeLimitKb: 100 };
    const { container } = render(<FileUpload {...modifiedSizeProps} />);

    let largeImageString = '(⌐□_□)';
    for (let i = 0; i < 1000; i++) {
      largeImageString +=
        '(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)(⌐□_□)';
    }
    const file = new File([largeImageString], 'glasses.png', {
      type: 'image/png',
    });

    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput
    )[0];
    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } })
    );

    expect(uploadFormProps.onChange).toBeCalledTimes(0);

    await wait(
      () =>
        container.getElementsByClassName(
          UploadFormClasses.uploadFormContainer
        )[0]
    );

    expect(
      container.querySelector(
        `svg.${UploadFormClasses.uploadFormCompleteThumbnail}`
      )
    ).not.toBeInTheDocument();
  });

  it('To replace uploaded file on click if the size is less than provided limit.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />);
    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' });
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput
    )[0];

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } })
    );

    await waitFor(
      () =>
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail
        )[0]
    );

    const file1 = new File(['(⌐□_□⌐)'], 'pistons.png', { type: 'image/png' });

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file1] } })
    );

    await waitFor(
      () =>
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail
        )[0]
    );
  });

  it('To remove uploaded file on click if the size is correct.', async () => {
    const { container } = render(<FileUpload {...uploadFormProps} />);

    const file = new File(['(⌐□_□)'], 'glasses.png', { type: 'image/png' });
    const fileInput = container.getElementsByClassName(
      UploadFormClasses.uploadFormContainerInput
    )[0];

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } })
    );

    await waitFor(
      () =>
        container.getElementsByClassName(
          UploadFormClasses.uploadFormCompleteThumbnail
        )[0]
    );

    const removeFileButton = container.getElementsByClassName(
      UploadFormClasses.uploadFormCompleteReset
    )[0];
    fireEvent.click(removeFileButton);

    await waitFor(
      () =>
        document.getElementsByClassName(
          UploadFormClasses.uploadFormContainer
        )[0]
    );

    expect(
      document.getElementsByClassName(
        UploadFormClasses.uploadFormCompleteThumbnail
      )[0]
    ).toBeUndefined();
  });
});
