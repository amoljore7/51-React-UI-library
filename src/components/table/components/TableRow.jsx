import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { classes } from '../constants';
import { renderTableRow } from './RenderTableRow';

const TableRow = React.memo(({
  row,
  columns,
  rowIndex,
  rowId = rowIndex,
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
  const handleClick = useCallback(
    e => onRowSelect?.(row, e),
    [row, onRowSelect]
  );

  const isHighlighted = row === highlightedRow;

  return (
    <>
      <tr
        data-testid={classes.row}
        className={`${classes.row} ${isHighlighted ? classes.rowHighlighted : ''} ${isChecked ? classes.rowChecked : ''} ${allowRowSelect ? classes.rowSelectable : ''}`}
        onClick={allowRowSelect ? handleClick : undefined}
        {...restProps}
      >
        {row &&
          renderTableRow(row, columns, rowIndex, {
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
      {expandedRows?.includes(rowId) &&
        (row?.subRows?.length > 0 ? (
          row.subRows.map((subRow, index) => {
            return (
              <tr
                key={`${rowIndex}-${index}`}
                className={`${classes.row} ${classes.expandedRow}`}
              >
                {renderTableRow(subRow, columns, subRow?.id, { isSubRow: true, isActionColumnCollapsed })}
              </tr>
            );
          })
        ) : (
          <tr className={classes.row}>
            <td
              className={
                expandedContent
                  ? `${classes.expandedContentRender}`
                  : `${classes.expandedCellRender} ${classes.render}`
              }
              colSpan={columns?.length}
            >
              {expandedContent && <>{expandedContent(row)}</>}
              {!row?.subRows?.length && !expandedContent && (
                <div className={classes.noDataFound}>{noDataMessage}</div>
              )}
            </td>
          </tr>
        ))}
    </>
  );
});
TableRow.propTypes = {
  row: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rowIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

export default TableRow;
