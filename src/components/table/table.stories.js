import React, { useEffect, useState } from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa';
import Button from '../button';
import Table from './table';

export default {
  title: 'design-components/Table',
  component: Table,
};

export const DemoTable = () => {
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [sortBy, setSortBy] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);

  const getInitialData = async () => {
    setLoading(true);
    const response = await apiWithSorting(pageSize, page + 1);
    setLoading(false);
    setTableData(response);
    if (response === null || response.length < pageSize) setLastPage(true);
    else setLastPage(false);
  };

  const getTableData = async () => {
    setLoading(true);
    const response = await apiWithSorting(pageSize, page + 1, sortBy, sortOrder);
    setLoading(false);
    response && setTableData(response);
    if (response === null || response.length < pageSize) setLastPage(true);
    else setLastPage(false);
  };
  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    getTableData();
  }, [page, pageSize, sortBy, sortOrder]);

  const onPageChange = (value) => {
    setPage(parseInt(value));
  };

  const onPageSizeChange = (value) => {
    setPageSize(parseInt(value));
    setPage(0);
  };

  const sortHandler = (srtOrdr, srtBy) => {
    setPage(0);
    if (srtOrdr !== sortOrder) {
      setSortOrder(srtOrdr);
    }
    if (srtBy !== sortBy) {
      setSortBy(srtBy);
    }
  };
  // every column should have either a field value or a renderColumn function
  const columns = [
    {
      // if render column not present value will be taken from row like row[field]
      field: 'id',
      headerName: 'Id',
      sortable: true,
      width: '27%',
      horizontalAlignment: 'right',
    },
    {
      width: '10%',
      field: 'lastName',
      headerName: 'Lastname',
      horizontalAlignment: 'left',
    },
    {
      width: '50%',
      field: 'firstName',
      headerName: 'Firstname',
      sortable: true,
      horizontalAlignment: 'center',
      renderColumn: (row, value) => {
        // custom row where value is showed on a button
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {value && (
              <Button variant="primary" size="small" onClick={() => {}}>
                {value}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      width: '13%',
      field: 'age',
      headerName: 'Age',
    },
    {
      width: '150px',
      headerName: 'Action',
      renderColumn: (row) => {
        // add state logic
        const [toggle, setToggle] = useState(true);
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            {toggle ? (
              <BsToggleOn
                size="24"
                style={{ display: 'flex' }}
                onClick={() => {
                  setToggle(!toggle);
                }}
                title={'click to toggle OFF'}
              />
            ) : (
              <BsToggleOff
                size="24"
                style={{ display: 'flex' }}
                onClick={() => {
                  setToggle(!toggle);
                }}
                title={'click to toggle OFF'}
              />
            )}
            {row.age && row.age > 16 ? <FaUserAltSlash size="24" /> : <FaUserAlt size="24" />}
          </div>
        );
      },
    },
  ];
  const paginationModal = {
    page,
    pageSizes: [10, 50, 100],
    pageSize,
    lastPage,
    onPageChange,
    onPageSizeChange,
    totalLength: rows.length,
  };
  const onSearch = (value) => console.log(value);
  const props = {
    columns,
    rows: tableData,
    sortHandler,
    paginationModal,
    searchBar: {
      onSearch,
      placeholder: 'Search for users',
    },
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'grey',
            zIndex: 100,
            opacity: '0.1',
          }}
        />
      )}
      <div style={{ width: '300px', height: '40px' }}>{loading && 'Loading...'} </div>
      <div>
        <Table resizableColumns={true} {...props} />
      </div>
    </>
  );
};

