import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  actionColumnMinWidth,
  classes,
  columnMaxWidth,
  columnMinWidth,
  compactColumnWidth,
  resizerWidth,
  tabIndex,
} from '../constants'
import TableHeaderCell from './TableHeaderCell'

/**
 * Delta-from-anchor resize: new width = starting width ± mouse movement.
 * columnMaxWidth only caps growth for a column starting below it — a
 * percentage column is routinely already past it (e.g. 50% of 1200px), and
 * capping unconditionally would zero out growth and deadlock the handle.
 * Shrinking is never capped by columnMaxWidth, only by columnMinWidth.
 */
const resizeHelper = ({
  currentColumn,
  adjacentColumn,
  startCursorPosition,
  startCurrentWidth,
  startAdjacentWidth,
  currentCursorPosition,
}) => {
  const deltaMousePosition = currentCursorPosition - startCursorPosition

  if (Math.abs(deltaMousePosition) < 1) return

  const maxGrowth = Math.max(0, Math.min(
    startAdjacentWidth - columnMinWidth,
    startCurrentWidth < columnMaxWidth ? columnMaxWidth - startCurrentWidth : Infinity,
  ))
  const maxShrink = Math.max(0, startCurrentWidth - columnMinWidth)
  const delta = Math.min(Math.max(deltaMousePosition, -maxShrink), maxGrowth)

  if (delta === 0) return

  const proposedCurrent = startCurrentWidth + delta
  const proposedAdjacent = startAdjacentWidth - delta

  currentColumn.style.width = `${proposedCurrent}px`
  adjacentColumn.style.width = `${proposedAdjacent}px`
  // min-width tracks the same value: resizeHelper's own clamp above already
  // keeps proposedCurrent/proposedAdjacent at or above columnMinWidth, so
  // this can never block the width it's applied alongside.
  currentColumn.style.minWidth = `${proposedCurrent}px`
  adjacentColumn.style.minWidth = `${proposedAdjacent}px`
}

