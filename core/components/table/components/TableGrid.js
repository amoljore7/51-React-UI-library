function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { classes, tabIndex, tableAriaLabel, tableRole, tableRowPrefix } from '../constants';
import TableWithNoData from '../TableWithNoData';
import ColumnScrollButtons from './ColumnScrollButtons';
import TableHeader from './TableHeader';
import SortableTableRow from './SortableTableRow';
import TableRow from './TableRow';

/**
 * Builds each <tr> for the table body. Extracted so the draggable and
 * non-draggable table markup below don't each carry their own copy of this
 * row-props logic.
 */
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const TableRowsList = _ref => {
  let {
    rowList,
    RowComponent,
    getRowId,
    effectiveColumns,
    highlightedRow,
    allowRowSelect,
    onRowSelect,
    handleExpandedRows,
    expandedRows,
    noDataMessage,
    expandedContent,
    isActionColumnCollapsed,
    activeCheckedRows,
    onCheckRow,
    checkboxDisabledByRow,
    isNewRowTable
  } = _ref;
  if (rowList.length === 0) {
    return /*#__PURE__*/_jsx(TableWithNoData, {
      noDataMessage: noDataMessage,
      columns: effectiveColumns
    });
  }
  return rowList.map((row, index) => {
    var _checkboxDisabledByRo;
    /**
     * onRowSelect (not a pre-built onClick) is passed straight through: an
     * onClick built here (e => onRowSelect(row, e)) would be a new closure
     * every render regardless of anything else, defeating RowComponent's
     * React.memo on every unrelated re-render. RowComponent builds its own
     * stable onClick via useCallback since it already owns `row`.
     */
    /**
     * Falls back to index (the pre-existing behaviour) when no getRowId is
     * given. Without a stable identity, sorting/filtering/reordering rows
     * leaves each <tr>'s component instance sitting at its position instead
     * of following its row — any state living inside TableRow/TableCell
     * (e.g. the More/Less expand toggle) then sticks to the position rather
     * than the row that had it. Also threaded down as rowId (below) to key
     * expandedRows itself: without it, a row's expanded/collapsed state
     * would stay pinned to a position across a reorder even though the <tr>
     * DOM node correctly follows the row.
     */
    const rowId = getRowId ? getRowId(row, index) : index;
    const rowProps = {
      row,
      rowIndex: index,
      rowId,
      columns: effectiveColumns,
      highlightedRow,
      allowRowSelect,
      onRowSelect,
      handleExpandedRows,
      expandedRows,
      noDataMessage,
      expandedContent,
      isActionColumnCollapsed,
      isChecked: activeCheckedRows.some(r => r === row),
      onCheckRow,
      disableCheckbox: (_checkboxDisabledByRo = checkboxDisabledByRow === null || checkboxDisabledByRow === void 0 ? void 0 : checkboxDisabledByRow.get(row)) !== null && _checkboxDisabledByRo !== void 0 ? _checkboxDisabledByRo : false,
      isNewRowTable
    };
    return /*#__PURE__*/_jsx(RowComponent, _objectSpread({}, rowProps), "".concat(tableRowPrefix, "-").concat(rowId));
  });
};

/**
 * The draggable and non-draggable tables share everything but the DnD
 * wrapping and which row component renders each row — kept as one component
 * (rather than table.jsx's earlier renderTable() with two near-identical
 * branches) so that shared shape only exists once, and so it's a real
 * component instead of a plain function called inline during render.
 */
