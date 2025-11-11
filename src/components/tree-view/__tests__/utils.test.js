import { SHOW_SELECTED } from "../constants"
import {
  areAllChildrenChecked,
  findAndUpdateCheckedStatus,
  flattenTree,
  getAllTheChildren,
  getFilteredNodes,
  getDisplayDate,
  getNodesToRender,
  getSelectedItems,
  isAnyOneCheckedOrIndeterminate,
  prepareDataForTable,
  sortNodesByDepth,
  toggleNodeExpansion,
} from "../utils"

describe('flattenTree', () => {
  const nestedTree = {
    label: 'All Secrets',
    checked: false,
    type: 'node',
    nodes: [
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        nodes: [
          {
            label: 'Dev',
            value: 'Dev',
            checked: false,
            type: 'leaf',
          },
        ],
      },
    ],
  }

  const expectedFlattenedTree = [
    {
      label: 'All Secrets',
      checked: false,
      type: 'node',
      _id: '0',
      _children: ['0-0'],
      _depth: 0,
    },
    {
      label: 'Project A',
      value: 'Project A',
      checked: false,
      type: 'node',
      _id: '0-0',
      _children: ['0-0-0'],
      _parent: '0',
      _depth: 1,
    },
    {
      label: 'Dev',
      value: 'Dev',
      checked: false,
      type: 'leaf',
      _id: '0-0-0',
      _parent: '0-0',
      _depth: 2,
    }
  ]
  it('should flatten the tree.', () => {
    const actualFlattenedTree = flattenTree(nestedTree)
    expect(actualFlattenedTree).toMatchObject(expectedFlattenedTree)
  })
})

describe('getNodesToRender', () => {
  it('should give the updated nodes without the children when a parent node is not expanded.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        expanded: false,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]

    const expectedNodesToRender = [
      {
        label: 'All Secrets',
        checked: false,
        expanded: false,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
    ]

    const actualNodesToRender = getNodesToRender(nodes)
    expect(actualNodesToRender).toMatchObject(expectedNodesToRender)
  })

  it('should give the updated nodes with the children checked when a parent node is checked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: true,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]

    const expectedNodesToRender = [
      {
        label: 'All Secrets',
        checked: true,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        type: 'leaf',
        checked: true,
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]

    const actualNodesToRender = getNodesToRender(nodes)
    expect(actualNodesToRender).toMatchObject(expectedNodesToRender)
  })

  it('should give the updated nodes with the children checked when a parent node is checked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: true,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        expanded: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]

    const actualNodesToRender = getNodesToRender(nodes, true)
    expect(actualNodesToRender[1].checked).toBeFalsy()
    expect(actualNodesToRender[2].checked).toBeFalsy()
  })

  it('should give the updated nodes with the root level leaves moved up when the rootLeafNodesFirst is true.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Dev-leaf',
        value: 'Dev-leaf',
        checked: false,
        type: 'leaf',
        _id: '0-1',
        _parent: '0',
        _depth: 1,
      }
    ]

    const expectedNodesToRender = [
      {
        label: 'All Secrets',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Dev-leaf',
        value: 'Dev-leaf',
        checked: false,
        type: 'leaf',
        _id: '0-1',
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]

    const actualNodesToRender = getNodesToRender(nodes, false, true)
    expect(actualNodesToRender).toMatchObject(expectedNodesToRender)
  })
})

describe('getAllTheChildren', () => {
  it('should give the list of all the children, including the nested ones.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      }
    ]
    const expectedChildrenIds = ['0-0', '0-0-0']
    expect(getAllTheChildren(nodes, nodes[0]._id)).toEqual(expectedChildrenIds)
  })
})

describe('findAndUpdateCheckedStatus', () => {
  it('should update the children checked state to true when a parent node is checked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]
    const updatedNodes = findAndUpdateCheckedStatus(nodes[1]._id, true, nodes)

    // Checking the child checked status
    expect(updatedNodes[2].checked).toBe(true)
  })

  it('should not update the children checked state to true when a parent node is checked for single select.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]
    const updatedNodes = findAndUpdateCheckedStatus(nodes[1]._id, true, nodes, true)

    // Checking the child checked status
    expect(updatedNodes[2].checked).toBe(false)
  })

  it('should update the other nodes checked state to false when a node is checked for single select.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: false,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    const updatedNodes = findAndUpdateCheckedStatus(nodes[2]._id, true, nodes, true)

    expect(updatedNodes[1].checked).toBe(false)
    expect(updatedNodes[2].checked).toBe(true)
  })

  it('should not update the children checked state to false when the parent is unchecked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    const updatedNodes = findAndUpdateCheckedStatus(nodes[1]._id, false, nodes)

    // Checking the child checked status
    expect(updatedNodes[2].checked).toBe(true)
  })

  it('should update the children checked state to false when the parent is clicked twice.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    let updatedNodes = findAndUpdateCheckedStatus(nodes[1]._id, false, nodes)
    updatedNodes = findAndUpdateCheckedStatus(nodes[1]._id, false, nodes)

    // Checking the child checked status
    expect(updatedNodes[2].checked).toBe(false)
  })

  it('should update the parent checked and indeterminate state to false when the child is unchecked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        checked: false,
        indeterminate: true,
        type: 'node',
        _id: '0',
        _children: ['0-0'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        indeterminate: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]

    const updatedNodes = findAndUpdateCheckedStatus(nodes[2]._id, false, nodes)

    // Checking the parents statuses
    expect(updatedNodes[0].checked).toBe(false)
    expect(updatedNodes[1].checked).toBe(false)
    expect(updatedNodes[0].indeterminate).toBe(false)
    expect(updatedNodes[1].indeterminate).toBe(false)
  })
})

