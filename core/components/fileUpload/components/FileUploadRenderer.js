import React from 'react';
import FileDraggedOver from './FIleDraggedOver';
import FileInput from './FileInput';
import FileSave from './FileSave';
import { jsx as _jsx } from "react/jsx-runtime";
const FileUploadRenderer = _ref => {
  let {
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
    width
  } = _ref;
  switch (formState) {
    case 'input':
      return /*#__PURE__*/_jsx(FileInput, {
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
        width
      });
    case 'save':
      return /*#__PURE__*/_jsx(FileSave, {
        file,
        base64File,
        handleFileReset,
        handleFileSelect,
        width
      });
    case 'drag':
      return /*#__PURE__*/_jsx(FileDraggedOver, {
        handleFileDragLeave,
        handleFileDrop,
        width
      });
  }
};
export default FileUploadRenderer;