import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import CloseIcon from '../../../assets/icons/close-x.svg?react'
import Button from '../../button'
import Typography from '../../typography'
import { mountPortalRootWithThemeSync } from '../../../utils/resolve-portal-data-theme'
import {
  previewClasses as classes,
  previewCloseIconSize,
  previewCloseLabel,
  previewCloseSize,
  previewCloseTestId,
  previewCloseVariant,
  previewImageTestId,
  previewRole,
  previewTestId,
  escapeKey,
} from '../constants'
import './FilePreview.scss'

// Lightbox for the picked or stored asset. Portaled to `document.body` like the other overlays,
// so it needs the theme mirrored across explicitly.
const FilePreview = ({ title, src, onClose, themeSourceRef }) => {
  const [portalEl] = useState(() => document.createElement('div'))

  useEffect(() => {
    portalEl.className = classes.portal
    return mountPortalRootWithThemeSync(portalEl, themeSourceRef)
  }, [portalEl, themeSourceRef])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === escapeKey) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <>
      <div className={classes.overlay} onClick={onClose} />
      <div className={classes.dialog} role={previewRole} data-testid={previewTestId}>
        <div className={classes.header}>
          <span className={classes.title}>
            <Typography variant="heading5">{title}</Typography>
          </span>
          <Button
            variant={previewCloseVariant}
            size={previewCloseSize}
            iconOnly
            leftSVGIcon={
              <CloseIcon width={previewCloseIconSize} height={previewCloseIconSize} />
            }
            onClick={onClose}
            extraProps={{
              'aria-label': previewCloseLabel,
              'data-testid': previewCloseTestId,
            }}
          />
        </div>
        <div className={classes.body}>
          <div className={classes.tile}>
            <img
              src={src}
              alt={title}
              className={classes.image}
              data-testid={previewImageTestId}
            />
          </div>
        </div>
      </div>
    </>,
    portalEl,
  )
}

FilePreview.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  themeSourceRef: PropTypes.shape({ current: PropTypes.any }),
}

export default FilePreview
