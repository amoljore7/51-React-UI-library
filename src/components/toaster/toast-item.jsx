import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SuccessIcon from '../../assets/icons/success.svg?react'
import ErrorIcon from '../../assets/icons/error.svg?react'
import WarningIcon from '../../assets/icons/warning.svg?react'
import InfoIcon from '../../assets/icons/toast-info.svg?react'
import Close from '../../assets/icons/close.svg?react'
import Button from '../button'
import { toaster } from './toast-service'
import { classes, typeToClass } from './constants'

// Static map — avoids re-creating JSX nodes on every render
const iconByType = {
  success: <SuccessIcon aria-hidden="true" />,
  error: <ErrorIcon aria-hidden="true" />,
  warning: <WarningIcon aria-hidden="true" />,
  info: <InfoIcon aria-hidden="true" />,
}

// Shared prop shape reused by both primaryButton and secondaryButton
const buttonShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
})

// Thin wrapper so button rendering logic stays out of ToastItem
const ActionButton = ({ btn }) => (
  <Button
    variant="textOnly"
    size="small"
    onClick={btn.onClick}
    disabled={btn.disabled ?? false}
  >
    {btn.text}
  </Button>
)

const ToastItem = ({ id, title, description, type = 'info', closable, primaryButton, secondaryButton }) => {
  const hasDescription = Boolean(description)
  const hasButtons = Boolean(primaryButton || secondaryButton)

  const buttons = hasButtons && (
    <>
      {secondaryButton && <ActionButton btn={secondaryButton} />}
      {primaryButton && <ActionButton btn={primaryButton} />}
    </>
  )

  return (
    <div
      className={classNames(classes.toast, typeToClass[type])}
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
    >
      {/* Colored left bar — purely decorative, width/color set via CSS type modifier */}
      <div className={classes.accentBar} />
      <div className={classes.content}>
        <div className={classes.headRow}>
          <div className={classes.icon}>
            {iconByType[type]}
          </div>
          <span className={classes.title}>{title}</span>
          {/* Inline buttons only when there is no description; otherwise rendered below */}
          {!hasDescription && hasButtons && buttons}
          {closable && (
            <button
              className={classes.closeButton}
              aria-label="Dismiss"
              onClick={() => toaster.dismiss(id)}
            >
              <Close aria-hidden="true" />
            </button>
          )}
        </div>
        {description && <div className={classes.description}>{description}</div>}
        {/* Stacked button row — only shown when a description pushes buttons to their own row */}
        {hasDescription && hasButtons && (
          <div className={classes.buttons}>
            {buttons}
          </div>
        )}
      </div>
    </div>
  )
}

ToastItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  closable: PropTypes.bool,
  primaryButton: buttonShape,
  secondaryButton: buttonShape,
}

export default ToastItem
