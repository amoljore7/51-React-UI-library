import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import FileUploadTextIcon from '../../../assets/icons/file-upload-text.svg?react';
import Button from '../../button';
import Tooltip from '../../tooltip';
import Typography from '../../typography';
import { defaultIconSize, fileUploaded, replaceFile, UploadFormClasses } from '../constants';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FileSave = _ref => {
  let {
    file,
    base64File,
    handleFileReset,
    handleFileSelect,
    width
  } = _ref;
  const inputRef = useRef();
  return /*#__PURE__*/_jsxs("div", {
    className: UploadFormClasses.uploadFormCompleteContainer,
    style: width ? {
      width
    } : undefined,
    children: [/*#__PURE__*/_jsxs("div", {
      className: UploadFormClasses.uploadFormComplete,
      children: [!(file.type.startsWith('image') || file.type.startsWith('img')) && /*#__PURE__*/_jsx(FileUploadTextIcon, {
        className: UploadFormClasses.uploadFormCompleteFileIcon,
        role: "img",
        "aria-label": fileUploaded
      }), (file.type.startsWith('image') || file.type.startsWith('img')) && /*#__PURE__*/_jsx("img", {
        className: UploadFormClasses.uploadFormCompleteThumbnail,
        src: base64File
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: UploadFormClasses.uploadFormCompleteFileContainer,
      children: [/*#__PURE__*/_jsx(Tooltip, {
        title: file.name,
        position: "bottom",
        children: /*#__PURE__*/_jsx("div", {
          className: UploadFormClasses.uploadFormCompleteFileName,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "label1",
            children: file.name
          })
        })
      }), /*#__PURE__*/_jsx("div", {
        className: UploadFormClasses.uploadFormCompleteReplace,
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => {
            var _inputRef$current;
            inputRef === null || inputRef === void 0 || (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
          },
          variant: "secondary",
          size: "small",
          type: "reset",
          children: [/*#__PURE__*/_jsx("input", {
            id: "file-upload",
            className: UploadFormClasses.uploadFormContainerInput,
            type: "file",
            onChange: handleFileSelect,
            ref: inputRef
          }), /*#__PURE__*/_jsx("label", {
            htmlFor: "file-upload",
            className: UploadFormClasses.uploadFormContainerInputLabel
          }), replaceFile]
        })
      }), /*#__PURE__*/_jsx("div", {
        className: UploadFormClasses.uploadFormCompleteReset,
        children: /*#__PURE__*/_jsx(IoMdClose, {
          size: defaultIconSize,
          onClick: handleFileReset
        })
      })]
    })]
  });
};
export default FileSave;