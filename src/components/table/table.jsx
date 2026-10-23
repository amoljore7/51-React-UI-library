import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ChevronLeft from '../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import ColumnLayout from '../../assets/icons/column-layout.svg?react';
import DragAndDrop from '../../assets/icons/drag-and-drop.svg?react';
import EyeIcon from '../../assets/icons/eye.svg?react';
import Button from '../button';
import SearchInput from '../search';
import Select from '../select';
import Tooltip from '../tooltip';
import { statusTypeList } from '../status-badge/constants';
import ColumnSettingsDrawer from './components/ColumnSettingsDrawer';
import {
  bulkActionsDisabledTooltipText,
  classes,
  compactColumnWidth,
  dragHandleField,
  navigationRole,
  hiddenPillsWidthRatio,
  searchBarSize,
  showAllColumnsText,
  tabIndex,
} from './constants';
import './table.scss';
import TableGrid from './components/TableGrid';
import useColumnState from './hooks/useColumnState';

/**
 * Reads width from the caller's own tableNode ref, not a global
 * document.getElementsByClassName(classes.table)[0] lookup — that always
 * grabbed the first .bds-table anywhere in the document, so a page with more
 * than one Table on it (or a Table nested inside another, e.g. an expanded
 * row's content) would size this table off a different instance entirely.
 /**
 * Observe the table itself so toolbar width updates when the table changes
 * without a window resize (e.g. column resize, hide/pin, or redistribution).
 * Retry on the next frame if the table ref isn't attached yet.
 */
const useTableWidth = (tableNodeRef) => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    let observer;
    let rafId;
    const updateWidth = () => {
      const element = tableNodeRef.current;
      if (element?.offsetWidth) {
        setWidth(element.offsetWidth);
      }
    };
    const trySetup = () => {
      const element = tableNodeRef.current;
      if (!element) {
        rafId = requestAnimationFrame(trySetup);
        return;
      }
      observer = new ResizeObserver(updateWidth);
      observer.observe(element);
      updateWidth();
    };
    trySetup();
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [tableNodeRef]);
  return width;
};