const apiWithSorting = (pageSize, pageNumber, sortBy = 'none', sortOrder = 'none') => {
  const rowLen = rows.length;
  const rowData = [...rows];
  const fromRow = (pageNumber - 1) * pageSize + 1;
  const toRow = pageNumber * pageSize > rowLen ? rowLen : pageNumber * pageSize;
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
  if (!(fromRow >= rowLen)) response = rowData.slice(fromRow - 1, toRow);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 2000);
  });
};

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
  { id: 11, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 12, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 13, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 14, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 16, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 17, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 18, lastName: 'Melisandre', firstName: null, age: 150000 },
  { id: 19, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 20, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 21, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 22, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 23, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 26, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 27, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 28, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 29, lastName: 'Harvey', firstName: 'Stark', age: 98 },
  {
    id: 30,
    lastName: 'Singleton',
    firstName: 'Wall',
    age: 21,
  },
  {
    id: 31,
    lastName: 'Kidd',
    firstName: 'Addie',
    age: 22,
  },
  {
    id: 32,
    lastName: 'Rasmussen',
    firstName: 'Barnes',
    age: 23,
  },
  {
    id: 33,
    lastName: 'Levy',
    firstName: 'Penny',
    age: 24,
  },
  {
    id: 34,
    lastName: 'Graham',
    firstName: 'Figueroa',
    age: 25,
  },
  {
    id: 35,
    lastName: 'Pruitt',
    firstName: 'Pennington',
    age: 26,
  },
  {
    id: 36,
    lastName: 'Rollins',
    firstName: 'Harris',
    age: 27,
  },
  {
    id: 37,
    lastName: 'Foreman',
    firstName: 'Deanne',
    age: 28,
  },
  {
    id: 38,
    lastName: 'Langley',
    firstName: 'Ingrid',
    age: 29,
  },
  {
    id: 39,
    lastName: 'Fuentes',
    firstName: 'Carolina',
    age: 30,
  },
  {
    id: 40,
    lastName: 'Dorsey',
    firstName: 'Constance',
    age: 31,
  },
  {
    id: 41,
    lastName: 'Martin',
    firstName: 'Jocelyn',
    age: 32,
  },
  {
    id: 42,
    lastName: 'Garrison',
    firstName: 'Rowland',
    age: 33,
  },
  {
    id: 43,
    lastName: 'Jordan',
    firstName: 'Connie',
    age: 34,
  },
  {
    id: 44,
    lastName: 'Richmond',
    firstName: 'Myrtle',
    age: 35,
  },
  {
    id: 45,
    lastName: 'Gibson',
    firstName: 'Shawna',
    age: 36,
  },
  {
    id: 46,
    lastName: 'Gonzales',
    firstName: 'Travis',
    age: 37,
  },
  {
    id: 47,
    lastName: 'Manning',
    firstName: 'Patsy',
    age: 38,
  },
  {
    id: 48,
    lastName: 'Beck',
    firstName: 'Zamora',
    age: 39,
  },
  {
    id: 49,
    lastName: 'Todd',
    firstName: 'Bruce',
    age: 40,
  },
  {
    id: 50,
    lastName: 'Baker',
    firstName: 'Ernestine',
    age: 41,
  },
  {
    id: 51,
    lastName: 'Adams',
    firstName: 'Fern',
    age: 42,
  },
  {
    id: 52,
    lastName: 'Melton',
    firstName: 'Lila',
    age: 43,
  },
  {
    id: 53,
    lastName: 'Bowen',
    firstName: 'Gentry',
    age: 44,
  },
  {
    id: 54,
    lastName: 'Nolan',
    firstName: 'Ila',
    age: 45,
  },
  {
    id: 55,
    lastName: 'Dudley',
    firstName: 'Debbie',
    age: 46,
  },
  {
    id: 56,
    lastName: 'Gardner',
    firstName: 'Gilmore',
    age: 47,
  },
  {
    id: 57,
    lastName: 'Schmidt',
    firstName: 'Mckinney',
    age: 48,
  },
  {
    id: 58,
    lastName: 'Duke',
    firstName: 'Schwartz',
    age: 49,
  },
  {
    id: 59,
    lastName: 'Watson',
    firstName: 'Katy',
    age: 50,
  },
  {
    id: 60,
    lastName: 'Caldwell',
    firstName: 'Kelsey',
    age: 51,
  },
  {
    id: 61,
    lastName: 'Stevens',
    firstName: 'Elisa',
    age: 52,
  },
  {
    id: 62,
    lastName: 'Knight',
    firstName: 'Gillespie',
    age: 53,
  },
  {
    id: 63,
    lastName: 'Sanford',
    firstName: 'Browning',
    age: 54,
  },
  {
    id: 64,
    lastName: 'Haney',
    firstName: 'Margarita',
    age: 55,
  },
  {
    id: 65,
    lastName: 'Drake',
    firstName: 'Jo',
    age: 56,
  },
  {
    id: 66,
    lastName: 'Downs',
    firstName: 'Randall',
    age: 57,
  },
  {
    id: 67,
    lastName: 'Bean',
    firstName: 'Robinson',
    age: 58,
  },
  {
    id: 68,
    lastName: 'Macias',
    firstName: 'Allie',
    age: 59,
  },
  {
    id: 69,
    lastName: 'Duncan',
    firstName: 'Moore',
    age: 60,
  },
  {
    id: 70,
    lastName: 'Rush',
    firstName: 'Tommie',
    age: 61,
  },
  {
    id: 71,
    lastName: 'Shaw',
    firstName: 'Guy',
    age: 62,
  },
  {
    id: 72,
    lastName: 'Henderson',
    firstName: 'Sallie',
    age: 63,
  },
  {
    id: 73,
    lastName: 'Robbins',
    firstName: 'Decker',
    age: 64,
  },
  {
    id: 74,
    lastName: 'Haley',
    firstName: 'Avis',
    age: 65,
  },
  {
    id: 75,
    lastName: 'Patrick',
    firstName: 'Jasmine',
    age: 66,
  },
  {
    id: 76,
    lastName: 'Mccormick',
    firstName: 'Crane',
    age: 67,
  },
  {
    id: 77,
    lastName: 'Villarreal',
    firstName: 'Acosta',
    age: 68,
  },
  {
    id: 78,
    lastName: 'Bright',
    firstName: 'Berg',
    age: 69,
  },
  {
    id: 79,
    lastName: 'Craft',
    firstName: 'Colette',
    age: 70,
  },
  {
    id: 80,
    lastName: 'Coffey',
    firstName: 'Mercado',
    age: 71,
  },
  {
    id: 81,
    lastName: 'Nixon',
    firstName: 'Tammie',
    age: 72,
  },
  {
    id: 82,
    lastName: 'Monroe',
    firstName: 'Kay',
    age: 73,
  },
  {
    id: 83,
    lastName: 'Ferguson',
    firstName: 'Winters',
    age: 74,
  },
  {
    id: 84,
    lastName: 'Ball',
    firstName: 'Macdonald',
    age: 75,
  },
  {
    id: 85,
    lastName: 'Webb',
    firstName: 'Cathleen',
    age: 76,
  },
  {
    id: 86,
    lastName: 'Salas',
    firstName: 'Molina',
    age: 77,
  },
  {
    id: 87,
    lastName: 'Moss',
    firstName: 'Mejia',
    age: 78,
  },
  {
    id: 88,
    lastName: 'Weber',
    firstName: 'Jan',
    age: 79,
  },
  {
    id: 89,
    lastName: 'England',
    firstName: 'Margie',
    age: 80,
  },
  {
    id: 90,
    lastName: 'Kerr',
    firstName: 'Rosa',
    age: 81,
  },
  {
    id: 91,
    lastName: 'Mckinney',
    firstName: 'Jenna',
    age: 82,
  },
  {
    id: 92,
    lastName: 'Jarvis',
    firstName: 'Jeanine',
    age: 83,
  },
  {
    id: 93,
    lastName: 'Marks',
    firstName: 'Mccormick',
    age: 84,
  },
  {
    id: 94,
    lastName: 'Jensen',
    firstName: 'Rosario',
    age: 85,
  },
  {
    id: 95,
    lastName: 'Salazar',
    firstName: 'Gregory',
    age: 86,
  },
  {
    id: 96,
    lastName: 'Short',
    firstName: 'Thornton',
    age: 87,
  },
  {
    id: 97,
    lastName: 'Meyer',
    firstName: 'Rhonda',
    age: 88,
  },
  {
    id: 98,
    lastName: 'Cervantes',
    firstName: 'Delores',
    age: 89,
  },
  {
    id: 99,
    lastName: 'Ramirez',
    firstName: 'English',
    age: 90,
  },
  {
    id: 100,
    lastName: 'Hogan',
    firstName: 'Bridgette',
    age: 91,
  },
  {
    id: 101,
    lastName: 'Crane',
    firstName: 'Lee',
    age: 92,
  },
  {
    id: 102,
    lastName: 'Ware',
    firstName: 'Adela',
    age: 93,
  },
  {
    id: 103,
    lastName: 'Holmes',
    firstName: 'Britt',
    age: 94,
  },
  {
    id: 104,
    lastName: 'Robles',
    firstName: 'Marsh',
    age: 95,
  },
  {
    id: 105,
    lastName: 'Ellis',
    firstName: 'Silvia',
    age: 96,
  },
  {
    id: 106,
    lastName: 'Bender',
    firstName: 'Flossie',
    age: 97,
  },
  {
    id: 107,
    lastName: 'Nguyen',
    firstName: 'Fuentes',
    age: 98,
  },
  {
    id: 108,
    lastName: 'Fields',
    firstName: 'Baird',
    age: 99,
  },
  {
    id: 109,
    lastName: 'Walter',
    firstName: 'Meyers',
    age: 100,
  },
  {
    id: 110,
    lastName: 'Mann',
    firstName: 'Warner',
    age: 101,
  },
  {
    id: 111,
    lastName: 'Castro',
    firstName: 'Leon',
    age: 102,
  },
  {
    id: 112,
    lastName: 'Keller',
    firstName: 'Gwen',
    age: 103,
  },
  {
    id: 113,
    lastName: 'Koch',
    firstName: 'Rivas',
    age: 104,
  },
  {
    id: 114,
    lastName: 'Ayala',
    firstName: 'Lourdes',
    age: 105,
  },
  {
    id: 115,
    lastName: 'Paul',
    firstName: 'Marcia',
    age: 106,
  },
  {
    id: 116,
    lastName: 'Moran',
    firstName: 'Janice',
    age: 107,
  },
  {
    id: 117,
    lastName: 'Santos',
    firstName: 'Ware',
    age: 108,
  },
  {
    id: 118,
    lastName: 'Hardy',
    firstName: 'Salazar',
    age: 109,
  },
  {
    id: 119,
    lastName: 'Mosley',
    firstName: 'Mcpherson',
    age: 110,
  },
  {
    id: 120,
    lastName: 'Vega',
    firstName: 'Calderon',
    age: 111,
  },
  {
    id: 121,
    lastName: 'Gilliam',
    firstName: 'Loraine',
    age: 112,
  },
  {
    id: 122,
    lastName: 'Barron',
    firstName: 'Everett',
    age: 113,
  },
  {
    id: 123,
    lastName: 'Brooks',
    firstName: 'Cardenas',
    age: 114,
  },
  {
    id: 124,
    lastName: 'Tate',
    firstName: 'Georgina',
    age: 115,
  },
  {
    id: 125,
    lastName: 'Warner',
    firstName: 'Ramirez',
    age: 116,
  },
  {
    id: 126,
    lastName: 'Gould',
    firstName: 'Keller',
    age: 117,
  },
  {
    id: 127,
    lastName: 'Mendez',
    firstName: 'Kimberley',
    age: 118,
  },
  {
    id: 128,
    lastName: 'Mccullough',
    firstName: 'Wong',
    age: 119,
  },
  {
    id: 129,
    lastName: 'Herrera',
    firstName: 'Lang',
    age: 120,
  },
  {
    id: 130,
    lastName: 'Gaines',
    firstName: 'Morgan',
    age: 121,
  },
  {
    id: 131,
    lastName: 'Woodward',
    firstName: 'Crystal',
    age: 122,
  },
  {
    id: 132,
    lastName: 'Irwin',
    firstName: 'Ortiz',
    age: 123,
  },
  {
    id: 133,
    lastName: 'Wood',
    firstName: 'Jordan',
    age: 124,
  },
  {
    id: 134,
    lastName: 'Glass',
    firstName: 'Ruby',
    age: 125,
  },
  {
    id: 135,
    lastName: 'Mcdowell',
    firstName: 'Pate',
    age: 126,
  },
  {
    id: 136,
    lastName: 'Joyce',
    firstName: 'Jeannette',
    age: 127,
  },
  {
    id: 137,
    lastName: 'Noel',
    firstName: 'Washington',
    age: 128,
  },
  {
    id: 138,
    lastName: 'Reese',
    firstName: 'Anderson',
    age: 129,
  },
  {
    id: 139,
    lastName: 'Lynch',
    firstName: 'Marks',
    age: 130,
  },
  {
    id: 140,
    lastName: 'Velazquez',
    firstName: 'Newton',
    age: 131,
  },
  {
    id: 141,
    lastName: 'Mcconnell',
    firstName: 'Sofia',
    age: 132,
  },
  {
    id: 142,
    lastName: 'Eaton',
    firstName: 'Farmer',
    age: 133,
  },
  {
    id: 143,
    lastName: 'Clements',
    firstName: 'Rebekah',
    age: 134,
  },
  {
    id: 144,
    lastName: 'Fleming',
    firstName: 'Duke',
    age: 135,
  },
  {
    id: 145,
    lastName: 'Britt',
    firstName: 'Maynard',
    age: 136,
  },
  {
    id: 146,
    lastName: 'Stone',
    firstName: 'Frye',
    age: 137,
  },
  {
    id: 147,
    lastName: 'Rojas',
    firstName: 'Rosella',
    age: 138,
  },
  {
    id: 148,
    lastName: 'Beasley',
    firstName: 'Tisha',
    age: 139,
  },
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
