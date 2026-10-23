import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import FileUploadRenderer from './components/FileUploadRenderer';
import { defaultFileSizeExceededMessage, defaultMaxFileSizeMessage, defaultUploadFailureMessage, defaultUploadPromptText } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n.bds-upload-form-container.bds-upload-form-container-error-border {\n  border-color: #da1e28;\n  border-width: 0.125rem;\n}\n\n.bds-upload-form-container {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  border: 0.0625rem solid var(--theme-border);\n  border-radius: 0.1875rem;\n  width: 30.625rem;\n  height: 14.875rem;\n  text-align: center;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 1rem 0;\n}\n.bds-upload-form-container .bds-upload-form-container-input-label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n}\n.bds-upload-form-container .bds-upload-form-container-input {\n  width: 100%;\n  height: 100%;\n  display: none;\n}\n.bds-upload-form-container .bds-upload-form-max-size-text {\n  display: flex;\n}\n.bds-upload-form-container .bds-upload-form-instruct-text {\n  display: flex;\n  color: var(--brand);\n}\n.bds-upload-form-container .bds-upload-form-error-text {\n  color: #da1e28;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.bds-upload-form-container .bds-upload-form-error-text .bds-upload-form-error-icon {\n  margin-right: 0.5rem;\n}\n.bds-upload-form-container .bds-upload-form-error-text-file {\n  display: flex;\n  width: fit-content;\n  max-width: 40%;\n}\n.bds-upload-form-container .bds-upload-form-error-text-file > span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  min-width: 0px;\n}\n\n.bds-upload-form-file-complete-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 1rem 0;\n  width: 30.625rem;\n  height: 14.875rem;\n  border: 0.0625rem solid var(--theme-border);\n  border-radius: 0.1875rem;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  color: var(--brand);\n  margin-bottom: 1rem;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-file-name {\n  font-family: \"OpenSansRegular\";\n  display: flex;\n  max-width: 9rem;\n  min-width: 0;\n  align-items: center;\n  justify-content: center;\n  color: var(--brand);\n  margin-right: 1rem;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-file-name > span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  min-width: 0px;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-reset {\n  color: var(--theme-text-primary);\n  display: flex;\n  align-items: center;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-replace {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  margin-right: 1rem;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-replace .bds-upload-form-container-input {\n  width: 100%;\n  height: 100%;\n  display: none;\n  width: 100%;\n  height: 100%;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-complete-file-container .bds-upload-form-complete-replace .bds-upload-form-container-input-label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  width: inherit;\n  height: inherit;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-file-complete {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-file-complete .bds-upload-form-file-complete-icon {\n  display: flex;\n  color: var(--theme-text-primary);\n  margin-top: 2rem;\n}\n.bds-upload-form-file-complete-container .bds-upload-form-file-complete .bds-upload-form-file-complete-thumbnail {\n  box-sizing: border-box;\n  display: flex;\n  color: var(--theme-text-primary);\n  margin-top: 2rem;\n  width: 7.5rem;\n  height: 7.5rem;\n  padding: 0.5rem;\n  object-fit: cover;\n}\n\n.bds-upload-form-dragged-over-container {\n  display: flex;\n  border: 0.125rem dashed var(--brand);\n  border-radius: 0.1875rem;\n  width: 30.625rem;\n  height: 14.875rem;\n  text-align: center;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 1rem 0;\n}\n.bds-upload-form-dragged-over-container .bds-upload-form-dragged-over {\n  display: flex;\n}\n\n[data-theme=dark] .bds-upload-form-container {\n  border-color: var(--theme-border);\n  background-color: var(--theme-content-bg);\n}\n[data-theme=dark] .bds-upload-form-container svg {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-upload-form-file-complete-container {\n  border-color: var(--theme-border);\n  background-color: var(--theme-content-bg);\n}\n[data-theme=dark] .bds-upload-form-complete-container .bds-upload-form-complete-file-icon,\n[data-theme=dark] .bds-upload-form-complete-container .bds-upload-form-complete-thumbnail {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-upload-form-dragged-over-container {\n  border-color: #1a94ff;\n  background-color: rgba(10, 11, 46, 0.5);\n}\n[data-theme=dark] .bds-upload-form-dragged-over-container svg {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-upload-form-file-complete .bds-upload-form-file-complete-icon {\n  color: var(--theme-text-primary);\n}\n[data-theme=dark] .bds-upload-form-complete-file-container .bds-upload-form-complete-reset {\n  color: var(--theme-text-primary);\n}";
  const fileName = "FileUpload_FileUpload_e946225f-bb80-4b8f-9ff9-41182f71a333";
  const element = document.querySelector("style[data-sass-component='FileUpload_FileUpload_e946225f-bb80-4b8f-9ff9-41182f71a333']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
const FileUpload = _ref => {
  let {
    uploadPromptText = defaultUploadPromptText,
    maxFileSizeMessage = defaultMaxFileSizeMessage,
    fileSizeExceededMessage = defaultFileSizeExceededMessage,
    uploadFailureMessage = defaultUploadFailureMessage,
    fileSizeLimitKb = 400,
    savedFile = null,
    onChange = () => {},
    onReset = () => {},
    errorBorder = false,
    width = ''
  } = _ref;
  const resolvedWidth = width && parseInt(width) < 270 ? '270px' : width || undefined;
  const [file, setFile] = useState(savedFile);
  const [base64File, setBase64File] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [otherErrors, setOtherError] = useState(false);
  const [formState, setFormState] = useState('input');
  useLayoutEffect(() => {
    if (file) {
      onChange(file);
      setFormState('save');
    }
  }, [file]);
  const stopDefaultBehavior = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const readFile = files => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onprogress = () => {
      // once loading a file reset to input mode
      setFormState('input');
      setFile(null);
      setBase64File(null);
    };
    fileReader.onload = progressEvent => {
      const dataLoadedInBytes = progressEvent.loaded;
      if (dataLoadedInBytes / 1000 <= fileSizeLimitKb) {
        setFile(files[0]);
        setBase64File(fileReader.result);
        setSizeError(false);
        setFormState('save');
      } else {
        setFormState('input');
        setFile(null);
        setBase64File(null);
        setSizeError(true);
        onChange(null);
      }
    };
    fileReader.onerror = () => {
      setFormState('input');
      setOtherError(true);
    };
  };
  useLayoutEffect(() => {
    if (savedFile) {
      readFile([savedFile]);
    } else {
      handleFileReset();
    }
  }, [savedFile]);
  const handleFileReset = () => {
    setFormState('input');
    setFile(null);
    setBase64File(null);
    onReset();
  };
  const handleFileDrop = e => {
    stopDefaultBehavior(e);
    readFile(e.dataTransfer.files);
  };
  const handleFileSelect = e => {
    stopDefaultBehavior(e);
    readFile(e.target.files);
  };
  const handleFileDragEnter = e => {
    stopDefaultBehavior(e);
    setFormState('drag');
  };
  const handleFileDragLeave = e => {
    stopDefaultBehavior(e);
    setFormState('input');
  };
  return /*#__PURE__*/_jsx(FileUploadRenderer, {
    handleFileDragEnter,
    handleFileDragLeave,
    handleFileDrop,
    handleFileSelect,
    handleFileReset,
    uploadPromptText,
    maxFileSizeMessage,
    fileSizeExceededMessage,
    fileSizeLimitKb,
    uploadFailureMessage,
    sizeError,
    otherErrors,
    file,
    base64File,
    formState,
    errorBorder,
    width: resolvedWidth
  });
};
FileUpload.propTypes = {
  uploadPromptText: PropTypes.string,
  maxFileSizeMessage: PropTypes.string,
  uploadFailureMessage: PropTypes.string,
  fileSizeExceededMessage: PropTypes.string,
  onChange: PropTypes.func,
  errorBorder: PropTypes.bool,
  width: PropTypes.string
};
export default FileUpload;