const TableGrid = _ref2 => {
  let {
    stickyHeader = false,
    allowDraggableRow,
    onDragEnd,
    tableNode,
    headerProps,
    rowList,
    getRowId,
    effectiveColumns,
    highlightedRow,
    allowRowSelect,
    onRowSelect,
    handleExpandedRows,
    expandedRows,
    noDataMessage,
    expandedContent,
    isActionColumnCollapsed,
    activeCheckedRows,
    onCheckRow,
    checkboxDisabledByRow,
    isNewRowTable
  } = _ref2;
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
  }), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const handleDndDragEnd = useCallback(event => {
    const {
      active,
      over
    } = event;
    if (!over || active.id === over.id) return;
    onDragEnd === null || onDragEnd === void 0 || onDragEnd({
      source: {
        index: Number(active.id)
      },
      destination: {
        index: Number(over.id)
      }
    });
  }, [onDragEnd]);

  /**
   * stickyHeader only: refs to the <col> elements in the body table's own
   * colgroup (see below). Rebuilt only when the column count changes,
   * mirroring TableHeader's own headerRefs pattern so existing ref objects
   * are reused by position across re-renders.
   */
  const colRefsContainer = useRef([]);
  if (colRefsContainer.current.length !== effectiveColumns.length) {
    colRefsContainer.current = effectiveColumns.map((_, index) => colRefsContainer.current[index] || {
      current: null
    });
  }
  const colRefs = colRefsContainer.current;
  const scrollWrapperRef = useRef(null);
  const stickyHeaderScrollRef = useRef(null);

  /**
   * Pinned columns only earn their divider and shadow when something is
   * actually hidden behind them — a table that fits its container shouldn't
   * advertise a scroll that doesn't exist. Written as classes on the scroll
   * wrapper rather than React state so a scroll tick doesn't re-render every
   * row; in sticky mode the header lives in its own scroller, so the body's
   * measurements (the two are kept in sync below) drive both elements.
   */
  useEffect(() => {
    const scroller = scrollWrapperRef.current;
    if (!scroller) return;
    const targets = [scroller, stickyHeaderScrollRef.current].filter(Boolean);
    const sync = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const fromStart = scroller.scrollLeft > 1;
      const toEnd = scroller.scrollLeft < maxScroll - 1;
      targets.forEach(element => {
        element.classList.toggle(classes.scrolledFromStart, fromStart);
        element.classList.toggle(classes.scrollableToEnd, toEnd);
      });
    };
    sync();
    scroller.addEventListener('scroll', sync, {
      passive: true
    });
    // Column resize/lock mutates widths directly with no React re-render to
    // hook into, so observe the <table> as well as the viewport.
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(sync);
      observer.observe(scroller);
      const tableElement = scroller.querySelector('table');
      if (tableElement) observer.observe(tableElement);
    }
    return () => {
      var _observer;
      scroller.removeEventListener('scroll', sync);
      (_observer = observer) === null || _observer === void 0 || _observer.disconnect();
    };
  }, [stickyHeader, effectiveColumns.length]);
  /**
   * Sticky mode uses separate header/body tables, so sync their horizontal
   * scroll positions to keep pinned columns aligned.
   */
  useEffect(() => {
    if (!stickyHeader) return;
    const body = scrollWrapperRef.current;
    const header = stickyHeaderScrollRef.current;
    if (!body || !header) return;
    const onBodyScroll = () => {
      header.scrollLeft = body.scrollLeft;
    };
    const onHeaderScroll = () => {
      body.scrollLeft = header.scrollLeft;
    };
    body.addEventListener('scroll', onBodyScroll, {
      passive: true
    });
    header.addEventListener('scroll', onHeaderScroll, {
      passive: true
    });
    return () => {
      body.removeEventListener('scroll', onBodyScroll);
      header.removeEventListener('scroll', onHeaderScroll);
    };
  }, [stickyHeader]);
  const columnScrollButtons = !isNewRowTable && /*#__PURE__*/_jsx(ColumnScrollButtons, {
    scrollWrapperRef: scrollWrapperRef
  }, String(stickyHeader));
  const tbody = /*#__PURE__*/_jsx("tbody", {
    tabIndex: tabIndex,
    children: /*#__PURE__*/_jsx(TableRowsList, {
      rowList: rowList,
      RowComponent: allowDraggableRow ? SortableTableRow : TableRow,
      getRowId: getRowId,
      effectiveColumns: effectiveColumns,
      highlightedRow: highlightedRow,
      allowRowSelect: allowRowSelect,
      onRowSelect: onRowSelect,
      handleExpandedRows: handleExpandedRows,
      expandedRows: expandedRows,
      noDataMessage: noDataMessage,
      expandedContent: expandedContent,
      isActionColumnCollapsed: isActionColumnCollapsed,
      activeCheckedRows: activeCheckedRows,
      onCheckRow: onCheckRow,
      checkboxDisabledByRow: checkboxDisabledByRow,
      isNewRowTable: isNewRowTable
    })
  });
  const bodyTable = /*#__PURE__*/_jsxs("table", {
    ref: stickyHeader ? undefined : tableNode,
    className: classes.table,
    role: stickyHeader ? undefined : tableRole,
    "aria-label": stickyHeader ? undefined : tableAriaLabel,
    children: [stickyHeader &&
    /*#__PURE__*/
    /**
     * Body table uses this <colgroup> for fixed column widths since its header
     * is rendered separately. Widths stay synced with the sticky header.
     */
    _jsx("colgroup", {
      children: effectiveColumns.map((column, index) => {
        var _column$columnKey;
        return /*#__PURE__*/_jsx("col", {
          ref: colRefs[index]
        }, (_column$columnKey = column.columnKey) !== null && _column$columnKey !== void 0 ? _column$columnKey : index);
      })
    }), !stickyHeader && /*#__PURE__*/_jsx(TableHeader, _objectSpread({}, headerProps)), allowDraggableRow ? /*#__PURE__*/_jsx(SortableContext, {
      items: rowList.map((_, i) => i.toString()),
      strategy: verticalListSortingStrategy,
      children: tbody
    }) : tbody]
  });
  const bodyContent = allowDraggableRow ? /*#__PURE__*/_jsx(DndContext, {
    sensors: sensors,
    collisionDetection: closestCenter,
    onDragEnd: handleDndDragEnd,
    children: bodyTable
  }) : bodyTable;
  if (!stickyHeader) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [columnScrollButtons, /*#__PURE__*/_jsx("div", {
        className: classes.scrollWrapper,
        ref: scrollWrapperRef,
        children: bodyContent
      })]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: classes.stickyHeaderScroll,
      ref: stickyHeaderScrollRef,
      children: /*#__PURE__*/_jsx("table", {
        ref: tableNode,
        className: classes.table,
        role: tableRole,
        "aria-label": tableAriaLabel,
        children: /*#__PURE__*/_jsx(TableHeader, _objectSpread(_objectSpread({}, headerProps), {}, {
          colRefs: colRefs
        }))
      })
    }), columnScrollButtons, /*#__PURE__*/_jsx("div", {
      className: classes.scrollWrapper,
      ref: scrollWrapperRef,
      children: bodyContent
    })]
  });
};
TableGrid.propTypes = {
  stickyHeader: PropTypes.bool,
  allowDraggableRow: PropTypes.bool,
  onDragEnd: PropTypes.func,
  tableNode: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.any
  })]),
  headerProps: PropTypes.object,
  rowList: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  effectiveColumns: PropTypes.array.isRequired,
  highlightedRow: PropTypes.object,
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  handleExpandedRows: PropTypes.func,
  expandedRows: PropTypes.array,
  noDataMessage: PropTypes.string,
  expandedContent: PropTypes.func,
  isActionColumnCollapsed: PropTypes.bool,
  activeCheckedRows: PropTypes.array,
  onCheckRow: PropTypes.func,
  checkboxDisabledByRow: PropTypes.instanceOf(Map),
  isNewRowTable: PropTypes.bool
};
export default TableGrid;