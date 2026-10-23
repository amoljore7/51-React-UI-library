import React, { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import MaximizeIcon from '../../assets/icons/maximize.svg?react';
import UploadIcon from '../../assets/icons/upload-cloud.svg?react';
import Typography from '../typography';
import FilePreview from './components/FilePreview';
import { classes, defaultIconSize, maximizeIconSize, deleteIconSize, defaultUploadPromptText, defaultFileSizeExceededMessage, defaultFileTypeMismatchMessage, defaultRemoveLabel, defaultViewLabel, defaultPreviewTitle, rejectionReasons, dropzoneRole, defaultTabIndex, disabledTabIndex, enterKey, spaceKey, dropzoneTestId, inputTestId, removeTestId, viewTestId, thumbnailTestId } from './constants';
import { isPreviewableFile, matchesAccept } from './utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":root {\n  --brand: #181143;\n}\n\n@font-face {\n  font-family: \"OpenSansRegular\";\n  src: url(\"../assets/font/OpenSans-latin-normal.woff2\") format(\"woff2\");\n}\n:root {\n  --bds-file-upload-v2-bg: var(--theme-content-bg);\n  --bds-file-upload-v2-border: var(--theme-border);\n  --bds-file-upload-v2-border-active: var(--theme-text-primary);\n  --bds-file-upload-v2-label: var(--theme-text-primary);\n  --bds-file-upload-v2-prompt: var(--theme-text-secondary);\n  --bds-file-upload-v2-hint: var(--theme-text-secondary);\n  --bds-file-upload-v2-filename: var(--theme-text-primary);\n  --bds-file-upload-v2-thumbnail-border: var(--theme-border-subtle);\n  --bds-file-upload-v2-hover-bg: var(--theme-hover-bg);\n  --bds-file-upload-v2-disabled-text: var(--theme-text-placeholder);\n  --bds-file-upload-v2-disabled-border: var(--theme-separator);\n  --bds-file-upload-v2-error-border: #cf332b;\n  --bds-file-upload-v2-error-text: #cf332b;\n}\n\n[data-theme=light] {\n  --bds-file-upload-v2-bg: #ffffff;\n  --bds-file-upload-v2-border: #cdcdd2;\n  --bds-file-upload-v2-border-active: #181143;\n  --bds-file-upload-v2-label: #040520;\n  --bds-file-upload-v2-prompt: #686979;\n  --bds-file-upload-v2-hint: #686979;\n  --bds-file-upload-v2-filename: #040520;\n  --bds-file-upload-v2-thumbnail-border: #e6e6e9;\n  --bds-file-upload-v2-hover-bg: #f7f8f8;\n  --bds-file-upload-v2-disabled-text: #9b9ba6;\n  --bds-file-upload-v2-disabled-border: #e6e6e9;\n  --bds-file-upload-v2-error-border: #cf332b;\n  --bds-file-upload-v2-error-text: #cf332b;\n}\n\n[data-theme=dark] {\n  --bds-file-upload-v2-bg: transparent;\n  --bds-file-upload-v2-border: #686979;\n  --bds-file-upload-v2-border-active: #ffffff;\n  --bds-file-upload-v2-label: #ffffff;\n  --bds-file-upload-v2-prompt: #cdcdd2;\n  --bds-file-upload-v2-hint: #9b9ba6;\n  --bds-file-upload-v2-filename: #ffffff;\n  --bds-file-upload-v2-thumbnail-border: #686979;\n  --bds-file-upload-v2-hover-bg: #0a0b2e;\n  --bds-file-upload-v2-disabled-text: #686979;\n  --bds-file-upload-v2-disabled-border: rgba(255, 255, 255, 0.2);\n  --bds-file-upload-v2-error-border: #e2615a;\n  --bds-file-upload-v2-error-text: #eb8e89;\n}\n\n.bds-file-upload-v2 {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.bds-file-upload-v2__label {\n  color: var(--bds-file-upload-v2-label);\n  cursor: pointer;\n}\n.bds-file-upload-v2__dropzone {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 3.25rem;\n  padding: 0.75rem 1rem;\n  background-color: var(--bds-file-upload-v2-bg);\n  border: 0.0625rem dashed var(--bds-file-upload-v2-border);\n  border-radius: 0.75rem;\n  cursor: pointer;\n  outline: none;\n}\n.bds-file-upload-v2__dropzone:hover, .bds-file-upload-v2__dropzone:focus-visible {\n  background-color: var(--bds-file-upload-v2-hover-bg);\n  border-color: var(--bds-file-upload-v2-border-active);\n}\n.bds-file-upload-v2__dropzone--drag-active {\n  background-color: var(--bds-file-upload-v2-hover-bg);\n  border-color: var(--bds-file-upload-v2-border-active);\n}\n.bds-file-upload-v2__dropzone--error {\n  border-color: var(--bds-file-upload-v2-error-border);\n}\n.bds-file-upload-v2__dropzone--disabled {\n  cursor: not-allowed;\n  border-color: var(--bds-file-upload-v2-disabled-border);\n}\n.bds-file-upload-v2__dropzone--disabled:hover {\n  background-color: var(--bds-file-upload-v2-bg);\n  border-color: var(--bds-file-upload-v2-disabled-border);\n}\n.bds-file-upload-v2__dropzone--disabled .bds-file-upload-v2__content,\n.bds-file-upload-v2__dropzone--disabled .bds-file-upload-v2__selected,\n.bds-file-upload-v2__dropzone--disabled .bds-file-upload-v2__prompt,\n.bds-file-upload-v2__dropzone--disabled .bds-file-upload-v2__hint {\n  color: var(--bds-file-upload-v2-disabled-text);\n}\n.bds-file-upload-v2__dropzone--disabled .bds-file-upload-v2__actions {\n  color: var(--bds-file-upload-v2-filename);\n}\n.bds-file-upload-v2__input {\n  display: none;\n}\n.bds-file-upload-v2__content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.125rem;\n  text-align: center;\n  color: var(--bds-file-upload-v2-prompt);\n}\n.bds-file-upload-v2__icon {\n  flex-shrink: 0;\n}\n.bds-file-upload-v2__prompt {\n  font-size: 0.875rem;\n  line-height: 1rem;\n  letter-spacing: 0.32px;\n  color: var(--bds-file-upload-v2-prompt);\n}\n.bds-file-upload-v2__hint {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  letter-spacing: 0.32px;\n  color: var(--bds-file-upload-v2-hint);\n}\n.bds-file-upload-v2__selected {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 100%;\n  color: var(--bds-file-upload-v2-filename);\n}\n.bds-file-upload-v2__thumbnail {\n  flex-shrink: 0;\n  width: 1.5rem;\n  height: 1.5rem;\n  padding: 0.0625rem;\n  object-fit: contain;\n  border: 0.0625rem solid var(--bds-file-upload-v2-thumbnail-border);\n  border-radius: 0.25rem;\n}\n.bds-file-upload-v2__selected-name {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.bds-file-upload-v2__actions {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  gap: 0.5rem;\n}\n.bds-file-upload-v2__action {\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.bds-file-upload-v2__action--disabled {\n  color: var(--bds-file-upload-v2-disabled-text);\n  cursor: not-allowed;\n}\n.bds-file-upload-v2__error-text {\n  font-size: 0.75rem;\n  line-height: 1rem;\n  letter-spacing: 0.32px;\n  color: var(--bds-file-upload-v2-error-text);\n}";
  const fileName = "FileUploadV2_FileUploadV2_002f254d-39e6-4db0-8d55-a15a2bd171ed";
  const element = document.querySelector("style[data-sass-component='FileUploadV2_FileUploadV2_002f254d-39e6-4db0-8d55-a15a2bd171ed']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})(); // Compact single-row dropzone, inline-sized for form layouts — unlike `fileUpload`, a 490x238
// panel. Generates a unique input id so several can coexist on one page.
const FileUploadV2 = _ref => {
  let {
    label,
    previewLabel,
    promptText = defaultUploadPromptText,
    hintText,
    accept,
    maxFileSizeKb,
    file = null,
    previewUrl,
    showFileName = true,
    onChange = () => {},
    onReset = () => {},
    disabled = false,
    error = false,
    errorMessage,
    fileSizeExceededMessage = defaultFileSizeExceededMessage,
    fileTypeMismatchMessage = defaultFileTypeMismatchMessage,
    width
  } = _ref;
  const inputId = useId();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [rejection, setRejection] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const [previewFailed, setPreviewFailed] = useState(false);

  // see PAB-25977
  // Read as a `data:` URL rather than through `URL.createObjectURL`: deployments serve a
  // Content-Security-Policy whose `img-src` allows `data:` but not `blob:`, so an object URL is
  // blocked and the thumbnail renders broken.
  useEffect(() => {
    if (!isPreviewableFile(file)) {
      setLocalPreviewUrl(null);
      return undefined;
    }
    let active = true;
    const reader = new FileReader();
    reader.onload = () => active && setLocalPreviewUrl(reader.result);
    reader.onerror = () => active && setLocalPreviewUrl(null);
    reader.readAsDataURL(file);
    // Guards against a slow read landing after the next pick, which would show the wrong image.
    return () => {
      active = false;
    };
  }, [file]);
  const hasLocalFile = isPreviewableFile(file);
  const resolvedPreviewUrl = hasLocalFile ? localPreviewUrl : previewUrl;

  // A stored URL can 404 (asset deleted, signed link expired); fall back to the filename-only
  // row rather than leave a broken-image glyph.
  useEffect(() => {
    setPreviewFailed(false);
  }, [resolvedPreviewUrl]);
  const showThumbnail = Boolean(resolvedPreviewUrl) && !previewFailed;
  const hasError = error || Boolean(rejection);
  const rejectionMessages = {
    [rejectionReasons.size]: fileSizeExceededMessage,
    [rejectionReasons.type]: fileTypeMismatchMessage
  };
  const resolvedErrorMessage = rejection ? rejectionMessages[rejection] : errorMessage;
  const dropzoneClasses = {
    [classes.dropzone]: true,
    [classes.dropzoneDragActive]: isDragActive,
    [classes.dropzoneError]: hasError,
    [classes.dropzoneDisabled]: disabled
  };
  const stopDefaultBehavior = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  const reject = reason => {
    setRejection(reason);
    if (inputRef.current) inputRef.current.value = '';
    onChange(null);
  };
  const handleFiles = files => {
    const nextFile = files === null || files === void 0 ? void 0 : files[0];
    if (!nextFile) return;
    if (!matchesAccept(nextFile, accept)) {
      reject(rejectionReasons.type);
      return;
    }
    if (maxFileSizeKb && nextFile.size / 1000 > maxFileSizeKb) {
      reject(rejectionReasons.size);
      return;
    }
    setRejection(null);
    onChange(nextFile);
  };
  const openFilePicker = () => {
    var _inputRef$current;
    if (disabled) return;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.click();
  };
  const handleKeyDown = event => {
    if (event.key !== enterKey && event.key !== spaceKey) return;
    event.preventDefault();
    openFilePicker();
  };
  const handleDragEnter = event => {
    stopDefaultBehavior(event);
    if (disabled) return;
    setIsDragActive(true);
  };
  const handleDragLeave = event => {
    stopDefaultBehavior(event);
    setIsDragActive(false);
  };
  const handleDrop = event => {
    var _event$dataTransfer;
    stopDefaultBehavior(event);
    setIsDragActive(false);
    if (disabled) return;
    handleFiles((_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files);
  };
  const handleSelect = event => {
    handleFiles(event.target.files);
  };
  const handleRemove = event => {
    stopDefaultBehavior(event);
    if (disabled) return;
    setRejection(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange(null);
    onReset();
  };

  // Deliberately not gated on `disabled`: a read-only form still has to let the asset be
  // inspected, and the lightbox changes nothing.
  const handleView = event => {
    stopDefaultBehavior(event);
    setIsPreviewOpen(true);
  };
  return /*#__PURE__*/_jsxs("div", {
    ref: containerRef,
    className: classes.container,
    style: {
      width: width || undefined
    },
    children: [label && /*#__PURE__*/_jsx("label", {
      className: classes.label,
      htmlFor: inputId,
      children: /*#__PURE__*/_jsx(Typography, {
        variant: "label1",
        children: label
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: classNames(dropzoneClasses),
      role: dropzoneRole,
      tabIndex: disabled ? disabledTabIndex : defaultTabIndex,
      "aria-disabled": disabled,
      "data-testid": dropzoneTestId,
      onClick: openFilePicker,
      onKeyDown: handleKeyDown,
      onDragEnter: handleDragEnter,
      onDragOver: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      children: [/*#__PURE__*/_jsx("input", {
        id: inputId,
        ref: inputRef,
        type: "file",
        accept: accept,
        disabled: disabled,
        className: classes.input,
        "data-testid": inputTestId,
        onChange: handleSelect
      }), file ? /*#__PURE__*/_jsxs("div", {
        className: classes.selected,
        children: [showThumbnail && /*#__PURE__*/_jsx("img", {
          src: resolvedPreviewUrl,
          alt: "",
          "aria-hidden": true,
          className: classes.thumbnail,
          "data-testid": thumbnailTestId,
          onError: () => setPreviewFailed(true)
        }), showFileName && /*#__PURE__*/_jsx("span", {
          className: classes.selectedName,
          children: /*#__PURE__*/_jsx(Typography, {
            variant: "label1",
            children: file.name
          })
        }), /*#__PURE__*/_jsxs("span", {
          className: classes.actions,
          children: [showThumbnail && /*#__PURE__*/_jsx(MaximizeIcon, {
            width: maximizeIconSize,
            height: maximizeIconSize,
            role: dropzoneRole,
            tabIndex: defaultTabIndex,
            "aria-label": defaultViewLabel,
            className: classes.actionButton,
            "data-testid": viewTestId,
            onClick: handleView,
            onKeyDown: event => {
              if (event.key !== enterKey && event.key !== spaceKey) return;
              handleView(event);
            }
          }), /*#__PURE__*/_jsx(DeleteIcon, {
            width: deleteIconSize,
            height: deleteIconSize,
            role: dropzoneRole,
            "aria-label": file.name ? "Remove ".concat(file.name) : defaultRemoveLabel,
            className: classNames(classes.actionButton, {
              [classes.actionDisabled]: disabled
            }),
            "data-testid": removeTestId,
            onClick: handleRemove
          })]
        })]
      }) : /*#__PURE__*/_jsxs("div", {
        className: classes.content,
        children: [/*#__PURE__*/_jsx(UploadIcon, {
          className: classes.icon,
          width: defaultIconSize,
          height: defaultIconSize,
          "aria-hidden": true
        }), /*#__PURE__*/_jsx("span", {
          className: classes.prompt,
          children: promptText
        }), hintText && /*#__PURE__*/_jsx("span", {
          className: classes.hint,
          children: hintText
        })]
      })]
    }), hasError && resolvedErrorMessage && /*#__PURE__*/_jsx("div", {
      className: classes.errorText,
      children: resolvedErrorMessage
    }), isPreviewOpen && showThumbnail && /*#__PURE__*/_jsx(FilePreview, {
      title: previewLabel || label || (file === null || file === void 0 ? void 0 : file.name) || defaultPreviewTitle,
      src: resolvedPreviewUrl,
      themeSourceRef: containerRef,
      onClose: () => setIsPreviewOpen(false)
    })]
  });
};
FileUploadV2.propTypes = {
  label: PropTypes.string,
  previewLabel: PropTypes.string,
  promptText: PropTypes.string,
  hintText: PropTypes.string,
  accept: PropTypes.string,
  maxFileSizeKb: PropTypes.number,
  file: PropTypes.object,
  // Thumbnail source for an asset that is already stored, i.e. has no local `File` to read.
  previewUrl: PropTypes.string,
  showFileName: PropTypes.bool,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fileSizeExceededMessage: PropTypes.string,
  fileTypeMismatchMessage: PropTypes.string,
  width: PropTypes.string
};
export default FileUploadV2;