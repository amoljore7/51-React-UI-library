function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import EyeHiddenIcon from '../../../assets/icons/eye-hidden.svg?react';
import PinIcon from '../../../assets/icons/pin.svg?react';
import UnpinIcon from '../../../assets/icons/unpin.svg?react';
import ChevronUp from '../../../assets/icons/chevron-up.svg?react';
import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import ChevronLeft from '../../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../../assets/icons/chevron-right.svg?react';
import OverflowMenu from '../../overflow-menu';
import Checkbox from '../../checkbox';
import Filter from '../ColumnFilter';
import { actionColumnMinWidth, classes, columnMinWidth, compactColumnPadding, headerIconSize, sortChevronSize, sortIconColors, sortingType, tabIndex, compactColumnWidth } from '../constants';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const columnMenuOptionLabel = option => /*#__PURE__*/_jsxs("span", {
  className: classes.columnMenuOption,
  children: [/*#__PURE__*/_jsx("span", {
    className: classes.columnMenuOptionIcon,
    children: option.icon
  }), /*#__PURE__*/_jsx("span", {
    className: classes.columnMenuOptionText,
    children: option.text
  })]
});

// `color` rather than `stroke`: the chevron paths carry stroke="currentColor",
// which wins over a stroke inherited from the <svg>. Inline so it beats the
// `.bds-table-header-icon svg { color: inherit }` rule.
const sortChevronColor = (sortType, direction) => ({
  color: sortType === direction ? sortIconColors.active : sortIconColors.muted
});

/**
 * Stacked up/down chevrons, coloured per direction, replacing three separate
 * sorted/unsorted glyphs swapped in and out based on sortType.
 */