const TableHeader = ({
  columns,
  sortHandler,
  tableNode,
  pinnedOffsetNode,
  colRefs,
  resizableColumns,
  hideNewRowHeader,
  noHeaderBackground,
  toggleVisibility,
  togglePin,
  isActionColumnCollapsed,
  onToggleActionColumn,
  isNewRowTable = false,
  allRowsChecked,
  someRowsChecked,
  onCheckAll,
  checkAllDisabled,
  disableColumnManagement,
  widthResetKey = 0,
}) => {
  const [sortedColumn, setSortedColumn] = useState('')
  const headerSortHandler = (fieldName) => {
    sortedColumn !== fieldName && setSortedColumn(fieldName)
  }
  const headerRefsContainer = useRef([])
  /**
   * Rebuilt only when the column count changes — hiding, showing, or
   * reordering columns — reusing existing ref objects by position so each
   * still attaches to whatever <th> renders at that index.
   */
  if (headerRefsContainer.current.length !== columns.length) {
    headerRefsContainer.current = columns.map(
      (_, index) => headerRefsContainer.current[index] || { current: null }
    )
  }
  const headerRefs = headerRefsContainer.current
  const [resizerFocus, setResizerFocus] = useState(false)
  const [filterValues, setFilterValues] = useState({})
  const resizeRafRef = useRef(null)
  const resizeStartRef = useRef(null)
  /**
   * The width each column was last locked or dragged to, by columnKey —
   * declared or stretched alike. Pinning, unpinning, hiding and showing
   * re-apply it rather than re-measuring, so no column's width changes.
   */
  const columnWidthsRef = useRef(new Map())
  /**
   * Unpinned columns' widths without the shared-out spare room, by columnKey,
   * and the share each one was last given. Each lock rebuilds width as
   * natural + an even share, so columns hidden and shown in any order each
   * come back at their own width; storing the stretched width instead let a
   * column carry another hidden column's share around with it.
   */
  const naturalWidthsRef = useRef(new Map())
  const sharesRef = useRef(new Map())

  useEffect(() => () => {
    if (resizeRafRef.current != null) cancelAnimationFrame(resizeRafRef.current)
    resizeStartRef.current = null
  }, [])

  // Captures the drag's starting cursor position and both columns' widths
  // once per drag, keyed by index so a stale anchor (e.g. a missed mouseup)
  // can't get reused by a drag on a different handle.
  const resizeHandler = (event, index) => {
    if (!resizableColumns) return
    const currentColumn = headerRefs[index]?.current
    const adjacentColumn = headerRefs[index + 1]?.current

    if (!currentColumn || !adjacentColumn) return

    if (!resizeStartRef.current || resizeStartRef.current.index !== index) {
      const currentRect = currentColumn.getBoundingClientRect()
      const adjacentRect = adjacentColumn.getBoundingClientRect()
      resizeStartRef.current = {
        index,
        startCursorPosition: currentRect.right + window.scrollX - resizerWidth,
        startCurrentWidth: currentRect.width,
        startAdjacentWidth: adjacentRect.width,
      }
    }

    const { startCursorPosition, startCurrentWidth, startAdjacentWidth } = resizeStartRef.current

    resizeHelper({
      currentColumn,
      adjacentColumn,
      startCursorPosition,
      startCurrentWidth,
      startAdjacentWidth,
      currentCursorPosition: event.pageX,
    })
    const storeDraggedWidth = (col, el) => {
      const width = parseFloat(el.style.width)
      columnWidthsRef.current.set(col.columnKey, width)
      if (!col.pinned) {
        naturalWidthsRef.current.set(col.columnKey, width - (sharesRef.current.get(col.columnKey) ?? 0))
      }
    }
    storeDraggedWidth(columns[index], currentColumn)
    storeDraggedWidth(columns[index + 1], adjacentColumn)
    /**
     * Sticky mode uses separate header/body tables, so the body's <colgroup>
     * must stay synced with the header widths during resizing.
     */
    if (colRefs) {
      const currentCol = colRefs[index]?.current
      const adjacentCol = colRefs[index + 1]?.current
      if (currentCol) currentCol.style.width = currentColumn.style.width
      if (adjacentCol) adjacentCol.style.width = adjacentColumn.style.width
    }
    // Widths change directly in the DOM (no React re-render), so schedule
    // the sticky-offset recalc for next frame, once per frame, after the
    // new widths are actually applied.
    if (resizeRafRef.current == null) {
      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = null
        syncStickyOffsets()
      })
    }
  }

  // Belt-and-braces: also clear the anchor on any window mouseup, so a
  // clean drag end doesn't leave a stale anchor sitting around.
  useEffect(() => {
    const handleResizeEnd = () => {
      resizeStartRef.current = null
    }
    window.addEventListener('mouseup', handleResizeEnd)
    return () => window.removeEventListener('mouseup', handleResizeEnd)
  }, [])

  // columns gets a new reference on any column-state render, even ones that
  // don't affect stickiness — depend on this key/pinned signature instead
  // (width changes are already picked up by the ResizeObserver below).
  const stickySignature = columns.map(col => `${col.columnKey}:${col.pinned}`).join('|')

  const syncStickyOffsets = useCallback(() => {
    const tableElement = tableNode?.current
    if (!tableElement) return
   /**
    * Sticky mode uses separate header/body tables, so pinned offsets must be
    * written to their shared ancestor instead of the header table.
    */
    const offsetTarget = pinnedOffsetNode?.current ?? tableElement

    // Left-pinned columns: offset = sum of actual widths of preceding left-pinned cols
    let leftOffset = 0
    columns.forEach((col, index) => {
      if (col.pinned !== 'left') return
      const el = headerRefs[index]?.current
      if (!el) return
      offsetTarget.style.setProperty(`--bds-col-sticky-${col.columnKey}`, `${leftOffset}px`)
      // Pinned columns skip lockUnpinnedColumnWidths entirely (by design —
      // see that function), so this is the only place their width would
      // ever reach the body's <colgroup> in stickyHeader mode.
      if (colRefs?.[index]?.current) colRefs[index].current.style.width = `${el.offsetWidth}px`
      leftOffset += el.offsetWidth
    })

    // Right-pinned columns: offset = sum of actual widths of following right-pinned cols
    let rightOffset = 0
    ;[...columns].reverse().forEach((col, revIdx) => {
      if (col.pinned !== 'right') return
      const idx = columns.length - 1 - revIdx
      const el = headerRefs[idx]?.current
      if (!el) return
      offsetTarget.style.setProperty(`--bds-col-sticky-${col.columnKey}`, `${rightOffset}px`)
      if (colRefs?.[idx]?.current) colRefs[idx].current.style.width = `${el.offsetWidth}px`
      rightOffset += el.offsetWidth
    })

    // The column scroll buttons sit just inside the pinned groups, outside
    // the table, so their offsets go on the container.
    const container = tableElement.closest(`.${classes.container}`)
    container?.style.setProperty('--bds-table-pinned-left-width', `${leftOffset}px`)
    container?.style.setProperty('--bds-table-pinned-right-width', `${rightOffset}px`)
  }, [stickySignature, tableNode, pinnedOffsetNode, colRefs])

