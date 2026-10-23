function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';
import { SHOW_SELECTED } from './constants';
export const flattenTree = tree => {
  const treeArr = Array.isArray(tree) ? tree : [tree];
  return traverseNodes({
    nodes: treeArr
  });
};
const traverseNodes = _ref => {
  let {
    nodes,
    parent,
    depth = 0,
    flattennedList = [],
    path = ''
  } = _ref;
  nodes.forEach((node, i) => {
    node._depth = depth;
    node.path = "".concat(path).concat(path.length ? '/' : '').concat(node === null || node === void 0 ? void 0 : node.label);
    if (parent) {
      node._id = node.id || "".concat(parent._id, "-").concat(i);
      node._parent = parent._id;
      parent._children.push(node._id);
    } else {
      node._id = node.id || "".concat(i);
    }
    flattennedList.push(node);
    if (node.nodes) {
      node._children = [];
      traverseNodes({
        nodes: node.nodes,
        parent: node,
        depth: depth + 1,
        flattennedList,
        path: node.path
      });
    }
  });
  return flattennedList;
};
export const getNodesToRender = function (allNodes) {
  var _toBeTraversedNodes;
  let singleSelect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let rootLeafNodesFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let toBeTraversedNodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  let traversedNode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  let nodesToRender = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  if (toBeTraversedNodes.length === 0) {
    toBeTraversedNodes = allNodes;
  }
  (_toBeTraversedNodes = toBeTraversedNodes) === null || _toBeTraversedNodes === void 0 || _toBeTraversedNodes.forEach(node => {
    if (!traversedNode.includes(node._id)) {
      var _node$_children;
      traversedNode.push(node._id);
      nodesToRender.push(node);
      if ((node === null || node === void 0 || (_node$_children = node._children) === null || _node$_children === void 0 ? void 0 : _node$_children.length) > 0) {
        if (node !== null && node !== void 0 && node.expanded) {
          const childrenNodes = allNodes.filter(child => node === null || node === void 0 ? void 0 : node._children.includes(child._id));
          getNodesToRender(allNodes, singleSelect, rootLeafNodesFirst, childrenNodes, traversedNode, nodesToRender);
        } else {
          traversedNode.push(...getAllTheChildren(allNodes, node._id));
        }
      }
      if (node.checked && !singleSelect) {
        var _node$_children2;
        if ((node === null || node === void 0 || (_node$_children2 = node._children) === null || _node$_children2 === void 0 ? void 0 : _node$_children2.length) > 0) {
          updateAllChildren(allNodes, node === null || node === void 0 ? void 0 : node._children, node.checked);
        }
        updateParents(allNodes, node === null || node === void 0 ? void 0 : node._parent);
      }
    }
  });
  if (rootLeafNodesFirst && !isEmpty(nodesToRender)) {
    /**
     * When the root level leaf nodes are to be moved up,
     * 1. Find the index from where the lead nodes are present.
     * 2. Keep the items from that index to the last
     *    in a variable. i.e. slice the array.
     * 3. Remove the root leaf nodes from the
     *    original array.
     * 4. Add the items from #2 to the index 1 of
     *    the array. 0th index is alway going to
     *    be the root.
     */
    const allNodesWithLeavesAtTop = clone(nodesToRender);
    const fromIndexToRemove = allNodesWithLeavesAtTop.findIndex(node => node._depth === 1 && node.type === 'leaf' && node._parent === '0');
    if (fromIndexToRemove !== -1) {
      const rootLevelLeaves = allNodesWithLeavesAtTop.slice(fromIndexToRemove);
      allNodesWithLeavesAtTop.splice(fromIndexToRemove);
      allNodesWithLeavesAtTop.splice(1, 0, ...rootLevelLeaves);
      return allNodesWithLeavesAtTop;
    }
  }
  return nodesToRender;
};
export const getAllTheChildren = function (nodes, parentNodeId) {
  var _nodes$nodeIndex;
  let childrenIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const nodeIndex = nodes.findIndex(node => node._id === parentNodeId);
  const children = ((_nodes$nodeIndex = nodes[nodeIndex]) === null || _nodes$nodeIndex === void 0 ? void 0 : _nodes$nodeIndex._children) || [];
  children.forEach(child => {
    childrenIds.push(child);
    getAllTheChildren(nodes, child, childrenIds);
  });
  return childrenIds;
};
export const findAndUpdateCheckedStatus = function (nodeId, isChecked, nodes) {
  let singleSelect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const updatedNodes = [...nodes];
  const nodeIndex = nodes.findIndex(node => node._id === nodeId);
  if (singleSelect) {
    // If the single environment select is true,
    // uncheck any prechecked environment(s).
    const existingSelectedNodes = nodes.reduce((accumulator, node, index) => {
      if (node.checked) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    existingSelectedNodes.forEach(existingNodeIndex => {
      updatedNodes[existingNodeIndex].checked = false;
    });
    updatedNodes[nodeIndex].checked = isChecked;
    updatedNodes[nodeIndex].indeterminate = false;
  } else {
    var _nodes$nodeIndex3, _nodes$nodeIndex5;
    let isCurrentNodeChecked = false;
    let isCurrentNodeIndeterminate = false;
    if (updatedNodes[nodeIndex].checked) {
      var _nodes$nodeIndex2;
      isCurrentNodeChecked = false;
      isCurrentNodeIndeterminate = ((_nodes$nodeIndex2 = nodes[nodeIndex]) === null || _nodes$nodeIndex2 === void 0 || (_nodes$nodeIndex2 = _nodes$nodeIndex2._children) === null || _nodes$nodeIndex2 === void 0 ? void 0 : _nodes$nodeIndex2.length) > 0;
    } else if (!updatedNodes[nodeIndex].checked && updatedNodes[nodeIndex].indeterminate) {
      const allDescendantIds = getAllTheChildren(nodes, nodeId);
      const hasDisabledDescendant = allDescendantIds.some(id => {
        const idx = nodes.findIndex(n => n._id === id);
        return idx !== -1 && nodes[idx].restricted;
      });
      isCurrentNodeChecked = hasDisabledDescendant;
      isCurrentNodeIndeterminate = false;
    } else {
      isCurrentNodeChecked = true;
      isCurrentNodeIndeterminate = false;
    }
    updatedNodes[nodeIndex].checked = isCurrentNodeChecked;
    updatedNodes[nodeIndex].indeterminate = isCurrentNodeIndeterminate;
    if (((_nodes$nodeIndex3 = nodes[nodeIndex]) === null || _nodes$nodeIndex3 === void 0 || (_nodes$nodeIndex3 = _nodes$nodeIndex3._children) === null || _nodes$nodeIndex3 === void 0 ? void 0 : _nodes$nodeIndex3.length) > 0) {
      var _nodes$nodeIndex4;
      updateAllChildren(updatedNodes, (_nodes$nodeIndex4 = nodes[nodeIndex]) === null || _nodes$nodeIndex4 === void 0 ? void 0 : _nodes$nodeIndex4._children, isCurrentNodeChecked, isCurrentNodeIndeterminate);
    }
    updateParents(updatedNodes, (_nodes$nodeIndex5 = nodes[nodeIndex]) === null || _nodes$nodeIndex5 === void 0 ? void 0 : _nodes$nodeIndex5._parent);
  }
  return updatedNodes;
};
const updateAllChildren = function (nodes) {
  let childrenIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let isChecked = arguments.length > 2 ? arguments[2] : undefined;
  let isParentIndeterminate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  childrenIds.forEach(id => {
    var _nodes$nodeIndex6;
    const nodeIndex = nodes.findIndex(node => node._id === id);
    if (nodeIndex === -1) {
      return;
    }
    nodes[nodeIndex].checked = nodes[nodeIndex].restricted ? true : isChecked || isParentIndeterminate;
    nodes[nodeIndex].indeterminate = false;
    nodes[nodeIndex].disabled = isChecked;
    if (((_nodes$nodeIndex6 = nodes[nodeIndex]) === null || _nodes$nodeIndex6 === void 0 || (_nodes$nodeIndex6 = _nodes$nodeIndex6._children) === null || _nodes$nodeIndex6 === void 0 ? void 0 : _nodes$nodeIndex6.length) > 0) {
      updateAllChildren(nodes, nodes[nodeIndex]._children, isChecked);
    }
  });
};
const updateParents = (nodes, parentNodeId) => {
  if (parentNodeId) {
    const nodeIndex = nodes.findIndex(node => node._id === parentNodeId);
    const childrenIds = nodes[nodeIndex]._children || [];
    const children = nodes.filter(node => childrenIds.includes(node._id));
    if (areAllChildrenChecked(children) && !nodes[nodeIndex].checked) {
      nodes[nodeIndex].indeterminate = true;
    } else if (!areAllChildrenChecked(children) && isAnyOneCheckedOrIndeterminate(children)) {
      nodes[nodeIndex].checked = false;
      nodes[nodeIndex].indeterminate = true;
    } else if (!areAllChildrenChecked(children)) {
      nodes[nodeIndex].checked = false;
      nodes[nodeIndex].indeterminate = false;
    }
    if (nodes[nodeIndex]._parent) {
      updateParents(nodes, nodes[nodeIndex]._parent);
    }
  }
};
export const areAllChildrenChecked = function () {
  let childrenNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return childrenNodes.every(child => child.checked);
};
export const isAnyOneCheckedOrIndeterminate = function () {
  let childrenNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return childrenNodes.some(child => child.checked || child.indeterminate);
};
export const toggleNodeExpansion = (nodes, nodeId) => {
  const nodeIndex = nodes.findIndex(node => node._id === nodeId);
  const updatedNodes = [...nodes];
  updatedNodes[nodeIndex] = _objectSpread(_objectSpread({}, updatedNodes[nodeIndex]), {}, {
    expanded: !nodes[nodeIndex].expanded
  });
  return updatedNodes;
};
export const prepareDataForTable = (nodes, showSelected, searchText) => {
  let updatedNodes = [...nodes];
  if (showSelected) {
    updatedNodes = updatedNodes.filter(node => node.checked);
  }
  if (searchText) {
    updatedNodes = updatedNodes.filter(node => {
      var _node$label;
      return (_node$label = node.label) === null || _node$label === void 0 || (_node$label = _node$label.toLowerCase()) === null || _node$label === void 0 ? void 0 : _node$label.includes(searchText);
    });
  }
  return updatedNodes;
};
export const getFilteredNodes = function (nodes, filter, searchText) {
  let singleSelect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let rootLeafNodesFirst = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let filteredNodes = [...nodes];
  if (filter === SHOW_SELECTED) {
    filteredNodes = nodes.filter(node => node.checked || node.indeterminate);
  }
  if (searchText) {
    filteredNodes = filterByText(filteredNodes, searchText, singleSelect, rootLeafNodesFirst);
  }
  return filteredNodes;
};
const filterByText = (nodes, searchText, singleSelect, rootLeafNodesFirst) => {
  const nodesWithMachingText = nodes.filter(node => {
    var _node$label2;
    return (_node$label2 = node.label) === null || _node$label2 === void 0 || (_node$label2 = _node$label2.toLowerCase()) === null || _node$label2 === void 0 ? void 0 : _node$label2.includes(searchText);
  });
  const filteredNodes = [];
  const traversedNodes = [];
  nodesWithMachingText.forEach(node => {
    if (node._parent && !traversedNodes.includes(node._parent)) {
      const parentsList = getParentsForANode(nodes, node, traversedNodes);
      filteredNodes.push(...parentsList);
    }
    traversedNodes.push(node._id);
    filteredNodes.push(node);
  });

  // Sorting the nodes by depth to start
  // the rendering in the corect order.
  return getNodesToRender([...sortNodesByDepth(filteredNodes)], singleSelect, rootLeafNodesFirst);
};
const getParentsForANode = function (nodes, selectedNode, traversedNodes) {
  let parents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  const nodeIndex = nodes.findIndex(node => node._id === selectedNode._parent);
  if (nodeIndex !== -1 && !traversedNodes.includes(selectedNode._parent)) {
    var _nodes$nodeIndex7;
    parents.push(nodes[nodeIndex]);
    traversedNodes.push(selectedNode._parent);
    if ((_nodes$nodeIndex7 = nodes[nodeIndex]) !== null && _nodes$nodeIndex7 !== void 0 && _nodes$nodeIndex7._parent) {
      getParentsForANode(nodes, nodes[nodeIndex], traversedNodes, parents);
    }
  }
  return parents;
};
export const getSelectedItems = function (nodes) {
  let traversedNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // Filter by checked values, and sort the list by depth.
  // Sorting is done to find the top-most parent quickly.
  const checkedNodes = sortNodesByDepth(nodes.filter(node => node.checked));
  const selectedItems = [];
  checkedNodes.forEach(checkedNode => {
    if (!traversedNodes.includes(checkedNode._id)) {
      // Find all the nodes matching the current
      // node's path, or if the current node path
      // is a substring.
      // This gives us the parent and all the associated children.
      let nodesMatchingCurrentPath = checkedNodes.filter(node => node.path === checkedNode.path || node.path.includes("".concat(checkedNode.path, "/")));
      if (nodesMatchingCurrentPath[0].type === 'node') {
        // The first element is always going to be the top most parent.
        // Add that to the selectedItems.
        selectedItems.push(nodesMatchingCurrentPath[0]);
      } else {
        // If it is of the type leaf, then the rest of the items are also leaf.
        // Add all the matching items to the selectedItems.
        selectedItems.push(...nodesMatchingCurrentPath);
      }
      // Add all the ids to the traversed list to prevent duplicates.
      traversedNodes.push(...nodesMatchingCurrentPath.map(node => node._id));
    }
  });

  // Filter the unnecessary data from the nodes
  // before passing it to the onChange function.
  return selectedItems.map(node => ({
    label: node.label,
    value: node.value
  }));
};
export const sortNodesByDepth = nodes => {
  const sortedNodes = [...nodes];
  sortedNodes.sort((a, b) => {
    if (a._depth > b._depth) {
      return 1;
    }
    if (b._depth > a._depth) {
      return -1;
    }
    return 0;
  });
  return sortedNodes;
};
export const getDisplayDate = dateTime => {
  if (!dateTime) {
    return '';
  }
  const date = new Date(dateTime);
  const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    hourCycle: 'h23'
  };
  const datePortion = date.toLocaleDateString('en-US', _objectSpread({}, dateOptions));
  const timePortion = date.toLocaleTimeString('en-US', _objectSpread({}, timeOptions));
  return "".concat(datePortion, ", ").concat(timePortion);
};