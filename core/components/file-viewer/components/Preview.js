import React, { useEffect, useState, useRef } from 'react';
import { FiDownloadCloud } from 'react-icons/fi';
import FileUploadTextIcon from '../../../assets/icons/file-upload-text.svg?react';
import Typography from '../../typography';
import Tooltip from '../../tooltip';
import { classes, nonImageAltText } from '../constants';
import classNames from 'classnames';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Preview = _ref => {
  let {
    file,
    setIsOpen
  } = _ref;
  const [base64File, setBase64File] = useState(null);
  const [fileName, setFileName] = useState('');
  const downloadRef = useRef();
  useEffect(() => {
    if (file) {
      setFileName((file === null || file === void 0 ? void 0 : file.name) || '');
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setBase64File(fileReader.result);
      };
    }
  }, [file]);
  const onDownloadClick = () => {
    if (downloadRef !== null && downloadRef !== void 0 && downloadRef.current) {
      downloadRef.current.click();
    }
  };
  return file && /*#__PURE__*/_jsxs("div", {
    className: classes.previewContainer,
    children: [base64File && file.type.includes('image') && /*#__PURE__*/_jsx("img", {
      className: classes.previewImageContainer,
      src: base64File,
      alt: fileName,
      onClick: () => file.type.includes('image') && setIsOpen(true)
    }), !file.type.includes('image') && /*#__PURE__*/_jsx(FileUploadTextIcon, {
      className: classes.previewNonImageContainer,
      role: "img",
      "aria-label": nonImageAltText
    }), /*#__PURE__*/_jsx(Tooltip, {
      title: file.name,
      position: "top",
      children: /*#__PURE__*/_jsx("div", {
        className: classes.previewFileName,
        onClick: onDownloadClick,
        children: /*#__PURE__*/_jsx(Typography, {
          variant: "label1",
          children: fileName
        })
      })
    }), /*#__PURE__*/_jsx("a", {
      className: "file-viewer-download-link",
      ref: downloadRef,
      href: base64File,
      download: file.name
    })]
  });
};
export default Preview;