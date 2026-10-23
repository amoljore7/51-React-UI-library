import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { classes } from '../constants';
import { renderTableRow } from './RenderTableRow';

const SortableTableRow = React.memo(({
  row,
  rowIndex,
  rowId = rowIndex,
  columns,
  highlightedRow,
  allowRowSelect,
  onRowSelect,
  handleExpandedRows,
  expandedRows,
  noDataMessage,
  expandedContent,
  isActionColumnCollapsed = false,
  isChecked = false,
  onCheckRow,
  disableCheckbox = false,
  isNewRowTable = false,
  ...restProps
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rowIndex.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Built here (not by the caller) so it's only a new reference when row or
  // onRowSelect actually change, rather than on every list re-render.
  const handleClick = useCallback(
    e => onRowSelect?.(row, e),
    [row, onRowSelect]
  );

  const isHighlighted = row === highlightedRow;
  const isExpanded = expandedRows.includes(rowId);
  const dragHandleProps = { ...attributes, ...listeners };

  return (
    <>
      <tr
        ref={setNodeRef}
        style={style}
        data-testid={classes.row}
        className={`${classes.row} ${isDragging ? classes.dragging : ''} ${isHighlighted ? classes.rowHighlighted : ''} ${isChecked ? classes.rowChecked : ''} ${allowRowSelect ? classes.rowSelectable : ''}`}
        onClick={allowRowSelect ? handleClick : undefined}
        {...dragHandleProps}
        {...restProps}
      >
        {row &&
          renderTableRow(row, columns, rowIndex, {
            // undefined (not {}) while dragging — renderTableRow's own
            // default takes over, so every dragging row shares the same
            // stable empty-props reference instead of a fresh {} each time.
            dragHandleProps: isDragging ? undefined : dragHandleProps,
            rowId,
            handleExpandedRows,
            expandedRows,
            isActionColumnCollapsed,
            isChecked,
            onCheckRow,
            disableCheckbox,
            isNewRowTable,
          })}
      </tr>
      {isExpanded && (
        <>
          {expandedContent && (
            <tr className={classes.row}>
              <td
                colSpan={columns.length}
                className={classes.expandedContentRender}
              >
                {expandedContent(row)}
              </td>
            </tr>
          )}
          {!row?.subRows?.length && !expandedContent && (
            <tr className={classes.row}>
              <td colSpan={columns.length} className={classes.noDataFound}>
                {noDataMessage}
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
});
SortableTableRow.propTypes = {
  row: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columns: PropTypes.array.isRequired,
  highlightedRow: PropTypes.object,
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  handleExpandedRows: PropTypes.func,
  expandedRows: PropTypes.array,
  noDataMessage: PropTypes.string,
  expandedContent: PropTypes.func,
  isActionColumnCollapsed: PropTypes.bool,
  isChecked: PropTypes.bool,
  onCheckRow: PropTypes.func,
  disableCheckbox: PropTypes.bool,
  isNewRowTable: PropTypes.bool,
};

export default SortableTableRow;
