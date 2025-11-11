import clone from "lodash/clone";
import isEmpty from "lodash/isEmpty";
import { SHOW_SELECTED } from "./constants";

export const flattenTree = (tree) => {
  const treeArr = Array.isArray(tree) ? tree : [tree];

  return traverseNodes({
    nodes: treeArr,
  });
}

const traverseNodes = ({
  nodes,
  parent,
  depth = 0,
  flattennedList = [],
  path = '',
}) => {
  nodes.forEach((node, i) => {
    node._depth = depth;
    node.path = `${path}${path.length ? '/' : ''}${node?.label}`
    if (parent) {
      node._id = node.id || `${parent._id}-${i}`;
      node._parent = parent._id;
      parent._children.push(node._id);
    } else {
      node._id = node.id || `${i}`;
    }

    flattennedList.push(node)

    if (node.nodes) {
      node._children = [];
      traverseNodes({
        nodes: node.nodes,
        parent: node,
        depth: depth + 1,
        flattennedList,
        path: node.path,
      });

    }
  });

  return flattennedList;
}

export const getNodesToRender = (allNodes, singleSelect = false, rootLeafNodesFirst = false, toBeTraversedNodes = [], traversedNode = [], nodesToRender = []) => {
  if (toBeTraversedNodes.length === 0) {
    toBeTraversedNodes = allNodes
  }

  toBeTraversedNodes?.forEach((node) => {
    if (!traversedNode.includes(node._id)) {
      traversedNode.push(node._id)
      nodesToRender.push(node)
      if (node?._children?.length > 0) {
        if (node?.expanded) {
          const childrenNodes = allNodes.filter(child => node?._children.includes(child._id))
          getNodesToRender(allNodes, singleSelect, rootLeafNodesFirst, childrenNodes, traversedNode, nodesToRender)
        } else {
          traversedNode.push(...getAllTheChildren(allNodes, node._id))
        }
      }

      if (node.checked && !singleSelect) {
        if (node?._children?.length > 0) {
          updateAllChildren(allNodes, node?._children, node.checked)
        }
        updateParents(allNodes, node?._parent)
      }
    }
  })

  if (rootLeafNodesFirst && !isEmpty(nodesToRender)) {
    /**
     * When the root level leaf nodes are to be moved up,
     * 1. Find the index from where the lead nodes are present.
     * 2. Keep the items from that index to the last in a variable. i.e. slice the array.
     * 3. Remove the root leaf nodes from the original array.
     * 4. Add the items from #2 to the index 1 of the array. 0th index is alway going to be the root.
     */
    const allNodesWithLeavesAtTop = clone(nodesToRender)
    const fromIndexToRemove = allNodesWithLeavesAtTop.findIndex(
      node => node._depth === 1 && node.type === 'leaf' && node._parent === '0'
    )
    if (fromIndexToRemove !== -1) {
      const rootLevelLeaves = allNodesWithLeavesAtTop.slice(fromIndexToRemove)
      allNodesWithLeavesAtTop.splice(fromIndexToRemove)
      allNodesWithLeavesAtTop.splice(1, 0, ...rootLevelLeaves)
      return allNodesWithLeavesAtTop
    }
  }

  return nodesToRender
}

export const getAllTheChildren = (nodes, parentNodeId, childrenIds = []) => {
  const nodeIndex = nodes.findIndex(node => node._id === parentNodeId)
  const children = nodes[nodeIndex]?._children || []

  children.forEach(child => {
    childrenIds.push(child)
    getAllTheChildren(nodes, child, childrenIds)
  })

  return childrenIds
}

