/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Sidebar from './sidebar';
import { listRole } from './constants';

describe('Unit tests for Sidebar component', () => {
  const sidebarData = [
    {
      GroupHeader: 'Britive Vault',
      items: [
        {
          title: 'Britive Vault',
          route: '/',
          icon: '',
        },
        {
          title: 'Approvals',
          route: '/approvals',
          icon: '',
        },
      ],
    },
  ];

  it('menu title passed in the props appears on the screen', () => {
    const props = {
      menuTitle: 'Secrets Manager',
      title: 'sidebar',
      sidebarData,
    };
    const { getByText } = render(<Sidebar {...props} open={true} />);
    expect(getByText(props.menuTitle)).toBeInTheDocument();
  });
  it('sidebar toggele button pass', () => {
    const { container } = render(
      <Sidebar title={'sidebar'} open={true} sidebarData={sidebarData} />
    );
    expect(container.firstChild.classList.contains('true')).toBeTruthy;
  });
  it('There is one unordered list of items', () => {
    const { getByRole } = render(
      <Sidebar title={'sidebar'} sidebarData={sidebarData} open={true} />
    );
    expect(getByRole(listRole)).toBeInTheDocument();
  });
});
