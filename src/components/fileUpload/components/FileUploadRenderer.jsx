import React from 'react';
import FileDraggedOver from './FIleDraggedOver';
import FileInput from './FileInput';
import FileSave from './FileSave';

const FileUploadRenderer = ({
  handleFileDragEnter,
  handleFileDragLeave,
  handleFileDrop,
  handleFileSelect,
  handleFileReset,
  uploadPromptText,
  maxFileSizeMessage,
  fileSizeExceededMessage,
  uploadFailureMessage,
  fileSizeLimitKb,
  file,
  base64File,
  sizeError,
  otherErrors,
  formState,
  errorBorder,
  width,
}) => {
  switch (formState) {
    case 'input':
      return (
        <FileInput
          {...{
            handleFileSelect,
            handleFileDragEnter,
            uploadPromptText,
            maxFileSizeMessage,
            fileSizeExceededMessage,
            fileSizeLimitKb,
            uploadFailureMessage,
            sizeError,
            otherErrors,
            file,
            errorBorder,
            width,
          }}
        />
      );

    case 'save':
      return (
        <FileSave
          {...{ file, base64File, handleFileReset, handleFileSelect, width, }}
        />
      );

    case 'drag':
      return <FileDraggedOver {...{ handleFileDragLeave, handleFileDrop, width, }} />;
  }
};

export default FileUploadRenderer;
