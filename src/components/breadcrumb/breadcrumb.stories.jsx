import React from 'react'
import Breadcrumb from './breadcrumb'

export default {
  title: 'design-components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    routeToNameList: [],
  },
}

export const BreadcrumbGroup = {
  args: {
    routeToNameList: [
      {
        href: 'https://google.com',
        name: 'Breadcrumb1',
      },
      {
        route: 'https://google.com',
        name: 'Breadcrumb2',
      },
      {
        name: 'Breadcrumb3',
      },
    ],
  },
}

export const BreadcrumbWithOverflow = {
  args: {
    routeToNameList: [
      {
        route: '#',
        name: 'Breadcrumb1',
      },
      {
        route: '#',
        name: 'Breadcrumb2',
      },
      {
        route: '#',
        name: 'Breadcrumb3',
      },
      {
        route: '#',
        name: 'Breadcrumb4',
      },
      {
        route: '#',
        name: 'Breadcrumb5',
      },
    ],
  },
}

export const BreadcrumbDarkTheme = {
  render: args => (
    <div data-theme="dark" style={{ padding: '24px', background: '#0a0b2e', borderRadius: '8px' }}>
      <Breadcrumb {...args} />
    </div>
  ),
  args: {
    routeToNameList: [
      {
        href: 'https://google.com',
        name: 'Home',
      },
      {
        route: '#',
        name: 'Section',
      },
      {
        name: 'Current page',
      },
    ],
  },
}
