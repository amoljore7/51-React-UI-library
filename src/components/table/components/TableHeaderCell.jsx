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
import {
  actionColumnMinWidth,
  classes,
  columnMinWidth,
  compactColumnPadding,
  headerIconSize,
  sortChevronSize,
  sortIconColors,
  sortingType,
  tabIndex,
  compactColumnWidth,
} from '../constants';

const columnMenuOptionLabel = (option) => (
  <span className={classes.columnMenuOption}>
    <span className={classes.columnMenuOptionIcon}>{option.icon}</span>
    <span className={classes.columnMenuOptionText}>{option.text}</span>
  </span>
);

// `color` rather than `stroke`: the chevron paths carry stroke="currentColor",
// which wins over a stroke inherited from the <svg>. Inline so it beats the
// `.bds-table-header-icon svg { color: inherit }` rule.
const sortChevronColor = (sortType, direction) => ({
  color: sortType === direction ? sortIconColors.active : sortIconColors.muted,
});

/**
 * Stacked up/down chevrons, coloured per direction, replacing three separate
 * sorted/unsorted glyphs swapped in and out based on sortType.
 */
const SortIcon = ({ sortType }) => (
  <span className={classes.sortIconStack}>
    <ChevronUp
      aria-hidden
      focusable="false"
      width={sortChevronSize}
      height={sortChevronSize}
      style={sortChevronColor(sortType, sortingType.ascending)}
    />
    <ChevronDown
      aria-hidden
      focusable="false"
      width={sortChevronSize}
      height={sortChevronSize}
      style={sortChevronColor(sortType, sortingType.descending)}
    />
  </span>
);

