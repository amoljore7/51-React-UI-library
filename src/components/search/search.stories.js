import React, { useState } from 'react';
import SearchInput from './search';

export default {
  title: 'design-components/SearchInput',
  component: SearchInput,
};

export const Default = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <SearchInput
      value={value}
      onChange={handleChange}
      disabled={false}
      width={'200px'}
    />
  );
};

const moviesList = [
  'Avatar',
  'Inception',
  'Parasite',
  'Joker',
  'Avengers Endgame',
];

export const WithExample = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState(moviesList);

  const handleSearch = (e) => {
    const value = e.target.value;
    const filteredList = moviesList.filter((movieName) =>
      movieName.toLowerCase().includes(value.toLowerCase())
    );
    setValue(value);
    setList(filteredList);
  };

  return (
    <div>
      <SearchInput
        value={value}
        onChange={handleSearch}
        disabled={false}
        width={'400px'}
        placeholder={'Search for Movies'}
      />
      <div style={{ marginLeft: '15px', marginTop: '20px' }}>
        <ul>
          {list.length
            ? list.map((movieName) => <li>{movieName}</li>)
            : 'No Movie Found'}
        </ul>
      </div>
    </div>
  );
};