export const findAndUpdateCheckedStatus = (nodeId, isChecked, nodes, singleSelect = false) => {
  const updatedNodes = [ ...nodes ]
  const nodeIndex = nodes.findIndex(node => node._id === nodeId)

  if (singleSelect) {
    // If the single environment select is true, uncheck the any prechecked environment(s).
    const existingSelectedNodes = nodes.reduce((accumulator, node, index) => {
      if (node.checked) {
        accumulator.push(index);
      }

      return accumulator;
    }, []);

    existingSelectedNodes.forEach(existingNodeIndex => {
      updatedNodes[existingNodeIndex].checked = false
    })

    updatedNodes[nodeIndex].checked = isChecked
    updatedNodes[nodeIndex].indeterminate = false
  } else {
    let isCurrentNodeChecked = false
    let isCurrentNodeIndeterminate = false

    if (updatedNodes[nodeIndex].checked) {
      isCurrentNodeChecked = false
      isCurrentNodeIndeterminate = nodes[nodeIndex]?._children?.length > 0
    } else if (!updatedNodes[nodeIndex].checked && updatedNodes[nodeIndex].indeterminate) {
      isCurrentNodeChecked = false
      isCurrentNodeIndeterminate = false
    } else {
      isCurrentNodeChecked = true
      isCurrentNodeIndeterminate = false
    }

    updatedNodes[nodeIndex].checked = isCurrentNodeChecked
    updatedNodes[nodeIndex].indeterminate = isCurrentNodeIndeterminate

    if (nodes[nodeIndex]?._children?.length > 0) {
      updateAllChildren(updatedNodes, nodes[nodeIndex]?._children, isCurrentNodeChecked, isCurrentNodeIndeterminate)
    }
  
    updateParents(updatedNodes, nodes[nodeIndex]?._parent)
  }

  return updatedNodes
}

const updateAllChildren = (nodes, childrenIds = [], isChecked, isParentIndeterminate = false) => {
  childrenIds.forEach(id => {
    const nodeIndex = nodes.findIndex(node => node._id === id)
    if (nodeIndex === -1) {
      return
    }
    nodes[nodeIndex].checked = isChecked || isParentIndeterminate
    nodes[nodeIndex].indeterminate = false
    nodes[nodeIndex].disabled = isChecked

    if (nodes[nodeIndex]?._children?.length > 0) {
      updateAllChildren(nodes, nodes[nodeIndex]._children, isChecked)
    }
  })
}

const updateParents = (nodes, parentNodeId) => {
  if (parentNodeId) {
    const nodeIndex = nodes.findIndex(node => node._id === parentNodeId)
    const childrenIds = nodes[nodeIndex]._children || []
    const children = nodes.filter(node => childrenIds.includes(node._id))

    if (areAllChildrenChecked(children) && !nodes[nodeIndex].checked) {
      nodes[nodeIndex].indeterminate = true
    } else if (!areAllChildrenChecked(children) && isAnyOneCheckedOrIndeterminate(children)) {
      nodes[nodeIndex].checked = false
      nodes[nodeIndex].indeterminate = true
    } else if (!areAllChildrenChecked(children)) {
      nodes[nodeIndex].checked = false
      nodes[nodeIndex].indeterminate = false
    }

    if (nodes[nodeIndex]._parent) {
      updateParents(nodes, nodes[nodeIndex]._parent)
    }
  }
}

export const areAllChildrenChecked = (childrenNodes = []) => {
  return childrenNodes.every(child => child.checked)
}

export const isAnyOneCheckedOrIndeterminate = (childrenNodes = []) => {
  return childrenNodes.some(child => child.checked || child.indeterminate)
}

export const toggleNodeExpansion = (nodes, nodeId) => {
  const nodeIndex = nodes.findIndex(node => node._id === nodeId)
  const updatedNodes = [ ...nodes ]
  updatedNodes[nodeIndex] = {
    ...updatedNodes[nodeIndex],
    expanded: !nodes[nodeIndex].expanded
  }

  return updatedNodes
}

export const prepareDataForTable = (nodes, showSelected, searchText) => {
  let updatedNodes = [ ...nodes ]

  if (showSelected) {
    updatedNodes = updatedNodes.filter(node => node.checked)
  }

  if (searchText) {
    updatedNodes = updatedNodes.filter(node => node.label?.toLowerCase()?.includes(searchText))
  }

  return updatedNodes
}

