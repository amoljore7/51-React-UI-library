import React, { useEffect, useState } from 'react';
import { TreeNodeClasses } from '../constants';
import Node from './node';
import './treeNodes.scss';
import {
  findAndUpdateCheckedStatus,
  getFilteredNodes,
  getNodesToRender,
  getSelectedItems,
  toggleNodeExpansion,
} from '../utils';

const TreeNodes = ({
  nodes,
  updateCount,
  filter,
  searchText,
  onChange,
  readOnly,
  hideCheckboxes,
  singleSelect,
  singleSelectRadio,
  allowOnlyLeafSelection,
  allowRootSelection = true,
  rootLeafNodesFirst = false,
}) => {
  const [modifiedNodes, setModifiedNodes] = useState([])
  const [filteredNodes, setFilteredNodes] = useState([])

  useEffect(() => {
    setFilteredNodes(getFilteredNodes(modifiedNodes, filter, searchText, singleSelect, rootLeafNodesFirst))
  }, [ filter, searchText ])

  useEffect(() => {
    initilalizeNodes()
  }, [updateCount])

  const handleCheckboxClick = ({ id, checked }) => {
    const updatedNodes = findAndUpdateCheckedStatus(id, checked, modifiedNodes, singleSelect)
    updateNodes(updatedNodes)
    if (typeof onChange === 'function') {
      onChange(getSelectedItems(updatedNodes))
    }
  }

  const expandIconClickHandler = (nodeId) => {
    const updatedNodes = toggleNodeExpansion(modifiedNodes, nodeId)
    updateNodes(updatedNodes)
  }

  const initilalizeNodes = () => {
    const nodesToRender = getNodesToRender([...nodes], singleSelect, rootLeafNodesFirst)
    setModifiedNodes(nodesToRender)
    setFilteredNodes(getFilteredNodes(nodesToRender, filter, searchText, singleSelect, rootLeafNodesFirst))
  }

  const updateNodes = (updatedNodes) => {
    setModifiedNodes(updatedNodes)
    setFilteredNodes(getFilteredNodes(getNodesToRender(updatedNodes, singleSelect, rootLeafNodesFirst), filter, searchText, singleSelect, rootLeafNodesFirst))
  }

  return (
    <div className={TreeNodeClasses.container}>
      {filteredNodes?.map((node) =>
        <Node
          node={node}
          expandIconClickHandler={expandIconClickHandler}
          handleCheckboxClick={handleCheckboxClick}
          readOnly={readOnly}
          hideCheckboxes={hideCheckboxes}
          singleSelect={singleSelect}
          singleSelectRadio={singleSelectRadio}
          allowOnlyLeafSelection={allowOnlyLeafSelection}
          allowRootSelection={allowRootSelection}
          key={`tree-node-${node._id}`}
        />
      )}
    </div>
  );
};

export default TreeNodes;