// Lock unpinned columns to their current width.
  const lockedSignatureRef = useRef(null)
  // Widths from the first lock, which Reset restores.
  const initialWidthsRef = useRef(null)
  const initialNaturalWidthsRef = useRef(null)

 // Track only columns locked by this hook.
  const lockedElementsRef = useRef(new WeakSet())
  const lockUnpinnedColumnWidths = useCallback(() => {
    const tableElement = tableNode?.current
    if (!tableElement || lockedSignatureRef.current === stickySignature) return
    const getDeclaredPx = col => typeof col.width === 'number'
      ? col.width
      : typeof col.width === 'string' && col.width.trim().endsWith('px')
        ? parseFloat(col.width)
        : null
    const getStoredWidth = col => (col.isActions || col.isCompact
      ? null
      : columnWidthsRef.current.get(col.columnKey) ?? null)
  /**
   * Reset previously locked %/auto columns before measuring them again.
   * This prevents stale px widths from affecting the next lock after
   * columns are hidden, shown, or reordered.
   * Fixed px columns are skipped because their declared width is used directly.
   */
    columns.forEach((col, index) => {
      const el = headerRefs[index]?.current
      if (!el || col.pinned || !lockedElementsRef.current.has(el)) return
      if (getDeclaredPx(col) != null || getStoredWidth(col) != null) return
      const resetWidth = typeof col.width === 'number' ? `${col.width}px` : (col.width ?? '')
      el.style.width = resetWidth
      el.style.minWidth = col.isCompact ? '0' : `${columnMinWidth}px`
      if (colRefs?.[index]?.current) colRefs[index].current.style.width = resetWidth
    })

    columns.forEach((col, index) => {
      const el = headerRefs[index]?.current
      if (!el || !col.pinned) return
      const storedWidth = getStoredWidth(col)
      if (storedWidth != null) {
        el.style.width = `${storedWidth}px`
        el.style.minWidth = `${storedWidth}px`
        if (colRefs?.[index]?.current) colRefs[index].current.style.width = `${storedWidth}px`
        lockedElementsRef.current.add(el)
        return
      }
      // Restore the original width when a locked column is pinned.
      if (lockedElementsRef.current.has(el)) {
        // React treats numeric widths as px.
        const cssWidth = typeof col.width === 'number' ? `${col.width}px` : (col.width ?? '')
        el.style.width = cssWidth
        el.style.minWidth = col.isActions
          ? (isActionColumnCollapsed ? compactColumnWidth : (cssWidth || actionColumnMinWidth))
          : col.isCompact
            ? '0'
            : `${columnMinWidth}px`
        lockedElementsRef.current.delete(el)
      }
    })

    /**
     * Pass 1: calculate base widths from declared values or rendered widths,
     * while using declared widths for pinned/actions columns to avoid baking
     * their incorrect stretched widths into the total.
     */
    let pinnedTotal = 0
    const eligible = []
    columns.forEach((col, index) => {
      const el = headerRefs[index]?.current
      if (!el) return
      if (col.pinned) {
        pinnedTotal += getStoredWidth(col)
          ?? getDeclaredPx(col)
          ?? (col.isActions ? parseFloat(actionColumnMinWidth) : columnMinWidth)
        return
      }
      const declaredPx = getDeclaredPx(col)
      const baseWidth = naturalWidthsRef.current.get(col.columnKey) ?? Math.floor(Math.max(
        columnMinWidth,
        declaredPx ?? el.getBoundingClientRect().width,
      ))
      eligible.push({ index, el, col, baseWidth })
    })

    /**
     * Pass 2: give every unpinned column its natural width plus an even share
     * of the spare room, so the browser can't hand it out proportionally.
     * Rebuilt from scratch each lock, so it's the same whatever order columns
     * were hidden, shown, pinned or unpinned in. When the natural widths don't
     * fit, there's no share and the table scrolls rather than squeezing them.
     *
     * The scroll container, not the table: once a shown column has pushed the
     * table past it, the table's own width is just the overflowing sum.
     * Floored from getBoundingClientRect, never offsetWidth: offsetWidth
     * rounds, and three 190.67px columns read as 191 overflow by a pixel.
     */
    const container = tableElement.parentElement
    const availableWidth = Math.floor(container.getBoundingClientRect().width)
      - (container.offsetWidth - container.clientWidth)
    const spare = availableWidth - Math.ceil(pinnedTotal)
      - eligible.reduce((sum, { baseWidth }) => sum + baseWidth, 0)
    const share = spare > 0 && eligible.length ? Math.floor(spare / eligible.length) : 0
    // Leftover whole pixels go to the last column.
    const remainder = spare > 0 ? spare - share * eligible.length : 0

    eligible.forEach(({ index, el, col, baseWidth }, i) => {
      const columnShare = share + (i === eligible.length - 1 ? remainder : 0)
      // columnMinWidth, not the declared width: a drag may go below that.
      const lockedWidth = Math.max(columnMinWidth, Math.floor(baseWidth + columnShare))
      const width = `${lockedWidth}px`
      el.style.width = width
      el.style.minWidth = width
      lockedElementsRef.current.add(el)
      if (colRefs?.[index]?.current) colRefs[index].current.style.width = width
      columnWidthsRef.current.set(col.columnKey, lockedWidth)
      naturalWidthsRef.current.set(col.columnKey, baseWidth)
      sharesRef.current.set(col.columnKey, columnShare)
    })
    if (initialWidthsRef.current == null) {
      initialWidthsRef.current = new Map(columnWidthsRef.current)
      initialNaturalWidthsRef.current = new Map(naturalWidthsRef.current)
    }
    lockedSignatureRef.current = stickySignature
  }, [stickySignature, tableNode, colRefs])

  /**
   * Reset in the column drawer restores column state, but widths live here:
   * without this, every column would keep the width it had just before Reset
   * (dragged, or grown by a hide). Put back the first lock's widths and lock
   * again; spare room from a since-widened viewport is still shared out.
   */
  const lastWidthResetKeyRef = useRef(widthResetKey)
  useLayoutEffect(() => {
    if (widthResetKey === lastWidthResetKeyRef.current) return
    lastWidthResetKeyRef.current = widthResetKey
    if (!initialWidthsRef.current) return
    columnWidthsRef.current = new Map(initialWidthsRef.current)
    naturalWidthsRef.current = new Map(initialNaturalWidthsRef.current)
    lockedSignatureRef.current = null
    lockUnpinnedColumnWidths()
    syncStickyOffsets()
  }, [widthResetKey, lockUnpinnedColumnWidths, syncStickyOffsets])

  // One observer for the whole table (not per cell), catching a window
  // resize or reflow that changes rendered width without any prop changing.
  // Retries next frame if tableNode hasn't attached yet at setup time,
  // rather than silently never observing anything.
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    let observer
    let rafId
    const trySetup = () => {
      const tableElement = tableNode?.current
      if (!tableElement) {
        rafId = requestAnimationFrame(trySetup)
        return
      }
      observer = new ResizeObserver(() => {
        lockUnpinnedColumnWidths()
        syncStickyOffsets()
      })
      observer.observe(tableElement)
    }
    trySetup()
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      observer?.disconnect()
    }
  }, [tableNode, syncStickyOffsets, lockUnpinnedColumnWidths])

  useLayoutEffect(() => {
    lockUnpinnedColumnWidths()
    syncStickyOffsets()
  }, [syncStickyOffsets, lockUnpinnedColumnWidths])

  return (
    <thead tabIndex={tabIndex}>
      <tr
        tabIndex={tabIndex}
        className={classes.header}
        onMouseLeave={() => setResizerFocus(false)}
        onMouseOver={() => setResizerFocus(true)}
      >
        {columns &&
          columns.map((column, index) => {
            const { headerName, sortable, field, renderHeader } = column
            const reset = sortedColumn !== field

            const iconProps = {
              sortHandler,
              field,
              reset,
              headerSortHandler,
            }
            const tableHeaderCellProp = {
              column,
              columnLength: columns.length,
              index,
              headerName,
              renderHeader,
              sortable,
              iconProps,
              resizeHandler,
              resizableColumns,
              resizerFocus,
              setResizerFocus,
              isAdjacentPinned: Boolean(columns[index + 1]?.pinned),
            }
            return (
              <TableHeaderCell
                key={column.columnKey ?? index}
                ref={headerRefs[index]}
                {...tableHeaderCellProp}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                hideNewRowHeader={hideNewRowHeader}
                noHeaderBackground={noHeaderBackground}
                toggleVisibility={toggleVisibility}
                togglePin={togglePin}
                isLastPinned={column.isLastPinned}
                isActionColumnCollapsed={isActionColumnCollapsed}
                onToggleActionColumn={onToggleActionColumn}
                isNewRowTable={isNewRowTable}
                allRowsChecked={allRowsChecked}
                someRowsChecked={someRowsChecked}
                onCheckAll={onCheckAll}
                checkAllDisabled={checkAllDisabled}
                disableColumnManagement={disableColumnManagement}
              />
            )
          })}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortHandler: PropTypes.func,
  tableNode: PropTypes.shape({ current: PropTypes.any }),
  pinnedOffsetNode: PropTypes.shape({ current: PropTypes.any }),
  colRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })),
  resizableColumns: PropTypes.bool,
  hideNewRowHeader: PropTypes.bool,
  noHeaderBackground: PropTypes.bool,
  toggleVisibility: PropTypes.func,
  togglePin: PropTypes.func,
  isActionColumnCollapsed: PropTypes.bool,
  onToggleActionColumn: PropTypes.func,
  isNewRowTable: PropTypes.bool,
  allRowsChecked: PropTypes.bool,
  someRowsChecked: PropTypes.bool,
  onCheckAll: PropTypes.func,
  checkAllDisabled: PropTypes.bool,
  disableColumnManagement: PropTypes.bool,
  widthResetKey: PropTypes.number,
}

export default TableHeader