export const getFilteredNodes = (nodes, filter, searchText, singleSelect = false, rootLeafNodesFirst = false) => {
  let filteredNodes = [ ...nodes ]
  if (filter === SHOW_SELECTED) {
    filteredNodes = nodes.filter(node => node.checked || node.indeterminate)
  }

  if (searchText) {
    filteredNodes = filterByText(filteredNodes, searchText, singleSelect, rootLeafNodesFirst)
  }

  return filteredNodes
}

const filterByText = (nodes, searchText, singleSelect, rootLeafNodesFirst) => {
  const nodesWithMachingText = nodes.filter(node => node.label?.toLowerCase()?.includes(searchText))
  const filteredNodes = []
  const traversedNodes = []
  nodesWithMachingText.forEach(node => {
    if (node._parent && !traversedNodes.includes(node._parent)) {
      const parentsList = getParentsForANode(nodes, node, traversedNodes)
      filteredNodes.push(...parentsList)
    }
    traversedNodes.push(node._id)
    filteredNodes.push(node)
  })

  // Sorting the nodes by depth to start the rendering in the corect order.
  return getNodesToRender([...sortNodesByDepth(filteredNodes)], singleSelect, rootLeafNodesFirst)
}

const getParentsForANode = (nodes, selectedNode, traversedNodes, parents = []) => {
  const nodeIndex = nodes.findIndex(node => node._id === selectedNode._parent)
  if (nodeIndex !== -1 && !traversedNodes.includes(selectedNode._parent)) {
    parents.push(nodes[nodeIndex])
    traversedNodes.push(selectedNode._parent)

    if (nodes[nodeIndex]?._parent) {
      getParentsForANode(nodes, nodes[nodeIndex], traversedNodes, parents)
    }
  }

  return parents
}

export const getSelectedItems = (nodes, traversedNodes = []) => {
  // Filter by checked values, and sort the list by depth.
  // Sorting is done to find the top-most parent quickly.
  const checkedNodes = sortNodesByDepth(nodes.filter(node => node.checked))
  const selectedItems = []

  checkedNodes.forEach(checkedNode => {
    if (!traversedNodes.includes(checkedNode._id)) {
      // Find all the nodes matching the current node's path, or if the current node path is a substring.
      // This gives us the parent and all the associated children.
      let nodesMatchingCurrentPath = checkedNodes.filter(
        node =>
          node.path === checkedNode.path ||
          node.path.includes(`${checkedNode.path}/`)
      )
      if (nodesMatchingCurrentPath[0].type === 'node') {
        // The first element is always going to be the top most parent.
        // Add that to the selectedItems.
        selectedItems.push(nodesMatchingCurrentPath[0])
      } else {
        // If it is of the type leaf, then the rest of the items are also leaf.
        // Add all the matching items to the selectedItems.
        selectedItems.push(...nodesMatchingCurrentPath)
      }
      // Add all the ids to the traversed list to prevent duplicates.
      traversedNodes.push(...nodesMatchingCurrentPath.map(node => node._id))
    }
  })

  // Filter the unnecessary data from the nodes before passing it to the onChange function.
  return selectedItems.map(node => ({
    label: node.label,
    value: node.value,
  }))
}

export const sortNodesByDepth = (nodes) => {
  const sortedNodes = [ ...nodes ]
  sortedNodes.sort((a, b) => {
    if (a._depth > b._depth) {
      return 1
    }

    if (b._depth > a._depth) {
      return -1
    }

    return 0
  })

  return sortedNodes
}

export const getDisplayDate = (dateTime) => {
  if (!dateTime) {
    return ''
  }

  const date = new Date(dateTime)

  const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hourCycle: 'h23',
  }

  const datePortion = date.toLocaleDateString('en-US', { ...dateOptions })
  const timePortion = date.toLocaleTimeString('en-US', { ...timeOptions })

  return `${datePortion}, ${timePortion}`
}
