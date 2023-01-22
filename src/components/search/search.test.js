/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SearchInput from './search';

const props = {
  value: 'text',
  width: '200px',
  disabled: false,
  placeholder: 'Search',
  onChange: jest.fn(),
};

describe('Search input test cases', () => {
  it('Value passed as a props appears on the screen', () => {
    const { getByRole } = render(<SearchInput {...props} />);
    expect(getByRole('searchbox').value).toEqual(props.value);
  });

  it('Width passed as a props appears on the screen', () => {
    const { getByRole } = render(<SearchInput {...props} />);
    expect(getByRole('search').style.width).toEqual(props.width);
  });

  it('Disabled passed as a props appears on the screen', () => {
    const { getByRole } = render(<SearchInput {...props} />);
    expect(getByRole('searchbox').disabled).toEqual(props.disabled);
  });

  it('Placeholder passed as a props appears on the screen', () => {
    const { getByRole } = render(<SearchInput {...props} />);
    expect(getByRole('searchbox').placeholder).toEqual(props.placeholder);
  });

  it('OnChange passed in the props', () => {
    const { getByRole } = render(<SearchInput {...props} />);
    const searchInput = getByRole('searchbox');
    fireEvent.click(searchInput);
    expect(props.onChange).toBeCalled;
  });
});
