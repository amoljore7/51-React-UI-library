// Auto-dismiss delay in ms
export const DEFAULT_DURATION = 5000

// Single source for every BDS class name
export const classes = {
  // container + position
  container: 'bds-toaster',
  topCenter: 'bds-toaster--top-center',
  topRight: 'bds-toaster--top-right',
  topLeft: 'bds-toaster--top-left',
  bottomCenter: 'bds-toaster--bottom-center',
  bottomRight: 'bds-toaster--bottom-right',
  bottomLeft: 'bds-toaster--bottom-left',

  // toast structure
  toast: 'bds-toast',
  accentBar: 'bds-toast__accent',
  icon: 'bds-toast__icon',
  content: 'bds-toast__content',
  headRow: 'bds-toast__head-row',
  title: 'bds-toast__title',
  description: 'bds-toast__description',
  buttons: 'bds-toast__buttons',
  closeButton: 'bds-toast__close',

  // type modifiers
  toastSuccess: 'bds-toast--success',
  toastError: 'bds-toast--error',
  toastWarning: 'bds-toast--warning',
  toastInfo: 'bds-toast--info',
}

// Maps the type string prop to the corresponding CSS modifier class
export const typeToClass = {
  success: classes.toastSuccess,
  error: classes.toastError,
  warning: classes.toastWarning,
  info: classes.toastInfo,
}

// Maps the position string prop to the corresponding CSS modifier class
export const positionToClass = {
  'top-center': classes.topCenter,
  'top-right': classes.topRight,
  'top-left': classes.topLeft,
  'bottom-center': classes.bottomCenter,
  'bottom-right': classes.bottomRight,
  'bottom-left': classes.bottomLeft,
}

// Full list of positions — used for PropTypes validation and Storybook controls
export const positions = ['top-center', 'top-right', 'top-left', 'bottom-center', 'bottom-right', 'bottom-left']
export const defaultPosition = 'top-center'
// Caps how many toasts are rendered at once
export const defaultMaxVisible = 5