const TableHeaderCell = React.forwardRef(
  (
    {
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
      disableColumnManagement = false,
    },
    tableHeaderRef
  ) => {
    const columnFilterRef = useRef();
    const suppressClickRef = useRef(false);

    const resizerClasses = {
      [classes.resizer]: true,
      [classes.resizerHover]: resizerFocus,
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
    const handleResizePointerDown = (e) => {
      if (!resizableColumns) return;
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setResizerFocus(true);
      suppressClickRef.current = true;
    };

    const handleResizePointerMove = (e) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      resizeHandler(e, index);
    };

    const endResize = (e) => {
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
      if (!iconProps?.sortHandler) return;
      const nextType = getNextType();
      iconProps?.headerSortHandler(iconProps.field);
      setSortType(nextType);
      iconProps?.sortHandler(nextType, iconProps.field);
    };

    const handleIconClick = (e) => {
      e.stopPropagation();
      if (suppressClickRef.current) {
        return;
      }
      clickHandler();
    };

    const sortClasses = {
      [classes.headerTextIconContainer]: true,
      [classes.headerCursor]: sortable,
    };

    const handleOnApply = (field, currentFilterValues) => {
      const columnFilters = { ...filterValues };
      columnFilters[field] = currentFilterValues;
      setFilterValues(columnFilters);
      column.filter?.onApply?.(columnFilters);
    };

    /**
     * Plain bracket access, not lodash get(obj, `[${column.field}]`) — a
     * field name containing a dot or bracket (e.g. "user.name") would make
     * lodash parse it as a nested path instead of the single literal key it
     * actually is.
     */
    const columnFilterValues = filterValues?.[column.field] ?? [];

    const getPreAppliedFilters = () => {
      const appliedFilters = column?.filter?.selectedFilters?.[column.field] ?? [];
      if (!isEmpty(appliedFilters)) {
        return Array.isArray(appliedFilters) ? appliedFilters.map(({ value }) => value) : appliedFilters;
      }
      return [];
    };


    const columnMenuOptions = [
      !column.hideLocked && column.canHide !== false && {
        id: 'toggleVisibility',
        icon: <EyeHiddenIcon aria-hidden focusable="false" />,
        text: 'Toggle Visibility',
      },
      !column.pinLocked && {
        id: 'pin',
        icon: column.pinned
          ? <UnpinIcon aria-hidden focusable="false" />
          : <PinIcon aria-hidden focusable="false" />,
        text: column.pinned ? 'Unpin Column' : 'Pin Column',
      },
    ].filter(Boolean);
    /**
     * ⋮ menu offering per-column visibility and pin controls. Hidden once
     * nothing is left to offer — both actions locked, or the last visible
     * column's visibility control withdrawn with pinning already locked.
     */
    const isColumnMenuVisible =
      !isNewRowTable && !disableColumnManagement && !column.disableColumnMenu &&
      Boolean(column.columnKey) && columnMenuOptions.length > 0;
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
    const pinnedStyle = column.pinned
      ? {
          position: 'sticky',
          [column.pinned]: `var(--bds-col-sticky-${column.columnKey}, 0px)`,
        }
      : {};

    return (
      <th
        className={classNames(
          noHeaderBackground ? classes.headerCellNoBackground : classes.headerCell,
          /**
           * Pinned/action visual state: sticky background, divider borders
           * at a pinned group's edges, and the collapsed action-column width.
           */
          {
            [classes.headerCellPinned]: Boolean(column.pinned),
            [classes.headerCellPinnedLast]: Boolean(column.pinned) && isLastPinned,
            [classes.headerCellPinnedRightFirst]: Boolean(column.isFirstRightPinned),
            [classes.headerCellActions]: Boolean(column.isActions),
            [classes.headerCellActionsCollapsed]: Boolean(column.isActions) && isActionColumnCollapsed,
          }
        )}
        style={{
          width: column.width,
          maxWidth: column.isActions || column.isCompact ? column.width : undefined,
          minWidth: column.isActions
            ? (isActionColumnCollapsed ? compactColumnWidth : (column.width ?? actionColumnMinWidth))
            : column.isCompact
              ? 0
              : column.pinned
                ? (column.width ?? columnMinWidth)
                : columnMinWidth,
          ...(column.isActions ? { padding: 0 } : {}),
          ...(column.isCompact ? { padding: compactColumnPadding } : {}),
          ...(column.isActions && isNewRowTable ? { boxShadow: 'none' } : {}),
          ...pinnedStyle,
        }}
        tabIndex={tabIndex}
        title={headerName}
        ref={tableHeaderRef}
      >
        {!hideNewRowHeader && (
          <>
            {column.isActions ? (
              /**
               * Action column header: a label plus a chevron that collapses
               * the whole column to an icon-only strip. Collapsed, the
               * label is dropped rather than hidden, since it has no room.
               */
              <div className={classes.actionColumnHeader}>
                {!isActionColumnCollapsed && (
                  <div className={classes.headerTextLabel}>{headerName}</div>
                )}
                <div
                  className={classes.actionColumnChevron}
                  onClick={(e) => { e.stopPropagation(); onToggleActionColumn?.(); }}
                  title={isActionColumnCollapsed ? 'Expand column' : 'Collapse column'}
                >
                  {isNewRowTable ? null : isActionColumnCollapsed
                    ? <ChevronLeft width={14} height={14} aria-hidden focusable="false" />
                    : <ChevronRight width={14} height={14} aria-hidden focusable="false" />
                  }
                </div>
              </div>
            ) : column.isCheckboxColumn ? (
              column.allowSelectAll ? (
                <div className={classes.compactCellWrapper}>
                  <Checkbox
                    checked={allRowsChecked}
                    indeterminate={someRowsChecked}
                    onChange={onCheckAll}
                    disabled={checkAllDisabled}
                  />
                </div>
              ) : null
            ) : typeof renderHeader === 'function' ? (
              renderHeader()
            ) : (
              <div
                className={classNames(sortClasses)}
                onClick={sortable ? (e) => handleIconClick(e) : undefined}
              >
                <div
                  className={classNames(classes.headerText, classes.nonSelectableHeader)}
                  tabIndex={tabIndex}
                >
                  <div className={classes.headerLeftIcons}>
                    {column.pinned && !column.hideLocked && !isNewRowTable && (
                      <PinIcon
                        aria-hidden
                        focusable="false"
                        className={classes.pinIcon}
                        width={headerIconSize}
                        height={headerIconSize}
                      />
                    )}
                    {column.showFilter && (
                      <div
                        ref={columnFilterRef}
                        className={classNames(classes.columnFilter, classes.nonSelectableHeader)}
                        onMouseEnter={() => setResizerFocus(false)}
                        onMouseOver={(e) => e.stopPropagation()}
                      >
                        <Filter
                          onApply={(currentFilterValues) =>
                            handleOnApply(column.field, currentFilterValues)
                          }
                          options={column.filter?.options ?? []}
                          singleSelector={column.filter?.singleSelector}
                          values={!isEmpty(columnFilterValues) ? columnFilterValues : getPreAppliedFilters()}
                          onSearch={column.filter?.onSearch}
                          width={column.filter?.width}
                        />
                      </div>
                    )}
                  </div>
                  <span className={classes.headerTextLabel}>{headerName}</span>
                </div>
                <div className={classes.columnIconContainer}>
                  <div className={classes.sortIconResizeContainer}>
                    {sortable && (
                      <span
                        className={classNames(classes.headerIcon, classes.nonSelectableHeader, {
                          [classes.headerIconSorted]: sortType !== sortingType.unsorted,
                        })}
                        tabIndex={tabIndex}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <SortIcon sortType={sortType} />
                      </span>
                    )}
                    {isColumnMenuVisible && (
                      <div
                        className={classNames(classes.columnMenu, classes.nonSelectableHeader)}
                        onMouseEnter={() => setResizerFocus(false)}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <OverflowMenu
                          options={columnMenuOptions}
                          onChange={handleColumnMenuChange}
                          getOptionLabel={columnMenuOptionLabel}
                          width="200px"
                          iconSize={headerIconSize}
                        />
                      </div>
                    )}
                  </div>
                  {index !== columnLength - 1 && resizableColumns && (
                    <div
                      className={classNames(resizerClasses)}
                      onPointerDown={handleResizePointerDown}
                      onPointerMove={handleResizePointerMove}
                      onPointerUp={endResize}
                      onPointerCancel={endResize}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </th>
    );
  }
);

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
  disableColumnManagement: PropTypes.bool,
};

export default TableHeaderCell;