const SortIcon = _ref => {
  let {
    sortType
  } = _ref;
  return /*#__PURE__*/_jsxs("span", {
    className: classes.sortIconStack,
    children: [/*#__PURE__*/_jsx(ChevronUp, {
      "aria-hidden": true,
      focusable: "false",
      width: sortChevronSize,
      height: sortChevronSize,
      style: sortChevronColor(sortType, sortingType.ascending)
    }), /*#__PURE__*/_jsx(ChevronDown, {
      "aria-hidden": true,
      focusable: "false",
      width: sortChevronSize,
      height: sortChevronSize,
      style: sortChevronColor(sortType, sortingType.descending)
    })]
  });
};
const TableHeaderCell = /*#__PURE__*/React.forwardRef((_ref2, tableHeaderRef) => {
  var _filterValues$column$, _column$width, _column$width2, _column$filter$option, _column$filter3, _column$filter4, _column$filter5, _column$filter6;
  let {
    column,
    index,
    headerName,
    renderHeader,
    sortable,
    iconProps,
    resizeHandler,
    columnLength,
    resizableColumns,
    setResizerFocus,
    resizerFocus,
    filterValues,
    setFilterValues,
    hideNewRowHeader,
    noHeaderBackground,
    toggleVisibility,
    togglePin,
    isLastPinned = false,
    isActionColumnCollapsed = false,
    onToggleActionColumn,
    isNewRowTable = false,
    isAdjacentPinned = false,
    allRowsChecked = false,
    someRowsChecked = false,
    onCheckAll,
    checkAllDisabled = false,
    disableColumnManagement = false
  } = _ref2;
  const columnFilterRef = useRef();
  const suppressClickRef = useRef(false);
  const resizerClasses = {
    [classes.resizer]: true,
    [classes.resizerHover]: resizerFocus
  };

  /**
   * Pointer capture, not document-level mouse listeners, drives the drag:
   * once the resizer captures the pointer, this same element keeps
   * receiving pointermove/pointerup/pointercancel no matter where the
   * cursor ends up — outside the browser window, through a context menu,
   * even if the tab loses focus — so cleanup is guaranteed to run. The
   * previous mouse-event version tracked "is a drag active" with a ref
   * latch (isResizingRef) reset only by a document mouseup listener; if
   * that mouseup was ever missed the latch stayed true forever and
   * permanently disabled that column's handle. Capture removes the need
   * for the latch (and the state-gated effect that attached/detached
   * document listeners) entirely — hasPointerCapture below is what a plain
   * hover-without-press pointermove is filtered out by.
   */
  const handleResizePointerDown = e => {
    if (!resizableColumns) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setResizerFocus(true);
    suppressClickRef.current = true;
  };
  const handleResizePointerMove = e => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    resizeHandler(e, index);
  };
  const endResize = e => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setResizerFocus(false);
    setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };
  const [sortType, setSortType] = useState(sortingType.unsorted);
  useEffect(() => {
    iconProps.reset && setSortType(sortingType.unsorted);
  }, [iconProps.reset]);
  const getNextType = () => {
    switch (sortType) {
      case sortingType.ascending:
        return sortingType.descending;
      case sortingType.descending:
        return sortingType.unsorted;
      case sortingType.unsorted:
        return sortingType.ascending;
      default:
        return sortingType.unsorted;
    }
  };
  const clickHandler = () => {
    if (!(iconProps !== null && iconProps !== void 0 && iconProps.sortHandler)) return;
    const nextType = getNextType();
    iconProps === null || iconProps === void 0 || iconProps.headerSortHandler(iconProps.field);
    setSortType(nextType);
    iconProps === null || iconProps === void 0 || iconProps.sortHandler(nextType, iconProps.field);
  };
  const handleIconClick = e => {
    e.stopPropagation();
    if (suppressClickRef.current) {
      return;
    }
    clickHandler();
  };
  const sortClasses = {
    [classes.headerTextIconContainer]: true,
    [classes.headerCursor]: sortable
  };
  const handleOnApply = (field, currentFilterValues) => {
    var _column$filter, _column$filter$onAppl;
    const columnFilters = _objectSpread({}, filterValues);
    columnFilters[field] = currentFilterValues;
    setFilterValues(columnFilters);
    (_column$filter = column.filter) === null || _column$filter === void 0 || (_column$filter$onAppl = _column$filter.onApply) === null || _column$filter$onAppl === void 0 || _column$filter$onAppl.call(_column$filter, columnFilters);
  };

  /**
   * Plain bracket access, not lodash get(obj, `[${column.field}]`) — a
   * field name containing a dot or bracket (e.g. "user.name") would make
   * lodash parse it as a nested path instead of the single literal key it
   * actually is.
   */
  const columnFilterValues = (_filterValues$column$ = filterValues === null || filterValues === void 0 ? void 0 : filterValues[column.field]) !== null && _filterValues$column$ !== void 0 ? _filterValues$column$ : [];
  const getPreAppliedFilters = () => {
    var _column$filter$select, _column$filter2;
    const appliedFilters = (_column$filter$select = column === null || column === void 0 || (_column$filter2 = column.filter) === null || _column$filter2 === void 0 || (_column$filter2 = _column$filter2.selectedFilters) === null || _column$filter2 === void 0 ? void 0 : _column$filter2[column.field]) !== null && _column$filter$select !== void 0 ? _column$filter$select : [];
    if (!isEmpty(appliedFilters)) {
      return Array.isArray(appliedFilters) ? appliedFilters.map(_ref3 => {
        let {
          value
        } = _ref3;
        return value;
      }) : appliedFilters;
    }
    return [];
  };
  const columnMenuOptions = [!column.hideLocked && column.canHide !== false && {
    id: 'toggleVisibility',
    icon: /*#__PURE__*/_jsx(EyeHiddenIcon, {
      "aria-hidden": true,
      focusable: "false"
    }),
    text: 'Toggle Visibility'
  }, !column.pinLocked && {
    id: 'pin',
    icon: column.pinned ? /*#__PURE__*/_jsx(UnpinIcon, {
      "aria-hidden": true,
      focusable: "false"
    }) : /*#__PURE__*/_jsx(PinIcon, {
      "aria-hidden": true,
      focusable: "false"
    }),
    text: column.pinned ? 'Unpin Column' : 'Pin Column'
  }].filter(Boolean);
  /**
   * ⋮ menu offering per-column visibility and pin controls. Hidden once
   * nothing is left to offer — both actions locked, or the last visible
   * column's visibility control withdrawn with pinning already locked.
   */
  const isColumnMenuVisible = !isNewRowTable && !disableColumnManagement && !column.disableColumnMenu && Boolean(column.columnKey) && columnMenuOptions.length > 0;
  const handleColumnMenuChange = (_event, option) => {
    if (option.id === 'toggleVisibility') {
      toggleVisibility(column.columnKey);
    } else {
      togglePin(column.columnKey, 'left');
    }
  };
  // Same measured offset the body cells read — see TableHeader's
  // syncStickyOffsets, the single place sticky positions are calculated.
  // z-index and the first-right-pinned padding are static, so they live on
  // .bds-table-header-cell-pinned(-right-first) in table.scss instead.
  const pinnedStyle = column.pinned ? {
    position: 'sticky',
    [column.pinned]: "var(--bds-col-sticky-".concat(column.columnKey, ", 0px)")
  } : {};
  return /*#__PURE__*/_jsx("th", {
    className: classNames(noHeaderBackground ? classes.headerCellNoBackground : classes.headerCell,
    /**
     * Pinned/action visual state: sticky background, divider borders
     * at a pinned group's edges, and the collapsed action-column width.
     */
    {
      [classes.headerCellPinned]: Boolean(column.pinned),
      [classes.headerCellPinnedLast]: Boolean(column.pinned) && isLastPinned,
      [classes.headerCellPinnedRightFirst]: Boolean(column.isFirstRightPinned),
      [classes.headerCellActions]: Boolean(column.isActions),
      [classes.headerCellActionsCollapsed]: Boolean(column.isActions) && isActionColumnCollapsed
    }),
    style: _objectSpread(_objectSpread(_objectSpread(_objectSpread({
      width: column.width,
      maxWidth: column.isActions || column.isCompact ? column.width : undefined,
      minWidth: column.isActions ? isActionColumnCollapsed ? compactColumnWidth : (_column$width = column.width) !== null && _column$width !== void 0 ? _column$width : actionColumnMinWidth : column.isCompact ? 0 : column.pinned ? (_column$width2 = column.width) !== null && _column$width2 !== void 0 ? _column$width2 : columnMinWidth : columnMinWidth
    }, column.isActions ? {
      padding: 0
    } : {}), column.isCompact ? {
      padding: compactColumnPadding
    } : {}), column.isActions && isNewRowTable ? {
      boxShadow: 'none'
    } : {}), pinnedStyle),
    tabIndex: tabIndex,
    title: headerName,
    ref: tableHeaderRef,
    children: !hideNewRowHeader && /*#__PURE__*/_jsx(_Fragment, {
      children: column.isActions ?
      /*#__PURE__*/
      /**
       * Action column header: a label plus a chevron that collapses
       * the whole column to an icon-only strip. Collapsed, the
       * label is dropped rather than hidden, since it has no room.
       */
      _jsxs("div", {
        className: classes.actionColumnHeader,
        children: [!isActionColumnCollapsed && /*#__PURE__*/_jsx("div", {
          className: classes.headerTextLabel,
          children: headerName
        }), /*#__PURE__*/_jsx("div", {
          className: classes.actionColumnChevron,
          onClick: e => {
            e.stopPropagation();
            onToggleActionColumn === null || onToggleActionColumn === void 0 || onToggleActionColumn();
          },
          title: isActionColumnCollapsed ? 'Expand column' : 'Collapse column',
          children: isNewRowTable ? null : isActionColumnCollapsed ? /*#__PURE__*/_jsx(ChevronLeft, {
            width: 14,
            height: 14,
            "aria-hidden": true,
            focusable: "false"
          }) : /*#__PURE__*/_jsx(ChevronRight, {
            width: 14,
            height: 14,
            "aria-hidden": true,
            focusable: "false"
          })
        })]
      }) : column.isCheckboxColumn ? column.allowSelectAll ? /*#__PURE__*/_jsx("div", {
        className: classes.compactCellWrapper,
        children: /*#__PURE__*/_jsx(Checkbox, {
          checked: allRowsChecked,
          indeterminate: someRowsChecked,
          onChange: onCheckAll,
          disabled: checkAllDisabled
        })
      }) : null : typeof renderHeader === 'function' ? renderHeader() : /*#__PURE__*/_jsxs("div", {
        className: classNames(sortClasses),
        onClick: sortable ? e => handleIconClick(e) : undefined,
        children: [/*#__PURE__*/_jsxs("div", {
          className: classNames(classes.headerText, classes.nonSelectableHeader),
          tabIndex: tabIndex,
          children: [/*#__PURE__*/_jsxs("div", {
            className: classes.headerLeftIcons,
            children: [column.pinned && !column.hideLocked && !isNewRowTable && /*#__PURE__*/_jsx(PinIcon, {
              "aria-hidden": true,
              focusable: "false",
              className: classes.pinIcon,
              width: headerIconSize,
              height: headerIconSize
            }), column.showFilter && /*#__PURE__*/_jsx("div", {
              ref: columnFilterRef,
              className: classNames(classes.columnFilter, classes.nonSelectableHeader),
              onMouseEnter: () => setResizerFocus(false),
              onMouseOver: e => e.stopPropagation(),
              children: /*#__PURE__*/_jsx(Filter, {
                onApply: currentFilterValues => handleOnApply(column.field, currentFilterValues),
                options: (_column$filter$option = (_column$filter3 = column.filter) === null || _column$filter3 === void 0 ? void 0 : _column$filter3.options) !== null && _column$filter$option !== void 0 ? _column$filter$option : [],
                singleSelector: (_column$filter4 = column.filter) === null || _column$filter4 === void 0 ? void 0 : _column$filter4.singleSelector,
                values: !isEmpty(columnFilterValues) ? columnFilterValues : getPreAppliedFilters(),
                onSearch: (_column$filter5 = column.filter) === null || _column$filter5 === void 0 ? void 0 : _column$filter5.onSearch,
                width: (_column$filter6 = column.filter) === null || _column$filter6 === void 0 ? void 0 : _column$filter6.width
              })
            })]
          }), /*#__PURE__*/_jsx("span", {
            className: classes.headerTextLabel,
            children: headerName
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: classes.columnIconContainer,
          children: [/*#__PURE__*/_jsxs("div", {
            className: classes.sortIconResizeContainer,
            children: [sortable && /*#__PURE__*/_jsx("span", {
              className: classNames(classes.headerIcon, classes.nonSelectableHeader, {
                [classes.headerIconSorted]: sortType !== sortingType.unsorted
              }),
              tabIndex: tabIndex,
              onMouseDown: e => e.stopPropagation(),
              children: /*#__PURE__*/_jsx(SortIcon, {
                sortType: sortType
              })
            }), isColumnMenuVisible && /*#__PURE__*/_jsx("div", {
              className: classNames(classes.columnMenu, classes.nonSelectableHeader),
              onMouseEnter: () => setResizerFocus(false),
              onMouseDown: e => e.stopPropagation(),
              onClick: e => e.stopPropagation(),
              children: /*#__PURE__*/_jsx(OverflowMenu, {
                options: columnMenuOptions,
                onChange: handleColumnMenuChange,
                getOptionLabel: columnMenuOptionLabel,
                width: "200px",
                iconSize: headerIconSize
              })
            })]
          }), index !== columnLength - 1 && resizableColumns && /*#__PURE__*/_jsx("div", {
            className: classNames(resizerClasses),
            onPointerDown: handleResizePointerDown,
            onPointerMove: handleResizePointerMove,
            onPointerUp: endResize,
            onPointerCancel: endResize,
            onClick: e => e.stopPropagation()
          })]
        })]
      })
    })
  });
});
TableHeaderCell.propTypes = {
  column: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  headerName: PropTypes.string,
  renderHeader: PropTypes.func,
  sortable: PropTypes.bool,
  iconProps: PropTypes.object,
  resizeHandler: PropTypes.func,
  columnLength: PropTypes.number,
  resizableColumns: PropTypes.bool,
  setResizerFocus: PropTypes.func,
  resizerFocus: PropTypes.bool,
  filterValues: PropTypes.object,
  setFilterValues: PropTypes.func,
  hideNewRowHeader: PropTypes.bool,
  noHeaderBackground: PropTypes.bool,
  toggleVisibility: PropTypes.func,
  togglePin: PropTypes.func,
  isLastPinned: PropTypes.bool,
  isActionColumnCollapsed: PropTypes.bool,
  onToggleActionColumn: PropTypes.func,
  isNewRowTable: PropTypes.bool,
  isAdjacentPinned: PropTypes.bool,
  allRowsChecked: PropTypes.bool,
  someRowsChecked: PropTypes.bool,
  onCheckAll: PropTypes.func,
  checkAllDisabled: PropTypes.bool,
  disableColumnManagement: PropTypes.bool
};
export default TableHeaderCell;