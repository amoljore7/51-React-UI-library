/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import TreeNodes from '../components/treeNodes';
import { SHOW_SELECTED } from '../constants';
import azure from '../../../assets/icons/azure.svg'

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

const handleOnChange = jest.fn()

const setup = (props) => {
  const {
    getAllByTestId,
    getByText,
    getAllByRole,
    getByTestId,
    queryByRole,
  } = render(<TreeNodes {...props} />);

  return {
    getAllByTestId,
    getByText,
    getAllByRole,
    getByTestId,
    queryByRole,
  }
}

afterEach(() => {
  jest.resetAllMocks()
})

describe('TreeNodes component tests', () => {

  describe('When the nodes are editable and expanded.', () => {
    it('should render the nodes correctly.', () => {
      const { getAllByTestId, getByText, getAllByRole } = setup({ nodes })
      const renderredNodes = getAllByTestId(/tree-node-/)
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking if all the nodes are present.
      expect(renderredNodes.length).toBe(4)
      expect(renderredCheckboxes.length).toBe(4)
      expect(getByText(nodes[0].label)).toBeInTheDocument()
      expect(getByText(nodes[1].label)).toBeInTheDocument()
      expect(getByText(nodes[2].label)).toBeInTheDocument()
      expect(getByText(nodes[3].label)).toBeInTheDocument()
    })

    it('should render the correct checked status when a node is checked.', () => {
      const props = {
        nodes,
        onChange: handleOnChange,
      }

      const { getAllByRole } = setup(props)
      const renderredCheckboxes = getAllByRole('checkbox')

      // Checking the checked and indeterminate status for all the nodes
      // before the click of the checkbox. 
      expect(renderredCheckboxes[0].checked).toBe(false)
      // expect(renderredCheckboxes[0].indeterminate).toBe(false)
      expect(renderredCheckboxes[1].checked).toBe(false)
      // expect(renderredCheckboxes[1].indeterminate).toBe(false)
      expect(renderredCheckboxes[2].checked).toBe(false)
      expect(renderredCheckboxes[2].indeterminate).toBe(false)
      expect(renderredCheckboxes[3].checked).toBe(false)
      expect(renderredCheckboxes[3].indeterminate).toBe(false)

      // Simulating the click on the first child of Project A node
      fireEvent.click(renderredCheckboxes[2])

      // Checking the checked and indeterminate status for all the nodes
      // before the click of the checkbox.
      expect(renderredCheckboxes[0].checked).toBe(false)
      // expect(renderredCheckboxes[0].indeterminate).toBe(true)
      expect(renderredCheckboxes[1].checked).toBe(false)
      // expect(renderredCheckboxes[1].indeterminate).toBe(true)
      expect(renderredCheckboxes[2].checked).toBe(true)
      expect(renderredCheckboxes[2].indeterminate).toBe(false)
      expect(renderredCheckboxes[3].checked).toBe(false)
      expect(renderredCheckboxes[3].indeterminate).toBe(false)

      // Checking the parameters of the onChange function.
      const expectedParam = [
        {
          label: 'Dev2',
          value: 'Dev2',
        }
      ]
      expect(handleOnChange).toBeCalledWith(expectedParam)
    })

    it('should render colapse the nodes when the directional icons are clicked.', () => {
      const { getAllByTestId, getByText } = setup({ nodes })
      const renderredNodes = getAllByTestId(/tree-node-/)
      const renderredDirectionalIcons = getAllByTestId(/directional-icon-/)

      // Checking the nodes before clicking on the collapse icon
      expect(renderredNodes.length).toBe(4)
      expect(getByText(nodes[0].label)).toBeInTheDocument()
      expect(getByText(nodes[1].label)).toBeInTheDocument()
      expect(getByText(nodes[2].label)).toBeInTheDocument()
      expect(getByText(nodes[3].label)).toBeInTheDocument()

      // Click on the collapse icon of the Project A node.
      fireEvent.click(renderredDirectionalIcons[1])

      // Checking the nodes after clicking on the collapse icon
      const updatedRenderredNodes = getAllByTestId(/tree-node-/)
      expect(updatedRenderredNodes.length).toBe(2)
      expect(getByText(nodes[0].label)).toBeInTheDocument()
      expect(getByText(nodes[1].label)).toBeInTheDocument()
    })
  })

  describe('When the nodes are filtered.', () => {
    it('should render only the checked and indeterminate nodes when the "Show Selected" is selected.', () => {
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
        onChange: handleOnChange,
        filter: SHOW_SELECTED,
      }

      const { getByText, getAllByTestId } = setup(props)
      const renderredNodes = getAllByTestId(/tree-node-/)

      // Checking the nodes that are present.
      expect(renderredNodes.length).toBe(3)
      expect(getByText(nodesWithCheckedItems[0].label)).toBeInTheDocument()
      expect(getByText(nodesWithCheckedItems[1].label)).toBeInTheDocument()
      expect(getByText(nodesWithCheckedItems[2].label)).toBeInTheDocument()
    })

    it('should render only the nodes and its parents which has the matching text.', () => {
      const props = {
        nodes,
        onChange: handleOnChange,
        searchText: 'project',
      }

      const { getByText, getAllByTestId } = setup(props)
      const renderredNodes = getAllByTestId(/tree-node-/)

      // Checking the nodes that are present.
      expect(renderredNodes.length).toBe(2)
      expect(getByText(nodes[0].label)).toBeInTheDocument()
      expect(getByText(nodes[1].label)).toBeInTheDocument()
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

  describe('When the custom icons and its tooltips are present.', () => {
    it('should render the icons correctly.', () => {
      const nodeWithCustomRightIcon = [{
        ...nodes[0],
        _children: [],
        leftIcon: {
          icon: azure,
          tooltip: 'left'
        },
        rightIcon: {
          icon: azure,
          tooltip: 'right'
        }
      }]

      const { getByTestId } = setup({ nodes: nodeWithCustomRightIcon })
      expect(getByTestId('tree-view-icon-tooltip-left')).toBeInTheDocument()
      expect(getByTestId('tree-view-icon-tooltip-right')).toBeInTheDocument()
    })
  })

  describe('When the checkboxes are hidden.', () => {
    it('should not render the nodes with checkboxes.', () => {
      const { queryByRole } = setup({ nodes, hideCheckboxes: true })
      expect(queryByRole('checkbox')).not.toBeInTheDocument()
    })
  })

  describe('When the highlighted property is true for a node', () => {
    it('should render an asterisk next to the node label.', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _children: [],
        highlighted: true,
      }]

      const { getByText } = setup({ nodes: nodeHighlighted })
      expect(getByText(`${nodes[0].label} *`)).toBeInTheDocument()
    })
  })

  describe('When the singleSelect property is true for a node', () => {
    it('should not render the checkbox', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _children: [],
      }]

      const { queryByRole } = setup({ nodes: nodeHighlighted, singleSelect: true })
      expect(queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('should call the on change function when the row is clicked.', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _children: [],
      }]

      const { getByTestId } = setup({
        nodes: nodeHighlighted,
        singleSelect: true,
        onChange: handleOnChange,
      })
      fireEvent.click(getByTestId(`tree-node-${nodes[0]._id}`))

      expect(handleOnChange).toBeCalledWith([{ label: "All Secrets", value: "All Secrets" }])
    })

    it('should not call the on change function when the node type row is clicked, if the allowOnlyLeafSelection is true .', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _id: '0-0',
        _children: [],
      }]

      const { getByTestId } = setup({
        nodes: nodeHighlighted,
        singleSelect: true,
        allowOnlyLeafSelection: true,
        onChange: handleOnChange,
      })
      fireEvent.click(getByTestId(`tree-node-0-0`))

      expect(handleOnChange).not.toBeCalled()
    })

    it('should call the on change function when the root node type row is clicked, if the allowOnlyLeafSelection is true .', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _children: [],
      }]

      const { getByTestId } = setup({
        nodes: nodeHighlighted,
        singleSelect: true,
        allowOnlyLeafSelection: true,
        onChange: handleOnChange,
      })
      fireEvent.click(getByTestId(`tree-node-0`))

      expect(handleOnChange).toBeCalled()
    })

    it('should not call the on change function when the root node type row is clicked, if the allowOnlyLeafSelection is true and allowRootSelection is false.', () => {
      const nodeHighlighted = [{
        ...nodes[0],
        _children: [],
      }]

      const { getByTestId } = setup({
        nodes: nodeHighlighted,
        singleSelect: true,
        allowOnlyLeafSelection: true,
        allowRootSelection: false,
        onChange: handleOnChange,
      })
      fireEvent.click(getByTestId(`tree-node-0`))

      expect(handleOnChange).not.toBeCalled()
    })
  })
})
