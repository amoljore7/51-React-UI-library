export const classes = {
  container: 'bds-file-upload-v2',
  label: 'bds-file-upload-v2__label',
  dropzone: 'bds-file-upload-v2__dropzone',
  dropzoneDragActive: 'bds-file-upload-v2__dropzone--drag-active',
  dropzoneError: 'bds-file-upload-v2__dropzone--error',
  dropzoneDisabled: 'bds-file-upload-v2__dropzone--disabled',
  input: 'bds-file-upload-v2__input',
  content: 'bds-file-upload-v2__content',
  icon: 'bds-file-upload-v2__icon',
  prompt: 'bds-file-upload-v2__prompt',
  hint: 'bds-file-upload-v2__hint',
  selected: 'bds-file-upload-v2__selected',
  thumbnail: 'bds-file-upload-v2__thumbnail',
  selectedName: 'bds-file-upload-v2__selected-name',
  actions: 'bds-file-upload-v2__actions',
  actionButton: 'bds-file-upload-v2__action',
  actionDisabled: 'bds-file-upload-v2__action--disabled',
  errorText: 'bds-file-upload-v2__error-text',
}

export const previewClasses = {
  portal: 'bds-file-preview-portal',
  overlay: 'bds-file-preview__overlay',
  dialog: 'bds-file-preview',
  header: 'bds-file-preview__header',
  title: 'bds-file-preview__title',
  body: 'bds-file-preview__body',
  tile: 'bds-file-preview__tile',
  image: 'bds-file-preview__image',
}

export const defaultIconSize = 16
export const deleteIconSize = 24
export const maximizeIconSize = 24
export const previewCloseIconSize = 12
export const defaultUploadPromptText = 'Upload file'
export const defaultFileSizeExceededMessage =
  'File size exceeds the maximum permissible limit'
export const defaultFileTypeMismatchMessage = 'File type is not supported'
// A stored asset whose URL carries no filename is shown without one, so the remove
// control needs a label that doesn't depend on having it.
export const defaultRemoveLabel = 'Remove file'
export const defaultViewLabel = 'View enlarged'
export const defaultPreviewTitle = 'Preview'
export const previewCloseLabel = 'Close preview'
export const previewCloseVariant = 'textOnly'
export const previewCloseSize = 'small'
export const rejectionReasons = {
  size: 'size',
  type: 'type',
}
export const dropzoneRole = 'button'
export const previewRole = 'dialog'
export const defaultTabIndex = 0
export const disabledTabIndex = -1
export const enterKey = 'Enter'
export const spaceKey = ' '
export const escapeKey = 'Escape'
export const dropzoneTestId = 'bds-file-upload-v2-dropzone'
export const inputTestId = 'bds-file-upload-v2-input'
export const removeTestId = 'bds-file-upload-v2-remove'
export const viewTestId = 'bds-file-upload-v2-view'
export const thumbnailTestId = 'bds-file-upload-v2-thumbnail'
export const previewTestId = 'bds-file-preview'
export const previewCloseTestId = 'bds-file-preview-close'
export const previewImageTestId = 'bds-file-preview-image'

// Only image files can be previewed; anything else keeps the filename-only row.
export const previewableTypePrefix = 'image/'
