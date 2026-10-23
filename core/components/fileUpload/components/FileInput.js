import classNames from 'classnames';
import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import UploadIcon from '../../../assets/icons/cloud-upload.svg?react';
import Typography from '../../typography';
import { altTextFileUpload, defaultIconSize, imageRole, UploadFormClasses } from '../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FileInput = _ref => {
  let {
    handleFileDragEnter,
    handleFileSelect,
    uploadPromptText,
    maxFileSizeMessage,
    fileSizeExceededMessage,
    fileSizeLimitKb,
    uploadFailureMessage,
    sizeError,
    otherErrors,
    file,
    errorBorder = false,
    width
  } = _ref;
  const uploadFormContainer = {
    [UploadFormClasses.uploadFormContainer]: true,
    [UploadFormClasses.uploadFormErrorBorder]: errorBorder
  };
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(uploadFormContainer),
    onDragEnter: handleFileDragEnter,
    style: width ? {
      width
    } : undefined,
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: "file-upload",
      className: UploadFormClasses.uploadFormContainerInputLabel
    }), /*#__PURE__*/_jsx("input", {
      id: "file-upload",
      className: UploadFormClasses.uploadFormContainerInput,
      type: "file",
      onChange: handleFileSelect
    }), /*#__PURE__*/_jsx(UploadIcon, {
      role: imageRole,
      "aria-label": altTextFileUpload
    }), /*#__PURE__*/_jsx("div", {
      className: UploadFormClasses.uploadFormInstructText,
      children: /*#__PURE__*/_jsx(Typography, {
        variant: "heading6",
        children: uploadPromptText
      })
    }), !(sizeError || otherErrors) && /*#__PURE__*/_jsx("div", {
      className: UploadFormClasses.uploadFormMaxSizeText,
      children: /*#__PURE__*/_jsx(Typography, {
        variant: "label1",
        children: "".concat(maxFileSizeMessage, " ").concat(fileSizeLimitKb, " kb")
      })
    }), (sizeError || otherErrors) && /*#__PURE__*/_jsxs("div", {
      className: UploadFormClasses.uploadFormErrorText,
      children: [/*#__PURE__*/_jsx(IoWarningOutline, {
        size: defaultIconSize,
        className: UploadFormClasses.uploadErrorIcon
      }), sizeError && /*#__PURE__*/_jsx("div", {
        className: UploadFormClasses.uploadFormErrorTextFileName,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "helper1",
          children: (file === null || file === void 0 ? void 0 : file.name) || ''
        })
      }), "\xA0", /*#__PURE__*/_jsx(Typography, {
        variant: "helper1",
        children: sizeError ? "".concat(fileSizeExceededMessage, " (").concat(fileSizeLimitKb, "kb)") : uploadFailureMessage
      })]
    })]
  });
};
export default FileInput;