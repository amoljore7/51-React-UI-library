import React from 'react';
import PropTypes from 'prop-types';
import { classes } from './constants';

const TableWithNoData = ({ noDataMessage, columns }) => {
  if (!noDataMessage) return null;

  return (
    <tr className={classes.row}>
      <td
        className={`${classes.expandedCellRender} ${classes.render}`}
        colSpan={columns?.length || 1}
      >
        <div className={classes.noDataFound}>{noDataMessage}</div>
      </td>
    </tr>
  );
};

TableWithNoData.propTypes = {
  noDataMessage: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
};

export default TableWithNoData;
