import React, { useEffect, useId, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import MaximizeIcon from '../../assets/icons/maximize.svg?react'
import UploadIcon from '../../assets/icons/upload-cloud.svg?react'
import Typography from '../typography'
import FilePreview from './components/FilePreview'
import {
  classes,
  defaultIconSize,
  maximizeIconSize,
  deleteIconSize,
  defaultUploadPromptText,
  defaultFileSizeExceededMessage,
  defaultFileTypeMismatchMessage,
  defaultRemoveLabel,
  defaultViewLabel,
  defaultPreviewTitle,
  rejectionReasons,
  dropzoneRole,
  defaultTabIndex,
  disabledTabIndex,
  enterKey,
  spaceKey,
  dropzoneTestId,
  inputTestId,
  removeTestId,
  viewTestId,
  thumbnailTestId,
} from './constants'
import { isPreviewableFile, matchesAccept } from './utils'
import './FileUploadV2.scss'

// Compact single-row dropzone, inline-sized for form layouts — unlike `fileUpload`, a 490x238
// panel. Generates a unique input id so several can coexist on one page.
const FileUploadV2 = ({
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
  width,
}) => {
  const inputId = useId()
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [rejection, setRejection] = useState(null)
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null)
  const [previewFailed, setPreviewFailed] = useState(false)

  // see PAB-25977
  // Read as a `data:` URL rather than through `URL.createObjectURL`: deployments serve a
  // Content-Security-Policy whose `img-src` allows `data:` but not `blob:`, so an object URL is
  // blocked and the thumbnail renders broken.
  useEffect(() => {
    if (!isPreviewableFile(file)) {
      setLocalPreviewUrl(null)
      return undefined
    }
    let active = true
    const reader = new FileReader()
    reader.onload = () => active && setLocalPreviewUrl(reader.result)
    reader.onerror = () => active && setLocalPreviewUrl(null)
    reader.readAsDataURL(file)
    // Guards against a slow read landing after the next pick, which would show the wrong image.
    return () => {
      active = false
    }
  }, [file])

  const hasLocalFile = isPreviewableFile(file)
  const resolvedPreviewUrl = hasLocalFile ? localPreviewUrl : previewUrl

  // A stored URL can 404 (asset deleted, signed link expired); fall back to the filename-only
  // row rather than leave a broken-image glyph.
  useEffect(() => {
    setPreviewFailed(false)
  }, [resolvedPreviewUrl])

  const showThumbnail = Boolean(resolvedPreviewUrl) && !previewFailed
  const hasError = error || Boolean(rejection)
  const rejectionMessages = {
    [rejectionReasons.size]: fileSizeExceededMessage,
    [rejectionReasons.type]: fileTypeMismatchMessage,
  }
  const resolvedErrorMessage = rejection ? rejectionMessages[rejection] : errorMessage

  const dropzoneClasses = {
    [classes.dropzone]: true,
    [classes.dropzoneDragActive]: isDragActive,
    [classes.dropzoneError]: hasError,
    [classes.dropzoneDisabled]: disabled,
  }

  const stopDefaultBehavior = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const reject = reason => {
    setRejection(reason)
    if (inputRef.current) inputRef.current.value = ''
    onChange(null)
  }

  const handleFiles = files => {
    const nextFile = files?.[0]
    if (!nextFile) return
    if (!matchesAccept(nextFile, accept)) {
      reject(rejectionReasons.type)
      return
    }
    if (maxFileSizeKb && nextFile.size / 1000 > maxFileSizeKb) {
      reject(rejectionReasons.size)
      return
    }
    setRejection(null)
    onChange(nextFile)
  }

  const openFilePicker = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  const handleKeyDown = event => {
    if (event.key !== enterKey && event.key !== spaceKey) return
    event.preventDefault()
    openFilePicker()
  }

  const handleDragEnter = event => {
    stopDefaultBehavior(event)
    if (disabled) return
    setIsDragActive(true)
  }

  const handleDragLeave = event => {
    stopDefaultBehavior(event)
    setIsDragActive(false)
  }

  const handleDrop = event => {
    stopDefaultBehavior(event)
    setIsDragActive(false)
    if (disabled) return
    handleFiles(event.dataTransfer?.files)
  }

  const handleSelect = event => {
    handleFiles(event.target.files)
  }

  const handleRemove = event => {
    stopDefaultBehavior(event)
    if (disabled) return
    setRejection(null)
    if (inputRef.current) inputRef.current.value = ''
    onChange(null)
    onReset()
  }

  // Deliberately not gated on `disabled`: a read-only form still has to let the asset be
  // inspected, and the lightbox changes nothing.
  const handleView = event => {
    stopDefaultBehavior(event)
    setIsPreviewOpen(true)
  }

  return (
    <div
      ref={containerRef}
      className={classes.container}
      style={{ width: width || undefined }}
    >
      {label && (
        <label className={classes.label} htmlFor={inputId}>
          <Typography variant="label1">{label}</Typography>
        </label>
      )}
      <div
        className={classNames(dropzoneClasses)}
        role={dropzoneRole}
        tabIndex={disabled ? disabledTabIndex : defaultTabIndex}
        aria-disabled={disabled}
        data-testid={dropzoneTestId}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className={classes.input}
          data-testid={inputTestId}
          onChange={handleSelect}
        />
        {file ? (
          <div className={classes.selected}>
            {showThumbnail && (
              <img
                src={resolvedPreviewUrl}
                alt=""
                aria-hidden
                className={classes.thumbnail}
                data-testid={thumbnailTestId}
                onError={() => setPreviewFailed(true)}
              />
            )}
            {showFileName && (
              <span className={classes.selectedName}>
                <Typography variant="label1">{file.name}</Typography>
              </span>
            )}
            <span className={classes.actions}>
              {showThumbnail && (
                <MaximizeIcon
                  width={maximizeIconSize}
                  height={maximizeIconSize}
                  role={dropzoneRole}
                  tabIndex={defaultTabIndex}
                  aria-label={defaultViewLabel}
                  className={classes.actionButton}
                  data-testid={viewTestId}
                  onClick={handleView}
                  onKeyDown={event => {
                    if (event.key !== enterKey && event.key !== spaceKey) return
                    handleView(event)
                  }}
                />
              )}
              <DeleteIcon
                width={deleteIconSize}
                height={deleteIconSize}
                role={dropzoneRole}
                aria-label={file.name ? `Remove ${file.name}` : defaultRemoveLabel}
                className={classNames(classes.actionButton, {
                  [classes.actionDisabled]: disabled,
                })}
                data-testid={removeTestId}
                onClick={handleRemove}
              />
            </span>
          </div>
        ) : (
          <div className={classes.content}>
            <UploadIcon
              className={classes.icon}
              width={defaultIconSize}
              height={defaultIconSize}
              aria-hidden
            />
            <span className={classes.prompt}>{promptText}</span>
            {hintText && <span className={classes.hint}>{hintText}</span>}
          </div>
        )}
      </div>
      {hasError && resolvedErrorMessage && (
        <div className={classes.errorText}>{resolvedErrorMessage}</div>
      )}
      {isPreviewOpen && showThumbnail && (
        <FilePreview
          title={previewLabel || label || file?.name || defaultPreviewTitle}
          src={resolvedPreviewUrl}
          themeSourceRef={containerRef}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  )
}

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
  width: PropTypes.string,
}

export default FileUploadV2
