import React from 'react';
import DraggedOverIcon from '../../../assets/icons/file-upload-dragged-over.svg?react';
import { UploadFormClasses } from '../constants';
import { jsx as _jsx } from "react/jsx-runtime";
const FileDraggedOver = _ref => {
  let {
    handleFileDragLeave,
    handleFileDrop,
    width
  } = _ref;
  return /*#__PURE__*/_jsx("div", {
    className: UploadFormClasses.uploadFormDraggedOverContainer,
    onDrop: handleFileDrop,
    onDragLeave: handleFileDragLeave
    // make it a valid on drop target
    ,
    onDragOver: e => e.preventDefault(),
    style: width ? {
      width
    } : undefined,
    children: /*#__PURE__*/_jsx(DraggedOverIcon, {
      className: UploadFormClasses.uploadFormDraggedOver,
      "aria-hidden": true,
      focusable: "false"
    })
  });
};
export default FileDraggedOver;