describe('areAllChildrenChecked', () => {
  it('should return false if all the child nodes are not checked', () => {
    const childNodes = [
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    expect(areAllChildrenChecked(childNodes)).toBe(false)
  })

  it('should return true if all the child nodes are checked', () => {
    const childNodes = [
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: true,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    expect(areAllChildrenChecked(childNodes)).toBe(true)
  })
})

describe('isAnyOneCheckedOrIndeterminate', () => {
  it('should return false if none of the child nodes are checked or indeterminate', () => {
    const childNodes = [
      {
        label: 'Project A',
        value: 'Project A',
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    expect(isAnyOneCheckedOrIndeterminate(childNodes)).toBe(false)
  })

  it('should return true if any one of the nodes is inderminate', () => {
    const childNodes = [
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        indeterminate: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: false,
        indeterminate: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    expect(isAnyOneCheckedOrIndeterminate(childNodes)).toBe(true)
  })

  it('should return true if any one of the nodes is checked', () => {
    const childNodes = [
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        indeterminate: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        checked: true,
        indeterminate: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    expect(isAnyOneCheckedOrIndeterminate(childNodes)).toBe(true)
  })
})

describe('toggleNodeExpansion', () => {
  it('should toggle the expanded property of the selected node.', () => {
    const nodes = [
      {
        label: 'Project A',
        value: 'Project A',
        expanded: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Project B',
        value: 'Project B',
        expanded: false,
        type: 'node',
        _id: '0-1',
        _children: [],
        _parent: '0',
        _depth: 1,
      },
    ]

    const updatedNodes = toggleNodeExpansion(nodes, nodes[1]._id)
    expect(updatedNodes[1].expanded).toBe(true)
  })
})

describe('prepareDataForTable', () => {
  const nodes = [
    {
      label: 'All Secrets',
      checked: false,
      type: 'node',
      _id: '0',
      _children: ['0-0', '0-1'],
      _depth: 0,
    },
    {
      label: 'Project A',
      value: 'Project A',
      checked: false,
      type: 'node',
      _id: '0-0',
      _children: ['0-0-0', '0-0-1'],
      _parent: '0',
      _depth: 1,
    },
    {
      label: 'Dev',
      value: 'Dev',
      checked: true,
      type: 'leaf',
      _id: '0-0-0',
      _parent: '0-0',
      _depth: 2,
    },
    {
      label: 'Dev2',
      value: 'Dev2',
      checked: false,
      type: 'leaf',
      _id: '0-0-1',
      _parent: '0-0',
      _depth: 2,
    },
    {
      label: 'Project B',
      value: 'Project B',
      checked: false,
      type: 'node',
      _id: '0-1',
      _children: [],
      _parent: '0',
      _depth: 1,
    },
  ]

  it('should return the same nodes list if there are no filters present.', () => {
    expect(prepareDataForTable(nodes, false, null)).toMatchObject(nodes)
  })

  it('should return the checked nodes if showSelected is true.', () => {
    const expectedNodes = [
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]
    expect(prepareDataForTable(nodes, true, null)).toMatchObject(expectedNodes)
  })

  it('should return the nodes with the matching text if the searchText is present.', () => {
    const expectedNodes = [
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Dev2',
        value: 'Dev2',
        checked: false,
        type: 'leaf',
        _id: '0-0-1',
        _parent: '0-0',
        _depth: 2,
      },
    ]
    expect(prepareDataForTable(nodes, false, 'dev')).toMatchObject(expectedNodes)
  })

  it('should return the nodes with the matching text and with checked status true if the searchText is present, and the showSelected is true.', () => {
    const expectedNodes = [
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]
    expect(prepareDataForTable(nodes, true, 'dev')).toMatchObject(expectedNodes)
  })

})

describe('getFilteredNodes', () => {
  const nodes = [
    {
      label: 'All Secrets',
      checked: false,
      indeterminate: true,
      expanded: true,
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
      type: 'node',
      _id: '0-0',
      _children: ['0-0-0', '0-0-1'],
      _parent: '0',
      _depth: 1,
    },
    {
      label: 'Dev',
      value: 'Dev',
      checked: true,
      type: 'leaf',
      _id: '0-0-0',
      _parent: '0-0',
      _depth: 2,
    },
    {
      label: 'Dev2',
      value: 'Dev2',
      checked: false,
      type: 'leaf',
      _id: '0-0-1',
      _parent: '0-0',
      _depth: 2,
    },
    {
      label: 'Project B',
      value: 'Project B',
      checked: false,
      type: 'node',
      _id: '0-1',
      _children: [],
      _parent: '0',
      _depth: 1,
    },
  ]

  it('should return the same nodes list if there are no filters present.', () => {
    expect(getFilteredNodes(nodes, null, null)).toMatchObject(nodes)
  })

  it('should return the checked  nodes if showSelected is true.', () => {
    const expectedNodes = [
      {
        label: 'All Secrets',
        checked: false,
        indeterminate: true,
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
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]

    expect(getFilteredNodes(nodes, SHOW_SELECTED, null)).toMatchObject(expectedNodes)
  })

  it('should return the nodes with the matching text if the searchText is present.', () => {
    const expectedNodes = [
      {
        label: 'All Secrets',
        checked: false,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
      {
        label: 'Dev2',
        value: 'Dev2',
        checked: false,
        type: 'leaf',
        _id: '0-0-1',
        _parent: '0-0',
        _depth: 2,
      },
    ]

    expect(getFilteredNodes(nodes, null, 'dev')).toMatchObject(expectedNodes)
  })

  it('should return the nodes with the matching text and with checked status true if the searchText is present, and the showSelected is true.', () => {
    const expectedNodes = [
      {
        label: 'All Secrets',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: false,
        expanded: true,
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]
    expect(getFilteredNodes(nodes, SHOW_SELECTED, 'dev')).toMatchObject(expectedNodes)
  })

})

describe('getSelectedItems', () => {
  it('should return only the leaf node, if all the parents are not checked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        value: 'All Secrets',
        checked: false,
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
        path: 'All Secrets/Project A',
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        path: 'All Secrets/Project A/Dev2',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
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
    ]

    const expectedResult = [
      {
        label: 'Dev',
        value: 'Dev',
      }
    ]

    expect(getSelectedItems(nodes)).toMatchObject(expectedResult)
  })

  it('should return the parent node, if all the children are also checked.', () => {
    const nodes = [
      {
        label: 'All Secrets',
        value: 'All Secrets',
        checked: true,
        path: 'All Secrets',
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Project A',
        value: 'Project A',
        checked: true,
        path: 'All Secrets/Project A',
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        path: 'All Secrets/Project A/Dev2',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
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
    ]

    const expectedResult = [
      {
        label: 'All Secrets',
        value: 'All Secrets',
      }
    ]

    expect(getSelectedItems(nodes)).toMatchObject(expectedResult)
  })
})

describe('sortNodesByDepth', () => {
  it('should sort the give nodes in an ascending order by their depth.', () => {
    const unsortedNodes = [
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
        label: 'Project A',
        value: 'Project A',
        checked: false,
        path: 'All Secrets/Project A',
        type: 'node',
        _id: '0-0',
        _children: ['0-0-0', '0-0-1'],
        _parent: '0',
        _depth: 1,
      },
      {
        label: 'All Secrets',
        value: 'All Secrets',
        checked: false,
        path: 'All Secrets',
        type: 'node',
        _id: '0',
        _children: ['0-0', '0-1'],
        _depth: 0,
      },
      {
        label: 'Dev',
        value: 'Dev',
        checked: true,
        path: 'All Secrets/Project A/Dev2',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },

    ]

    const expectedNodesAfterSorting = [
      {
        label: 'All Secrets',
        value: 'All Secrets',
        checked: false,
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
        checked: true,
        path: 'All Secrets/Project A/Dev2',
        type: 'leaf',
        _id: '0-0-0',
        _parent: '0-0',
        _depth: 2,
      },
    ]

    expect(sortNodesByDepth(unsortedNodes)).toMatchObject(expectedNodesAfterSorting)
  })
})

describe('getDisplayDate', () => {
  const utcDateTimeString = '2023-09-01T04:09:22Z'

  it('should return a formatted date time string.', () => {
    expect(getDisplayDate(utcDateTimeString)).toEqual('Sep 1, 2023, 09:39:22 GMT+5:30')
  })
})
