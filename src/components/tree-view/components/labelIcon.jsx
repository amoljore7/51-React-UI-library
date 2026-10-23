import React from 'react'
import classNames from 'classnames';
import Tooltip from '../../tooltip';
import { TreeNodeClasses } from '../constants';
import Folder from '../../../assets/icons/folder.svg?react'
import FolderDisabled from '../../../assets/icons/folder-disabled.svg?react'
import Leaf from '../../../assets/icons/hard-drive.svg?react'
import { renderSvgGraphic } from '../../../utils/renderSvgGraphic'

export const LabelIcon = ({ isLeaf, iconSource, tooltip, useDefaultIcon = false, onClick, disabled = false, iconClassName }) => {
  const iconClasses = {
    [TreeNodeClasses.nodeIcon]: true,
    [TreeNodeClasses.nodeIconCursor]: typeof onClick === 'function',
  };
  const getImageElement = (source) =>
    renderSvgGraphic(source, {
      className: classNames({ ...iconClasses }, iconClassName),
      onClick: () => {
        if (typeof onClick === 'function') onClick()
      },
      role: 'img',
    })

  if (!iconSource && !useDefaultIcon) {
    return null
  }

  let icon = useDefaultIcon ? (isLeaf ? Leaf : Folder) : iconSource
  icon = disabled ? (isLeaf ? Leaf : FolderDisabled) : icon

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
