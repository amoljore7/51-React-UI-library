import classNames from 'classnames';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChevronDown from '../../../assets/icons/chevron-down.svg?react';
import ChevronUp from '../../../assets/icons/chevron-up.svg?react';
import { classes, cellMaxLines, compactColumnPadding, tabIndex } from '../constants';
import { renderSvgGraphic } from '../../../utils/renderSvgGraphic';
import ExpandRowIcon from '../ExpandRowIcon';
import ActionColumnCell from './ActionColumnCell';
import Button from '../../button';
import Checkbox from '../../checkbox';
import Tooltip from '../../tooltip';
import StatusBadge from '../../status-badge';
import { statusTypeList } from '../../status-badge/constants';

// Stable default so an omitted dragHandleProps doesn't defeat React.memo
// below with a fresh {} literal every render.
const EMPTY_DRAG_HANDLE_PROPS = {};

/**
 * One ResizeObserver shared by every TableCell instance, rather than one per
 * cell — a table with many rows and columns would otherwise spin up hundreds
 * of native observers where a single one, observing every cell's element,
 * does the same job. Mirrors TableHeader.jsx's syncStickyOffsets, which uses
 * one observer for the whole table rather than one per column.
 */
let sharedClampObserver = null;
// Tracks which ResizeObserver constructor built the cached instance above,
// so swapping the global (e.g. a test stubbing window.ResizeObserver) gets a
// freshly-built observer instead of reusing one built from a stale global.
let sharedClampObserverCtor = null;
const clampCallbacksByElement = new WeakMap();
const getSharedClampObserver = () => {
  if (typeof ResizeObserver === 'undefined') return null;
  if (sharedClampObserverCtor !== ResizeObserver) {
    sharedClampObserver = new ResizeObserver(entries => {
      entries.forEach(entry => clampCallbacksByElement.get(entry.target)?.());
    });
    sharedClampObserverCtor = ResizeObserver;
  }
  return sharedClampObserver;
};

