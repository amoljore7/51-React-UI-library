/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import NodesTable from '../components/nodesTable';
import { SHOW_SELECTED } from '../constants';
import { classes as tableClasses } from '../../table/constants'
import * as utils from '../utils';

const nodes = [
  {
    label: 'All Secrets',
    value: 'All Secrets',
    checked: false,
    indeterminate: false,
    expanded: true,
    path: 'All Secrets',
    type: 'node',
    _id: '0',
    _children: ['0-0', '0-1'],
    _depth: 0,
  },
  {
    label: 'Project A',
    value: 'Project A',
    checked: false,
    indeterminate: false,
    expanded: true,
    path: 'All Secrets/Project A',
    type: 'node',
    _id: '0-0',
    _children: ['0-0-0', '0-0-1'],
    _parent: '0',
    _depth: 1,
  },
  {
    label: 'Dev2',
    value: 'Dev2',
    checked: false,
    path: 'All Secrets/Project A/Dev2',
    type: 'leaf',
    _id: '0-0-1',
    _parent: '0-0',
    _depth: 2,
  },
  {
    label: 'Dev',
    value: 'Dev',
    checked: false,
    path: 'All Secrets/Project A/Dev2',
    type: 'leaf',
    _id: '0-0-0',
    _parent: '0-0',
    _depth: 2,
  },
]

const handleCheckboxClick = jest.fn()

const setup = (props) => {
  const { getAllByRole, queryByRole } = render(<NodesTable {...props} />);

  return { getAllByRole, queryByRole }
}

afterEach(() => {
  jest.resetAllMocks()
})

