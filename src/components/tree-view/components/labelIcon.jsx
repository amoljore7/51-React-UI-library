import React from 'react'
import classNames from 'classnames';
import Tooltip from '../../tooltip';
import { TreeNodeClasses } from '../constants';
import folder from '../../../assets/icons/folder.svg'
import folderDisabled from '../../../assets/icons/folder-disabled.svg'
import leaf from '../../../assets/icons/hard-drive.svg'

export const LabelIcon = ({ isLeaf, iconSource, tooltip, useDefaultIcon = false, onClick, disabled = false }) => {
  const iconClasses = {
    [TreeNodeClasses.nodeIcon]: true,
    [TreeNodeClasses.nodeIconCursor]: typeof onClick === 'function',
  };
  const getImageElement = source => (
    <img
      className={classNames({ ...iconClasses })}
      src={source}
      onClick={() => {
        if (typeof onClick === 'function') onClick()
      }}
    />
  )

  if (!iconSource && !useDefaultIcon) {
    return null
  }

  let icon = useDefaultIcon ? (isLeaf ? leaf : folder) : iconSource
  icon = disabled ? (isLeaf ? leaf : folderDisabled) : icon

  if (tooltip) {
    return (
      <span data-testid={`tree-view-icon-tooltip-${tooltip}`}>
        <Tooltip title={tooltip} position="bottom">
          {getImageElement(icon)}
        </Tooltip>
      </span>
    )
  }

  return getImageElement(icon)
}
