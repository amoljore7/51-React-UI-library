import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiLock } from 'react-icons/fi'
import DragAndDrop from '../../../assets/icons/drag-and-drop.svg?react'
import EyeIcon from '../../../assets/icons/eye.svg?react'
import EyeHiddenIcon from '../../../assets/icons/eye-hidden.svg?react'
import PinIcon from '../../../assets/icons/pin.svg?react'
import UnpinIcon from '../../../assets/icons/unpin.svg?react'
import ModalPopup from '../../modal-popup'
import {
  classes,
  columnDrawerFixedSectionText,
  columnDrawerPinnedSectionText,
  columnDrawerReorderSectionText,
  columnDrawerResetText,
  columnDrawerTitleText,
  showAllColumnsText,
} from '../constants'

const RowActions = ({ column, toggleVisibility, togglePin }) => (
  <span className={classes.columnDrawerRowActions}>
    {column.hideLocked ? (
      <span className={classes.columnDrawerRowActionDisabled}>
        <EyeHiddenIcon width={16} height={16} />
      </span>
    ) : column.canHide === false ? null : (
      <button
        type="button"
        className={classes.columnDrawerRowActionButton}
        onClick={() => toggleVisibility(column.columnKey)}
        title={column.hidden ? 'Show column' : 'Hide column'}
      >
        {column.hidden ? <EyeIcon width={16} height={16} /> : <EyeHiddenIcon width={16} height={16} />}
      </button>
    )}
    {column.pinLocked ? (
      <span className={classes.columnDrawerRowActionDisabled}>
        <PinIcon width={16} height={16} />
      </span>
    ) : (
      <button
        type="button"
        className={classes.columnDrawerRowActionButton}
        onClick={() => togglePin(column.columnKey, 'left')}
        title={column.pinned ? 'Unpin column' : 'Pin column'}
      >
        {column.pinned ? <UnpinIcon width={16} height={16} /> : <PinIcon width={16} height={16} />}
      </button>
    )}
  </span>
)

const PinnedRow = ({ column, toggleVisibility, togglePin }) => (
  <div
    className={classNames(classes.columnDrawerRow, {
      [classes.columnDrawerRowHidden]: column.hidden,
    })}
  >
    <span className={classes.columnDrawerLockIcon}>
      {column.pinLocked ? <FiLock size={14} /> : <PinIcon width={14} height={14} />}
    </span>
    <span className={classes.columnDrawerRowLabel}>{column.headerName}</span>
    <RowActions column={column} toggleVisibility={toggleVisibility} togglePin={togglePin} />
  </div>
)

const FixedRow = ({ column }) => (
  <div className={classes.columnDrawerRow}>
    <span className={classes.columnDrawerLockIcon}>
      <FiLock size={14} />
    </span>
    <span className={classes.columnDrawerRowLabel}>{column.headerName}</span>
  </div>
)

const DraggableRow = ({ column, toggleVisibility, togglePin }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column.columnKey })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(classes.columnDrawerRow, {
        [classes.columnDrawerRowDragging]: isDragging,
        [classes.columnDrawerRowHidden]: column.hidden,
      })}
    >
      <span className={classes.columnDrawerDragHandle} {...attributes} {...listeners}>
        <DragAndDrop aria-hidden focusable="false" />
      </span>
      <span className={classes.columnDrawerRowLabel}>{column.headerName}</span>
      <RowActions column={column} toggleVisibility={toggleVisibility} togglePin={togglePin} />
    </div>
  )
}

const ColumnSettingsDrawer = ({
  isOpen,
  onClose,
  orderedColumns,
  toggleVisibility,
  togglePin,
  reorderField,
  resetAll,
  showAll,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  if (!isOpen) return null

  const fixedColumns = orderedColumns.filter(column => column.hideLocked)
  const pinnedColumns = orderedColumns.filter(
    column => column.pinned && !column.hideLocked
  )
  const reorderableColumns = orderedColumns.filter(
    column => !column.pinned && !column.hideLocked
  )

  const handleDragEnd = event => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    reorderField(active.id, over.id)
  }

  const buttons = [
    { text: columnDrawerResetText, variant: 'secondary', size: 'small', onClick: resetAll },
    {
      text: showAllColumnsText,
      variant: 'secondary',
      size: 'small',
      onClick: showAll,
      disabled: !orderedColumns.some(column => column.hidden),
      testId: 'column-drawer-show-all',
    },
  ]

  return (
    <ModalPopup
      title={columnDrawerTitleText}
      onCancel={onClose}
      width={360}
      buttons={buttons}
    >
      <div className={classes.columnDrawerBody}>
        {Boolean(pinnedColumns.length) && (
          <div className={classes.columnDrawerSection}>
            <div className={classes.columnDrawerSectionTitle}>
              {columnDrawerPinnedSectionText}
            </div>
            {pinnedColumns.map(column => (
              <PinnedRow
                key={column.columnKey}
                column={column}
                toggleVisibility={toggleVisibility}
                togglePin={togglePin}
              />
            ))}
          </div>
        )}

        {Boolean(reorderableColumns.length) && (
          <div className={classes.columnDrawerSection}>
            <div className={classes.columnDrawerSectionTitle}>
              {columnDrawerReorderSectionText}
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={reorderableColumns.map(column => column.columnKey)}
                strategy={verticalListSortingStrategy}
              >
                {reorderableColumns.map(column => (
                  <DraggableRow
                    key={column.columnKey}
                    column={column}
                    toggleVisibility={toggleVisibility}
                    togglePin={togglePin}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}

        {Boolean(fixedColumns.length) && (
          <div className={classes.columnDrawerSection}>
            <div className={classes.columnDrawerSectionTitle}>
              {columnDrawerFixedSectionText}
            </div>
            {fixedColumns.map(column => (
              <FixedRow key={column.columnKey} column={column} />
            ))}
          </div>
        )}
      </div>
    </ModalPopup>
  )
}

ColumnSettingsDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  orderedColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  togglePin: PropTypes.func.isRequired,
  reorderField: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
}

export default ColumnSettingsDrawer
