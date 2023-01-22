/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Table from './Table';
import { classes, selectPageSize, tableRole } from './constants';
describe('Unit tests for table component', () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      sortable: true,
      width: '150px',
      horizontalAlign: 'right',
    },
    {
      field: 'firstName',
      headerName: 'Firstname',
      sortable: true,
      horizontalAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Lastname',
      horizontalAlign: 'left',
    },
    {
      field: 'age',
      headerName: 'Age',
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 50 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Stark', firstName: 'Arya', age: 16 },
  ];

  const paginationModal = {
    page: 0,
    pageSizes: [10, 50, 100],
    pageSize: 10,
    totalLength: rows.length,
    lastPage: true,
    onPageSizeChange: () => {},
    onPageChange: () => {},
  };
  const props = {
    rows,
    columns,
    sortHandler: () => {},
    paginationModal,
  };

  it('Number of columns match the number of columns provided', () => {
    const { getByRole } = render(<Table {...props} />);
    expect(getByRole(tableRole).getElementsByClassName(classes.headerCell)).toHaveLength(
      columns.length
    );
  });

  it('Number of rows matches the number of rows provided + 1', () => {
    const { getByRole } = render(<Table {...props} />);
    expect(getByRole(tableRole).getElementsByClassName(classes.row)).toHaveLength(rows.length);
  });

  it('Number of page sizes options match the same on click of default item', () => {
    render(<Table {...props} />);
    fireEvent.click(screen.getByTitle(selectPageSize));
    expect(document.getElementsByClassName(classes.paginationRest)).toHaveLength(3);
  });

  it('Reflects the pageSize on pageSize set as 50 ', () => {
    const changePageSize = {
      ...props,
      paginationModal: {
        page: 0,
        pageSizes: [10, 50, 100],
        pageSize: 50,
        totalLength: rows.length,
        lastPage: true,
        onPageSizeChange: () => {},
        onPageChange: () => {},
      },
    };
    render(<Table {...changePageSize} />);
    expect(document.getElementsByClassName(classes.paginationDefaultText)[0].textContent).toEqual(
      '50'
    );
  });

  it('Sorting icons are reflected on respective sorting ', () => {
    render(<Table {...props} />);
    const sortIcon = document
      .getElementsByClassName(classes.headerIcon)[0]
      .getElementsByTagName('img')[0];
    expect(sortIcon.getAttribute('alt')).toEqual('unsorted-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('ascending-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('descending-sort-icon');
    fireEvent.click(sortIcon);
    expect(sortIcon.getAttribute('alt')).toEqual('unsorted-sort-icon');
  });
});
