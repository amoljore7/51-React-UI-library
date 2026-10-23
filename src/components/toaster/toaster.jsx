import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { classes, positionToClass, defaultPosition, defaultMaxVisible, positions } from './constants'
import { subscribeToasts } from './toast-service'
import ToastItem from './toast-item'
import './toaster.scss'

const Toaster = ({ position = defaultPosition, maxVisible = defaultMaxVisible, portalTarget }) => {
  // Current list of active toasts
  const [toasts, setToasts] = useState([])

  // Subscribe to toast-service on mount; unsubscribes automatically on unmount
  useEffect(() => subscribeToasts(setToasts), [])

  // Enforce the cap — take only the most-recently added N toasts
  const visible = toasts.slice(-maxVisible)

  return ReactDOM.createPortal(
    <div className={classNames(classes.container, positionToClass[position])}>
      {visible.map(t => (
        <ToastItem
          key={t.id}
          id={t.id}
          title={t.title}
          description={t.description}
          type={t.type}
          closable={t.closable}
          primaryButton={t.primaryButton}
          secondaryButton={t.secondaryButton}
        />
      ))}
    </div>,
    portalTarget ?? document.body
  )
}

Toaster.propTypes = {
  position: PropTypes.oneOf(positions),
  maxVisible: PropTypes.number,
  portalTarget: PropTypes.instanceOf(Element),
}

export default Toaster