describe('TreeNodes component tests', () => {

  describe('When the nodes are editable and expanded.', () => {
    it('should render the nodes correctly.', () => {
      const { getAllByRole } = setup({ nodes })
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking if all the nodes are present.
      expect(renderredCheckboxes.length).toBe(4)
    })

    it('should call the check handler correctly when the checkbox is clicked .', () => {
      const props = {
        nodes,
        handleCheckboxClick,
      }

      const { getAllByRole } = setup(props)
      const renderredCheckboxes = getAllByRole('checkbox')

      // Simulating the click on the first child of Project A node
      fireEvent.click(renderredCheckboxes[2])

      expect(handleCheckboxClick).toBeCalledWith(nodes[2]._id, true)
    })
  })

  describe('When the nodes are filtered.', () => {
    it('should render only the checked nodes when the "Show Selected" is selected.', () => {
      const nodesWithCheckedItems = [
        {
          label: 'All Secrets',
          value: 'All Secrets',
          checked: false,
          indeterminate: true,
          expanded: true,
          path: 'All Secrets',
          type: 'node',
          _id: '0',
          _children: ['0-0', '0-1'],
          _depth: 0,
        },
        {
          label: 'Project A',
          value: 'Project A',
          checked: false,
          indeterminate: true,
          expanded: true,
          path: 'All Secrets/Project A',
          type: 'node',
          _id: '0-0',
          _children: ['0-0-0', '0-0-1'],
          _parent: '0',
          _depth: 1,
        },
        {
          label: 'Dev2',
          value: 'Dev2',
          checked: true,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-1',
          _parent: '0-0',
          _depth: 2,
        },
        {
          label: 'Dev',
          value: 'Dev',
          checked: false,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-0',
          _parent: '0-0',
          _depth: 2,
        },
      ]

      const props = {
        nodes: nodesWithCheckedItems,
        filter: SHOW_SELECTED,
      }

      const { getAllByRole } = setup(props)
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking if only the checked nodes are present.
      expect(renderredCheckboxes.length).toBe(1)
    })

    it('should render only the nodes and its parents which has the matching text.', () => {
      const props = {
        nodes,
        searchText: 'dev',
      }

      const { getAllByRole } = setup(props)
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking if only the matching nodes are present.
      expect(renderredCheckboxes.length).toBe(2)
    })
  })

  describe('When the nodes are readonly.', () => {
    it('should render the nodes with checkboxes disabled.', () => {
      const { getAllByRole } = setup({ nodes, readOnly: true })
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking if all the nodes are present.
      expect(renderredCheckboxes.length).toBe(4)
      expect(renderredCheckboxes[0].disabled).toBe(true)
      expect(renderredCheckboxes[1].disabled).toBe(true)
      expect(renderredCheckboxes[2].disabled).toBe(true)
      expect(renderredCheckboxes[3].disabled).toBe(true)
    })
  })

  describe('When the sort icon is clicked.', () => {
    it('should sort the nodes by the label.', () => {
      setup({ nodes })
      const sortContainer = document.getElementsByClassName(tableClasses.headerIcon)[0]

      const nodesAscending = [
        {
          label: 'All Secrets',
          value: 'All Secrets',
          checked: false,
          indeterminate: false,
          expanded: true,
          path: 'All Secrets',
          type: 'node',
          _id: '0',
          _children: [ '0-0', '0-1' ],
          _depth: 0
        },
        {
          label: 'Dev',
          value: 'Dev',
          checked: false,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-0',
          _parent: '0-0',
          _depth: 2
        },
        {
          label: 'Dev2',
          value: 'Dev2',
          checked: false,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-1',
          _parent: '0-0',
          _depth: 2
        },
        {
          label: 'Project A',
          value: 'Project A',
          checked: false,
          indeterminate: false,
          expanded: true,
          path: 'All Secrets/Project A',
          type: 'node',
          _id: '0-0',
          _children: [ '0-0-0', '0-0-1' ],
          _parent: '0',
          _depth: 1
        }
      ]

      const nodesDescending = [
        {
          label: 'Project A',
          value: 'Project A',
          checked: false,
          indeterminate: false,
          expanded: true,
          path: 'All Secrets/Project A',
          type: 'node',
          _id: '0-0',
          _children: [ '0-0-0', '0-0-1' ],
          _parent: '0',
          _depth: 1
        },
        {
          label: 'Dev2',
          value: 'Dev2',
          checked: false,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-1',
          _parent: '0-0',
          _depth: 2
        },
        {
          label: 'Dev',
          value: 'Dev',
          checked: false,
          path: 'All Secrets/Project A/Dev2',
          type: 'leaf',
          _id: '0-0-0',
          _parent: '0-0',
          _depth: 2
        },
        {
          label: 'All Secrets',
          value: 'All Secrets',
          checked: false,
          indeterminate: false,
          expanded: true,
          path: 'All Secrets',
          type: 'node',
          _id: '0',
          _children: [ '0-0', '0-1' ],
          _depth: 0
        }
      ]

      const mockedDataForTable =
        jest
        .spyOn(utils, 'prepareDataForTable')
        .mockReturnValueOnce(nodesAscending)
        .mockReturnValueOnce(nodesDescending)
        .mockReturnValue(nodes)

      // Clicking the sort button first time should sort the list in an ascending order
      fireEvent.click(sortContainer)
      expect(mockedDataForTable).toBeCalledWith(nodesAscending, false, undefined)

      // Clicking the sort button second time should sort the list in descending order
      fireEvent.click(sortContainer)
      expect(mockedDataForTable).toBeCalledWith(nodesDescending, false, undefined)

      // Clicking the sort button the third time should revert the list to the original state
      fireEvent.click(sortContainer)
      expect(mockedDataForTable).toBeCalledWith(nodes, false, undefined)
    })
  })

  describe('When the checkboxes are hidden.', () => {
    it('should not render the nodes with checkboxes.', () => {
      const { queryByRole } = setup({ nodes, hideCheckboxes: true })
      expect(queryByRole('checkbox')).not.toBeInTheDocument()
    })
  })

  describe('When the created date column are to be displayed.', () => {
    const nodesWithDates = [
      {
        label: 'All Secrets',
        value: 'All Secrets',
        checked: false,
        indeterminate: false,
        expanded: true,
        path: 'All Secrets',
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
        createdDate: '2023-09-01T04:09:22Z',
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        indeterminate: false,
        expanded: true,
        path: 'All Secrets/Project A',
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
        createdDate: '2023-10-01T04:09:22Z',
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        path: 'All Secrets/Project A/Dev2',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
        createdDate: '2023-11-01T04:09:22Z',
      },
    ]

    it('should render the created date column.', () => {
      const { getAllByRole } = setup({ nodes: nodesWithDates, showCreatedDate: true })
      const columnsHeaders = getAllByRole('columnheader')

      // checking the presence of the date column header.
      expect(columnsHeaders.length).toBe(3)
      expect(columnsHeaders[2].title).toBe('Created Date')
    })
  })

  describe('When the single select is true.', () => {
    it('should not render the nodes with checkboxes.', () => {
      const { queryByRole } = setup({ nodes, singleSelect: true })
      expect(queryByRole('checkbox')).not.toBeInTheDocument()
    })
  })
})
