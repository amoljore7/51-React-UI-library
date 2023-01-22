import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SearchInput from '../search';
import { PaginationBar } from './tableElements';
import SortedAscending from '../../assets/icons/column-ascending.svg';
import Unsorted from '../../assets/icons/column-unsorted.svg';
import SortedDescending from '../../assets/icons/columns-descending.svg';
import {
  classes,
  columnMinWidth,
  columnMinWidthPixels,
  HUNDRED_DECIMAL,
  mousedownEvent,
  mousemoveEvent,
  mouseupEvent,
  navigationRole,
  paginationArialLabel,
  resizeEvent,
  resizerWidth,
  searchBarSize,
  sortIconSuffix,
  sortingType,
  tabIndex,
  tableAriaLabel,
  tableCellPrefix,
  tableHeaderPrefix,
  tableRole,
  tableRowPrefix,
} from './constants';
import './table.scss';
const useTableWidth = () => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = document.getElementsByClassName(classes.table)[0];
    const updateWidth = () => {
      setWidth(element.offsetWidth);
    };
    window.addEventListener(resizeEvent, updateWidth);
    updateWidth();
    return () => window.removeEventListener(resizeEvent, updateWidth);
  }, []);
  return width;
};

const Table = ({ columns, rows, sortHandler, paginationModal, searchBar, resizableColumns }) => {
  const tableNode = useRef();
  const containerNode = useRef();
  const headerProps = { sortHandler, columns, tableNode, resizableColumns };
  const tableWidth = useTableWidth();
  const [searchText, setSearchText] = useState('');

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

  return (
    <div ref={containerNode} className={classes.container}>
      {(searchBar || paginationModal) && (
        <div
          className={classes.pagination}
          style={{ width: getWidth() }}
          role={navigationRole}
          aria-label={paginationArialLabel}
          tabIndex={tabIndex}
        >
          {searchBar && (
            <div className={classes.searchContainer}>
              <SearchInput
                value={searchText}
                onChange={onChangeSearch}
                disabled={false}
                width={searchBarSize}
                placeholder={searchBar.placeholder}
              />
            </div>
          )}
          {paginationModal && <PaginationBar paginationModal={paginationModal} />}
        </div>
      )}
      <table ref={tableNode} className={classes.table} role={tableRole} aria-label={tableAriaLabel}>
        <TableHeader {...headerProps} />
        <tbody tabIndex={tabIndex}>
          {rows &&
            rows.map((row, index) => {
              const props = {
                row,
                rowIndex: index,
                columns,
              };
              return <TableRow key={`${tableRowPrefix}-${index}`} {...props} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

/***
 *  Resizing will take the delta of current cursor position and initial cursor
 *  position when mousedown event (press down and Drag) ocurred.
 *
 *  InitialCursorPosition = right of the column/header Bounding client rect
 *
 *  deltaMousePosition = InitialCursorPosition - currentCursorPosition
 *  = Length the mouse has moved.
 *
 *  The width of the current column:
 *  (current width of column/header cell)  + (Length the mouse has moved.)
 *
 *  The width of the adjacent column:
 *
 * (current width of adjacent column/header cell) - (length the mouse has moved.)
 *
 *  Resizing is done only if both column width are >= 88 pixels
 */
const resizeHelper = ({ currentColumn, adjacentColumn, currentCursorPosition, tableWidth }) => {
  // obtain current header cell width and right of the bounding element rectangle
  const {
    width: currentColumnWidth,
    right: currentColumnRight,
  } = currentColumn.getBoundingClientRect();
  // obtain the adjacent column width from bounding client Rect
  const { width: adjacentColumnWidth } = adjacentColumn.getBoundingClientRect();

  const initialMousePosition = currentColumnRight + window.pageXOffset - resizerWidth;
  const deltaMousePosition = currentCursorPosition - initialMousePosition;

  // the length of mouse moved is added to current header width
  // the same is subtracted from adjacent column width
  const currentColumnNewWidth = currentColumnWidth + deltaMousePosition;
  const adjacentColumnNewWidth = adjacentColumnWidth - deltaMousePosition;

  if (currentColumnNewWidth >= columnMinWidth && adjacentColumnNewWidth >= columnMinWidth) {
    // plug in width percentage value for responsiveness
    currentColumn.style.width = `${(currentColumnNewWidth / tableWidth) * HUNDRED_DECIMAL}%`;
    adjacentColumn.style.width = `${
      ((adjacentColumnWidth - deltaMousePosition) / tableWidth) * HUNDRED_DECIMAL
    }%`;
  }
};

const TableHeader = ({ columns, sortHandler, tableNode, resizableColumns }) => {
  const [sortedColumn, setSortedColumn] = useState('');
  const headerSortHandler = (fieldName) => {
    sortedColumn !== fieldName && setSortedColumn(fieldName);
  };
  const [headerRefs] = useState(columns.map(() => useRef()));

  const resizeHandler = (event, index) => {
    if (!resizableColumns) return;
    const currentColumn = headerRefs[index]?.current;
    const adjacentColumn = headerRefs[index + 1].current;
    const tableElement = tableNode.current;
    const currentCursorPosition = event.pageX;
    const tableWidth = tableElement.offsetWidth;

    if (!tableElement && !currentColumn && !adjacentColumn) return;
    resizeHelper({ currentColumn, adjacentColumn, currentCursorPosition, tableWidth });
  };

  useEffect(() => {
    // convert all width to percentage for responsiveness
    // this will run only once since the refs would be defined on mount
    // only once through out the component lifecycle
    const tableElement = tableNode?.current;
    if (tableElement && resizableColumns) {
      columns.map((_, columnNo) => {
        const headerElement = headerRefs[columnNo]?.current;
        if (headerElement) {
          const origWidth = headerElement.offsetWidth;
          const tableWidth = tableElement.offsetWidth;
          headerElement.style.width = `${(origWidth / tableWidth) * HUNDRED_DECIMAL}%`;
        }
      });
    }
  }, [tableNode, ...headerRefs]);

  return (
    <thead tabIndex={tabIndex}>
      <tr tabIndex={tabIndex} className={classes.header}>
        {columns &&
          columns.map((column, index) => {
            const { headerName, sortable, field } = column;
            const reset = sortedColumn !== field;

            const iconProps = {
              sortHandler,
              field,
              reset,
              headerSortHandler,
            };
            const tableHeaderCellProp = {
              column,
              columnLength: columns.length,
              index,
              headerName,
              sortable,
              iconProps,
              resizeHandler,
              resizableColumns,
            };
            return (
              <TableHeaderCell key={`${index}`} ref={headerRefs[index]} {...tableHeaderCellProp} />
            );
          })}
      </tr>
    </thead>
  );
};

const TableHeaderCell = React.forwardRef(
  (
    {
      column,
      index,
      headerName,
      sortable,
      iconProps,
      resizeHandler,
      columnLength,
      resizableColumns,
    },
    tableHeaderRef
  ) => {
    const resizeRef = useRef();
    const [resizerFocus, setResizerFocus] = useState(false);
    const parentResizeHandler = (e) => {
      if (!resizableColumns) return;
      setResizerFocus(true);
      resizeHandler(e, index);
    };
    const resizerClasses = {
      [classes.resizer]: true,
      [classes.resizerHover]: resizerFocus,
    };

    const resizeInit = (_) => {
      document.addEventListener(mousemoveEvent, parentResizeHandler);
    };

    useLayoutEffect(() => {
      if (
        index !== columnLength - 1 &&
        tableHeaderRef?.current &&
        resizeRef?.current &&
        resizableColumns
      ) {
        resizeRef.current.addEventListener(mousedownEvent, resizeInit);
        document.addEventListener(mouseupEvent, () => {
          setResizerFocus(false);
          if (tableHeaderRef && tableHeaderRef.current)
            document.removeEventListener(mousemoveEvent, parentResizeHandler);
        });
      }
    }, [resizeRef, tableHeaderRef]);

    return (
      <>
        <th
          className={classes.headerCell}
          style={{ width: column.width, minWidth: columnMinWidthPixels }}
          key={`${tableHeaderPrefix}-${index}`}
          tabIndex={tabIndex}
          title={headerName}
          ref={tableHeaderRef}
          onMouseLeave={() => setResizerFocus(false)}
        >
          <div className={classes.headerTextIconContainer}>
            <div className={classes.headerText} tabIndex={tabIndex}>
              {headerName}
            </div>
            <div className={classes.sortIconResizeContainer}>
              {sortable && <SortIcon {...iconProps} />}
              {index !== columnLength - 1 && resizableColumns && (
                <div
                  className={classNames(resizerClasses)}
                  ref={resizeRef}
                  onMouseOver={() => setResizerFocus(true)}
                />
              )}
            </div>
          </div>
        </th>
      </>
    );
  }
);
const renderTableRow = (row, columns, rowIndex) => {
  const arrTableCells = [];

  for (let fieldIndex = 0; fieldIndex < columns.length; fieldIndex++) {
    const column = columns[fieldIndex];
    arrTableCells.push(
      <TableCell
        key={`${tableCellPrefix}${rowIndex}-${fieldIndex}`}
        value={row[column.field]}
        horizontalAlignment={column.horizontalAlignment}
        width={column.width}
        renderColumn={column.renderColumn}
        row={row}
      />
    );
  }
  return arrTableCells;
};
const TableRow = ({ row, columns, rowIndex }) => {
  return <tr className={classes.row}>{row && renderTableRow(row, columns, rowIndex)}</tr>;
};

const TableCell = ({ value, horizontalAlignment, width, renderColumn, row }) => {
  const cellClasses = {
    [classes.cell]: !renderColumn,
    [classes.render]: renderColumn,
  };
  return (
    <td
      style={{
        width: width,
        textAlign: horizontalAlignment,
      }}
      className={classNames(cellClasses)}
      tabIndex={tabIndex}
      title={value}
    >
      {(renderColumn && (
        <div tabIndex={tabIndex} className={classes.cellRender}>
          {renderColumn(row, value)}
        </div>
      )) ||
        value}
    </td>
  );
};

const SortIcon = ({ sortHandler, field, reset, headerSortHandler }) => {
  const [sortType, setSortType] = useState(sortingType.unsorted);
  useEffect(() => {
    reset && setSortType(sortingType.unsorted);
  }, [reset]);

  const getSortIcon = (sortType) => {
    switch (sortType) {
      case sortingType.ascending:
        return SortedAscending;
      case sortingType.descending:
        return SortedDescending;
      default:
        return Unsorted;
    }
  };
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
    const nextType = getNextType();
    headerSortHandler(field);
    setSortType(nextType);
    sortHandler(nextType, field);
  };
  return (
    <span className={classes.headerIcon} tabIndex={tabIndex} onClick={(e) => clickHandler()}>
      <img
        src={getSortIcon(sortType)}
        alt={`${sortType}-${sortIconSuffix}`}
        title={`${sortType}`}
      />
    </span>
  );
};
Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      horizontalAlignment: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortHandler: PropTypes.func,
  paginationModal: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    pageSize: PropTypes.number.isRequired,
    totalLength: PropTypes.number.isRequired,
    lastPage: PropTypes.bool,
    onPageChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
  }),
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }),
  verticalScroll: PropTypes.bool,
  horizontalScroll: PropTypes.bool,
};

export default Table;