const TableCell = React.memo(({
  value,
  horizontalAlignment,
  width,
  pinned,
  columnKey,
  renderColumn,
  row,
  dragHandleProps = EMPTY_DRAG_HANDLE_PROPS,
  index,
  // Tracks expansion state instead of index: index is a row's position,
  // which changes across a sort/filter/reorder, while rowId (getRowId's
  // value when provided, index otherwise) follows the row itself — see
  // TableGrid.jsx. index itself is untouched elsewhere (e.g. renderColumn's
  // own (row, value, index) contract).
  rowId = index,
  handleExpandedRows = () => {},
  allowExpand,
  expandedRows,
  onExpand = () => {},
  isSubRow = false,
  isLastPinned = false,
  isFirstRightPinned = false,
  isActions = false,
  actionItems,
  isActionColumnCollapsed = false,
  actionsMenuWidth,
  actionsAlignment,
  actionsDirection,
  isCompact = false,
  disableTruncation = false,
  isStatus = false,
  statusType,
  statusIcon,
  statusLabel,
  statusHeight,
  rowIcon,
  isCheckboxColumn = false,
  isChecked = false,
  onCheckRow,
  disableCheckbox = false,
  isNewRowTable = false,
}) => {
  const [textExpanded, setTextExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const clampRef = useRef(null);

  const measureClamp = () => {
    if (!clampRef.current) return;
    const { scrollHeight, clientHeight } = clampRef.current;
    setIsClamped(scrollHeight > clientHeight + 1);
  };

  /**
   * Detects text overflow to gate the fade/toggle. +1 tolerance avoids
   * scrollHeight/clientHeight rounding false positives. Depends on row too,
   * not just value: a custom renderColumn's output can depend on fields
   * other than the one value reflects, so a row update that doesn't change
   * value would otherwise never re-measure.
   */
  useLayoutEffect(() => {
    measureClamp();
  }, [value, row]);

  /**
   * Column resize mutates the cell's width directly on the DOM (see
   * TableHeader.jsx's resizeHelper) with no React re-render, so the
   * value-keyed effect above never re-fires. Re-measure on any box-size
   * change instead. Guarded for environments without ResizeObserver, such
   * as jsdom in the test suite. Skipped while expanded: removing the
   * line-clamp style grows the box to its full height with nothing left to
   * overflow, so re-measuring at that moment would zero out isClamped and
   * strand the cell expanded with no way back to "Less".
   */
  useEffect(() => {
    const observer = getSharedClampObserver();
    if (!clampRef.current || !observer) return;
    const element = clampRef.current;
    clampCallbacksByElement.set(element, () => {
      if (textExpanded) return;
      measureClamp();
    });
    observer.observe(element);
    return () => {
      observer.unobserve?.(element);
      clampCallbacksByElement.delete(element);
    };
  }, [textExpanded]);

  /**
   * A status column's own renderColumn wins: isStatus is the shorthand for
   * "render the value as a badge", so a consumer that supplied a renderer has
   * already expressed something more specific. The actions and checkbox
   * columns render their own thing and ignore `value` entirely.
   */
  const showStatusBadge = isStatus && !renderColumn && !isActions && !isCheckboxColumn;

  // Both branches below treat a badge the same way they treat a custom
  // renderColumn's output: it is rendered content, not the plain cell text.
  const hasRenderedContent = Boolean(renderColumn) || showStatusBadge;

  // statusType/statusIcon/statusLabel accept a function of the row so one
  // column can carry per-row semantics — a Scan Status column is Success on one
  // row and Failed on the next, which a single column-level string could never
  // express.
  const resolveStatusOption = option =>
    (typeof option === 'function' ? option(row, value) : option);

  const cellContent = renderColumn
    ? renderColumn(row, value, index)
    : showStatusBadge
      ? (
        <StatusBadge
          label={statusLabel ? resolveStatusOption(statusLabel) : value}
          type={resolveStatusOption(statusType) || undefined}
          icon={resolveStatusOption(statusIcon) || undefined}
          height={statusHeight}
        />
      )
      : value;

  /**
   * isCheckboxColumn counts as "has a renderColumn" for class purposes: the
   * checkbox column used to carry its own renderColumn closure (before it
   * was special-cased below to keep effectiveColumns stable across checkbox
   * clicks), and it should keep the exact same .bds-table-cell-render
   * styling it always had, not fall into .bds-table-cell/-expandable.
   */
  const cellClasses = {
    [classes.cell]: !hasRenderedContent && !isCheckboxColumn,
    [classes.render]: hasRenderedContent || isCheckboxColumn,
    [classes.cellPinned]: Boolean(pinned),
    [classes.cellPinnedLast]: Boolean(pinned) && isLastPinned,
    [classes.cellPinnedRightFirst]: isFirstRightPinned,
    [classes.cellExpandable]: !hasRenderedContent && !isActions && !isCheckboxColumn,
    [classes.cellActions]: isActions,
  };

  const isRowExpandable =
    typeof allowExpand === 'boolean'
      ? allowExpand
      : typeof allowExpand === 'function'
        ? allowExpand(row)
        : false;

  const isExpanded = expandedRows?.includes(rowId);

  const rowIconGraphic = rowIcon?.(row);
  const rowIconNode = rowIconGraphic ? (
    <span className={classes.cellIcon}>
      {renderSvgGraphic(rowIconGraphic, { 'aria-hidden': true, focusable: 'false' })}
    </span>
  ) : null;

  const handleMouseDown = (mouseDownEvent) => {
    if (isEmpty(dragHandleProps)) {
      return;
    }
    mouseDownEvent.currentTarget.focus();
  };


  const resolvedActionItems =
    isActions && typeof actionItems === 'function' ? actionItems(row, index) : actionItems;

  // Sticks the cell to the given side at the column's current offset.
  // z-index lives on .bds-table-cell-pinned (table.scss) instead of here —
  // it's a static value, unlike position/offset which are genuinely
  // per-column and per-instance.
  const pinnedStyle = pinned
    ? {
        position: 'sticky',
        [pinned]: `var(--bds-col-sticky-${columnKey}, 0px)`,
      }
    : {};

  // Collapsed action column: compact ⋮ button + portal dropdown
  if (isActions && isActionColumnCollapsed) {
    return (
      <td
        style={{
          width,
          maxWidth: width,
          padding: 0,
          ...(isNewRowTable ? { boxShadow: 'none' } : {}),
          ...pinnedStyle,
        }}
        className={classNames(cellClasses)}
        tabIndex={tabIndex}
      >
        <ActionColumnCell
          row={row}
          actionItems={resolvedActionItems}
          actionsMenuWidth={actionsMenuWidth}
        />
      </td>
    );
  }

  // Expanded action column with actions JSON (no custom renderColumn)
  if (isActions && resolvedActionItems?.length > 0 && !renderColumn) {
    return (
      <td
        style={{
          width,
          maxWidth: width,
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: 0,
          paddingBottom: 0,
          ...(isNewRowTable ? { boxShadow: 'none' } : {}),
          ...pinnedStyle,
        }}
        className={classNames(cellClasses)}
        tabIndex={tabIndex}
      >
        <div
          className={classes.actionIconsContainer}
          style={{
            ...(actionsAlignment ? { justifyContent: actionsAlignment } : {}),
            /* Stretch so stacked controls share one width instead of each
               sizing to its own label. */
            ...(actionsDirection === 'column'
              ? { flexDirection: 'column', alignItems: 'stretch' }
              : {}),
          }}
        >
          {resolvedActionItems.map((action, actionIndex) => {
            /**
             * `button` opts an action into rendering as a full labelled
             * Button while the column is expanded, for screens whose row
             * action is a primary call to action (Check Out, Request) rather
             * than one of a row of icons. The collapsed ⋮ menu is unaffected:
             * it still shows the same icon and name, which is the point of
             * expressing these as actions rather than a renderColumn.
             */
            const control = action.button ? (
              <Button
                variant={action.button.variant ?? 'primary'}
                size={action.button.size ?? 'medium'}
                disabled={action.button.disabled}
                onClick={(e) => { e.stopPropagation(); action.onClick?.(row); }}
                testId={action.testId ?? action.name}
              >
                {action.icon}
                {action.icon ? '\u00a0\u00a0' : null}
                {action.name}
              </Button>
            ) : (
              <div
                className={classes.actionIconBtn}
                onClick={(e) => { e.stopPropagation(); action.onClick?.(row); }}
                data-testid={action.testId ?? action.name}
              >
                {action.icon}
              </div>
            );

            return (
              /* Keyed by testId first: a row can legitimately carry two
                 actions with the same name (My Access renders one per access
                 type), which name alone can't tell apart. */
              <React.Fragment key={action.testId ?? `${action.name}-${actionIndex}`}>
                {action.tooltip ? (
                  <Tooltip title={action.tooltip} position="left">
                    {/* Tooltip clones its single child to inject hover
                        handlers; Button has a fixed prop list with no ...rest,
                        so they must land on a wrapping element instead. */}
                    {action.button ? <div>{control}</div> : control}
                  </Tooltip>
                ) : (
                  control
                )}
              </React.Fragment>
            );
          })}
        </div>
      </td>
    );
  }

  return (
    <td
      style={{
        width: width,
        maxWidth: isActions ? width : undefined,
        textAlign: horizontalAlignment,
        ...(isCompact
          ? { padding: compactColumnPadding }
          : {
              paddingLeft:
                allowExpand && (!isRowExpandable || isSubRow)
                  ? '2.625rem'
                  : isFirstRightPinned && !isActions
                    ? '1.5rem'
                    : '1rem',
            }),
        ...pinnedStyle,
      }}
      className={classNames(cellClasses)}
      tabIndex={tabIndex}
      // Native title only for the plain-text-value case this reflects — a
      // custom renderColumn, the checkbox column, or actions each render
      // something other than `value` itself, so a title built from it would
      // show unrelated or meaningless text on hover.
      title={!hasRenderedContent && !isActions && !isCheckboxColumn ? value : undefined}
      {...dragHandleProps}
      onMouseDown={handleMouseDown}
    >
      {(isCheckboxColumn && (
        <div className={classes.compactCellWrapper}>
          <Checkbox
            checked={isChecked}
            disabled={disableCheckbox}
            onChange={() => onCheckRow?.(row)}
          />
        </div>
      )) || (
        <div
          tabIndex={tabIndex}
          className={hasRenderedContent ? classes.cellRender : classes.expandRow}
        >
          {isRowExpandable && !isSubRow && (
            <ExpandRowIcon
              isExpanded={isExpanded}
              onClick={() => handleExpandedRows(rowId, onExpand, row)}
            />
          )}
          {rowIconNode}
          {isActions || disableTruncation || showStatusBadge ? (
            <span>{cellContent}</span>
          ) : (
            <div
              className={classNames(classes.cellClampWrapper, {
                [classes.cellClampWrapperFaded]: isClamped && !textExpanded,
                [classes.cellClampWrapperExpanded]: isClamped && textExpanded,
              })}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                ref={clampRef}
                className={classes.cellClamp}
                style={!textExpanded ? { WebkitLineClamp: cellMaxLines } : undefined}
              >
                {cellContent}
              </div>
              {isClamped && (isHovered || textExpanded) && (
                <div
                  className={classes.cellToggle}
                  onClick={e => { e.stopPropagation(); setTextExpanded(prev => !prev) }}
                >
                  {textExpanded
                    ? <><ChevronUp width={16} height={16} aria-hidden focusable="false" /> Less</>
                    : <><ChevronDown width={16} height={16} aria-hidden focusable="false" /> More</>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </td>
  );
});
TableCell.propTypes = {
  value: PropTypes.any,
  horizontalAlignment: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pinned: PropTypes.oneOf(['left', 'right', null]),
  columnKey: PropTypes.string,
  renderColumn: PropTypes.func,
  row: PropTypes.object,
  dragHandleProps: PropTypes.object,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleExpandedRows: PropTypes.func,
  allowExpand: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  expandedRows: PropTypes.array,
  onExpand: PropTypes.func,
  isSubRow: PropTypes.bool,
  isLastPinned: PropTypes.bool,
  isFirstRightPinned: PropTypes.bool,
  isActions: PropTypes.bool,
  actionItems: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  isActionColumnCollapsed: PropTypes.bool,
  actionsMenuWidth: PropTypes.string,
  actionsAlignment: PropTypes.oneOf(['start', 'end']),
  actionsDirection: PropTypes.oneOf(['row', 'column']),
  isCompact: PropTypes.bool,
  disableTruncation: PropTypes.bool,
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
  rowIcon: PropTypes.func,
  isCheckboxColumn: PropTypes.bool,
  isChecked: PropTypes.bool,
  onCheckRow: PropTypes.func,
  disableCheckbox: PropTypes.bool,
  isNewRowTable: PropTypes.bool,
};

export default TableCell;
