import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa';
import { FiAirplay, FiPlay } from 'react-icons/fi';
import Star from '../../assets/icons/star.svg';
import EmptyStar from '../../assets/icons/empty_start.svg';
import Aws from '../../assets/icons/aws.svg';
import Azure from '../../assets/icons/azure.svg';
import Button from '../button';
import NewTable from './table';
import { classes, defaultIconSize } from './constants';

import './table-stories.scss';

export default {
  title: 'design-components/NewTable',
  component: NewTable,
};

export const DemoTable = () => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);

  const getInitialData = async () => {
    setLoading(true);
    const response = await apiWithSorting();
    setLoading(false);
    setTableData(response);
  };

  const getTableData = async () => {
    setLoading(true);
    const response = await apiWithSorting(sortBy, sortOrder);
    setLoading(false);
    response && setTableData(response);
  };
  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    getTableData();
  }, [sortBy, sortOrder]);

  const sortHandler = (srtOrdr, srtBy) => {
    if (srtOrdr !== sortOrder) {
      setSortOrder(srtOrdr);
    }
    if (srtBy !== sortBy) {
      setSortBy(srtBy);
    }
  };

  const btnClass = { [classes.btnGroupPaddingTop]: true, [classes.columnsHeaderStyle]: true };

  // every column should have either a field value or a renderColumn function
  const columns = [
    {
      // if render column not present value will be taken from row like row[field]
      field: 'id',
      headerName: 'Id',
      sortable: true,
      width: '20%',
      horizontalAlignment: 'left',
      renderColumn: (row) => {
        // add state logic
        return (
          <div className={classes.columnsHeaderStyle}>
            {row.age && row.age > 16 ? (
              <img src={Star} width={defaultIconSize} height={defaultIconSize} onClick={() => alert('Icon clicked')} />
            ) : (
              <img src={EmptyStar} width={defaultIconSize} height={defaultIconSize} onClick={() => alert('Icon clicked')} />
            )}
            {row.id}
          </div>
        );
      },
    },
    {
      width: '20%',
      field: 'lastName',
      headerName: 'Lastname',
      horizontalAlignment: 'left',
      renderColumn: (row) => {
        // add state logic
        return (
          <div className={classes.columnsHeaderStyle} >
            {row.age && row.age > 16 ? (
              <img src={Aws} width={defaultIconSize} height={defaultIconSize} onClick={() => alert('Icon clicked')} />
            ) : (
              <img src={Azure} width={defaultIconSize} height={defaultIconSize} onClick={() => alert('Icon clicked')} />
            )}
            {row.lastName}
          </div>
        );
      },
    },
    {
      width: '20%',
      field: 'firstName',
      headerName: 'Firstname',
      sortable: true,
      horizontalAlignment: 'left',
      renderColumn: (row, value) => {
        // custom row where value is showed on a button
        return (
          <div className={classes.columnsHeaderStyle}>
            {value && (
              <>
                {value}
                <FiAirplay size={defaultIconSize} onClick={() => alert('Icon clicked')} />
              </>
            )}
          </div>
        );
      },
    },
    {
      width: '20%',
      field: 'age',
      headerName: 'Age',
      horizontalAlignment: 'left',
    },
    {
      width: '150px',
      headerName: 'Action',
      renderColumn: (row, value) => {
        // add state logic
        const [toggle, setToggle] = useState(true);
        return (
          <div className={classes.actionColumn}>
            <div className={classes.columnsHeaderStyle}>
              {row.age && row.age > 16 ? (
                <Button variant="primary" size="medium" onClick={() => alert('Button clicked')}>
                  <FiPlay size={defaultIconSize} className={classes.btnMarginRight} />
                  Button
                </Button>
              ) : (
                <Button variant="secondary" size="medium" onClick={() => alert('Button clicked')}>
                  <FiPlay size={defaultIconSize} className={classes.btnMarginRight} />
                  Button
                </Button>
              )}

              {toggle ? (
                <BsToggleOn
                  className={classes.toggleBtnGroup}
                  size={defaultIconSize}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  title={'click to toggle OFF'}
                />
              ) : (
                <BsToggleOff
                  className={classes.toggleBtnGroup}
                  size={defaultIconSize}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  title={'click to toggle OFF'}
                />
              )}
              {row.age && row.age > 16 ? (
                <FaUserAltSlash size={defaultIconSize} />
              ) : (
                <FaUserAlt size={defaultIconSize} />
              )}
            </div>
            <div className={classNames({ ...btnClass })}>
              {row.age && row.age === 16 && (
                <Button variant="secondary" size="medium" onClick={() => alert('Button clicked')}>
                  <FiPlay size={defaultIconSize} className={classes.btnMarginRight} />
                  Button
                </Button>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const onSearch = (value) => console.log(value);
  const props = {
    columns,
    rows: tableData,
    sortHandler,
    searchBar: {
      onSearch,
      placeholder: 'Search for users',
    },
    settingHandler: true,
  };

  return (
    <>
      {loading && <div className={classes.loadingContainer} />}
      <div className={classes.loadingLabel}>{loading && 'Loading...'} </div>
      <div>
        <NewTable resizableColumns={true} {...props} />
      </div>
    </>
  );
};

const apiWithSorting = (sortBy = 'none', sortOrder = 'none') => {
  const rowData = [...rows];
  let response = null;

  if (sortOrder === 'ascending') {
    switch (sortBy) {
      case 'id':
        rowData.sort(sortOnIdAscending);
        break;
      case 'firstName':
        rowData.sort(sortOnfirstNameAscending);
    }
  } else if (sortOrder === 'descending') {
    switch (sortBy) {
      case 'id':
        rowData.sort(sortOnIdDescending);
        break;
      case 'firstName':
        rowData.sort(sortOnfirstNameDescending);
    }
  }
  response = rowData;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 2000);
  });
};

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Jon', age: 12 },
  { id: 3, lastName: 'Lannister', firstName: 'Jon', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Jon', age: 36 },
  { id: 5, lastName: 'Targaryen', firstName: 'Jon', age: 15 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 50 },
  { id: 7, lastName: 'Clifford', firstName: 'Jon', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Jon', age: 16 },
];

const sortOnIdAscending = (obj1, obj2) => {
  if (obj1.id > obj2.id) return 1;
  else if (obj1.id === obj2.id) return 0;
  else return -1;
};

const sortOnIdDescending = (obj1, obj2) => {
  if (obj1.id > obj2.id) return -1;
  else if (obj1.id === obj2.id) return 0;
  else return 1;
};
const sortOnfirstNameAscending = (obj1, obj2) => {
  if (obj1.firstName === null && obj2.firstName === null) return 0;
  else if (obj1.firstName === null) return -1;
  else if (obj2.firstName === null) return 1;
  else return obj1.firstName.localeCompare(obj2.firstName);
};

const sortOnfirstNameDescending = (obj1, obj2) => {
  if (obj1.firstName === null && obj2.firstName === null) return 0;
  else if (obj1.firstName === null) return 1;
  else if (obj2.firstName === null) return -1;
  else return obj1.firstName.localeCompare(obj2.firstName) * -1;
};