const Table = ({
  columns,
  rows = [{}],
  sortHandler,
  searchBar,
  resizableColumns,
  allowRowSelect = false,
  onRowSelect,
  highlightedRow,
  allowDraggableRow = false,
  onDragEnd,
  addNewRow,
  columnsForNewRow,
  noDataMessage,
  hideNewRowHeader = false,
  noHeaderBackground = false,
  expandedContent,
  expandedRows: controlledExpandedRows,
  onExpandedRowsChange,
  isNewRowTable = false,
  checkedRows,
  allowCheckbox = false,
  allowSelectAll = true,
  onCheckboxChange,
  isCheckboxDisabled,
  bulkActions,
  columnConfig,
  getRowId,
  leftToolbarContent,
  stickyHeader = false,
  disableColumnManagement = false,
  reserveDragHandleColumn = false,
}) => {
  const rowList = rows ?? [];
  /**
   * Resolves isCheckboxDisabled once per row per render instead of letting
   * every consumer of it (selectableRowList/actionableCheckedRows below, and
   * TableGrid's per-row disableCheckbox) call the consumer's predicate again
   * for the same row. Keyed by reference, matching how checked-row membership
   * is already tracked elsewhere.
   */
  const checkboxDisabledByRow = useMemo(
    () => new Map(rowList.map(row => [row, isCheckboxDisabled?.(row) ?? false])),
    [rowList, isCheckboxDisabled]
  )
  const tableNode = useRef();
  const containerNode = useRef();
  const toolbarNode = useRef();

  /**
   * Keeps the sticky table header offset in sync with the toolbar height
   * so the header stays positioned correctly.
   */
  useLayoutEffect(() => {
    if (!stickyHeader) return
    const toolbarEl = toolbarNode.current
    const containerEl = containerNode.current
    if (!toolbarEl || !containerEl || typeof ResizeObserver === 'undefined') return
    const updateOffset = () => {
      containerEl.style.setProperty('--bds-table-sticky-header-offset', `${toolbarEl.offsetHeight}px`)
    }
    updateOffset()
    const observer = new ResizeObserver(updateOffset)
    observer.observe(toolbarEl)
    return () => observer.disconnect()
  }, [stickyHeader])

  /**
   * columnConfig exposes useColumnState's hidden/pinned state as a single
   * Table prop. pinnedColumns is a flat array here — the settings drawer
   * only ever pins left (ColumnSettingsDrawer.jsx's togglePin always passes
   * 'left'; right is reserved for the forced action column) — so the
   * { left, right } split stays an internal useColumnState detail.
   *
   * pinnedColumns/hiddenColumns are a hybrid, not a strict controlled prop:
   * useColumnState always renders from its own internal state, so the
   * drawer stays fully interactive whether or not a consumer ever supplies
   * onColumnConfigChange or feeds a value back through it. Passing these
   * lets a consumer *optionally* steer that internal state from outside —
   * useColumnState adopts a new value only when it actually changes
   * (compared by contents, not reference) from one render to the next, so
   * a genuine external update (a "reset filters" action, or a proper
   * round-trip through onColumnConfigChange) still takes effect, while an
   * unchanged value passed on every render (whether because the consumer
   * never updates it, or hands back a fresh array/object literal with the
   * same contents) is correctly left alone rather than overriding whatever
   * the drawer just did. defaultPinnedColumns/defaultHiddenColumns behave
   * the same way but only ever seed the initial value — there's no
   * "controlled" counterpart to compare later renders against, so they're
   * simply not read again after mount.
   */
  const handleColumnSettingsChange = useCallback(
    ({ order, hidden, pinned }) => {
      columnConfig?.onColumnConfigChange?.({
        order,
        hidden,
        pinned: pinned?.left ?? [],
      });
    },
    [columnConfig]
  );

  const {
    visibleColumns,
    orderedColumns,
    toggleVisibility,
    showAll,
    togglePin,
    reorderField,
    resetAll,
  } = useColumnState({
    columns,
    hiddenColumns: columnConfig?.hiddenColumns,
    pinnedColumns:
      columnConfig?.pinnedColumns !== undefined
        ? { left: columnConfig.pinnedColumns, right: [] }
        : undefined,
    defaultHiddenColumns: columnConfig?.defaultHiddenColumns,
    defaultPinnedColumns:
      columnConfig?.defaultPinnedColumns !== undefined
        ? { left: columnConfig.defaultPinnedColumns, right: [] }
        : undefined,
    onColumnSettingsChange: handleColumnSettingsChange,
  });
  const hiddenColumns = orderedColumns.filter((column) => column.hidden);
  const [isColumnDrawerOpen, setIsColumnDrawerOpen] = useState(false);
  const [widthResetKey, setWidthResetKey] = useState(0);
  const handleResetAll = useCallback(() => {
    resetAll();
    setWidthResetKey((key) => key + 1);
  }, [resetAll]);
  const headerProps = {
    sortHandler,
    tableNode,
    // Sticky mode uses separate header/body tables, so offsets go on their shared ancestor.
    pinnedOffsetNode: stickyHeader ? containerNode : undefined,
    resizableColumns,
    toggleVisibility,
    togglePin,
  };
  const tableWidth = useTableWidth(tableNode);
  const [searchText, setSearchText] = useState(searchBar?.value ?? '');
  const [internalExpandedRows, setInternalExpandedRows] = useState([]);
  const [isActionColumnCollapsed, setIsActionColumnCollapsed] = useState(false);
  /**
   * Toggles the action column between its full width and a compact,
   * icon-only strip.
   */
  const handleToggleActionColumn = useCallback(
    () => setIsActionColumnCollapsed(prev => !prev),
    []
  );

  const [internalCheckedRows, setInternalCheckedRows] = useState([]);
  // Prefer the controlled prop; fall back to internal state for uncontrolled use.
  const activeCheckedRows = checkedRows ?? internalCheckedRows
  /**
    * Rows can become disabled after being checked. Exclude them from bulk
    * actions while preserving the consumer's checked state. Fall back to the
    * row predicate when no cached disabled state exists.
  */
  const actionableCheckedRows = activeCheckedRows.filter(
    row => !(checkboxDisabledByRow.has(row) ? checkboxDisabledByRow.get(row) : isCheckboxDisabled?.(row))
  )
  const [bulkActionKey, setBulkActionKey] = useState(0);
  const pillScrollRef = useRef(null);
  const pillTrackRef = useRef(null);
  const [pillScroll, setPillScroll] = useState({ atStart: true, atEnd: true });
  const [pillMaxWidth, setPillMaxWidth] = useState(null);
  const toolbarLeftGroupRef = useRef(null);
  const columnToolbarRef = useRef(null);

  /**
   * The pill strip may take hiddenPillsWidthRatio of the table's visible
   * width, but never more than the room left in the toolbar row beside the
   * left-hand controls and the rest of the column toolbar, so the pills alone
   * never push the toolbar onto a second line. Measured on the container
   * rather than the toolbar, which is sized to the table's full scroll width
   * and so grows when columns overflow.
   */
  useLayoutEffect(() => {
    const container = containerNode.current
    const toolbar = toolbarNode.current
    if (!container || !toolbar) return
    const measure = () => {
      const strip = pillScrollRef.current
      const toolbarStyle = getComputedStyle(toolbar)
      const rowWidth = container.clientWidth
        - parseFloat(toolbarStyle.paddingLeft) - parseFloat(toolbarStyle.paddingRight)
      const widthOf = el => el?.getBoundingClientRect().width ?? 0
      const leftWidth = widthOf(toolbarLeftGroupRef.current)
      // The column toolbar without the strip itself: chevrons, Show All, count.
      const restWidth = widthOf(columnToolbarRef.current) - widthOf(strip)
      const gap = parseFloat(toolbarStyle.columnGap) || 0
      // Rounded against the strip, plus a pixel: offsetWidth-style rounding
      // put the total a fraction over the row and wrapped it anyway.
      const roomInRow = Math.floor(rowWidth - Math.ceil(leftWidth) - gap - Math.ceil(restWidth)) - 1
      const ratioWidth = Math.floor(container.clientWidth * hiddenPillsWidthRatio)
      // No room at all means the toolbar wraps regardless, and on its own
      // line the column toolbar can have its full share again.
      setPillMaxWidth(roomInRow > 0 ? Math.min(ratioWidth, roomInRow) : ratioWidth)
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    ;[container, toolbarLeftGroupRef.current, columnToolbarRef.current, pillTrackRef.current]
      .filter(Boolean)
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /**
   * The pills sit on a track inside the clipped strip and move with a CSS
   * transform transition rather than native scrolling, whose easing and
   * speed can't be set from CSS. pillOffset is how far the track is shifted.
   */
  const [pillOffset, setPillOffset] = useState(0);
  const getPillMaxOffset = () => Math.max(
    0,
    (pillTrackRef.current?.offsetWidth ?? 0) - (pillScrollRef.current?.clientWidth ?? 0),
  )

  /**
   * Each chevron shows only while the pills overflow the strip and there's
   * more to move its way. Read from the offset rather than a pill count or
   * page index, so it stays honest when a pill is restored mid-way or pill
   * labels vary in length.
   */
  const syncPillScroll = useCallback(() => {
    const maxOffset = getPillMaxOffset()
    // Restoring a pill leaves less to move; don't leave a gap at the end.
    if (pillOffset > maxOffset) {
      setPillOffset(maxOffset)
      return
    }
    setPillScroll({ atStart: pillOffset <= 0, atEnd: pillOffset >= maxOffset - 1 })
  }, [pillOffset])

  useLayoutEffect(syncPillScroll, [syncPillScroll, hiddenColumns.length, pillMaxWidth])
  // Pills can change size with no count or cap change (a font that loads
  // late), which would otherwise leave them overflowing with no chevrons.
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(syncPillScroll)
    ;[pillScrollRef.current, pillTrackRef.current]
      .filter(Boolean)
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [syncPillScroll])
  // At both ends at once means the pills fit their strip: no chevrons.
  const pillsOverflow = !(pillScroll.atStart && pillScroll.atEnd)

  /**
   * Moves the hidden-column pills by one strip width in the given direction
   * (-1 left, 1 right), used by the chevron nav buttons.
   */
  const scrollPills = direction => {
    const stripWidth = pillScrollRef.current?.clientWidth ?? 0
    const maxOffset = getPillMaxOffset()
    setPillOffset(offset => Math.min(Math.max(offset + direction * stripWidth, 0), maxOffset))
  }
  
  const activeCheckedRowsRef = useRef(activeCheckedRows)
  activeCheckedRowsRef.current = activeCheckedRows
  const rowListRef = useRef(rowList)
  rowListRef.current = rowList

  /**
   * Toggles a single row's checked state and reports the full checked list
   * to the consumer. Matches by reference, not value: two rows with
   * identical data are still distinct row instances in rowList, and
   * value-equality would check/uncheck every row sharing that data at once.
   */
  const handleCheckRow = useCallback((row) => {
    const current = activeCheckedRowsRef.current
    const newChecked = current.some(r => r === row)
      ? current.filter(r => r !== row)
      : [...current, row]
    if (checkedRows === undefined) setInternalCheckedRows(newChecked)
    onCheckboxChange?.(newChecked)
  }, [checkedRows, onCheckboxChange])

  /**
   * Selects every selectable row, or clears the selection if all of them are
   * already checked — the header checkbox's select-all/clear-all behaviour.
   * A row isCheckboxDisabled marks as disabled is excluded from the set
   * select-all produces, so it can never be checked via the header control
   * (matching its own checkbox being disabled), and from the "is everything
   * checked" test, so it never blocks the header from reading "all checked"
   * just because it itself stays unchecked. Bails when nothing is
   * selectable — with every visible row disabled, allChecked would read
   * false (an empty array is vacuously not "every row checked"), sending an
   * unsolicited onCheckboxChange([]) on a header checkbox the consumer
   * couldn't tell was live.
   */
  const handleCheckAll = useCallback(() => {
    const checked = new Set(activeCheckedRowsRef.current)
    const selectableRows = rowListRef.current.filter(row => !isCheckboxDisabled?.(row))
    if (selectableRows.length === 0) return
    const allChecked = selectableRows.every(row => checked.has(row))
    const newChecked = allChecked ? [] : [...selectableRows]
    if (checkedRows === undefined) setInternalCheckedRows(newChecked)
    onCheckboxChange?.(newChecked)
  }, [checkedRows, onCheckboxChange, isCheckboxDisabled])

  /**
   * Runs the selected bulk action against the checked rows, then resets the
   * dropdown by remounting it via bulkActionKey.
   */
  const handleBulkActionChange = (_event, option) => {
    option.onClick?.(actionableCheckedRows)
    setBulkActionKey(prev => prev + 1)
  }

  const expandedRows = controlledExpandedRows ?? internalExpandedRows;
  /**
   * Memoized so it doesn't get a new reference on every Table re-render
   * (e.g. a checkbox click) — it's passed down to every TableCell, and an
   * unstable reference there would defeat TableCell's React.memo on every
   * unrelated state change.
   */
  const handleExpandedRows = useCallback((expandedRowId, onExpand = () => {}, row = {}) => {
    const expandedRowsList = [...expandedRows];
    const index = expandedRowsList?.indexOf(expandedRowId);
    if (index !== -1) {
      expandedRowsList?.splice(index, 1);
    } else {
      expandedRowsList?.push(expandedRowId);
      onExpand(row);
    }
    if (onExpandedRowsChange) {
      onExpandedRowsChange(expandedRowsList);
    } else {
      setInternalExpandedRows(expandedRowsList);
    }
  }, [expandedRows, onExpandedRowsChange]);

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
    searchBar.onSearch(e.target.value);
  };
  const getWidth = () => {
    if (tableNode && tableNode.current) {
      return Math.max(tableWidth, tableNode.current.offsetWidth);
    } else {
      return tableWidth;
    }
  };

  useEffect(() => {
    if (searchBar?.isSearchEmpty) {
      setSearchText('');
    }
  }, [searchBar?.isSearchEmpty]);

  /**
   * Narrow the action column when collapsed; width comes from the column's
   * own collapsedWidth prop, falling back to a compact default.
   */
  const effectiveColumns = useMemo(() => {
    /**
     * No renderColumn/renderHeader closure here — deliberately. Both used to
     * read activeCheckedRows directly, which forced effectiveColumns to be
     * rebuilt (and every TableRow's columns prop to change) on every
     * checkbox click. isChecked/onCheckRow now reach TableCell as their own
     * explicit props (threaded through TableRow), and TableCell/
     * TableHeaderCell special-case isCheckboxColumn to render the checkbox
     * — see table.scss's compactCellWrapper usage there. That keeps this
     * column (and effectiveColumns as a whole) stable across checkbox
     * clicks, so unrelated rows can bail out of React.memo entirely.
     */
    const checkboxCol = allowCheckbox ? {
      field: '__checkbox__',
      headerName: '',
      width: compactColumnWidth,
      pinned: 'left',
      pinLocked: true,
      hideLocked: true,
      isCompact: true,
      columnKey: '__checkbox__',
      isCheckboxColumn: true,
      allowSelectAll,
    } : null

    const base = checkboxCol ? [checkboxCol, ...visibleColumns] : [...visibleColumns]

    /**
     * Drag handle always leads, even ahead of the checkbox column.
     *
     * reserveDragHandleColumn renders the same column empty. It exists for
     * the add-new-row table below, which needs a leading cell of identical
     * width to line its inputs up with the header. A column declared by the
     * consumer can't do that job: it goes through useColumnState, which
     * un-pins anything it wasn't told to pin, and an unpinned column is
     * floored at columnMinWidth and handed a share of the table's leftover
     * width — so the spacer renders far wider than the handle it mirrors.
     */
    const withDragHandle = allowDraggableRow || reserveDragHandleColumn
      ? [
          {
            field: dragHandleField,
            headerName: '',
            sortable: false,
            isCompact: true,
            pinned: 'left',
            pinLocked: true,
            hideLocked: true,
            columnKey: dragHandleField,
            renderColumn: () => (
              allowDraggableRow ? (
                <div className={classes.compactCellWrapper}>
                  <DragAndDrop aria-hidden focusable="false" />
                </div>
              ) : null
            ),
            width: compactColumnWidth,
          },
          ...base,
        ]
      : base

    return isActionColumnCollapsed
      ? withDragHandle.map(col =>
          col.isActions ? { ...col, width: col.collapsedWidth ?? compactColumnWidth } : col
        )
      : withDragHandle
  }, [
    allowCheckbox, allowSelectAll,
    isActionColumnCollapsed, visibleColumns, allowDraggableRow,
    reserveDragHandleColumn,
  ]);

  /**
   * Counts membership (by reference, matching handleCheckRow's own ===
   * comparison), not raw array length. Comparing lengths alone assumes
   * every entry in activeCheckedRows is actually one of rowList's current
   * rows — if a consumer's checkedRows still holds stale references (rows
   * from before a page/filter change) that happen to number the same as
   * rowList, allRowsChecked would read true with zero current rows
   * actually checked, and any other stale count in between would show an
   * incorrectly indeterminate header checkbox.
   *
   * selectableRowList excludes isCheckboxDisabled rows from both counts —
   * otherwise a permanently unchecked disabled row would keep allRowsChecked
   * false forever, even once every row the user can actually act on is
   * checked.
   */
  const selectableRowList = rowList.filter(row => !checkboxDisabledByRow.get(row))
  const activeCheckedRowsSet = new Set(activeCheckedRows)
  const checkedRowsInList =
    selectableRowList.filter(row => activeCheckedRowsSet.has(row)).length
  const allRowsChecked = selectableRowList.length > 0 && checkedRowsInList === selectableRowList.length
  const someRowsChecked = checkedRowsInList > 0 && checkedRowsInList < selectableRowList.length

  headerProps.columns = effectiveColumns;
  headerProps.hideNewRowHeader = hideNewRowHeader;
  headerProps.noHeaderBackground = noHeaderBackground;
  headerProps.isActionColumnCollapsed = isActionColumnCollapsed;
  headerProps.onToggleActionColumn = handleToggleActionColumn;
  headerProps.isNewRowTable = isNewRowTable;
  headerProps.allRowsChecked = allRowsChecked;
  headerProps.someRowsChecked = someRowsChecked;
  headerProps.onCheckAll = handleCheckAll;
  headerProps.checkAllDisabled = selectableRowList.length === 0;
  headerProps.disableColumnManagement = disableColumnManagement;
  headerProps.widthResetKey = widthResetKey;

  return (
    <div ref={containerNode} className={classes.container}>
      {((searchBar || bulkActions || !isNewRowTable) && !disableColumnManagement) && (
        <div
          ref={toolbarNode}
          className={classes.search}
          style={getWidth() ? { width: getWidth() } : {}}
          role={navigationRole}
          tabIndex={tabIndex}
        >
          {!isNewRowTable && (
            <>
              <div className={classes.toolbarLeftGroup} ref={toolbarLeftGroupRef}>
                {leftToolbarContent && (
                  <div className={classes.leftToolbarContent}>{leftToolbarContent}</div>
                )}
                {bulkActions && (
                  <div className={classes.bulkActionsContainer}>
                    <Tooltip
                      title={actionableCheckedRows.length === 0 ? bulkActionsDisabledTooltipText : null}
                      position="top"
                    >
                      <div>
                        <Select
                          key={bulkActionKey}
                          options={bulkActions.options}
                          onChange={handleBulkActionChange}
                          getOptionLabel={opt => opt.label}
                          placeholder="Bulk Actions"
                          disabled={actionableCheckedRows.length === 0}
                          size="small"
                          width={bulkActions.width ?? '160px'}
                          height="32px"
                        />
                      </div>
                    </Tooltip>
                  </div>
                )}
                {searchBar && (
                  <div className={classes.searchContainer}>
                    <SearchInput
                      value={searchText}
                      onChange={onChangeSearch}
                      disabled={Boolean(searchBar?.isDisabled)}
                      width={searchBarSize}
                      height="32px"
                      placeholder={searchBar?.placeholder || ''}
                    />
                  </div>
                )}
              </div>
              {!disableColumnManagement && (
                <div className={classes.columnToolbar} ref={columnToolbarRef}>
                  {pillsOverflow && (
                    <div
                      className={classNames(classes.pillNavButton, {
                        [classes.pillNavButtonDisabled]: pillScroll.atStart,
                      })}
                      onClick={() => !pillScroll.atStart && scrollPills(-1)}
                    >
                      <ChevronLeft width={20} height={20} aria-hidden focusable="false" />
                    </div>
                  )}
                  <div
                    ref={pillScrollRef}
                    className={classes.hiddenColumnPills}
                    style={pillMaxWidth != null ? { maxWidth: pillMaxWidth } : undefined}
                  >
                    <div
                      ref={pillTrackRef}
                      className={classes.hiddenColumnPillsTrack}
                      style={{ transform: `translateX(-${pillOffset}px)` }}
                    >
                      {hiddenColumns.map(column => (
                        <div
                          key={column.columnKey}
                          className={classes.hiddenColumnPill}
                          onClick={() => toggleVisibility(column.columnKey)}
                        >
                          <EyeIcon width={14} height={14} className={classes.hiddenColumnPillIcon} />
                          {column.headerName}
                        </div>
                      ))}
                    </div>
                  </div>
                  {pillsOverflow && (
                    <div
                      className={classNames(classes.pillNavButton, {
                        [classes.pillNavButtonDisabled]: pillScroll.atEnd,
                      })}
                      onClick={() => !pillScroll.atEnd && scrollPills(1)}
                    >
                      <ChevronRight width={20} height={20} aria-hidden focusable="false" />
                    </div>
                  )}
                  {hiddenColumns.length > 0 && (
                    <Button
                      type="button"
                      variant="textOnly"
                      size="small"
                      onClick={showAll}
                      testId="table-show-all-columns"
                    >
                      {showAllColumnsText}
                    </Button>
                  )}
                  <div
                    className={classes.columnCountTrigger}
                    onClick={() => setIsColumnDrawerOpen(true)}
                  >
                    {`${visibleColumns.length} of ${columns.length} columns visible`}
                    <ColumnLayout
                      className={classes.columnCountTriggerIcon}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {!isNewRowTable && !disableColumnManagement && (
        <ColumnSettingsDrawer
          isOpen={isColumnDrawerOpen}
          onClose={() => setIsColumnDrawerOpen(false)}
          orderedColumns={orderedColumns.filter(column => column.field || column.isActions)}
          toggleVisibility={toggleVisibility}
          togglePin={togglePin}
          reorderField={reorderField}
          resetAll={handleResetAll}
          showAll={showAll}
        />
      )}
      <TableGrid
        stickyHeader={stickyHeader}
        allowDraggableRow={allowDraggableRow}
        onDragEnd={onDragEnd}
        tableNode={tableNode}
        headerProps={headerProps}
        rowList={rowList}
        getRowId={getRowId}
        effectiveColumns={effectiveColumns}
        highlightedRow={highlightedRow}
        allowRowSelect={allowRowSelect}
        onRowSelect={onRowSelect}
        handleExpandedRows={handleExpandedRows}
        expandedRows={expandedRows}
        noDataMessage={noDataMessage}
        expandedContent={expandedContent}
        isActionColumnCollapsed={isActionColumnCollapsed}
        activeCheckedRows={activeCheckedRows}
        onCheckRow={handleCheckRow}
        checkboxDisabledByRow={checkboxDisabledByRow}
        isNewRowTable={isNewRowTable}
      />
      {addNewRow && (
        <div
          className={`${classes.addNewRow} ${rows?.length === 0 ? classes.emptyNewRowHeader : ""
            }`}
        >
          <Table
            hideNewRowHeader={rows?.length === 0}
            columns={columnsForNewRow}
            isNewRowTable
            reserveDragHandleColumn={allowDraggableRow}
          />
        </div>
      )}
    </div>
  );
};


Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string.isRequired,
      renderHeader: PropTypes.func,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      horizontalAlignment: PropTypes.string,
      onExpand: PropTypes.func,
      allowExpand: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      isActions: PropTypes.bool,
      actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      actionsMenuWidth: PropTypes.string,
      actionsAlignment: PropTypes.oneOf(['start', 'end', 'center']),
      actionsDirection: PropTypes.oneOf(['row', 'column']),
      disableTruncation: PropTypes.bool,
      disableColumnMenu: PropTypes.bool,
      isStatus: PropTypes.bool,
      statusType: PropTypes.oneOfType([PropTypes.oneOf(statusTypeList), PropTypes.func]),
      statusIcon: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.element,
        PropTypes.string,
        PropTypes.func,
      ]),
      statusLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      statusHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortHandler: PropTypes.func,
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }),
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  highlightedRow: PropTypes.object,
  noDataMessage: PropTypes.string,
  checkedRows: PropTypes.arrayOf(PropTypes.object),
  allowCheckbox: PropTypes.bool,
  allowSelectAll: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  isCheckboxDisabled: PropTypes.func,
  bulkActions: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any,
        onClick: PropTypes.func,
      })
    ).isRequired,
    width: PropTypes.string,
  }),
  columnConfig: PropTypes.shape({
    pinnedColumns: PropTypes.arrayOf(PropTypes.string),
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    defaultPinnedColumns: PropTypes.arrayOf(PropTypes.string),
    defaultHiddenColumns: PropTypes.arrayOf(PropTypes.string),
    onColumnConfigChange: PropTypes.func,
  }),
  getRowId: PropTypes.func,
  leftToolbarContent: PropTypes.node,
  stickyHeader: PropTypes.bool,
  disableColumnManagement: PropTypes.bool,
  // Internal: set by the add-new-row table so its leading cell matches the
  // parent's drag handle.
  reserveDragHandleColumn: PropTypes.bool,
};

export default Table;
 