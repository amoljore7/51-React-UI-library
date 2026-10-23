import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { renderSvgGraphic } from '../../utils/renderSvgGraphic'
import {
  classes,
  defaultIconSize,
  defaultStatusType,
  statusTypeList,
} from './constants'
import './status-badge.scss'

const StatusBadge = ({
  label,
  type = defaultStatusType,
  icon,
  iconSize = defaultIconSize,
  height,
  className,
  testId,
}) => {
  const hasLabel =
    label !== null &&
    label !== undefined &&
    label !== false &&
    !(typeof label === 'string' && label.trim() === '')

  if (!hasLabel && !icon) return null

  const iconNode = icon
    ? renderSvgGraphic(icon, {
      width: iconSize,
      height: iconSize,
      'aria-hidden': true,
      focusable: 'false',
    })
    : null

  return (
    <span
      className={classNames(classes.badge, `${classes.badge}--${type}`, className)}
      style={height ? { height } : undefined}
      // A badge is frequently rendered inside a clamped table cell, where the
      // label can be ellipsised before the row's own More/Less toggle appears.
      title={typeof label === 'string' ? label : undefined}
      data-testid={testId}
    >
      {iconNode && <span className={classes.icon}>{iconNode}</span>}
      {hasLabel && <span className={classes.label}>{label}</span>}
    </span>
  )
}

StatusBadge.propTypes = {
  label: PropTypes.node,
  type: PropTypes.oneOf(statusTypeList),
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element, PropTypes.string]),
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  testId: PropTypes.string,
}

export default StatusBadge
