import classNames from 'classnames';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import InfiniteScroll from 'react-infinite-scroll-component';
import SortedAscending from '../../assets/icons/column-ascending.svg';
import Unsorted from '../../assets/icons/column-unsorted.svg';
import SortedDescending from '../../assets/icons/columns-descending.svg';
import DragAndDrop from '../../assets/icons/drag-and-drop.svg';
import SearchInput from '../search';
import {
  HUNDRED_DECIMAL,
  classes,
  columnMinWidth,
  columnMinWidthPixels,
  mousedownEvent,
  mousemoveEvent,
  mouseupEvent,
  navigationRole,
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
  tableSearchHeight,
} from './constants';
import './table.scss';
import Filter from './ColumnFilter';
import ExpandRowIcon from './ExpandRowIcon';
import TableWithNoData from './TableWithNoData';

const useTableWidth = () => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = document.getElementsByClassName(classes.table)[0];
    const updateWidth = () => {
      if (element?.offsetWidth) {
        setWidth(element.offsetWidth);
      }
    };
    window.addEventListener(resizeEvent, updateWidth);
    updateWidth();
    return () => window.removeEventListener(resizeEvent, updateWidth);
  }, []);
  return width;
};

const Table = ({
  columns,
  rows = [{}],
  sortHandler,
  searchBar,
  resizableColumns,
  nextPageLink,
  hasInfiniteScroll,
  onScrollEnd,
  infiniteScrollLoadingText,
  isInsideModal = false,
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
}) => {
  const tableNode = useRef();
  const containerNode = useRef();
  const headerProps = {
    sortHandler,
    columns,
    tableNode,
    resizableColumns,
    isSearchVisible: Boolean(searchBar),
  };
  const tableWidth = useTableWidth();
  const [searchText, setSearchText] = useState('');
  const [internalExpandedRows, setInternalExpandedRows] = useState([]);

  const expandedRows = controlledExpandedRows ?? internalExpandedRows;
  const handleExpandedRows = (expandedRowId, onExpand = () => {}, row = {}) => {
    const expandedRowsList = [...expandedRows];
    var index = expandedRowsList?.indexOf(expandedRowId);
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
  };

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

  const columnContent = [...columns];
  if (columns && allowDraggableRow) {
    columnContent.splice(0, 0, {
      field: 'dragNDrop',
      headerName: '',
      sortable: false,
      renderColumn: () => {
        return <img src={DragAndDrop} />;
      },
      width: '50px',
    });
    headerProps.columns = columnContent;
  }
  headerProps.hideNewRowHeader = hideNewRowHeader;
  headerProps.noHeaderBackground = noHeaderBackground;

  const renderTable = () =>
    allowDraggableRow ? (
      <DragDropContext onDragEnd={onDragEnd}>
        <table
          ref={tableNode}
          className={classes.table}
          role={tableRole}
          aria-label={tableAriaLabel}
        >
          <TableHeader {...headerProps} />
          <Droppable droppableId="droppable-container">
            {(provider) => (
              <tbody
                ref={provider.innerRef}
                {...provider.droppableProps}
                tabIndex={tabIndex}
              >
                {rows && rows.length > 0 ? (
                  rows.map((row, index) => {
                    const props = {
                      row,
                      rowIndex: index,
                      columns: columnContent,
                      highlightedRow,
                      allowRowSelect,
                      allowDraggableRow,
                      handleExpandedRows,
                      expandedRows,
                      noDataMessage,
                      expandedContent,
                    };

                    if (allowRowSelect) {
                      props.onClick = (e) => onRowSelect(row, e);
                    }

                    return (
                      <TableRow key={`${tableRowPrefix}-${index}`} {...props} />
                    );
                  })
                ) : (
                  <TableWithNoData noDataMessage={noDataMessage} columns={columns} />
                )}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    ) : (
      <table
        ref={tableNode}
        className={classes.table}
        role={tableRole}
        aria-label={tableAriaLabel}
      >
        <TableHeader {...headerProps} />
        <tbody tabIndex={tabIndex}>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => {
              const props = {
                row,
                rowIndex: index,
                columns: columnContent,
                highlightedRow,
                allowRowSelect,
                allowDraggableRow,
                handleExpandedRows,
                expandedRows,
                noDataMessage,
                expandedContent
              };

              if (allowRowSelect) {
                props.onClick = (e) => onRowSelect(row, e);
              }

              return <TableRow key={`${tableRowPrefix}-${index}`} {...props} />;
            })
          ) : (
            <TableWithNoData noDataMessage={noDataMessage} columns={columns} />
          )}
        </tbody>
      </table>
    );

  let infiniteModalProps = {};
  if (isInsideModal) {
    infiniteModalProps = {
      height: 'calc(100vh - 160px)',
      className: classes.infiniteScrollInsideModal,
    };
  }

  return (
    <div ref={containerNode} className={classes.container}>
      {searchBar && (
        <div
          className={classes.search}
          style={getWidth() ? { width: getWidth() } : {}}
          role={navigationRole}
          tabIndex={tabIndex}
        >
          <div className={classes.searchContainer}>
            <SearchInput
              value={searchText}
              onChange={onChangeSearch}
              disabled={Boolean(searchBar?.isDisabled)}
              width={searchBarSize}
              placeholder={searchBar?.placeholder || ''}
            />
          </div>
        </div>
      )}
      {hasInfiniteScroll && rows.length !== 0 ? (
        <InfiniteScroll
          dataLength={rows?.length || 0}
          hasMore={!!nextPageLink}
          next={onScrollEnd}
          loader={infiniteScrollLoadingText}
          scrollThreshold={1}
          {...infiniteModalProps}
        >
          {renderTable()}
        </InfiniteScroll>
      ) : (
        renderTable()
      )}
      {addNewRow && (
        <div
          className={`${classes.addNewRow} ${rows?.length === 0 ? classes.emptyNewRowHeader : {}
            }`}
        >
          <Table hideNewRowHeader={rows?.length === 0} columns={columnsForNewRow} />
        </div>
      )}
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
const resizeHelper = ({
  currentColumn,
  adjacentColumn,
  currentCursorPosition,
  tableWidth,
}) => {
  // obtain current header cell width and right of the bounding element rectangle
  const {
    width: currentColumnWidth,
    right: currentColumnRight,
  } = currentColumn.getBoundingClientRect();
  // obtain the adjacent column width from bounding client Rect
  const { width: adjacentColumnWidth } = adjacentColumn.getBoundingClientRect();

  const initialMousePosition =
    currentColumnRight + window.pageXOffset - resizerWidth;
  const deltaMousePosition = currentCursorPosition - initialMousePosition;

  // the length of mouse moved is added to current header width
  // the same is subtracted from adjacent column width
  const currentColumnNewWidth = currentColumnWidth + deltaMousePosition;
  const adjacentColumnNewWidth = adjacentColumnWidth - deltaMousePosition;

  if (
    currentColumnNewWidth >= columnMinWidth &&
    adjacentColumnNewWidth >= columnMinWidth
  ) {
    // plug in width percentage value for responsiveness
    currentColumn.style.width = `${(currentColumnNewWidth / tableWidth) * HUNDRED_DECIMAL
      }%`;
    adjacentColumn.style.width = `${((adjacentColumnWidth - deltaMousePosition) / tableWidth) * HUNDRED_DECIMAL
      }%`;
  }
};

const TableHeader = ({
  columns,
  sortHandler,
  tableNode,
  resizableColumns,
  isSearchVisible,
  hideNewRowHeader,
  noHeaderBackground,
}) => {
  const [sortedColumn, setSortedColumn] = useState('');
  const headerSortHandler = (fieldName) => {
    sortedColumn !== fieldName && setSortedColumn(fieldName);
  };
  const [headerRefs] = useState(columns.map(() => useRef()));
  const [resizerFocus, setResizerFocus] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const resizeHandler = (event, index) => {
    if (!resizableColumns) return;
    const currentColumn = headerRefs[index]?.current;
    const adjacentColumn = headerRefs[index + 1].current;
    const tableElement = tableNode.current;
    const currentCursorPosition = event.pageX;
    const tableWidth = tableElement.offsetWidth;

    if (!tableElement && !currentColumn && !adjacentColumn) return;
    resizeHelper({
      currentColumn,
      adjacentColumn,
      currentCursorPosition,
      tableWidth,
    });
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
          headerElement.style.width = `${(origWidth / tableWidth) * HUNDRED_DECIMAL
            }%`;
          if (isSearchVisible) {
            headerElement.style.top = tableSearchHeight;
          }
        }
      });
    }
  }, [tableNode, ...headerRefs]);

  return (
    <thead tabIndex={tabIndex}>
      <tr
        tabIndex={tabIndex}
        className={classes.header}
        onMouseLeave={() => setResizerFocus(false)}
        onMouseOver={() => setResizerFocus(true)}
      >
        {columns &&
          columns.map((column, index) => {
            const { headerName, sortable, field, renderHeader } = column;
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
              renderHeader,
              sortable,
              iconProps,
              resizeHandler,
              resizableColumns,
              resizerFocus,
              setResizerFocus,
            };
            return (
              <TableHeaderCell
                key={`${index}`}
                ref={headerRefs[index]}
                {...tableHeaderCellProp}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                hideNewRowHeader={hideNewRowHeader}
                noHeaderBackground={noHeaderBackground}
              />
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
    },
    tableHeaderRef
  ) => {
    const columnFilterRef = useRef();
    const parentResizeHandler = (e) => {
      e.stopPropagation();
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
        resizableColumns
      ) {
        tableHeaderRef.current.addEventListener(mousedownEvent, resizeInit);
        document.addEventListener(mouseupEvent, () => {
          setResizerFocus(false);
          if (tableHeaderRef && tableHeaderRef.current)
            document.removeEventListener(mousemoveEvent, parentResizeHandler);
        });
      }
    }, [tableHeaderRef]);

    useEffect(() => {
      if (columnFilterRef?.current) {
        columnFilterRef.current.addEventListener(mousedownEvent, (e) => {
          // To prevent resize event from being triggered
          e.stopPropagation();
        });
      }
    }, [columnFilterRef]);

    const [sortType, setSortType] = useState(sortingType.unsorted);
    useEffect(() => {
      iconProps.reset && setSortType(sortingType.unsorted);
    }, [iconProps.reset]);

    useEffect(() => {
      setFilterValues(column.filter?.selectedFilters)
    }, [JSON.stringify(column.filter?.selectedFilters)]);

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
      iconProps.headerSortHandler(iconProps.field);
      setSortType(nextType);
      iconProps.sortHandler(nextType, iconProps.field);
    };

    const sortClasses = {
      [classes.headerTextIconContainer]: true,
      [classes.headerCursor]: sortable,
    };

    const handleOnApply = (field, currentFilterValues) => {
      const columnFilters = { ...filterValues };
      // To store filter values based on column name
      columnFilters[field] = currentFilterValues;
      setFilterValues(columnFilters);
      column.filter.onApply(columnFilters);
    };

    return (

      <th
        className={noHeaderBackground ? classes.headerCellNoBackground : classes.headerCell}
        style={{ width: column.width, minWidth: columnMinWidthPixels }}
        key={`${tableHeaderPrefix}-${index}`}
        tabIndex={tabIndex}
        title={headerName}
        ref={tableHeaderRef}
      >
        {!hideNewRowHeader && (
          <>
            {typeof renderHeader === 'function' ? renderHeader() :
              (
                <div className={classNames(sortClasses)}>
                  <div className={classes.headerText} tabIndex={tabIndex} onClick={() => sortable && clickHandler()}>
                    {headerName}
                  </div>
                  <div
                  >
                    <div className={classes.sortIconResizeContainer}>
                      {sortable && (
                        <span
                          className={classes.headerIcon}
                          tabIndex={tabIndex}
                          onClick={() => clickHandler()}
                          onMouseEnter={() => setResizerFocus(false)}
                          onMouseOver={(e) => e.stopPropagation()}
                        >
                          <img
                            src={getSortIcon(sortType)}
                            alt={`${sortType}-${sortIconSuffix}`}
                            title={`${sortType}`}
                          />
                        </span>
                      )}
                      {column.showFilter && (
                        <div
                          ref={columnFilterRef}
                          className={classes.columnFilter}
                          onMouseEnter={() => setResizerFocus(false)}
                          onMouseOver={(e) => e.stopPropagation()}
                        >
                          <Filter
                            onApply={(currentFilterValues) =>
                              handleOnApply(column.field, currentFilterValues)
                            }
                            options={column.filter.options}
                            singleSelector={column.filter.singleSelector}
                            values={filterValues?.[column.field]}
                          />
                        </div>
                      )}
                      {index !== columnLength - 1 && resizableColumns && (
                        <div
                          className={classNames(resizerClasses)}
                          onClick={(e) => e.stopPropagation()}
                        />

                      )}
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
      </th>
    );
  }
);
const renderTableRow = (
  row,
  columns,
  rowIndex,
  dragHandleProps = {},
  handleExpandedRows = () => {},
  expandedRows = [],
  isSubRow = false
) => {
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
        allowExpand={column.allowExpand}
        row={row}
        dragHandleProps={dragHandleProps}
        index={rowIndex}
        handleExpandedRows={handleExpandedRows}
        renderTableRow={renderTableRow}
        expandedRows={expandedRows}
        onExpand={column.onExpand}
        isSubRow={isSubRow}
      />
    );
  }
  return arrTableCells;
};
const TableRow = ({
  row,
  columns,
  rowIndex,
  highlightedRow,
  allowRowSelect,
  allowDraggableRow,
  handleExpandedRows,
  expandedRows,
  noDataMessage,
  expandedContent,
  ...restProps
}) => {
  const isHighlighted = isEqual(row, highlightedRow);
  const isExpanded = expandedRows.includes(rowIndex);

  return allowDraggableRow ? (
    <Draggable
      key={rowIndex}
      draggableId={rowIndex.toString()}
      index={rowIndex}
    >
      {(provider, snapshot) => (
        <>
          <tr
            {...provider.draggableProps}
            ref={provider.innerRef}
            data-testid={classes.row}
            className={`${classes.row} ${snapshot.isDragging ? classes.dragging : ""
              }`}
            {...provider.dragHandleProps} // or apply dragHandleProps on drag icon only
            style={provider.draggableProps.style}
            {...restProps}
          >
            {row &&
              renderTableRow(
                row,
                columns,
                rowIndex,
                snapshot.isDragging ? {} : provider.dragHandleProps, // pass dragHandleProps to drag icon only if needed
                handleExpandedRows,
                expandedRows
              )}
          </tr>
          {isExpanded && (
            <>
              {expandedContent && (
                <tr className={classes.row}>
                  <td
                    colSpan={columns.length}
                    style={{ backgroundColor: "#f9f9f9", padding: "0px" }}
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
      )}
    </Draggable>
  ) : (
    <>
      <tr
        data-testid={classes.row}
        className={`${classes.row} ${isHighlighted ? classes.rowHighlighted : ''} ${allowRowSelect ? classes.rowSelectable : ''
          }`}
        {...restProps}
      >
        {row &&
          renderTableRow(
            row,
            columns,
            rowIndex,
            {},
            handleExpandedRows,
            expandedRows
          )}
      </tr>
      {expandedRows?.includes(rowIndex) &&
        (row?.subRows?.length > 0 ? (
          row.subRows.map((subRow, index) => {
            return (
              <tr
                key={`${rowIndex}-${index}`}
                className={`${classes.row} ${classes.expandedRow}`}
              >
                {renderTableRow(subRow, columns, subRow?.id, {}, () => {}, [], true)}
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
};

const TableCell = ({
  value,
  horizontalAlignment,
  width,
  renderColumn,
  row,
  dragHandleProps = {},
  index,
  handleExpandedRows = () => {},
  allowExpand,
  expandedRows,
  onExpand = () => {},
  isSubRow = false,
}) => {
  const cellClasses = {
    [classes.cell]: !renderColumn,
    [classes.render]: renderColumn,
  };

  const isRowExpandable =
    typeof allowExpand === 'boolean'
      ? allowExpand
      : typeof allowExpand === 'function'
        ? allowExpand(row)
        : false;

  const isExpanded = expandedRows?.includes(index);

  const handleMouseDown = (mouseDownEvent) => {
    if (isEmpty(dragHandleProps)) {
      return;
    }
    mouseDownEvent.currentTarget.focus();
  };

  return (
    <td
      style={{
        width: width,
        textAlign: horizontalAlignment,
        paddingLeft:
          allowExpand && (!isRowExpandable || isSubRow) ? '2.625rem' : '1rem',
      }}
      className={classNames(cellClasses)}
      tabIndex={tabIndex}
      title={value}
      {...dragHandleProps}
      onMouseDown={handleMouseDown}
    >
      {(renderColumn && (
        <div tabIndex={tabIndex} className={classes.cellRender}>
          {isRowExpandable && !isSubRow && (
            <ExpandRowIcon
              isExpanded={isExpanded}
              onClick={() => handleExpandedRows(index, onExpand, row)}
            />
          )}
          {renderColumn(row, value, index)}
        </div>
      )) || (
          <div className={classes.expandRow}>
            {isRowExpandable && !isSubRow && (
              <ExpandRowIcon
                isExpanded={isExpanded}
                onClick={() => handleExpandedRows(index, onExpand, row)}
              />
            )}
            <span>{value}</span>
          </div>
        )}
    </td>
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
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortHandler: PropTypes.func,
  searchBar: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }),
  verticalScroll: PropTypes.bool,
  horizontalScroll: PropTypes.bool,
  isInsideModal: PropTypes.bool,
  allowRowSelect: PropTypes.bool,
  onRowSelect: PropTypes.func,
  highlightedRow: PropTypes.object,
  noDataMessage: PropTypes.string,
};

export default Table;
