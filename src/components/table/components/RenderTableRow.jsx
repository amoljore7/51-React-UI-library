import { tableCellPrefix } from '../constants';
import TableCell from './TableCell';

// Shared, stable reference for "no drag handle" so TableCell's React.memo
// isn't defeated by a fresh {} literal on every render of a non-dragging row.
const EMPTY_DRAG_HANDLE_PROPS = {};

// Shared between TableRow and SortableTableRow — building each row's <TableCell>s
// is identical for both, only the <tr> wrapper (and drag/expand wiring) differs.
export const renderTableRow = (row, columns, rowIndex, options = {}) => {
  const {
    dragHandleProps = EMPTY_DRAG_HANDLE_PROPS,
    handleExpandedRows = () => {},
    expandedRows = [],
    // Falls back to rowIndex for sub-rows, which never pass one — they
    // don't support their own further expansion (see TableCell's
    // isRowExpandable && !isSubRow), so the value is never read there.
    rowId = rowIndex,
    isSubRow = false,
    isActionColumnCollapsed = false,
    isChecked = false,
    onCheckRow,
    disableCheckbox = false,
    isNewRowTable = false,
  } = options;

  const arrTableCells = [];

  for (let fieldIndex = 0; fieldIndex < columns.length; fieldIndex++) {
    const column = columns[fieldIndex];
    arrTableCells.push(
      <TableCell
        key={`${tableCellPrefix}${rowIndex}-${fieldIndex}`}
        value={row[column.field]}
        horizontalAlignment={column.horizontalAlignment}
        width={column.width}
        pinned={column.pinned}
        columnKey={column.columnKey}
        renderColumn={column.renderColumn}
        allowExpand={column.allowExpand}
        row={row}
        dragHandleProps={dragHandleProps}
        index={rowIndex}
        rowId={rowId}
        handleExpandedRows={handleExpandedRows}
        expandedRows={expandedRows}
        onExpand={column.onExpand}
        isSubRow={isSubRow}
        isLastPinned={column.isLastPinned}
        isFirstRightPinned={column.isFirstRightPinned}
        isActions={column.isActions}
        actionItems={column.actions}
        isActionColumnCollapsed={isActionColumnCollapsed}
        actionsMenuWidth={column.actionsMenuWidth}
        actionsAlignment={column.actionsAlignment}
        actionsDirection={column.actionsDirection}
        isCompact={column.isCompact}
        disableTruncation={column.disableTruncation}
        isStatus={column.isStatus}
        statusType={column.statusType}
        statusIcon={column.statusIcon}
        statusLabel={column.statusLabel}
        statusHeight={column.statusHeight}
        rowIcon={column.rowIcon}
        isCheckboxColumn={column.isCheckboxColumn}
        isChecked={isChecked}
        onCheckRow={onCheckRow}
        disableCheckbox={disableCheckbox}
        isNewRowTable={isNewRowTable}
      />
    );
  }
  return arrTableCells;
};
